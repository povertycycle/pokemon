import { GameTab } from "@/interfaces/types";

/**
 * Pokemon SVG Icon
 */
const PokemonIcon: React.FC = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 50 50">
            <path
                fill="#313131"
                d="M15 14h2l1-3h1V8h5V6h3V3h3V0h2v3h2V0h3v3h2v5h6v3h2v3h3v10h-3v2h-2v6h2v7h-2v3h-3v3h-5v2h-3v3H24v-3h-2v-2H9v-3H4v-3H1v-6H0v-4h1v-5h3v-7h3v-3h2v3h6v-3Z"
            />
            <path
                fill="#42733A"
                d="M15 33H4v-4l3-5 12-7 5-6 3-3h9c1 2 6 6 6 3h3a19 19 0 0 1 0 3h2v3l-5 9v6h3v7l-11 3h-4L19 26c-2 0-5 7-4 7Z"
            />
            <path
                fill="#639C63"
                d="M39 29h3v3h-3v-3ZM4 26l3 1v2H4v-3Zm0 3Zm0 0Zm11-8v-3h2l1 3h-3v2h-3v-2h3Zm0 2Zm4 1v-3h3v3h2v2h-2v-2h-3Zm3-3Zm2 3ZM4 36h3v3H4v-3Zm41 3h-6v3h-2l-3-6h-4v6h4v3l-4 2h-3l-3-2v-3H10v-3h12v-3h2v-3h3v-1h3v-3h2v3h7l1 4h5v3ZM30 29Zm-15 0h3v3h-3v-3Z"
            />
            <path fill="#BDBDBD" d="M39 42v-3h3v3h-3Z" />
            <path
                fill="#6BAD52"
                d="M19 17v-6h5V8h3v3h3v6h2V8h-2V6l2-1v1l2 2V5h2l1 3h-3v6h3v3h2v4h-9v-4h-3v1h-3v-4h-2l-1 3h-2Zm5-6v3h3v-3h-3Zm21 3Zm0 0v4h-3v-1h-3v-3h-2V8h2v3h3v3h3Zm-6 3Zm-2-9Z"
            />
            <path fill="#E64A42" d="M18 39v-2l1-1v3h-1ZM4 32H2v-3h2v3Z" />
            <path
                fill="#FFF"
                d="M24 33Zm0 3h-2v3h-3v-6h5v3Zm0 9h3v2h-3v-2Zm6 2v-2h2v2h-2Z"
            />
            <path
                fill="#528C52"
                d="M22 21Zm0-4h2v1h3v6h-3v-3h-2v-4Zm-4 1Zm0-4h1v4h-1v-4Zm21 12-2 1v2h-4l-1-5-2-1v-2h9v5Zm8-3-2 1v2h-3v-8h3v-1h2v6Z"
            />
            <path
                fill="#7BCE7B"
                d="M18 33h-3v-1h3v-3h-3v3h-2l-1 1h3v6H7v-3H4v-3H1v-1h6v-6H4v-2h3v-7h2v1h6v3h-3v5h7v-2h3v2h8v3h-3v4h-3v-1h-7l1 1ZM34 5v3h-2V6l2-1Zm-2 0h-2V3h2v2Zm4 0h-2V3h2v2Z"
            />
            <path
                fill="#525252"
                d="M24 33h-2v-1h2v1Zm-5-1v1h-1v-1h1Zm-1 0Zm12-3v-3h-6v-2h9l-1 5h-2Zm2 0Zm-10-8h2v2l-2 1v-3Zm-4-3h3l1 3h-4v-3Zm-3-1h2v1h-2v-1Zm12 15v-3h3v3h-3Zm12-3v3h-7v-3h7Zm3-3v3h-3v-3h3Zm-8 10h3v8h-3v-8Zm0 0h-1l-1-2 1-1 1 1v2Zm-10 3h3v3h-3v-3Zm0 3Zm9 5-1-2 2-1v3h-1Z"
            />
        </svg>
    );
};

/**
 * Items SVG Icon
 */
