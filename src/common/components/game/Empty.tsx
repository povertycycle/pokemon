const Empty: React.FC = () => {
    return (
        <div className="w-full h-full text-[2rem] leading-[2rem] flex flex-col items-center justify-center">
            <span>Pokemon Database is currently updating</span>
            {/* <span>Click <span className="cursor-pointer hover:text-base-red-dark transition-colors">here</span> to update the local database.</span> */}
            <span>Please wait for a moment...</span>
        </div>
    )
}

export default Empty;