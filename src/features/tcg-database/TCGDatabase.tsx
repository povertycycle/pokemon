import Link from "next/link"

/**
 * TCG database placeholder
 */
export const TCGDatabase: React.FC = () => {
    return (
        <div className={`w-full h-full bg-black text-white p-4`}>
            <div className="h-full w-full flex flex-col gap-4 items-center text-center justify-center">
                <b className="text-lg sm:text-xl">Currently in development</b>
                <span className="text-sm sm:text-base font-medium">Looking for a good and reliable public API. Let me know if you are familiar with any!</span>
            </div>
            <Link href="/" shallow={true} className="cursor-pointer z-1 absolute flex items-center gap-2 right-0 top-0 p-2 sm:p-4 text-base sm:text-lg group">
                <i className="ri-arrow-left-s-line text-xl sm:text-2xl" />
                <b className="sm:group-hover:underline">Return to main menu</b>
            </Link>
        </div>
    )
}