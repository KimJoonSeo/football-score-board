import {useScoreBoardQuery} from "../hooks/useScoreBoardQuery";
import {App, Col, Spin} from "antd";
import React from "react";
import ScoreCard from "./ScoreCard";
import {EspnScoreInterface} from "../types";

interface Props {
    date: string;
    league: string;
}
const DashBoard: React.FC<Props> = ({date, league}) => {
    const { status, data,
        error, isFetching, isSuccess } = useScoreBoardQuery(date, league);
    // const { notification } = App.useApp();
    // if(error instanceof Error) {
    //     notification.error(
    //         {
    //             message: `Notification`,
    //             description: error.message,
    //             placement: 'topLeft',
    //         });
    // }
    // if(isSuccess && data?.events.length == 0 ) {
    //     notification.info(
    //         {
    //             message: `Notification`,
    //             description: 'There is no match.',
    //             placement: 'topLeft',
    //         });
    // }
    return (
        <>
            {/*{ (status === "loading" || isFetching) &&*/}
            {/*    <Col span={24}>*/}
            {/*        <Spin />*/}
            {/*    </Col>*/}
            {/*}*/}
            { isSuccess && (
                <>
                    {data?.events.map((event, i) => (
                        <Col span={6} key={i}>
                            <ScoreCard home={event.competitions[0].competitors[0]}
                                       away={event.competitions[0].competitors[1]}
                                       status={event.status} />
                        </Col>
                    ))
                    }
                </>
            )}
        </>
    )
}

export default DashBoard;