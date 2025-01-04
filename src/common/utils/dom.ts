export function resetScroll(dom: HTMLElement | null) {
    if (dom) {
        dom.scrollTo({ top: 0, behavior: "instant" });
    }
}