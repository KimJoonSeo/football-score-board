import React, {useState} from 'react';
import './App.css';
import {Col, DatePicker, DatePickerProps, Layout, Row, Select} from "antd";
import dayjs from "dayjs";
import {DashBoard} from "./components";

const App: React.FC = () => {
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
    const [league, setLeague] = useState<string>('eng.1');
    const leagueOptions = [
        { value: 'eng.1', label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League' },
        { value: 'esp.1', label: '🇪🇸 LaLiga' },
        { value: 'ger.1', label: '🇩🇪 Bundesliga' },
        { value: 'uefa.champions', label: '🌍 UEFA Champions League' },
    ];

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        if(date) setDate(date);
    }
    const onChangeLeague = (value: string) => {
        setLeague(value);
    };
    return (
            <Layout>
                <Layout.Content style={{minHeight: 600}}>
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
                <Layout.Footer style={{ textAlign: 'center' }}>©Joonseo Kim 2023. All rights reserved.</Layout.Footer>
            </Layout>
    );
}

export default App;