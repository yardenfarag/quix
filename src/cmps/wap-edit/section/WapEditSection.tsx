import { useState } from "react"
import { Cmp, Section } from "../../../models/dynamic-element"
import { getVerticalHalf } from "../../../services/util.service"
import { ElPreview } from "../element/ElPreview"
import { SectionMouseOver } from "../SectionMouseOver"

interface WapEditSectionProps {
    section: Section
    media: 'large' | 'medium' | 'small',
    selectedSection: Section | null,
    sections: Section[]
    setSelectedSection: (section?: Section | null) => void
    setGrabMode: (mode: string) => void
    grabMode: string,
    pageRef: HTMLElement
    onEditElHandler: (cmp: Cmp) => void
    onSaveElHandler: (cmp: Cmp, txt: string) => void
    onSelectEl: (el: Cmp) => void
    onStartRotate: (ev: MouseEvent, el: Cmp) => void
    selectedEl: Cmp | null
}

export const WapEditSection = (props: WapEditSectionProps) => {
    const { section, media, selectedSection, sections,
        setSelectedSection, grabMode, setGrabMode, pageRef,
        onEditElHandler, onSaveElHandler, onSelectEl, onStartRotate, selectedEl } = props

    const [addSectionBtnPos, setAddSectionPosition] = useState<'top' | 'bottom' | false>(false)
  
    const sectionMousemoveHandler = (ev: MouseEvent) => {
        setAddSectionPosition(getVerticalHalf(ev, section.ref!))
    }

    const sectionClickHandler = () => {
        setSelectedSection(section)
    }

    const elClickHandler = (ev: MouseEvent, el: Cmp) => {
        if (ev.detail >= 2) onEditElHandler(el)
        onSelectEl(el)
    }

    const elBlurHandler = (el: Cmp, txt: string) => {
        onSaveElHandler(el, txt)
    }


    return (
        <div className="section-wrapper" style={{ height: section.styles[media].height, width: '100vw' }} onClick={sectionClickHandler}>
            <section
                onMouseMove={ev => sectionMousemoveHandler(ev.nativeEvent)}
                data-id={section.id}
                data-kind={section.kind}
                ref={ref => ref ? section.ref = ref : null}
                className={`wap-${section.kind} relative ${(section.kind === 'section' && selectedSection?.id === section.id || (section.kind !== 'section' && selectedSection)) ? 'selected' : 'dashed'}`}
                style={{ ...section.styles[media], width: pageRef?.offsetWidth + 'px' }}>
                {(((grabMode !== 'resize-section') || selectedSection?.id === section.id)) && <SectionMouseOver section={section} sections={sections} media={media} buttonPosition={(section.kind === 'section' && grabMode !== 'resize-section') && addSectionBtnPos} selectedSection={selectedSection} setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />}
                {/* {selectedSection?.ref && <SectionMouseOver section={selectedSection} sections={sections} media={media} buttonPosition={(isHovered && addSectionBtnPos)} selectedSection={selectedSection} setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />} */}
                {section.cmps.map(cmp => (<ElPreview
                    key={cmp.id}
                    media={media}
                    el={cmp}
                    selectedEl={selectedEl}
                    onStartRotate={onStartRotate}
                    onClick={elClickHandler}
                    onBlur={elBlurHandler} />))}
            </section>
        </div>
    )
}