import { GameT, gameTypeT, gameTypes, playVariantT, playVariants, visualVariantT } from './structure';
import { dump, load } from 'js-yaml';
import yaml from '../assets/seed_games.yml?raw';

const findGameTypeByName = (name: string) : gameTypeT => gameTypes.find((value) => value.name === name)
const findPlayVariantByName = (name: string) : playVariantT => playVariants.find((value) => value.name === name.replace(':', ''))
const findVisualVariantByName = (gameType: gameTypeT, name: string) : visualVariantT => gameType.visual_variants.find((value) => value.name === name);
export const dumpGame = (game: GameT) => {
    dump(game);
}

export const loadGames = () : GameT[] => {
    let loadedGames = load(yaml).development;
    console.log(loadedGames);
    let games: GameT[] = [];
    loadedGames.games.forEach((element) => {
        let game: GameT = {
            name: element.name,
            description: element.description,
            gameType: findGameTypeByName(element.game_type),
            image: element.image,
            playVariant: findPlayVariantByName(element.play_variant),
            gameRounds: []
        };

        element.game_rounds.forEach((gameRound) => {
            game.gameRounds?.push({
                params: {
                    choices: gameRound.params.choices,
                    pairs: gameRound.params.pairs,
                    question: gameRound.params.question,
                    answer: gameRound.params.answer,
                    object: gameRound.params.object,
                    image: gameRound.params.image,
                },
                retriableCount: gameRound.retriable_count,
                visualVariant: findVisualVariantByName(game.gameType, gameRound.visual_variant),
                playSeconds: gameRound.play_seconds
            });
        });

        console.log(game);
        games.push(game);
    });
    
    return games;
};