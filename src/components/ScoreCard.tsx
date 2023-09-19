import {Avatar, Card, Typography} from "antd";
import {Competitor, Status} from "../types";
import React from "react";

interface Props {
    home: Competitor;
    away: Competitor;
    status: Status;
}

const Team: React.FC<Competitor> = ({team, score, records}) => {
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
const ScoreCard: React.FC<Props> = ({home, away, status}) => {
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
        <Card>
            <Typography.Paragraph style={{color: style.color}}>{title}</Typography.Paragraph>
            <Team team={home.team} score={home.score} records={home.records} />
            <br />
            <Team team={away.team} score={away.score} records={away.records} />
        </Card>
    );
}
// export const DummyCard: React.FC = () => {
//     const dummyTeam = {
//         abbreviation: 's',
//         color: 's',
//         alternateColor: 's',
//         isActive: true,
//         logo: 's',
//     }
//     return (
//         <Card>
//             <Team team={dummyTeam} score={'s'} records={[{summary: 's'}]} />
//             <br />
//             <Team team={dummyTeam} score={'s'} records={[{summary: 's'}]} />
//         </Card>
//     );
// }
export default ScoreCard;