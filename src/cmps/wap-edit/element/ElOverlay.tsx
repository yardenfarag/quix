import { Cmp } from "../../../interfaces/dynamic-element"

interface ElOverlayProps {
    el: Cmp
    onStartRotate: (ev: MouseEvent, el: Cmp) => void
}

export const ELOverlay = (props: ElOverlayProps) => {
    const { el, onStartRotate } = props

    const rotateMouseDownHandler = (ev: MouseEvent) => {
        onStartRotate(ev, el)
    }
    return (
        <span className={`el-overlay absolute ${el.kind}`}>
            <span className="el-title absolute capitalize">{el.kind}</span>
            <span className="rotate-btn absolute flex center" onMouseDown={ev => rotateMouseDownHandler(ev.nativeEvent)}>
                <svg width="13" height="11" viewBox="0 0 13 11"><path fill="currentColor" fillRule="evenodd" d="M7.68.5C4.87.5 2.5 2.79 2.5 5.5v1.46L.81 5.61l-.62.78L3 8.64l2.81-2.25-.63-.78L3.5 6.96V5.5c0-2.17 1.85-4 4.12-4 2.26 0 4.12 1.83 4.12 4s-2.25 4-4.25 4v1c3 0 5.25-2.29 5.25-5s-2.25-5-5.06-5z"></path></svg>
            </span>
        </span>
    )
}