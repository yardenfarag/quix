import { Section } from "../../interfaces/dynamic-element"

interface WapEditHeaderProps {
    header: Section
    media: 'large' | 'medium' | 'small',
    selectedSection: HTMLElement | null
}

export const WapEditHeader = (props: WapEditHeaderProps) => {
    const { header, media, selectedSection } = props
    return (
        <header
            data-id={header.id}
            data-kind={header.kind}
            ref={ref => header.ref = ref}
            className={`wap-${header.kind} ${selectedSection ? '' : 'dashed'}`}
            style={{ ...header.styles[media] }}>
        </header>
    )
}