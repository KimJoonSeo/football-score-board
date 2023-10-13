import {Avatar, Card, Typography} from "antd";
import {Competitor, Event, ScoringInfo} from "../types";
import React from "react";

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
export const ScoreCard: React.FC<Event> = (props) => {
    let title = 'unknown';
    let style = { color: '' };
    const status = props.status;
    const home = props.competitions[0].competitors[0];
    const away = props.competitions[0].competitors[1];
    const details = props.competitions[0].details;
    const homeScoringInfo: ScoringInfo[] = [];
    const awayScoringInfo: ScoringInfo[] = [];
    for (const d of details) {
        if(!d.scoringPlay) continue;
        if(d.team.id === home.id) {
            homeScoringInfo.push({
                ownGoal: d.ownGoal,
                penaltyKick: d.penaltyKick,
                scorer: d.athletesInvolved[0].shortName,
            });
        } else {
            awayScoringInfo.push({
                ownGoal: d.ownGoal,
                penaltyKick: d.penaltyKick,
                scorer: d.athletesInvolved[0].shortName,
            });
        }
    }
     console.log(homeScoringInfo, awayScoringInfo);
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