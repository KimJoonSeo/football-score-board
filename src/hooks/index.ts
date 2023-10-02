import {ScoreBoard} from "../types";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const intervalMs = 20000;
const fetchScoreBoard = async (date: string, league: string): Promise<ScoreBoard> => {
    const res = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard?dates=${date}&calendartype=blacklist`);
    return res.data;
}
export const useScoreBoardData = (date: string, league: string) => {
    return useQuery({
        queryKey: [date, league],
        queryFn: () => fetchScoreBoard(date, league),
        refetchInterval: intervalMs,
        refetchIntervalInBackground: true,
    });
}