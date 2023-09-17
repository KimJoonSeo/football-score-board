import {Avatar, Card, Typography} from "antd";
import {Competitor, Status} from "../types";

interface ScoreCardProps {
    home: Competitor;
    away: Competitor;
    status: Status;
    startDate: string;
}

function Team({team, score, records}: Competitor) {
    return <Card.Meta
        avatar={<Avatar src={team.logo}
                        style={{backgroundColor: `#${team.color}`, verticalAlign: 'middle'}}
                        shape="square"/>}
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
export function ScoreCard({home, away, status, startDate}: ScoreCardProps) {
    let title = 'unknown';
    let style = { color: '' };
    switch(status.type.state) {
        case 'pre':
            title = startDate;
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