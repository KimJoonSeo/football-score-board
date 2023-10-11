import {Avatar, Card, Typography} from "antd";
import {Competitor, Status} from "../types";
import React from "react";

interface Props {
    home: Competitor;
    away: Competitor;
    status: Status;
}

const Team: React.FC<Competitor> = ({team, score, records, id}) => {
    const teamId = id;
    return <Card.Meta
        avatar={<Avatar src={team.logo}/>}
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
export const ScoreCard: React.FC<Props> = ({home, away, status}) => {
    let title = 'unknown';
    let style = { color: '' };
    switch(status.type.state) {
        case 'pre':
            title = status.type.detail.includes('at ')
                ? status.type.detail.split('at ')[1]
                : status.type.detail;
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
        <Card size={'small'}>
            <Typography.Paragraph style={{color: style.color}}>{title}</Typography.Paragraph>
            <Team team={home.team} score={home.score} records={home.records} id={home.id}/>
            <br />
            <Team team={away.team} score={away.score} records={away.records} id={away.id}/>
        </Card>
    );
}