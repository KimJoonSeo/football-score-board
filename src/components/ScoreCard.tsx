import {Avatar, Card, Typography} from "antd";
import {Competitor} from "../types";

interface ScoreCardProps {
    home: Competitor;
    away: Competitor;
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
export function ScoreCard({home, away}: ScoreCardProps) {
    return (
        <Card>
            <Team team={home.team} score={home.score} records={home.records}/>
            <br />
            <Team team={away.team} score={away.score} records={away.records} />
        </Card>
    );
}