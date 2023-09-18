import React, {useState} from 'react';
import './App.css';
import {Col, DatePicker, DatePickerProps, Layout, Row, Space, Spin} from "antd";
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
                <Layout>
                    <Layout.Content>
                        <DatePicker onChange={onChange} defaultValue={date} />
                        <DashBoard date={date.format('YYYYMMDD').toString()} league={league} />
                    </Layout.Content>
                </Layout>
                <Layout.Header>footer</Layout.Header>
            </Layout>
    );
}

export default App;