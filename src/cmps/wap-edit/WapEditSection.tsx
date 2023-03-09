import { Section } from "../../interfaces/dynamic-element"

interface WapEditSectionProps {
    section: Section
    media: 'large' | 'medium' | 'small',
    selectedSection: Section | null
}

export const WapEditSection = (props: WapEditSectionProps) => {
    const { section, media, selectedSection } = props
    return (
        <section
            data-id={section.id}
            data-kind={section.kind}
            ref={ref => section.ref = ref}
            className={`wap-${section.kind} ${selectedSection ? '' : 'dashed'}`}
            style={{ ...section.styles[media] }}>
        </section>
    )
}