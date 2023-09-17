import React from 'react';
import './App.css';
import {ScoreBoard} from './types';
import axios from "axios";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import {ScoreCard} from "./components/ScoreCard";

function useScoreBoard(date: string, league: string) {
    const fetchScoreBoard = async (): Promise<ScoreBoard> => await axios
            .get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard?dates=${date}&calendartype=blacklist`)
            .then(res => res.data);

    return useQuery([`${date}-${league}`], fetchScoreBoard);
}

function App() {

    const { status, data, error, isFetching, isSuccess } = useScoreBoard('20230916', 'eng.1');
    return (
        <div>
            <h1>Posts</h1>
            <div>
                { status === "loading" && "Loading..."
                }
                { error instanceof Error &&
                    <span>Error: {error.message}</span>
                }
                { isSuccess && (
                    <>
                        {data?.events.map((event, i) => (
                            <ScoreCard home={event.competitions[0].competitors[0]} away={event.competitions[0].competitors[1]} />
                        ))
                        }
                        <div>{isFetching ? "Background Updating..." : " "}</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;