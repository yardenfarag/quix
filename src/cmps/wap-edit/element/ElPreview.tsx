import { Cmp } from "../../../models/dynamic-element"
import { ElRef } from "../../../views/WapEdit"
import DynEl from "../../general/DynEl"
import { ELOverlay } from "./ElOverlay"

interface ElPreviewProps {
    el: Cmp
    media: 'large' | 'medium' | 'small',
    onClick: (ev: MouseEvent, el: Cmp) => void
    onBlur: (el: Cmp, txt: string) => void
    onStartRotate: (ev: MouseEvent, el: Cmp) => void
    selectedEl: Cmp | null
    elRef: ElRef
    highlightedEls: Cmp[]
}

export const ElPreview = (props: ElPreviewProps) => {
    const { el, onClick, onBlur, media, onStartRotate, selectedEl, elRef, highlightedEls } = props
    const styles = el.styles[media]

    const cmpClickHandler = (ev: MouseEvent, el: Cmp) => {
        onClick(ev, el)
    }

    const cmpBlurHandler = (ev: FocusEvent, el: Cmp) => {
        const txt = (ev.target as HTMLTextAreaElement).value
        onBlur(el, txt)
    }
    const isHighlighted = !!highlightedEls.find(e => e.id === el.id)

    return (
        <div className={`el-preview absolute ${isHighlighted ? 'highlighted' : ''} ${selectedEl?.id === el.id ? 'selected' : ''}`} style={{ width: styles.width, height: styles.height, top: styles.top, left: styles.left, transform: styles.transform }}
            ref={ref => ref ? elRef.containerRef = ref : null}>
            <DynEl key={el.id} tag={el.tag}
                attributes={{
                    ...(el.attributes || {}),
                    onClick: (ev) => { cmpClickHandler(ev.nativeEvent, el) },
                    onBlur: (ev) => { cmpBlurHandler(ev.nativeEvent, el) }
                }
                }
                setRefHandler={(ref: HTMLElement) => ref ? elRef.ref = ref : null}
                styles={Object.assign({}, { ...el.styles[media] }, { transform: '' })}>
                {el.txt}
            </DynEl>
            <ELOverlay el={el} onStartRotate={onStartRotate} />
        </div>
    )
}