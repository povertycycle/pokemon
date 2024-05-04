import { useEffect, useState } from "react";

const Empty: React.FC = () => {
    // const THRESHOLD = 5;
    // const [time, setTime] = useState<number>(0);

    useEffect(() => {
        // if (time > THRESHOLD) return;
        // const tId = window.setTimeout(() => {
        //     console.log("TIME");
        //     setTime(prev => prev + 1);
        // }, 1000);
    }, [])

    return (
        <div className="w-full h-full text-[2rem] leading-[2rem] flex flex-col items-center justify-center">
            <span>Pokemon Database is currently unavailable.</span>
            <span>Please try again later.</span>
            {/* {THRESHOLD >= 5 && <span>Click <span className="cursor-pointer hover:text-base-red-dark transition-colors">here</span> to refresh the page.</span>} */}
        </div>
    )
}

export default Empty;