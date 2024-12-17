import { Tab } from '@/common/constants/enums';
import { DESTINATION, DESTINATION_STATES, TAB_SELECTION } from '@/common/constants/main';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        router.push(`/?${DESTINATION}=database&${TAB_SELECTION}=pokemon`);
    }, [])

    return (
        <div>
            REDIRECTING...
        </div>
    )
}