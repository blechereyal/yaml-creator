export type visualVariantT = {
    name: string,
    id: Number
}
export type gameTypeT = {
    name: 'multiple_choice' | 'connect_the_topics' | 'type_your_answer' | 'answer_in_sequence',
    id: Number,
    visual_variants: visualVariantT[],
};

export const gameTypes: gameTypeT[] = [
    {
        name: 'multiple_choice', visual_variants: [
            { name: 'normal', id: 1 }, { name: 'bullets', id: 2 }, { name: 'cards', id: 3 }, { name: 'photos', id: 4 }, { name: 'this_or_that', id: 5 }
        ]
        , id: 1
    },
    {
        name: 'connect_the_topics', visual_variants: [
            { name: 'normal', id: 1 }
        ]
        , id: 2
    },
    {
        name: 'type_your_answer', visual_variants: [
            { name: 'normal', id: 1 }
        ]
        , id: 3
    },
    {
        name: 'answer_in_sequence', visual_variants: [
            { name: 'normal', id: 1 }
        ]
        , id: 4
    },
];

export type playVariantT = { id: Number, name: 'staggered' | 'rapid_fire' | 'rapid_fire_penalty' };
export const playVariants: playVariantT[] = [
    { id: 1, name: 'staggered' },
    { id: 2, name: 'rapid_fire_penalty' },
    { id: 3, name: 'rapid_fire' },
];

export type GameRoundParamsT = {
    choices?: string[],
    pairs?: string[][],
    question: string,
    answer?: string,
    object?: string,
};

export type GameRoundT = {
    gameType: gameTypeT | null;
    visualVariant: visualVariantT | null,
    playSeconds: Number | null,
    params: GameRoundParamsT,
    retriableCount: number | null,
    image?: string | null,
}

export type GameT = {
    name: string | null,
    description: string | null,
    playVariant: playVariantT | null, 
    image: string | null,
    gameRounds: GameRoundT[] | null
}

export type TournamentT = {
    per_game_ticket_winners: number;
    ticket_winners: number;
    games: GameT[],
    start_date?: Date,
    name: string,
    prizes: Number[]
}


export const newParams = () : GameRoundParamsT => {
    return {
        choices: [],
        question: '',
        answer: '',
    }
}