const ItemsIcon: React.FC = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 75 75">
            <path
                fill="#303030"
                d="m26 71-4-3h-3c1-7-3-7-3-7V43l3-4v-7h-3v-3h-4V17h4c0 3 0 0 0 0v-7h6V7h4V3h10V0h10v3h3v4h3v3h4v12h-4v10l4 3v7l3 1v3l3 3 1 12-4 3v4h-3v3h-7v4H32v-4h-6Z"
            />
            <path
                fill="#507868"
                d="M32 57h-6l-7-4V43h-3v-4h3v-3h3l10 17v4Zm24-22h-4v-3h4v3Zm-4-3Zm0 0ZM36 0v3l16 18h4v4h-4L32 3V0h4ZM19 17V7h3v10h-3Z"
            />
            <path
                fill="#80A898"
                d="M52 32v7h-3l-3-7v-3h-7v6l-3 1v13h-4v4h-3V42l4-10h3v-7h3v-3h10v-8h3v11h-3v7h3Zm-6 0Z"
            />
            <path
                fill="#8060A8"
                d="M29 71V57h3v-4h3l1-4c1 0 3-9 3-14v-3h3v10h7v4h7v4l3-1v15h-3v4h-4v3H29Zm27-3ZM36 49ZM26 22v7h-3l-1-1v-6h4Zm-10 3h3v4h-3v-4Z"
            />
            <path
                fill="#583880"
                d="M29 71h3v4h-3v-4Zm-3 0h-4v-3h4v3ZM16 61h3v3h-3v-3Zm3 3Zm-3-14 3-1v4h-3v-3Zm3-18v-7h3v4h4v3h-7Zm7-3Zm3-12v12h-3V17h3Zm17 15h-7v-3h7v3Zm3 0v7h3v4l-6-1V32h3ZM36 49V36h3v13h-3Zm-4 4v-4h4v4h-4Zm24-7h-4v-3h4v3Zm6 3-6 1v-4h6v3Zm-3 12h3v3h-3v-3Z"
            />
            <path
                fill="#A0C8B8"
                d="M33 43h-4v10h-7v-4h-3v-6c2 0 7-13 7-14h3v-8h3l1-4h6v-4h7V7h3v3h3v4h-3v8H39v3h-3v-3l-3 10v11Z"
            />
            <path
                fill="#A080C8"
                d="M42 50h4v3h3v4h3v4l-3 1v2h-6l-1-3h-3v-8h3v-3Zm-20 3h4v4h3v4h3v3h7v3l-10 1v-4h-3v-3h-4v-8Zm24-21Zm0 11h-4V32h4v11Zm6 0v3l-3 1v-4h3Z"
            />
            <path
                fill="#E0F8F8"
                d="M46 3v4L26 17h-4v-6h10V3h14ZM29 22l-1-4h5v4h3v3h-3v-3h-4Zm0 17v-3h-7v-4h11v7h-4Zm3-7Z"
            />
            <path
                fill="#C0E8D8"
                d="M36 25v7h-3v-7h3ZM46 7v7h-7v4l-10 1-1-5h4v-4h7V7h7Z"
            />
            <path
                fill="#F8F8F8"
                d="M29 14v3h-3v-3h-7v-3h7V7h6V3h7v4h-6v4h-7v3h3Zm0 32h-7v-3h-3v-4h3v-3l7-1v11Z"
            />
            <path
                fill="#E0C0F8"
                d="M16 17h10v5h-7v3h-3v-8Zm13 51h-7v-4h-3V53h3v8h4v3h3v4Zm13-15h4v4h-4v-4Z"
            />
        </svg>
    );
};

/**
 * Berries SVG Icon
 */
