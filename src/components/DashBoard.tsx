import {useScoreBoardQuery} from "../hooks/useScoreBoardQuery";
import {Col, Spin} from "antd";
import React, {useEffect} from "react";
import {showMessage, ScoreCard} from "./";
import {APIResult} from "../types";

interface Props {
    date: string;
    league: string;
}

export const DashBoard: React.FC<Props> = ({date, league}) => {
    const { isLoading, error, data } = useScoreBoardQuery(date, league);
    useEffect(() => {
        if(error) {
            showMessage('error', 'An error has occurred while fetching data.');
        }
        if(data?.events.length === 0) {
            showMessage('info', 'No game today!');
        }
    }, [data]);

    if(isLoading) return <Spin size={'large'}/>

    return (
        <>
            {data?.events.map((event, i) => (
                <Col span={6} key={i}>
                    <ScoreCard home={event.competitions[0].competitors[0]}
                               away={event.competitions[0].competitors[1]}
                               status={event.status} />
                </Col>
            ))}
        </>
    )
}
