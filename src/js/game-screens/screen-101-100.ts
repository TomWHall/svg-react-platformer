import Logger from "../Logger.js";
import nb from '../NodeBuilder.js';
import Terrain from "../game-objects/Terrain.js";
import Game from "../Game.js";
import Styles from "../Styles.js";
import Background from "../game-objects/Background.js";
import { Direction, GameScreen, GameScreenFunc } from "../types.js";
import Steps from "../game-objects/Steps.js";

Logger.log('Screen 101-100 (The TODO room) initializing');

export default ((game: Game) => {

    const background = new Background(game, nb.getBackground(Styles.black));

    const walls = new Terrain(game, nb.getGroup(
        [
            nb.getBricks(0, 0, 1920, 32),
            nb.getBricks(0, 832, 1920, 864),
            nb.getBricks(1888, 32, 32, 832),
            nb.getBricks(0, 256, 32, 832),
            nb.getBricks(0, 256, 480, 32)
        ]
    ));

    const gameObjects = [
        background,
        walls,
        new Steps(game, 480, 256, 576, Direction.Left, 'dance-floor')
    ];

    return {
        name: 'The TODO room',
        gameObjects: gameObjects
    } as GameScreen;

}) as GameScreenFunc;