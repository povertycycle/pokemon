import { useRouter } from "next/router";

export const InProgress = () => {
    const router = useRouter();

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <b>Work in progress</b>
            <button
                onClick={() => router.back()}
                className="text-sm mt-4 bg-base-red-8 text-white rounded-full px-4 font-bold"
            >
                Go back
            </button>
        </div>
    );
};
