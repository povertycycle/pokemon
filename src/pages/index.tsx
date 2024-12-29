import Loading from '@/common/components/_utils/loading/SuspenseLoad';
import MainPage from '@/common/components/MainPage';
import { Suspense } from 'react'

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <MainPage />
        </Suspense>
    )
}
