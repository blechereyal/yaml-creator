import { GameT, gameTypeT, gameTypes, playVariantT, playVariants, visualVariantT } from './structure';
import { dump, load } from 'js-yaml';

const findGameTypeByName = (name: string) : gameTypeT => gameTypes.find((value) => value.name === name)!
const findPlayVariantByName = (name: string) : playVariantT => playVariants.find((value) => value.name === name.replace(':', ''))!
const findVisualVariantByName = (gameType: gameTypeT, name: string) : visualVariantT => gameType.visual_variants.find((value) => value.name === name)!;
export const dumpGames = (games: GameT[]) => {
    return dump(games.map((game) => {
        return {
            game_type: game.gameType?.name,
            name: game.name,
            description: game.description,
            play_variant: game.playVariant?.name,
            image: game.image,
            game_rounds: game.gameRounds?.map((gameRound) => {
                return {
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
    }));
}

export const loadGames = (yaml: string) : GameT[] => {
    let loadedGames: any = load(yaml);
    console.log(loadedGames);
    let games: GameT[] = [];
    loadedGames.forEach((element: any) => {
        let game: GameT = {
            name: element.name,
            description: element.description,
            gameType: findGameTypeByName(element.game_type),
            image: element.image,
            playVariant: findPlayVariantByName(element.play_variant),
            gameRounds: []
        };

        element.game_rounds.forEach((gameRound: any) => {
            game.gameRounds?.push({
                params: {
                    choices: gameRound.params.choices,
                    pairs: gameRound.params.pairs,
                    question: gameRound.params.question,
                    answer: gameRound.params.answer,
                    object: gameRound.params.object,
                },
                image: gameRound.image,
                retriableCount: gameRound.retriable_count,
                visualVariant: findVisualVariantByName(game.gameType!, gameRound.visual_variant),
                playSeconds: gameRound.play_seconds
            });
        });

        console.log(element);
        games.push(game);
    });
    
    return games;
};