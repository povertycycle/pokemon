import Link from "next/link";
import { API_HOME } from "../constants/urls"

type UnavailableProps = {
    url: string;
    error: string;
}

const Unavailable: React.FC<UnavailableProps> = ({ url, error }) => {
    return (
        <div className="px-4 h-full w-full flex flex-col text-[1.5rem] sm:text-[2rem] leading-[2rem] font-bold justify-center items-center">
            <span className="text-center leading-6 sm:leading-8">Pokemon API <Link href={API_HOME} target="_blank" className="max-sm:text-[1.125rem] hover:text-base-red-dark transition-colors underline">{url}</Link> is currently unavailable</span>
            <span className="mt-4">Please try again later</span>
            <span className="font-normal text-[0.875rem] sm:text-[1rem] leading-5 mt-4 text-base-red text-center">{error}</span>
        </div>
    )
}

export default Unavailable;