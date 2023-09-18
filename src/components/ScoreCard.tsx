import {Avatar, Card, Col, Row, Spin, Typography} from "antd";
import {Competitor, EspnScoreInterface, Status} from "../types";
import React from "react";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

interface ScoreCardProps {
    home: Competitor;
    away: Competitor;
    status: Status;
}

function Team({team, score, records}: Competitor) {
    return <Card.Meta
        avatar={<Avatar src={team.logo}
                        style={{backgroundColor: `#${team.color}`, verticalAlign: 'middle'}}
                />}
        title={
            <div className="ant-card-head-wrapper">
                <div className="ant-card-head-title">{team.abbreviation}</div>
                <div className="ant-card-extra"><Typography.Text strong underline>{score}</Typography.Text>
                </div>
            </div>
        }
        description={`(${records[0].summary})`}
    />;
};
export function ScoreCard({home, away, status}: ScoreCardProps) {
    let title = 'unknown';
    let style = { color: '' };
    switch(status.type.state) {
        case 'pre':
            title = status.type.detail.split('at ')[1];
            style.color = '#b9b7b7';
            break;
        case "in":
            title = status.displayClock;
            style.color = '#d51d1d';
            break;
        case "post":
            title = status.type.description;
            break;
    }

    return (
        <Card title={title} headStyle={style}>
            <Team team={home.team} score={home.score} records={home.records} />
            <br />
            <Team team={away.team} score={away.score} records={away.records} />
        </Card>
    );
}

function useScoreBoard(date: string, league: string) {
    const fetchScoreBoard = async (): Promise<EspnScoreInterface> => await axios
        .get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard?dates=${date}&calendartype=blacklist`)
        .then(res => res.data);

    return useQuery([date, league], fetchScoreBoard);
}

export function DashBoard({date, league}: {date: string, league: string}) {
    const { status, data,
        error, isFetching, isSuccess } = useScoreBoard(date, league);
    return (
        <>
            { status === "loading" && <Spin />}
            { error instanceof Error &&
                <span>Error: {error.message}</span>
            }
            { isSuccess && (
                <Row justify="space-between">
                    {data?.events.map((event, i) => (
                        <Col span={12} key={i}>
                            <ScoreCard home={event.competitions[0].competitors[0]}
                                       away={event.competitions[0].competitors[1]}
                                       status={event.status} />
                        </Col>
                    ))
                    }
                    <div>{isFetching ? "Background Updating..." : " "}</div>
                </Row>
            )}
        </>
    )
}