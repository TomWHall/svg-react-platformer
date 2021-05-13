import { GameObjectType } from "../types.js";
import config from '../config.js';
import HorizontalSentry from "./HorizontalSentry.js";
import nb from '../NodeBuilder.js';
import Game from "../Game.js";

const holeWidth = 256;
const className = 'dance-floor';

export default class Terrorvator extends HorizontalSentry {

    constructor(game: Game, x1: number, x2: number, y: number, speed: number, direction: boolean) {
        super(game, GameObjectType.Solid, x1, x2, y, speed, direction);

        const rectWidth = config.viewportWidth;
        const rectHeight = 32;

        this.node = nb.getGroup([
            nb.getRect(0, 0, rectWidth, rectHeight, className, true),
            nb.getRect(rectWidth + holeWidth, 0, config.viewportWidth, rectHeight, className, true)
        ], -(rectWidth + (holeWidth / 2)), 0);
    }

    update(): void {
        super.update();

        const distanceIncrement = this.x - this.previousX;
        const player = this.game.player;

        if (player.isOnSolid([this])) {
            player.adjustmentSpeedX = distanceIncrement;
        }
    }

}