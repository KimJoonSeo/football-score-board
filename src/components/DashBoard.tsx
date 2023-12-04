import { useScoreBoardData } from '../hooks'
import { Col, Space, Spin } from 'antd'
import React, {useContext, useEffect} from 'react'
import { showMessage, ScoreCard } from './'
import {PaginationContext} from "../contexts";

interface Props {
  date: string
  league: string
}

export const DashBoard: React.FC<Props> = ({ date, league }) => {
  const { isLoading, error, data } = useScoreBoardData(date, league)
  const {state, actions} = useContext(PaginationContext)

  useEffect(() => {
    if (error) {
      actions.setCurrentPage(1)
      actions.setTotalCount(1)
      showMessage('error', 'An error has occurred while fetching data.')
    }
    if (data?.events.length === 0) {
      actions.setCurrentPage(1)
      actions.setTotalCount(1)
      showMessage('info', 'No game today!')
    } else {
      actions.setCurrentPage(1)
      actions.setTotalCount(data?.events.length)
    }
  }, [data, error])

  if (isLoading) {
    return (
      <Space direction="vertical" style={{ width: '100%', padding: '250px' }}>
        <Spin size={'large'} tip={'Loading'} style={{ width: '100% ' }}>
          <div />
        </Spin>
      </Space>
    )
  }

  return (
    <>
      {data?.events.map((event, i) => (
        <Col span={6} key={i}>
          <ScoreCard status={event.status} competitions={event.competitions} />
        </Col>
      ))}
    </>
  )
}
