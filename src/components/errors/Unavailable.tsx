import { ErrorString } from "@/interfaces/generic";
import Link from "next/link";
import { API_HOME } from "../../constants/game/urls";

type UnavailableProps = {
    url: string;
    error?: ErrorString;
}

/**
 * Custom API error message
 * @param url Link that was unavailable.
 * @param error Optional error message.
 */
export const Unavailable: React.FC<UnavailableProps> = ({ url, error }) => {
    return (
        <div className="px-4 m-auto flex flex-col justify-center items-center">
            <span className="text-base lg:text-lg text-center tracking-wider">Pokemon API <Link href={API_HOME} target="_blank" className="hover:text-base-red-4 transition-colors underline">{url}</Link> is currently unavailable</span>
            <b className="text-xl lg:text-2xl my-4">Please try again later</b>
            <i className="text-base-red-4 text-center">{error}</i>
        </div>
    )
}