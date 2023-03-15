import { Cmp } from "../../../models/dynamic-element"
import DynEl from "../../general/DynEl"
import { ELOverlay } from "./ElOverlay"

interface ElPreviewProps {
    el: Cmp
    media: 'large' | 'medium' | 'small',
    onClick: (ev: MouseEvent, el: Cmp) => void
    onBlur: (el: Cmp, txt: string) => void
    onStartRotate: (ev: MouseEvent, el: Cmp) => void
    selectedEl: Cmp | null
}

export const ElPreview = (props: ElPreviewProps) => {
    const { el, onClick, onBlur, media, onStartRotate, selectedEl } = props
    const styles = el.styles[media]

    const cmpClickHandler = (ev: MouseEvent, el: Cmp) => {
        onClick(ev, el)
    }

    const cmpBlurHandler = (ev: FocusEvent, el: Cmp) => {
        const txt = (ev.target as HTMLTextAreaElement).value
        onBlur(el, txt)
    }

    return (
        <div className="el-preview absolute" style={{ width: styles.width, height: styles.height, top: styles.top, left: styles.left, transform: styles.transform }}
            ref={ref => ref ? el.containerRef = ref : null}>
            <DynEl key={el.id} tag={el.tag}
                attributes={{
                    ...(el.attributes || {}),
                    onClick: (ev) => { cmpClickHandler(ev.nativeEvent, el) },
                    onBlur: (ev) => { cmpBlurHandler(ev.nativeEvent, el) }
                }
                }
                setRefHandler={(ref: HTMLElement) => el.ref = ref}
                styles={Object.assign({}, { ...el.styles[media] }, { transform: '' })}>
                {el.txt}
            </DynEl>
            <ELOverlay el={el} onStartRotate={onStartRotate} />
        </div>
    )
}