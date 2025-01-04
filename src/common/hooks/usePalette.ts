import { useEffect, useState } from "react";
import { generateBackground } from "../utils/colors";

const usePalette = (image?: string | null, defaultPalette?: string[]) => {
    const [palette, setPalette] = useState<string[] | undefined>(defaultPalette);

    useEffect(() => {
        if (palette === undefined) {
            if (!!image) {
                generateBackground(image).then(res => {
                    setPalette(res);
                }).catch(err => {
                    setPalette(["#ffffff", "#000000"]);
                });
            } else {
                setPalette(["#ffffff", "#000000"])
            }
        }
    }, []);

    return { palette };
}

export { usePalette };