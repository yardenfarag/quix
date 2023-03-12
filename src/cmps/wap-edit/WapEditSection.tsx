import { useState } from "react"
import { Section } from "../../interfaces/dynamic-element"
import { getVerticalHalf } from "../../services/util.service"
import DynEl from "../general/DynEl"
import { SectionMouseOver } from "./SectionMouseOver"

interface WapEditSectionProps {
    section: Section
    media: 'large' | 'medium' | 'small',
    selectedSection: Section | null,
    sections: Section[]
    setSelectedSection: React.Dispatch<React.SetStateAction<Section | null>>
    setGrabMode: React.Dispatch<React.SetStateAction<string>>
    grabMode: string,
    pageRef: HTMLElement

}

export const WapEditSection = (props: WapEditSectionProps) => {
    const { section, media, selectedSection, sections, setSelectedSection, grabMode, setGrabMode, pageRef } = props
    const [addSectionBtnPos, setAddSectionPosition] = useState<'top' | 'bottom' | false>(false)

    const mousemoveHandler = (ev: MouseEvent) => {
        setAddSectionPosition(getVerticalHalf(ev, section.ref!))
    }

    const mousedownHandler = () => {
        setSelectedSection(section)
    }

    return (
        <div className="section-wrapper" style={{ height: section.styles[media].height, width: '100vw' }} onMouseDown={mousedownHandler}>
            <section
                onMouseMove={ev => mousemoveHandler(ev.nativeEvent)}
                data-id={section.id}
                data-kind={section.kind}
                ref={ref => section.ref = ref}
                className={`wap-${section.kind} relative ${selectedSection ? '' : 'dashed'}`}
                style={{ ...section.styles[media], width: pageRef?.offsetWidth + 'px' }}>
                {(((grabMode !== 'resize-section') || selectedSection?.id === section.id)) && <SectionMouseOver section={section} sections={sections} media={media} buttonPosition={(grabMode !== 'resize-section') && addSectionBtnPos} selectedSection={selectedSection} setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />}
                {/* {selectedSection?.ref && <SectionMouseOver section={selectedSection} sections={sections} media={media} buttonPosition={(isHovered && addSectionBtnPos)} selectedSection={selectedSection} setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />} */}
                {section.cmps.map(cmp => (<DynEl key={cmp.id} tag={cmp.tag} attributes={cmp.attributes || {}} styles={cmp.styles[media]}>
                    {cmp.txt}
                </DynEl>))}
            </section>
        </div>
    )
}