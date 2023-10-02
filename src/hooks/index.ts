import {APIResult} from "../types";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

export const useScoreBoardQuery = (date: string, league: string) => {
    const fetchScoreBoard = async (): Promise<APIResult> => await axios
        .get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard?dates=${date}&calendartype=blacklist`)
        .then(res => res.data);
    // refetch data every 20 seconds
    const intervalMs = 20000;

    return useQuery({
        queryKey: [date, league],
        queryFn: fetchScoreBoard,
        refetchInterval: intervalMs,
        refetchIntervalInBackground: true,
    });
}