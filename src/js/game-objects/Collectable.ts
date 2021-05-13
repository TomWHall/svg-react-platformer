import Game from "../Game.js";
import { GameObjectType } from "../types.js";
import GameObject from "./GameObject.js";
import nb from '../NodeBuilder.js';

export default class Collectable extends GameObject {

    collected = false;

    constructor(game: Game, x: number, y: number, className: string) {
        super(game, GameObjectType.Collectable);

        this.x = x;
        this.y = y;

        this.node = nb.getRect(0, 0, 32, 32, `collectable ${className}`);
    }

}