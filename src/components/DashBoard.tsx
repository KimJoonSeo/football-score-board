import { useScoreBoardData } from '../hooks'
import { Col, Space, Spin } from 'antd'
import React, { useEffect } from 'react'
import { showMessage, ScoreCard } from './'

interface Props {
  date: string
  league: string
}

export const DashBoard: React.FC<Props> = ({ date, league }) => {
  const { isLoading, error, data } = useScoreBoardData(date, league)
  useEffect(() => {
    if (error) {
      showMessage('error', 'An error has occurred while fetching data.')
    }
    if (data?.events.length === 0) {
      showMessage('info', 'No game today!')
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
