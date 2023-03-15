import { Section } from "../../models/dynamic-element"
import { Wap } from "../../models/wap"
import { calcTotalHeight } from "../../services/util.service"

interface WapEditOverlayProps {
    sections: Section[]
    media: 'large' | 'medium' | 'small'
    wap: Wap
    selectedSection: Section | null
    pageRef: HTMLElement | null
}
export const Overlay = (props: WapEditOverlayProps) => {
    const { sections, media, wap, selectedSection, pageRef } = props

    const margin = !pageRef
        ? wap.styles[media].margin
        : pageRef.offsetWidth


    return (
        <section className="wap-edit-page__overlay absolute flex column" >
            {sections.map(section => {
                return (<div
                    data-id={section.id}
                    data-kind={section.kind}
                    className={`wap-overlay  ${section.kind} ${selectedSection ? '' : 'dashed'}`}
                    style={{ height: section.styles[media].height }}
                    key={`wap-overlay-${section.kind}__${section.id}}`}>
                    {(!selectedSection || selectedSection.id === section.id) &&
                        <div className="dashed-pseudo" style={{
                            marginInline: 'auto',
                            maxWidth: wap.styles[media].maxWidth || 'auto',
                            width: `calc(100% - 2*${wap.styles[media].margin})`
                        }}></div>}
                </div>)
            })}
            <div className={`wap-overlay ${!selectedSection ? 'dashed' : ''}`}
                style={{ height: '60px' }}
            >
                {!selectedSection && <div className="dashed-pseudo" style={{
                    marginInline: 'auto',
                    maxWidth: wap.styles[media].maxWidth || 'auto',
                    width: `calc(100% - 2*${wap.styles[media].margin})`
                }}></div>}
            </div>
        </section>
    )
}