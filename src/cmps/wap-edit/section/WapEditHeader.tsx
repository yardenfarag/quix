import { useState } from "react"
import { Section } from "../../../models/dynamic-element"
import { SectionMouseOver } from "../SectionMouseOver"

interface WapEditHeaderProps {
    header: Section
    media: 'large' | 'medium' | 'small',
    selectedSection: Section | null
    sections: Section[]
    setSelectedSection: (section?: Section | null) => void
    setGrabMode: React.Dispatch<React.SetStateAction<string>>
    grabMode: string
    pageRef: HTMLElement
}

export const WapEditHeader = (props: WapEditHeaderProps) => {
    const { header, media, selectedSection, sections, setSelectedSection, setGrabMode, grabMode, pageRef } = props


    const mousedownHandler = () => {
        setSelectedSection(header)
    }

    return (
        <div className="section-wrapper" style={{height:header.styles[media].height, width: '100vw'}} onMouseDown={mousedownHandler}>
            <header
                data-id={header.id}
                data-kind={header.kind}
                ref={ref => ref ? header.ref = ref:null}
                className={`wap-${header.kind} relative ${selectedSection ? '' : 'dashed'}`}
                style={{ ...header.styles[media], width:pageRef?.offsetWidth + 'px' }}>
                {(((grabMode !== 'resize-section') || selectedSection?.id === header.id)) && <SectionMouseOver section={header} sections={sections} media={media} buttonPosition={false} selectedSection={selectedSection} setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />}
            </header>
        </div>
    )
}