import GameObject from "./GameObject.js";
import { GameObjectType } from "../types.js";
import Game from "../Game.js";

export default abstract class VerticalSentry extends GameObject {

    private y1: number;
    private y2: number;
    private speed: number;
    private direction: boolean;

    previousY: number;

    constructor(game: Game, type: GameObjectType, y1: number, y2: number, x: number, speed: number, direction: boolean) {
        super(game, type);

        this.y1 = y1;
        this.y2 = y2;
        this.y = direction ? y1 : y2;
        this.x = x;
        this.speed = speed;
        this.direction = direction;
    }

    update(): void {
        let targetY = this.direction ? this.y2 : this.y1;

        if (this.y === targetY) {
            // Turn around
            this.direction = !this.direction;
            targetY = this.direction ? this.y2 : this.y1;
        }

        const diffY = targetY - this.y;
        const distance = Math.abs(diffY);
        const distanceIncrement = Math.round(Math.min(distance, this.speed * this.game.tickTimeFactor) * (this.direction ? 1 : -1));

        this.previousY = this.y;
        this.y += distanceIncrement;
    }
}