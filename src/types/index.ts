export interface ScoreBoard {
    events: Event[]
}

export interface Event {
    status: Status;
    competitions: Competition[];
}
export interface Status {
    displayClock: string;
    type : {
        completed: boolean;
        description: string;
        detail: string;
        name: string;
        state: "post" | "in" | "pre";
    }
}
export interface Competition {
    startDate: string;
    competitors: Competitor[];
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