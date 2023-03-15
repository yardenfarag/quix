import { useState } from "react"
import { Section } from "../../../models/dynamic-element"
import { SectionMouseOver } from "../SectionMouseOver"

interface WapEditFooterProps {
    footer: Section
    media: 'large' | 'medium' | 'small',
    selectedSection: Section | null
    sections: Section[]
    setSelectedSection: (section?: Section | null) => void
    setGrabMode: React.Dispatch<React.SetStateAction<string>>
    grabMode: string
    pageRef: HTMLElement
}

export const WapEditFooter = (props: WapEditFooterProps) => {
    const { footer, media, selectedSection, sections, setSelectedSection, setGrabMode, grabMode, pageRef } = props

    const mousedownHandler = () => {
        setSelectedSection(footer)
    }
    return (
        <div className="section-wrapper" style={{ height: footer.styles[media].height, width: '100vw' }} onMouseDown={mousedownHandler}>
            <footer
                data-id={footer.id}
                data-kind={footer.kind}
                ref={ref => ref ? footer.ref = ref : null}
                className={`wap-${footer.kind} relative ${selectedSection ? '' : 'dashed'}`}
                style={{ ...footer.styles[media], width: pageRef?.offsetWidth + 'px' }}>
                {(((grabMode !== 'resize-section') || selectedSection?.id === footer.id)) && <SectionMouseOver section={footer} sections={sections} media={media} buttonPosition={false} selectedSection={selectedSection} setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />}
            </footer>
        </div>
    )
}