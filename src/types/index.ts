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
    details: Detail[];
}
export interface Competitor {
    id: string;
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

export interface Detail {
    athletesInvolved : {
        displayName: string;
        shortName: string;

    }[];
    clock: {
        displayValue: string;
    }
    ownGoal: boolean;
    penaltyKick: boolean;
    redCard: boolean;
    yellowCard: boolean;
    scoreValue: number;
    scoringPlay: boolean;
    team: {
        id: string;
    }
}

export interface ScoringInfo {
    ownGoal: boolean;
    penaltyKick: boolean;
    scorer: string;
}