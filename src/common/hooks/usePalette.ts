import { useEffect, useState } from "react";
import { generateBackground } from "../utils/colors";
import { imageUrlToLocalUrl } from "../utils/images";

const usePalette = (image?: string | null, defaultPalette?: string[], defaultLocalUrl?: string) => {
    const [palette, setPalette] = useState<string[] | undefined>(defaultPalette);
    const [localUrl, setLocalUrl] = useState<string>(defaultLocalUrl ?? "");

    useEffect(() => {
        if (palette === undefined) {
            if (!!image) {
                let url: string;
                imageUrlToLocalUrl(image).then(res => {
                    url = res
                    return generateBackground(res)
                }).then(res => {
                    setPalette(res);
                    setLocalUrl(url);
                }).catch(err => {
                    setPalette(["#ffffff", "#000000"]);
                    setLocalUrl("");
                });
            } else {
                setPalette(["#ffffff", "#000000"])
                setLocalUrl("");
            }
        }
    }, []);

    return { palette, localUrl };
}

export { usePalette };