import {Avatar, Card, Popover, Typography} from "antd";
import {Event, ScoringInfo, TeamInfo} from "../types";
import React from "react";
import {d} from "msw/lib/glossary-de6278a9";

const Team: React.FC<TeamInfo> = (props) => {
    if(props.scoringInfoList) {
        const content = props.scoringInfoList.map((value, index) => {
            return <p key={index}>{value.displayValue} {value.scorer}</p>
        })
        return <Card.Meta
            avatar={<Avatar src={props.team.logo}/>}
            title={
                <div className="ant-card-head-wrapper">
                    <div className="ant-card-head-title">{props.team.abbreviation}</div>
                    <div className="ant-card-extra">
                        <Popover content={<div>{content}</div>}>
                            <Typography.Text strong underline>
                                {props.score}
                            </Typography.Text>
                        </Popover>
                    </div>
                </div>
            }
            description={`(${props.records[0].summary})`}
        />;
    }
    return <Card.Meta
        avatar={<Avatar src={props.team.logo}/>}
        title={
            <div className="ant-card-head-wrapper">
                <div className="ant-card-head-title">{props.team.abbreviation}</div>
                <div className="ant-card-extra">
                    <Typography.Text strong underline>
                        {props.score}
                    </Typography.Text>
                </div>
            </div>
        }
        description={`(${props.records[0].summary})`}
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
                displayValue: d.clock.displayValue,
                penaltyKick: d.penaltyKick,
                scorer: d.athletesInvolved[0].shortName
            });
        } else {
            awayScoringInfo.push({
                ownGoal: d.ownGoal,
                displayValue: d.clock.displayValue,
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
            <Team team={home.team} score={home.score} records={home.records} id={home.id} scoringInfoList={homeScoringInfo}/>
            <br />
            <Team team={away.team} score={away.score} records={away.records} id={away.id} scoringInfoList={awayScoringInfo}/>
        </Card>
    );
}