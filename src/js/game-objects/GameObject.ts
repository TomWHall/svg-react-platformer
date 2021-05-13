import Game from "../Game.js";
import { GameObjectType, Node } from "../types.js";

export default abstract class GameObject {

    game: Game;
    type: GameObjectType;

    x = 0;
    y = 0;
    node: Node;

    update(): void { }

    constructor(game: Game, type: GameObjectType) {
        this.game = game;
        this.type = type;
    }

}