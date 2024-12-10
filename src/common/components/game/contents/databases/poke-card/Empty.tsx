
const Empty: React.FC = () => {
    return (
        <div className="w-full h-full text-[1.5rem] sm:text-[2rem] leading-[2rem] flex flex-col items-center justify-center text-center">
            <span className="font-bold sm:tracking-[1px]">Pokemon Database is currently unavailable.</span>
            <span className="text-[1.25rem] sm:text-[1.5rem] mt-2 sm:mt-4">Please try again later.</span>
        </div>
    )
}

export default Empty;