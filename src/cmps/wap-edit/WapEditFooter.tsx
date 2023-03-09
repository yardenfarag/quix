import { Section } from "../../interfaces/dynamic-element"

interface WapEditFooterProps {
    footer: Section
    media: 'large' | 'medium' | 'small',
    selectedSection: HTMLElement | null
}

export const WapEditFooter = (props: WapEditFooterProps) => {
    const { footer, media, selectedSection } = props
    return (
        <footer
            data-id={footer.id}
            data-kind={footer.kind}
            ref={ref => footer.ref = ref}
            className={`wap-${footer.kind} ${selectedSection ? '' : 'dashed'}`}
            style={{ ...footer.styles[media] }}>
        </footer>
    )
}