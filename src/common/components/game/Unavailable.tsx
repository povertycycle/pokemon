import { API_HOME } from "../../../constants/urls"

const Unavailable: React.FC<{ url: string }> = ({ url }) => {
    return (
        <div className="px-4 h-full w-full flex flex-col text-[1.5rem] sm:text-[2rem] leading-[2rem] font-bold justify-center items-center">
            <span className="text-center leading-6 sm:leading-8">Pokemon API <a href={API_HOME} target="_blank" className="max-sm:text-[1.125rem] hover:text-base-red-dark transition-colors underline">{url}</a> is currently unavailable</span>
            <span className="mt-4">Please try again later</span>
        </div>
    )
}

export default Unavailable;