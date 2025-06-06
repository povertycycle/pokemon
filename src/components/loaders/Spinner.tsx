export type SpinnerColor = "light" | "dark";

type SpinnerProps = {
    size?: number;
    color?: SpinnerColor
}

/**
 * Spinner SVG component for loading state.
 * @param size Custom value for spinner size; default is 48px.
 * @param color Custom spinner color.
 */
export const Spinner: React.FC<SpinnerProps> = ({ size, color }) => {
    const stroke = ((() => {
        switch (color) {
            case "light":
                return "#f0f0f0";
            case "dark":
            default:
                return "#232323";
        }
    })())
    return <svg className="m-auto" width={size ?? 48} height={size ?? 48} stroke={stroke} viewBox="0 0 24 24"><g><circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3" strokeLinecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" calcMode="spline" values="0 150;42 150;42 150;42 150" keyTimes="0;0.475;0.95;1" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" repeatCount="indefinite" /><animate attributeName="stroke-dashoffset" dur="1.5s" calcMode="spline" values="0;-16;-59;-59" keyTimes="0;0.475;0.95;1" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" repeatCount="indefinite" /></circle><animateTransform attributeName="transform" type="rotate" dur="2s" values="0 12 12;360 12 12" repeatCount="indefinite" /></g></svg>
}
