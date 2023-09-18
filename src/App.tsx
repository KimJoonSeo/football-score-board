import React, {useState} from 'react';
import './App.css';
import {Col, DatePicker, DatePickerProps, Layout, Row} from "antd";
import dayjs from "dayjs";
import {DashBoard} from "./components/ScoreCard";


function App() {
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
    const [league, setLeague] = useState<string>('eng.1');

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        if(date) {
            setDate(date);
        }
    }
    return (
            <Layout>
                <Layout.Header>header</Layout.Header>
                <Layout.Content>
                    <Row>
                        <Col span={24}>
                            <DatePicker onChange={onChange} defaultValue={date} size={'large'} showNow/>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <DashBoard date={date.format('YYYYMMDD').toString()} league={league} />
                    </Row>
                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Layout.Footer>
            </Layout>
    );
}

export default App;