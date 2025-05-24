import { GITHUB } from "@/constants/game/main";
import Link from "next/link";

interface MissingDataProps {
    missingData?: string | null;
}

/**
 * Missing data component
 */
export const MissingData: React.FC<MissingDataProps> = (props) => {
    return (
        <div className="m-auto flex flex-col text-center">
            <span className="font-medium text-lg sm:text-xl">
                {props.missingData ?? "Unable to get data"}
            </span>
            <span className="mt-4 text-base sm:text-lg">
                You can post an issue at{" "}
                <Link
                    href={GITHUB}
                    target="_blank"
                    className="underline font-medium"
                >
                    my Github here
                </Link>
            </span>
        </div>
    );
};
