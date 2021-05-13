import { FunctionComponent, ReactNode } from "react";
import Styles from "../Styles.js";

declare const React: typeof import("react");

function getBricks(): ReactNode {
    return (
        <pattern id="bricks" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="16" height="16" fill={Styles.grey} />
            <rect x="0" y="0" width="14" height="6" className={Styles.red} />
            <rect x="0" y="8" width="6" height="6" className={Styles.red} />
            <rect x="8" y="8" width="8" height="6" className={Styles.red} />
        </pattern>
    );
}

function getDanceFloor(): ReactNode {
    return (
        <pattern id="dance-floor" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="32" height="32" fill={Styles.black} />

            <rect x="0" y="0" width="32" height="2" className={Styles.white} />
            <rect x="0" y="30" width="32" height="2" className={Styles.white} />

            <rect x="0" y="4" width="8" height="8" className={Styles.white} />
            <rect x="16" y="4" width="8" height="8" className={Styles.white} />

            <rect x="8" y="12" width="8" height="8" className={Styles.white} />
            <rect x="24" y="12" width="8" height="8" className={Styles.white} />

            <rect x="0" y="20" width="8" height="8" className={Styles.white} />
            <rect x="16" y="20" width="8" height="8" className={Styles.white} />
        </pattern>
    );
}

function getCup(): ReactNode {
    return (
        <pattern id="cup" width="32" height="32" patternUnits="userSpaceOnUse">
            <svg width="32" height="32">                
                <rect x="14" y="0" width="4" height="32" className={Styles.yellow} />
                <circle cx="16" cy="-12" r="24" className={Styles.yellow} />
                <circle cx="16" cy="42" r="16" className={Styles.yellow} />
            </svg>
        </pattern>
    );
}

const Patterns: FunctionComponent = () => {
    return <>
        {getBricks()}
        {getDanceFloor()}
        {getCup()}
    </>;
}

export default Patterns;