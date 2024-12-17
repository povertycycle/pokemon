import { TAB_COLORS } from '@/common/constants/colors';
import { Tab } from '@/common/constants/enums';
import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <div className="w-screen text-center font-default flex-col h-screen flex items-center justify-center bg-white">
                <span className="text-[1.5rem] sm:text-[2rem] md:text-[3rem] lg:text-[5rem]" style={{ color: TAB_COLORS[Tab.Moves] }}>Construction in progress for {Tab.Moves} page</span>
                <span className="text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] mt-8" style={{ color: TAB_COLORS[Tab.Moves] }}>Currently migrating to v2.0</span>
                <span className="text-[1.25rem] sm:text-[1.5rem] md:text-[2rem]" style={{ color: TAB_COLORS[Tab.Moves] }}>Please come back later</span>
            </div>
        </Suspense>
    )
}

const Loading: React.FC = () => {
    return (
        <div className="absolute bg-black z-[100] w-screen h-screen">
            Please wait . . .
        </div>
    )
}