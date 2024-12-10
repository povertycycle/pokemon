import { useEffect, useState } from "react";
import { generateBackground } from "../utils/colors";

const usePalette = (image?: string | null) => {
    const [palette, setPalette] = useState<string[]>();

    useEffect(() => {
        if (!!image) {
            generateBackground(image).then(res => {
                setPalette(res);
            }).catch(err => {
                setPalette(["#000000", "#000000"]);
            });
        }
    }, []);

    return { palette };
}

export { usePalette };