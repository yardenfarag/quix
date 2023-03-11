import { useState } from "react"
import { Section } from "../../interfaces/dynamic-element"
import { SectionMouseOver } from "./SectionMouseOver"

interface WapEditHeaderProps {
    header: Section
    media: 'large' | 'medium' | 'small',
    selectedSection: Section | null
    sections: Section[]
    setSelectedSection: React.Dispatch<React.SetStateAction<Section | null>>
    setGrabMode: React.Dispatch<React.SetStateAction<string>>
    grabMode: string
}

export const WapEditHeader = (props: WapEditHeaderProps) => {
    const { header, media, selectedSection, sections, setSelectedSection, setGrabMode, grabMode } = props


    const mousedownHandler = () => {
        setSelectedSection(header)
    }

    return (
        <header
            onMouseDown={mousedownHandler}
            data-id={header.id}
            data-kind={header.kind}
            ref={ref => header.ref = ref}
            className={`wap-${header.kind} ${selectedSection ? '' : 'dashed'}`}
            style={{ ...header.styles[media] }}>
            {(((grabMode !== 'resize-section') || selectedSection?.id === header.id)) && <SectionMouseOver section={header} sections={sections} media={media} buttonPosition={false} selectedSection={selectedSection} setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />}
        </header>
    )
}