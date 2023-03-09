import { useState } from "react"
import { Section } from "../../interfaces/dynamic-element"
import { calcTotalHeight, getVerticalHalf } from "../../services/util.service"

interface WapEditHoverProps {
    section: Section
    sections: Section[]
    media: 'large' | 'medium' | 'small'
    buttonPosition: 'top'|'bottom'
}
export const WapEditHover = (props: WapEditHoverProps) => {
    const { section, sections, media ,buttonPosition} = props
    const sectionIdx = sections.findIndex(sect => sect.id === section.id)

    return (
        <div className={`overlay-hover ${section.kind} absolute`}
            style={{
                top: sectionIdx === 0 ? '0' : calcTotalHeight(sections.slice(0, sectionIdx), media) + 'px',
                height: section.styles[media].height,
                width: section.ref!.offsetWidth + section.panelRef!.offsetWidth + 'px'
            }}
        >
            {section.kind === 'section' && <button
                className="add-section-btn uppercase absolute"
                style={{ top: buttonPosition === 'top' ? '0' : '100%' }}
            >+ Add section </button>}
        </div>
    )
}