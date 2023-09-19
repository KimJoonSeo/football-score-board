import {EspnScoreInterface} from "../types";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

export const useScoreBoardQuery = (date: string, league: string) => {
    const fetchScoreBoard = async (): Promise<EspnScoreInterface> => await axios
        .get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard?dates=${date}&calendartype=blacklist`)
        .then(res => res.data);

    return useQuery([date, league], fetchScoreBoard);
}