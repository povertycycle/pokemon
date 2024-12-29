import Link from "next/link";

const VisitPage: React.FC = () => {
    const PROFILE = "https://povertycycle.github.io/povertycycle/";

    return (
        <Link href={PROFILE} target="_blank" className={`bottom-0 rounded-tr-[6px] left-0 z-10 sm:max-w-[36px] sm:hover:max-w-[296px] transtiion-[max-width] bg-base-red-dark text-base-white absolute overflow-hidden flex duration-400`}>
            <div className="h-full aspect-square flex items-center justify-center text-[1.25rem] sm:text-[2rem] leading-6">
                <i className="ri-corner-up-left-fill" />
            </div>
            <span className="flex items-center justify-start h-full w-full text-[0.875rem] sm:text-[1.5rem] whitespace-nowrap px-2">
                Visit My Page
            </span>
        </Link>
    )
}

export default VisitPage;