const BerriesIcon: React.FC = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 50 50">
            <path
                fill="#303030"
                d="M39 6v5h4v2h2v4h3v5h2v14h-2v5h-3v3l-2 1v2h-6v3H18v-3h-7v-3H7v-3H5v-2H2v-6H0V19h2v-6h3v-2h3L7 8h6V6h8V2h6V0h7v2h3v3l2 1Z"
            />
            <path
                fill="#6868B8"
                d="M18 11V8h3v3h-3Zm5-9h3v4h-3V2Zm11 11v-2h3v2h-3ZM2 33V19h3l2-6h3l29 9h4l5 8v5l-3 1v5h-5l-1 3h-5v3H21l-3-2-7-1v-3H7v-2H5v-6H2Z"
            />
            <path
                fill="#505080"
                d="M18 45h3v2h-3v-2Zm14-1h-3v-3h3v3Zm7 0 1-3h3v3h-4Zm-26-8h3v3h-3v-3Zm5-6h3v3h-3v-3Zm14-8h2v2h-2v-2Zm5-3H27v-2h10v2Zm-13-2-1-4h3l1 4h-3Zm-1-6V6h3l1 2h2v3h5v2h-7v-2h-4Zm16 6h-2v-4h2v4Zm-2-4Z"
            />
            <path
                fill="#50A0F0"
                d="M13 8h5v3a445 445 0 0 1-5 2H7v4l4 5c0 2 0 2 2 2l3-7h11v2h10c2 0 2 0 2-2h4l1 2h1v3h3v6h-3v2h-2v3h-4c-2 0-2 0-2 2v1h-8v3H16v-3l-8-1c-1-2-1-2-3-2v-3H2v-2h3v-3H2v-3h3v-9h2v-2h6V8Zm8 22h-3v3h3v-3Zm2 0h4v-2h-4v2Zm20-6v-2h-4v3l3-1h1Zm-11-2v2h2v-2h-2Z"
            />
            <path fill="#E0E8F8" d="M27 8V2h7v3h3v3H27Z" />
            <path
                fill="#5078C8"
                d="m39 36-2-1v-2h2v3Zm4-3v-3h2v3h-2Zm2-3v-2h3v2h-3Zm0-11h-1l-1-2h2v2Zm-2-2a29 29 0 0 1-4 0v-4h4v4Zm-4-4Zm0 0Zm-2 6v-2a14 14 0 0 1 2 0c0 2 0 2-2 2Zm-8 20v-3h3v3h-3Zm-16-3v3h-2v-3h2Zm-8-3h2v2l-2 1v-3Z"
            />
            <path
                fill="#58D0F8"
                d="M11 13h2v-2h8v2h2v9h-2v2h-8v-2H7l1-5h3v-4Zm5 6v3h2v-3h-2Z"
            />
            <path
                fill="#B8C0F8"
                d="M37 13v4h-8v-4h8Zm-3-2h-5V8h5v3Zm5 0v2h-2v-2h2Zm-12 2h-4v-2h4v2Zm-4-5v3h-2V8h2Zm6 0h-2V6h2v2Z"
            />
            <path
                fill="#98A0B8"
                d="M29 13v4h-2v-4h2Zm5-5h3v3h-3V8Zm-11 3v2h-2v-2h2Zm-2-5h2v2h-2V6Z"
            />
        </svg>
    );
};

/**
 * Berries SVG Icon
 */
const MovesIcon: React.FC = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 100 105">
            <path
                fill="#202020"
                d="M55 15v-5h10V5h20v5h5v10h5v15h-5v10h-5v5h-5v5h-5v5H65v5H45v5H35v15h5v5h15v-5h10v-5h5v-5h5v-5h5v-5h5v-5h5v5h5v20h-5v5h-5v5H75v5H65v5H35v-5H25v-5h-5v-5h-5V65h5v-5h5v-5h10v-5h20v-5h10V35h5V25h-5v5h-5v5h-5v5H45v5H15v-5h-5v-5H5V25H0V5h5V0h15v20h5v10h5v5h5v-5h5v-5h5v-5h5v-5h5Zm40 55h5v10h-5V70Z"
            />
            <path
                fill="#FFA452"
                d="M20 30h-5v5h-5V25H5v-5h5v-5h5v5h5v10Zm75 45h-5v-5h5v5Zm-5-5h-5v-5h5v5ZM55 95v-5h10v-5h10v10H55Z"
            />
            <path
                fill="#BD3131"
                d="M35 85v5h5v5h10v5H35v-5H25v-5h-5V80h5v5h10Zm40-50v5h10v5h-5v5h-5v5H60v-5h5v-5h5V35h5ZM45 25h5v-5h5v-5h10v10h-5v5h-5v5H45v5H35v-5h5v-5h5v-5Z"
            />
            <path
                fill="#DE734A"
                d="M50 100v-5h15v5H50ZM15 15h-5v5H5V5h10v10Z"
            />
            <path
                fill="#FF8383"
                d="M85 20H70v-5h-5v-5h20v10ZM30 70v-5h-5v-5h10v-5h10v10H35v5h-5Z"
            />
            <path
                fill="#EE5252"
                d="M45 60v-5h10v-5h5v5h5v5H45ZM30 85h-5v-5h-5V65h10v20Zm60-50h-5v5H75V20h15v15Z"
            />
            <path
                fill="#FFE652"
                d="M75 90v-5h-5v-5h5v-5h5v-5h10v5h5v5h-5v5h-5v5H75ZM25 30v5h5v5H15V30h10Z"
            />
        </svg>
    );
};

/**
 * Evolutions SVG Icon
 */
