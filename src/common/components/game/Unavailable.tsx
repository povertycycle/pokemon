import { API_HOME } from "./constants"

const Unavailable: React.FC<{ url: string }> = ({ url }) => {
    return (
        <div className="flex flex-col text-[2rem] leading-[2rem] font-bold justify-center items-center">
            <div className="flex gap-4">
                <span>Pokemon API </span>
                <a href={API_HOME} target="_blank" className="hover:text-base-red-dark transition-colors underline">{url}</a>
                <span>is currently unavailable.</span>
            </div>
            <span>Please try again later</span>
        </div>
    )
}

export default Unavailable;