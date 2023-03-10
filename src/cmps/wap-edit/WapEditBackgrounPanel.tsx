import { Section } from "../../interfaces/dynamic-element"
import { SectionMouseOver } from "./SectionMouseOver"

interface WapEditPanelProps {
    selectedSection: Section | null,
    sections: Section[]
    setSelectedSection: React.Dispatch<React.SetStateAction<Section | null>>
    setGrabMode: React.Dispatch<React.SetStateAction<string>>
    media: 'large' | 'medium' | 'small'
}

export const BackgroundPanel = (props: WapEditPanelProps) => {
    const { sections, media, setGrabMode, setSelectedSection, selectedSection } = props
    return (

        <section className='wap-edit-page__background-panel absolute'>
            {sections.map((section) => {
                return (<div
                    data-id={section.id}
                    data-kind={section.kind}
                    key={`wap-${section.kind}-panel__${section.id}}`}
                    className={`wap-${section.kind}-panel relative`}
                    style={{ height: section.styles[media].height }}
                >
                    <div className="relative" style={{height:'100%'}}>
                    <div className="absolute" style={{zIndex:'19', width:'calc(100%)',height:'100%'}}>

                    {<SectionMouseOver section={section} sections={sections} media={media} buttonPosition={false} selectedSection={selectedSection} setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />}
                    </div>
                    </div>

                </div>)
            })}
        </section>
    )
}