const EvolutionsIcon: React.FC = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 110 110">
            <path
                fill="#202020"
                d="M0 75V65h5v-5h5v-5h5V40h5V30h-5V10h10v5h10v5h5v-5h10v-5h5V5h5V0h10v5h5v10h5v5h25v5h5v10h-5v5h-5v5h-5v15h5v5h5v5h5v10h-5v5H80v15h-5v5h-5v5H60v-5h-5v-5H45v5h-5v5H30v-5h-5V90h5v-5h-5v-5H5v-5H0Z"
            />
            <path
                fill="#834A29"
                d="M25 25h5v-5h15v-5h25v10h25v20h-5v35H80v5h-5v15h-5v-5H40v-5h-5V75H20v-5h-5V55h10V25Zm70 35v10h-5V60h5Z"
            />
            <path
                fill="#C56229"
                d="M55 95h5v5h-5v-5Zm-10 0v5h-5V80H25V60h-5V40h15l5-5 5-5 15-15h10v5h10v10l5 5h5v-5h15v5h-5v5h-5v-5H85v35h15v10h-5v-5H70v15h-5V80H55v5l-10 5h-5v5h5Zm5-25v5h10v-5h5v-5h5V55L50 70Z"
            />
            <path
                fill="#E67339"
                d="M50 85v5h-5v-5h5Zm5-35h5v10h5v5h-5v5H40v-5h10v-5h-5v-5h10v-5ZM35 70H25V20h5v5h10v-5h10v-5h10v5h10v5l-20 5h-5v5H30v30h5v-5h5v5h-5v5Zm-15 0v5H10v-5h10Zm50-10h-5v-5h5v5Zm-35 45V90h5v15h-5Zm30-5v5h-5v-5h5Zm35-20v-5h5v5h-5Zm-10-5v-5h10v5H90Zm-5-5v5h-5v-5h-5V55h-5L60 40V30l20 10v5h10v5h-5v5h5v5H80v10h5Zm0-30v-5h5v5h-5ZM70 15h-5v-5h5v5Zm25 10v5h-5v-5h5ZM55 80h5v10h-5V80Z"
            />
            <path fill="#DA9160" d="M75 95h-5v-5h5v5Zm-10 0h5v5h-5v-5Z" />
            <path
                fill="#F6834A"
                d="M75 30h10v10h-5l-5-5v-5Zm5 40v-5h5v-5h5v10H80ZM70 80v-5h5v5h-5Zm-15 5v5h-5v-5h5Zm-10 0h-5v-5h5v5ZM35 75v-5h5v5h-5Zm-5-10v5h-5v-5h5ZM20 55V45h5v10h-5Z"
            />
            <path
                fill="#FFAC73"
                d="M50 25h25v5h-5v5h10v5h-5v5h-5v10h-5v5h-5V50h-5v5H45v5h5v5H40V50l10-10h15v-5h-5v-5H50v-5Zm40 55v-5h5v5h-5Zm-20 20v5h-5v-5h5Zm-5-5v5h-5v-5h5Zm-35-5h5v10h-5V90Zm0-5v-5h5v-5h5v10H30Zm-5-30h5v5h-5v-5Zm-5 15v-5h5v5h-5Zm85-45v5H95v-5h10ZM25 45v-5h5v-5h5v-5h5v10h-5v5H25Zm-5-20v-5h5v5h-5Zm40-10v-5h5v5h-5ZM10 65h5v5h-5v-5Zm0 5v5H5v-5h5Zm75-30v5h-5v-5h5Zm-5 5v5h-5v-5h5Z"
            />
            <path
                fill="#FDD8AF"
                d="M50 45h5v5h-5v-5Zm0 5v5h-5v-5h5Zm-5-10h5v5h-5v-5Zm-5 10v-5h5v5h-5Z"
            />
            <path
                fill="#FFEECD"
                d="M85 40h5v5h-5v-5Zm-40 0v-5h15v5H45Zm-5 5v-5h5v5h-5Zm0 15h-5V45h5v15Zm65 15h-5v-5h5v5Zm-95-5H5v-5h5v5Zm30-45v5h-5v5h-5v5h-5V30h5v-5h10Zm-15-5h-5v-5h5v5Zm-5 5h5v5h-5v-5Zm5 20h-5v-5h5v5Zm20-20v-5h15v5H45Zm30-5v5h-5v-5h5Zm-5 10h-5v-5h5v5ZM15 60v5h-5v-5h5Zm80 10v-5h5v5h-5ZM20 60h5v5h-5v-5Zm10 20h-5v-5h5v5Zm0 20h5v5h-5v-5Zm30-90V5h10v5H60Zm0 5h-5v-5h5v5Z"
            />
        </svg>
    );
};

