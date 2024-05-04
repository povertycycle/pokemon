import MainPage from '@/common/components/MainPage';
import { Suspense } from 'react'

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <MainPage />
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