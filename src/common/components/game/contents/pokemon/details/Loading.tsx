import { useEffect, useState } from "react";

const Loading: React.FC = () => {
    const MAX_TICKS = 5;
    const [tick, setTick] = useState<number>(0);

    useEffect(() => {
        const tId = window.setInterval(() => {
            setTick(prev => ((prev + 1) % MAX_TICKS))
        }, 1000);

        return () => { window.clearInterval(tId); }
    }, [])

    return (
        <div className="w-full h-full flex items-center justify-center text-[5rem] font-bold">
            {".".repeat(tick + 1)}
        </div>
    )
}

export default Loading;