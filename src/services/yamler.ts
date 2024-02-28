import { GameT, TournamentT, gameTypeT, gameTypes, playVariantT, playVariants, visualVariantT } from './structure';
import { dump, load } from 'js-yaml';

const findGameTypeByName = (name: string) : gameTypeT => gameTypes.find((value) => value.name === name)!
const findPlayVariantByName = (name: string) : playVariantT => playVariants.find((value) => value.name === name.replace(':', ''))!
const findVisualVariantByName = (gameType: gameTypeT, name: string) : visualVariantT => gameType.visual_variants.find((value) => value.name === name)!;
export const dumpTournaments = (tournaments: TournamentT[]) => {
    return dump(tournaments.map((tournament) => {
        return {
            name: tournament.name,
            games: tournament.games.map((game: GameT) => {
                return {
                    name: game.name,
                    description: game.description,
                    play_variant: game.playVariant?.name,
                    image: game.image,
                    game_rounds: game.gameRounds?.map((gameRound) => {
                        return {
                            game_type: gameRound.gameType?.name,
                            visual_variant: gameRound.visualVariant?.name,
                            play_seconds: Number(gameRound.playSeconds),
                            image: gameRound.image,
                            params: {
                                question: gameRound.params.question,
                                choices: gameRound.params.choices,
                                pairs: gameRound.params.pairs,
                                answer: gameRound.params.answer,
                                object: gameRound.params.object
                            }
                        }
                    }),
                }
            })
            
        }
    }));
}

export const loadTournaments = (yaml: string) : TournamentT[] => {
    let loadedtournaments: any = load(yaml);
    let tournaments: TournamentT[] = [];
    loadedtournaments.forEach((tournamentExt: any) => {
        let tournamentNew: TournamentT = { games: [], name: tournamentExt.name } 
        let games = tournamentExt.games.map((gameExt: any) => {
            let game: GameT = {
                name: gameExt.name,
                description: gameExt.description,
                image: gameExt.image,
                playVariant: findPlayVariantByName(gameExt.play_variant),
                gameRounds: []
            };
    
            gameExt.game_rounds.forEach((gameRound: any) => {
                let gameType = findGameTypeByName(gameRound.game_type);
                game.gameRounds?.push({
                    gameType: gameType,
                    params: {
                        choices: gameRound.params.choices,
                        pairs: gameRound.params.pairs,
                        question: gameRound.params.question,
                        answer: gameRound.params.answer,
                        object: gameRound.params.object,
                    },
                    image: gameRound.image,
                    retriableCount: gameRound.retriable_count,
                    visualVariant: findVisualVariantByName(gameType, gameRound.visual_variant),
                    playSeconds: gameRound.play_seconds
                });
            });
            return game;
        })

        tournamentNew.games = games;
        tournaments.push(tournamentNew);
    });
    
    return tournaments;
};