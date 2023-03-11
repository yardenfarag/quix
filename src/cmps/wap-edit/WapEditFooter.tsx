import { useState } from "react"
import { Section } from "../../interfaces/dynamic-element"
import { SectionMouseOver } from "./SectionMouseOver"

interface WapEditFooterProps {
    footer: Section
    media: 'large' | 'medium' | 'small',
    selectedSection: Section | null
    sections: Section[]
    setSelectedSection: React.Dispatch<React.SetStateAction<Section | null>>
    setGrabMode: React.Dispatch<React.SetStateAction<string>>
    grabMode: string
}

export const WapEditFooter = (props: WapEditFooterProps) => {
    const { footer, media, selectedSection, sections, setSelectedSection, setGrabMode, grabMode } = props

    const mousedownHandler = () => {
        setSelectedSection(footer)
    }
    return (
        <footer
            onMouseDown={mousedownHandler}
            data-id={footer.id}
            data-kind={footer.kind}
            ref={ref => footer.ref = ref}
            className={`wap-${footer.kind} relative ${selectedSection ? '' : 'dashed'}`}
            style={{ ...footer.styles[media] }}>
            {(((grabMode !== 'resize-section') || selectedSection?.id === footer.id)) && <SectionMouseOver section={footer} sections={sections} media={media} buttonPosition={false} selectedSection={selectedSection} setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />}
        </footer>
    )
}