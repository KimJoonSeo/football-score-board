
export interface ScoreBoard {
    events: Event[]
}

export interface Event {
    status: {
        type : {
            completed: boolean;
            description: string;
            detail: string;
            name: string;
            state: string;
        }
    };
    competitions: Competition[];
}
export interface Competition {
    competitors: Competitor[]
}
export interface Competitor {
    score: string;
    records: [{
        summary: string;
    }]
    team: {
      abbreviation: string;
      color: string;
      alternateColor: string;
      isActive: boolean;
      logo: string;
    };
}