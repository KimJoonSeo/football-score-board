import React, {useState} from 'react';
import './App.css';
import {Avatar, Col, DatePicker, DatePickerProps, Layout, Row, Select} from "antd";
import dayjs from "dayjs";
import {DashBoard} from "./components";
import ucl from "./resources/ucl.png";
import bundesliga from "./resources/bundesliga.png";
import laliga from "./resources/laliga.png";
import epl from "./resources/epl.png";

const LeagueOption: React.FC<{image: string, name: string}> = ({image, name}) => (
    <>
        <Avatar shape={"square"} src={<img src={image} alt={name}/>} size={"small"}/> {name}
    </>
)

const App: React.FC = () => {
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
    const [league, setLeague] = useState<string>('eng.1');
    const leagueOptions = [
        { value: 'eng.1', label: <LeagueOption image={epl} name={'Premier League'} /> },
        { value: 'esp.1', label: <LeagueOption image={laliga} name={'LaLiga'} /> },
        { value: 'ger.1', label: <LeagueOption image={bundesliga} name={'Bundesliga'} /> },
        { value: 'uefa.champions', label: <LeagueOption image={ucl} name={'UEFA Champions League'} />},
    ];

    const onChangeDate: DatePickerProps['onChange'] = (date, _dateString) => {
        if(date) setDate(date);
    }
    const onChangeLeague = (value: string) => {
        setLeague(value);
    };
    return (
        <Layout>
            <Layout.Content style={{minHeight: 580}}>
                <Row>
                    <Col span={12}>
                        <DatePicker style={{ width: '100%'}}
                                    onChange={onChangeDate}
                                    defaultValue={date} size={'large'} showNow/>
                    </Col>
                    <Col span={12}>
                        <Select style={{ width: '100%', height: '100%' }}
                                options={leagueOptions} onChange={onChangeLeague} defaultValue={'eng.1'} />
                    </Col>
                </Row>
                <Row>
                    <DashBoard date={date.format('YYYYMMDD').toString()} league={league} />
                </Row>
            </Layout.Content>
        </Layout>
    );
}

export default App;