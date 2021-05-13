import GameObject from "./GameObject.js";
import { GameObjectType, Node } from "../types.js";
import Game from "../Game.js";

export default class Background extends GameObject {

    constructor(game: Game, node: Node) {
        super(game, GameObjectType.Background);

        this.node = node;
    }

}