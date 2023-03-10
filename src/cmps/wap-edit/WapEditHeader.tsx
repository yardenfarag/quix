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
    const [isHovered, setIsHovered] = useState(false)
    const hoverHandler = () => {
        setIsHovered(true)
    }

    const leaveHandler = () => [
        setIsHovered(false)
    ]
    return (
        <header
            onMouseLeave={leaveHandler}
            onMouseMove={hoverHandler}
            data-id={header.id}
            data-kind={header.kind}
            ref={ref => header.ref = ref}
            className={`wap-${header.kind} ${selectedSection ? '' : 'dashed'}`}
            style={{ ...header.styles[media] }}>
            {(((isHovered && grabMode !== 'resize-section') || selectedSection?.id === header.id)) && <SectionMouseOver section={header} sections={sections} media={media} buttonPosition={false} selectedSection={selectedSection} setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />}
        </header>
    )
}