/**
 * Machines SVG Icon
 */
const MachinesIcon: React.FC = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path
                fill="#202020"
                d="M0 75V45h5V35h5V25h5v-5h5v-5h5v-5h10V5h10V0h30v5h10v5h5v5h5v10h5v30h-5v10h-5v10h-5v5h-5v5h-5v5H65v5H55v5H25v-5H15v-5h-5v-5H5V75H0Z"
            />
            <path
                fill="#62627B"
                d="m15 85 75-35h5v5h-5v10h-5v10h-5v5h-5v5H65v5H55v5H25v-5H15v-5Z"
            />
            <path
                fill="#7B7B94"
                d="M95 39v11h-5v10h-5v10h-5v5h-5v5h-5v5H60v5H50v5H30v-5H20v-5H10v-5l80-41h5Z"
            />
            <path
                fill="#d5b442"
                d="M64 49h26v6h-5v10h-5v5h-5l-10 1-5-11v-5h4v-6Zm-33-3H10V35h5V25h5l11 9v12Z"
            />
            <path
                fill="#debd5a"
                d="M70 75 50 65V55h5v-5h6l-1 5v5h5v5h5v5h5v5h-5ZM35 30l10 5v5h-5v5h-8l-2 6H9l1-6h20V35h-5v-5h-5V20h5l10 10Zm29 14h26v6H64v-6Z"
            />
            <path
                fill="#dec573"
                d="M89 34h6v6h-6v-6ZM5 45h5v5h16v6H5V45Zm35-30 1 20h-6v-5h-5v-5h-5V15h15Zm50 24v6H64v-6h26ZM65 65v5h-5v-5h5Zm5 5v5l-6 1 1-6h5ZM60 60h-5v-5h5v5Zm-5 5h-5v-5h5v5Z"
            />
            <path
                fill="#eedeac"
                d="M20 55h20v5h10v5H40v5L5 71V60l15-5Zm40-25h31v5l-21 5H55v-5H40V25l-1-15h7l14 20Z"
            />
            <path
                fill="#f6eede"
                d="m70 5 5 5h10v11l-5 10H65v4h-5v-5h-5v5H45v-5h10L65 5h5ZM55 75l1 10h-6l-5 5h-5L15 80h-5v-5H5v-5h15v-5h5v-5h5v5h5v-5h10v5h5l5 10ZM30 60v-5h-5l5-5 5-1v11h-5Z"
            />
            <path
                fill="#eee6c5"
                d="M56 5v20H45V5h11ZM30 50v-8l5 1v7h-5Zm20 35v5h-5v-5h5Zm5-10 6-1-1 6v5h-5V75Zm1 0h-6V65h5l1 10ZM30 85v5h-5v-5h5Zm-15-5h5v5h-5v-5Zm5-10h-5v-5h5v5Zm0-5v-5h5v5h-5Zm71-34H70v4h-5v-5h5v-5h10v-5h5l5-1v6l1 6Z"
            />
            <path
                fill="#e6d594"
                d="M70 80H60v-5h-5V65h5v5h5v5h5v5ZM5 55h15v5H5v-5Zm35-45v15h-5V10h5Zm0 20v-5h5v5h-5Zm30 5h20v5H70v-5Zm-5 20h-5V35h5v20Zm-40 0v-5h5v5h-5Zm10-10h-5v-5h5v5Zm0-5v-5h5v5h-5Zm5 30v-5h10v5H40Zm50-50h-5v-5h5v5Zm-5-5h-5v-5h5v5ZM75 5v5h-5V5h5ZM50 5v5h-5V5h5Zm40 20h5v10h-5V25Z"
            />
            <path
                fill="#FFF"
                d="M20 85v-5h-5v-5h5v-5h5v-5h10v5h10v15h-5v5H30v-5H20Zm20-30V45h5v-5h10v10h-5v5H40Zm25-45h10v10h-5v5h-5v5H50V10h5V5h10v5Z"
            />
        </svg>
    );
};

/**
 * Calculator SVG Icon
 */
