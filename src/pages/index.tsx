import MainPage from '@/common/components/MainPage';
import Loading from '@/common/components/Loading';
import { Suspense } from 'react'

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <MainPage />
        </Suspense>
    )
}