import React, {useContext, useState} from 'react'
import './App.css'
import {
  Avatar,
  Col,
  DatePicker,
  DatePickerProps,
  Layout,
  Pagination,
  Row,
  Select,
} from 'antd'
import dayjs from 'dayjs'
import { DashBoard } from './components'
import ucl from './resources/images/ucl.png'
import bundesliga from './resources/images/bundesliga.png'
import laliga from './resources/images/laliga.png'
import epl from './resources/images/epl.png'
import seriea from './resources/images/seriea.png'
import ligue1 from './resources/images/ligue1.png'
import europa from './resources/images/europa.png'
import conference from './resources/images/conference.png'
import {PaginationContext, PaginationProvider} from "./contexts";

const LeagueOption: React.FC<{ image: string; name: string }> = ({
  image,
  name,
}) => (
  <>
    <Avatar
      shape={'square'}
      src={<img src={image} alt={name} />}
      size={'small'}
    />{' '}
    {name}
  </>
)

const App: React.FC = () => {
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs())
  const [league, setLeague] = useState<string>('eng.1')
  const {state, actions} = useContext(PaginationContext);
  const leagueOptions = [
    {label: 'Nation', options: [
        {
          value: 'eng.1',
          label: <LeagueOption image={epl} name={'Premier League'} />,
        },
        { value: 'esp.1', label: <LeagueOption image={laliga} name={'LaLiga'} /> },
        {
          value: 'ger.1',
          label: <LeagueOption image={bundesliga} name={'Bundesliga'} />,
        },
        {
          value: 'ita.1',
          label: <LeagueOption image={seriea} name={'Serie A'} />,
        },
        {
          value: 'fra.1',
          label: <LeagueOption image={ligue1} name={'Ligue 1'} />,
        },
      ]
    },
    {label: 'UEFA', options: [
        {
          value: 'uefa.champions',
          label: <LeagueOption image={ucl} name={'UEFA Champions League'} />,
        },
        {
          value: 'uefa.europa',
          label: <LeagueOption image={europa} name={'UEFA Europa League'} />,
        },
        {
          value: 'uefa.europa.conf',
          label: <LeagueOption image={conference} name={'UEFA Europa Conference League'} />,
        },
      ]
    }
  ]

  const onChangeDate: DatePickerProps['onChange'] = (date, _dateString) => {
    if (date) setDate(date)
  }
  const onChangeLeague = (value: string) => {
    setLeague(value)
  }
  return (
      <PaginationProvider>
    <Layout>
      <Layout.Content style={{ height: 580 }}>
        <Row>
          <Col span={12}>
            <DatePicker
              style={{ width: '100%' }}
              onChange={onChangeDate}
              defaultValue={date}
              size={'large'}
              showNow
            />
          </Col>
          <Col span={12}>
            <Select
              style={{ width: '100%', height: '100%' }}
              options={leagueOptions}
              onChange={onChangeLeague}
              defaultValue={'eng.1'}
            />
          </Col>
        </Row>
        <Row>
          <DashBoard
            date={date.format('YYYYMMDD').toString()}
            league={league}
          />
        </Row>
      </Layout.Content>
        <Layout.Footer style={{textAlign: 'center', padding: 0}}>
            <Pagination defaultCurrent={state.currentPage} total={state.totalCount}
                        pageSize={12} onChange={page => {actions.setCurrentPage(page)}}/>
        </Layout.Footer>
    </Layout>
      </PaginationProvider>
  )
}

export default App
