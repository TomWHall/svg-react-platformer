import GameObject from "./GameObject.js";
import Game from "../Game.js";
import { GameObjectType } from "../types.js";

export default abstract class HorizontalSentry extends GameObject {

    private x1: number;
    private x2: number;
    private speed: number;
    private direction: boolean;

    previousX: number;

    constructor(game: Game, type: GameObjectType, x1: number, x2: number, y: number, speed: number, direction: boolean) {
        super(game, type);

        this.x1 = x1;
        this.x2 = x2;
        this.x = direction ? x1 : x2;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
    }

    update(): void {
        let targetX = this.direction ? this.x2 : this.x1;

        if (this.x === targetX) {
            // Turn around
            this.direction = !this.direction;
            targetX = this.direction ? this.x2 : this.x1;
        }

        const diffX = targetX - this.x;
        const distance = Math.abs(diffX);
        const distanceIncrement = Math.round(Math.min(distance, this.speed * this.game.tickTimeFactor) * (this.direction ? 1 : -1));

        this.previousX = this.x;
        this.x += distanceIncrement;
    }
}