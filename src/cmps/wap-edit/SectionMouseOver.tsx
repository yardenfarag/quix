import { Section } from "../../interfaces/dynamic-element"
import { calcTotalHeight, getVerticalHalf } from "../../services/util.service"

interface SectionMouseOverProps {
    section: Section
    sections: Section[]
    media: 'large' | 'medium' | 'small'
    buttonPosition: 'top' | 'bottom' | false
    selectedSection: Section | null
}
export const SectionMouseOver = (props: SectionMouseOverProps) => {
    const { section, sections, media, buttonPosition, selectedSection } = props
    const sectionIdx = sections.findIndex(sect => sect.id === section.id)

    return (
        <div className={`${selectedSection?.id === section.id ? 'overlay-selected' : 'overlay-hovered'} ${section.kind} absolute`}
            data-id={section.id}
            style={{
                top: sectionIdx === 0 ? '0' : calcTotalHeight(sections.slice(0, sectionIdx), media) + 'px',
                height: section.styles[media].height,
                width: section.ref!.offsetWidth + section.panelRef!.offsetWidth + 'px'
            }}
        >
            <span className={`section-title ${section.kind} flex center absolute`}>
                <span className="capitalize">{section.kind + ': '}</span>
                {section.kind === 'section' && <span className="section-name">{section.name || 'Untitled'}</span>}
            </span>
            {(section.kind === 'section' && buttonPosition) && <button
                data-id={section.id}
                className="add-section-btn uppercase absolute"
                style={{ top: buttonPosition === 'top' ? '-3px' : 'calc(100% + 3px)' }}
            >+ Add section </button>}
        </div>
    )
}