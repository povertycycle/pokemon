const VisitPage: React.FC<{ inside: boolean }> = ({ inside }) => {
    const PROFILE = "https://povertycycle.github.io/povertycycle/";

    return (
        <a href={PROFILE} target="_blank" className={`${inside ? "top-[calc(100%-0.25rem-36px)]" : "top-[0.25rem]"} left-[0.25rem] z-[1] h-[36px] w-[36px] hover:w-[256px] bg-base-red-dark text-base-white border-base-white border-2 rounded-[4px] absolute transition-[top,width] overflow-hidden flex gap-2 duration-500`}>
            <div className="h-full aspect-square flex items-center justify-center text-[2rem]">
                <i className="ri-corner-up-left-fill" />
            </div>
            <span className="flex items-center justify-start h-full w-full text-[1.5rem] whitespace-nowrap">
                Visit My Page
            </span>
        </a>
    )
}

export default VisitPage;