const CalculatorIcon: React.FC = () => {
    return (
        <svg width="100%" height="100%" viewBox="30 25 100 105">
            <path
                fill="#202020"
                d="M70 35v-5h5v-5h10v5h30l15 15v30h-5v5h-5v5h-5v5h-5v5H75v5h-5v10h-5v15h-5v5H35v-5h-5v-15h5v-10h5V90h5V80h5V50h5v-5h5v-5h5v-5h5Z"
            />
            <path
                fill="#A4A4A4"
                d="M35 125v-10h25v10H35Zm45-40 30-5 5-5h5v-5h5v5h-5v5h-5v5h-5v5H80v-5Z"
            />
            <path
                fill="#E6A473"
                d="M55 80V50h5v-5h5v-5h5v-5h5v-5h5v10L70 80l-25 30h-5v-5l5-5v-5l5-5v-5l5-5Z"
            />
            <path
                fill="#DE7331"
                d="M50 100v-5l5-5V55h5v-5h5v-5h5v-5h5v-5h5v-5h5v10l-10 5-5 5-5 5h-5v20h5v15h-5v10h-5v10H45v-5l5-5Z"
            />
            <path
                fill="#833118"
                d="M70 100h-5v10H55v-5l5-5v-5l5-5v-5l5-5v-5h-5v-5h-5V55h5v-5h5v-5h5v-5h5v-5h5v5h-5v5h-5v5h-5v5h-5v15h5v5h5v15h-5v10Z"
            />
            <path
                fill="#B44120"
                d="M60 100v5H40v-5h20Zm5-10v5H45v-5h20ZM50 80h20v5H50v-5Z"
            />
            <path fill="#202020" d="M116 41v-5h4l1 5h-5z" />
            <path
                fill="#626262"
                d="M111 66v5h-5v-5a224 224 0 0 1 5 0zm5-5v5a329 329 0 0 1-5 0v-5a877 877 0 0 1 5 0z"
            />
            <path
                fill="#626262"
                d="m75 55 10-10h5v-5h25l5 5v5h5v20h-5v5h-5v5h-5v5H75V55Zm-40 55h20v5H35v-5Z"
            />
            <path fill="#18CDFF" d="M115 45v15h-5v5h-5v5H80V55h5v-5h5v-5h25Z" />
            <path
                fill="#108BA4"
                d="M100 70v-5h5v5h-5Zm-20-5h5v5h-5v-5Zm30-15v-5h5v5h-5Zm-15-5v5h-5v-5h5Z"
            />
            <path fill="#CAECF5" d="M110 60h-5v-5h5v5Zm-5 0v5h-5v-5h5Z" />
            <path
                fill="#FFF"
                d="M110 55h-5v-5h5v5Zm-75 60h20v5H35v-5Zm75-35H75v-5h-5v-5h-5V55h5v-5h5v-5h5v-5h5v-5h25v5H90v5h-5v5h-5v5h-5v15h5v5h25v-5h5v-5h5v-5h5V50h5v15h-5v5h-5v5h-5v5Z"
            />
            <path
                fill="#E3E3E3"
                d="M125 50h-5v-5h5v5Zm-5-5h-5v-5h5v5Zm-10-5v-5h5v5h-5Zm20 5h-5v-5h5v5Zm-10-10h5v5h-5v-5Zm-5 0v-5h5v5h-5Z"
            />
        </svg>
    );
};

/**
 * Return HTML Icon
 */
const ReturnIcon: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-full h-full aspect-square">
            <i className="ri-reply-fill" />
        </div>
    );
};

/**
 * Menu navigation list for game database
 */
export const MENU_LIST: {
    tab: GameTab;
    Icon: React.FC;
    background: string;
    color: string;
}[] = [
    {
        tab: "moves",
        Icon: MovesIcon,
        background: "#A60000",
        color: "#ffd6d6",
    },
    {
        tab: "evolutions",
        Icon: EvolutionsIcon,
        background: "#9C531F",
        color: "#f8e8dd",
    },
    {
        tab: "machines",
        Icon: MachinesIcon,
        background: "#A1871F",
        color: "#f8f3dd",
    },
    {
        tab: "pokemon",
        Icon: PokemonIcon,
        background: "#4E8234",
        color: "#e8f3e2",
    },
    {
        tab: "calculator",
        Icon: CalculatorIcon,
        background: "#045B8A",
        color: "#d7f0fe",
    },
    {
        tab: "berries",
        Icon: BerriesIcon,
        background: "#445E9C",
        color: "#e3e7f3",
    },
    {
        tab: "items",
        Icon: ItemsIcon,
        background: "#4b0478",
        color: "#efd7fe",
    },
    {
        tab: "return",
        Icon: ReturnIcon,
        background: "#A13959",
        color: "#f4e1e7",
    },
];
