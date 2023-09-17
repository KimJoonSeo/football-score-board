import {Avatar, Badge, Card, Typography} from "antd";
import {Competitor} from "../types";

interface ScoreCardProps {
    home: Competitor;
    away: Competitor;
}
export function ScoreCard({home, away}: ScoreCardProps) {
    return (
        <Card>
            <Card.Meta
                avatar={<Avatar src={home.team.logo} style={{ backgroundColor: `#${home.team.color}`, verticalAlign: 'middle' }} shape="square">asv</Avatar>}
                title={
                    <div className="ant-card-head-wrapper">
                        <div className="ant-card-head-title">{home.team.abbreviation}</div>
                        <div className="ant-card-extra"><Typography.Text strong underline>{home.score}</Typography.Text></div>
                    </div>
                }
                description={`(${home.records[0].summary})`}
            />
            <br />
            <Card.Meta
                avatar={<Avatar src={away.team.logo} style={{ backgroundColor: `#${away.team.color}`, verticalAlign: 'middle' }} shape="square"/>}
                title={
                    <div className="ant-card-head-wrapper">
                        <div className="ant-card-head-title">{away.team.abbreviation}</div>
                        <div className="ant-card-extra"><Typography.Text strong underline>{away.score}</Typography.Text></div>
                    </div>
                }
                description={`(${away.records[0].summary})`}
            />
        </Card>
    );
}