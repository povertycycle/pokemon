import Loading from '@/common/components/_utils/loading/SuspenseLoad';
import { TAB_COLORS } from '@/common/constants/colors';
import { Tab } from '@/common/constants/enums';
import { DESTINATION, TAB_SELECTION } from '@/common/constants/main';
import { useRouter } from 'next/router';
import { Suspense, useEffect } from 'react';

export default function Page() {
    const router = useRouter();
    useEffect(() => {
        router.push(`/?${DESTINATION}=database&${TAB_SELECTION}=berries`)
    }, [])
    return (
        <Suspense fallback={<Loading />}>
            <div className="w-screen text-center font-default flex-col h-screen flex items-center justify-center bg-white">
                <span className="text-[1.5rem] sm:text-[2rem] md:text-[3rem] lg:text-[5rem]" style={{ color: TAB_COLORS[Tab.Berries] }}>Redirecting to {Tab.Berries} page...</span>
                <span className="text-[1.25rem] sm:text-[1.5rem] md:text-[2rem]" style={{ color: TAB_COLORS[Tab.Berries] }}>Please wait</span>
            </div>
        </Suspense>
    )
}
