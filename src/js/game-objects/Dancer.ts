import { GameObjectType, Direction, Group } from "../types.js";
import HorizontalSentry from "./HorizontalSentry.js";
import nb from '../NodeBuilder.js';
import Game from "../Game.js";
import Styles from "../Styles.js";

function getLeg(angle: number, direction: Direction): Group {
    const group = nb.getGroup([
        nb.getRect(-3, 0, 6, 34, Styles.white),
        nb.getRect(-9, 30, 12, 4, Styles.brightRed)
    ], 0, 0, null, angle);

    if (direction === Direction.Right) {
        group.flipHorizontal = true;
    }

    group.ignoreCollision = true;

    return group;
}

function getEye(): Group {
    const group = nb.getGroup([
        nb.getCircle(0, 0, 4, Styles.brightRed),
        nb.getCircle(0, 0, 2, Styles.black)
    ], 0, -6);

    group.ignoreCollision = true;

    return group;
}

export default class Dancer extends HorizontalSentry {

    private legLeft: Group;
    private legRight: Group;

    private eyeLeft: Group;
    private eyeRight: Group;

    constructor(game: Game, x1: number, x2: number, y: number, speed: number, direction: boolean) {
        super(game, GameObjectType.Fatal, x1, x2, y, speed, direction);

        const body = nb.getCircle(0, 0, 24, Styles.eggYellow);

        this.legLeft = getLeg(Math.PI / 8, Direction.Left);
        this.legRight = getLeg(-Math.PI / 8, Direction.Right);

        const eyeSocketLeft = nb.getCircle(-11, -6, 8, Styles.black);
        const eyeSocketRight = nb.getCircle(11, -6, 8, Styles.black);

        this.eyeLeft = getEye();
        this.eyeRight = getEye();

        const mouth = nb.getCapsule(0, 10, 8, 24, Styles.black, Math.PI / 2);

        const hatTop = nb.getRect(-12, -36, 24, 16, Styles.green);
        const hatBrim = nb.getRect(-18, -20, 36, 2, Styles.green);

        this.node = nb.getGroup([
            this.legLeft,
            this.legRight,
            body,
            hatTop,
            hatBrim,
            eyeSocketLeft,
            eyeSocketRight,
            this.eyeLeft,
            this.eyeRight,
            mouth
        ], 24, 32);
    }

    update(): void {
        super.update();

        const legAngleQuotient = this.getLegAngleQuotient();
        const eyePositionQuotient = this.getEyePositionQuotient();

        const legBaseAngle = Math.PI / 8;

        this.legLeft.angle = legBaseAngle + (legAngleQuotient * legBaseAngle);
        this.legRight.angle = -(legBaseAngle * 2) + (legAngleQuotient * legBaseAngle);

        this.eyeLeft.x = -11 + Math.round(eyePositionQuotient * 5);
        this.eyeRight.x = 11 + Math.round(eyePositionQuotient * 5);
    }

    private getLegAngleQuotient(): number {
        const zeroToTwo = (((this.x % 32) + 1) / 32) * 2;
        return zeroToTwo >= 1 ? 1 - (zeroToTwo - 1) : zeroToTwo;
    }

    private getEyePositionQuotient(): number {
        const zeroToTwo = (((this.x % 128) + 1) / 128) * 2;
        return (zeroToTwo >= 1 ? 1 - (zeroToTwo - 1) : zeroToTwo) - 0.5;
    }

}