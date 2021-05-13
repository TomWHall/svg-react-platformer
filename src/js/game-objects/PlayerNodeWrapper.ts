import config from '../config.js';
import { Direction, Group } from "../types.js";
import nb from '../NodeBuilder.js';
import Styles from '../Styles.js';

const height = config.playerHeight;

// Proportions of height
const coatWidthRatio = 0.25;
const legWidthRatio = 0.08;
const legHeightRatio = 0.42;
const footWidthRatio = 0.12;
const footHeightRatio = 0.04;
const armWidthRatio = 0.08;
const armHeightRatio = 0.38;
const headDiameterRatio = 0.2;
const hatDiameterRatio = headDiameterRatio;
const hatHeightRatio = 0.12;
const hatBrimDiameterRatio = 0.275;
const coatHeightRatio = 0.5;

const hatAboveHeadProportion = 0.6;
const hatBrimHeightProportion = 0.2;
const eyeDiameterProportion = 0.25;
const eyeXProportionFromSide = 0.25;
const eyeYProportionFromTop = 0.4;

const coatWidth = coatWidthRatio * height;
const legWidth = legWidthRatio * height;
const legHeight = legHeightRatio * height;
const footWidth = footWidthRatio * height;
const footHeight = footHeightRatio * height;
const armWidth = armWidthRatio * height;
const armHeight = armHeightRatio * height;
const hatHeight = hatHeightRatio * height;
const hatAboveHeadHeight = hatAboveHeadProportion * hatHeight;
const hatDiameter = hatDiameterRatio * height;
const hatBrimHeight = hatBrimHeightProportion * hatHeight;
const hatBrimDiameter = hatBrimDiameterRatio * height;
const headDiameter = headDiameterRatio * height;
const coatHeight = coatHeightRatio * height;

const halfHeight = height / 2;
const coatTopY = -halfHeight + hatAboveHeadHeight + headDiameter;
const headRadius = headDiameter / 2;
const legTopY = halfHeight - legHeight;
const armJointY = coatTopY + (armWidth / 2);
const halfArmWidth = armWidth / 2;

const eyeX = -headRadius + (eyeXProportionFromSide * headDiameter);
const eyeY = (coatTopY - headDiameter) + (eyeYProportionFromTop * headDiameter);
const eyeRadius = (eyeDiameterProportion * headDiameter) / 2;

const hatMain = nb.getRect(-hatDiameter / 2, -halfHeight, hatDiameter, hatHeight, Styles.brown);
const hatBrim = nb.getRect(-hatBrimDiameter / 2, -halfHeight + hatHeight - hatBrimHeight, hatBrimDiameter, hatBrimHeight, Styles.brown);

const head = nb.getCircle(0, -halfHeight + (hatAboveHeadProportion * hatHeight) + headRadius, headRadius, Styles.palePink);
const eye = nb.getCircle(eyeX, eyeY, eyeRadius, Styles.black);

function getCoat(): Group {
    const halfWidth = coatWidth / 2;
    const halfHeight = coatHeight / 2;

    const rectHeight = coatHeight - halfWidth;
    const rectY = halfHeight - rectHeight;
    const circleY = -halfHeight + halfWidth;

    return nb.getGroup([
        nb.getCircle(0, circleY, halfWidth, Styles.blue),
        nb.getRect(-halfWidth, rectY, coatWidth, rectHeight, Styles.blue)
    ], 0, coatTopY + (coatHeight / 2));
}

function getLeg(angle: number, direction: Direction): Group {
    return nb.getGroup([
        nb.getRect(-legWidth / 2, 0, legWidth, legHeight, Styles.purpleBlue),
        nb.getRect((direction === Direction.Left ? 1 : -1) * ((legWidth / 2) - footWidth), (legHeight - footHeight), footWidth, footHeight, Styles.brown)
    ], 0, legTopY, null, angle);
}

function getArm(angle: number): Group {
    return nb.getGroup([
        nb.getCircle(0, 0, halfArmWidth, Styles.darkBlue),
        nb.getCircle(0, armHeight - armWidth, halfArmWidth, Styles.palePink),
        nb.getRect(-armWidth / 2, 0, armWidth, armHeight - armWidth, Styles.darkBlue)
    ], 0, armJointY, null, angle);
}

const coat = getCoat();

export default class PlayerNodeWrapper {

    group: Group;
    armFront: Group;
    armBack: Group;
    legFront: Group;
    legBack: Group;
    width: number;
    height: number;

    constructor() {
        this.armBack = getArm(0);
        this.armFront = getArm(0);

        this.legBack = getLeg(0, Direction.Left);
        this.legFront = getLeg(0, Direction.Left);

        this.group = nb.getGroup([this.legBack, this.legFront, this.armBack, coat, head, eye, hatMain, hatBrim, this.armFront], 16, 64, 'player');

        this.width = coatWidth;
        this.height = height;
    }

    update(displayDirection: Direction, animationPhase: number): void {
        this.group.flipHorizontal = displayDirection === Direction.Right;

        const maxLimbsAngle = Math.PI * 0.25;
        const doubleAnimationPhase = animationPhase * 2;
        const angleRatio = (doubleAnimationPhase >= 1 ? 1 - (doubleAnimationPhase - 1) : doubleAnimationPhase);

        const legFrontAngle = -(maxLimbsAngle / 2) + (angleRatio * maxLimbsAngle);
        const legBackAngle = -legFrontAngle;

        this.legFront.angle = legFrontAngle;
        this.legBack.angle = legBackAngle;

        this.armFront.angle = -legFrontAngle;
        this.armBack.angle = legFrontAngle;
    }

}