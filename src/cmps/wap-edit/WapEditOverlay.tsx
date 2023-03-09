import { Section } from "../../interfaces/dynamic-element"
import { Wap } from "../../interfaces/wap"
import { calcTotalHeight } from "../../services/util.service"

interface WapEditOverlayProps {
    sections: Section[]
    media: 'large' | 'medium' | 'small'
    wap: Wap
    selectedSection: Section | null
}
export const WapEditOverlay = (props: WapEditOverlayProps) => {
    const { sections, media, wap, selectedSection } = props

    return (
        <section className="wap-edit-page__overlay absolute flex column"
            style={
                {
                    height: calcTotalHeight(sections, media),
                }}
        >
            {sections.map(section => {
                return (<div
                    data-id={section.id}
                    data-kind={section.kind}
                    className={`wap-overlay ${section.kind === 'footer' ? 'grow-1' : ''} ${section.kind} ${selectedSection ? '' : 'dashed'}`}
                    style={{ height: section.styles[media].height }}
                    key={`wap-overlay-${section.kind}__${section.id}}`}>
                    <div className="dashed-pseudo" style={{
                        marginInline: wap.margin[media] + 'px',
                        width: `calc(100% - ${2 * wap.margin[media]})`
                    }}></div>
                </div>)
            })}
        </section>
    )
}