import { GameObjectType } from "../types.js";
import VerticalSentry from "./VerticalSentry.js";
import nb from '../NodeBuilder.js';
import Game from "../Game.js";

export default class Vertivator extends VerticalSentry {

    constructor(game: Game, y1: number, y2: number, x: number, speed: number, direction: boolean) {
        super(game, GameObjectType.Solid, y1, y2, x, speed, direction);

        this.node = nb.getRect(0, 0, 128, 32, 'dance-floor');
    }

    update(): void { 
        const player = this.game.player;
        const playerWasOn = player.isOnSolid([this]);

        super.update();

        const distanceIncrement = this.y - this.previousY;

        if (player.isInMaterialType(GameObjectType.Solid, [this])) {
            player.y += distanceIncrement;
        } else if (playerWasOn) {
            player.y += distanceIncrement;
        }
    }

}