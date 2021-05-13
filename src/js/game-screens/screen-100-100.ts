import Logger from "../Logger.js";
import nb from '../NodeBuilder.js';
import Terrain from "../game-objects/Terrain.js";
import Game from "../Game.js";
import Terrorvator from "../game-objects/Terrorvator.js";
import Vertivator from "../game-objects/Vertivator.js";
import Horivator from "../game-objects/Horivator.js";
import Styles from "../Styles.js";
import Background from "../game-objects/Background.js";
import { GameScreen, GameScreenFunc } from "../types.js";
import Dancer from "../game-objects/Dancer.js";
import Collectable from "../game-objects/Collectable.js";

Logger.log('Screen 100-100 (The Ballroom) initializing');

export default ((game: Game) => {

    const background = new Background(game, nb.getBackground(Styles.black));

    const stepUpper = nb.getRect(896, 736, 64, 32, 'dance-floor', true);
    const stepLower = nb.getRect(960, 544, 64, 32, 'dance-floor', true);

    const walls = new Terrain(game, nb.getGroup(
        [
            nb.getBricks(0, 0, 1920, 32),
            nb.getBricks(0, 832, 1920, 864),
            nb.getBricks(0, 32, 32, 832),
            nb.getBricks(1888, 256, 32, 832),
            nb.getBricks(1440, 256, 480, 32),

            stepUpper,
            stepLower
        ]
    ));

    const gameObjects = [
        background,
        new Terrorvator(game, 480, 1440, 448, 2, false),
        new Terrorvator(game, 480, 1440, 640, 2, true),
        walls,
        new Vertivator(game, 256, 416, 480, 1, true),
        new Horivator(game, 608, 1312, 288, 2, true),
        new Collectable(game, 1664, 224, 'cup'),
        new Dancer(game, 160, 896, 768, 2, true),
        new Dancer(game, 1024, 1760, 768, 2, true)
    ];

    return {
        name: 'The Ballroom',
        gameObjects: gameObjects
    } as GameScreen;

}) as GameScreenFunc;