import { useEffect, useState } from 'react'
import { WapEditFooter } from '../cmps/wap-edit/FooterSection'
import { WapEditHeader } from '../cmps/wap-edit/WapEditHeader'
import { SectionMouseOver } from '../cmps/wap-edit/SectionMouseOver'
import { Overlay } from '../cmps/wap-edit/Overlay'
import { WapEditPanel } from '../cmps/wap-edit/WapEditPanel'
import { WapEditSection } from '../cmps/wap-edit/WapEditSection'
import { Section } from '../interfaces/dynamic-element'
import { Cmp, Wap } from '../interfaces/wap'
import { calcTotalHeight, getVerticalHalf, makeId } from '../services/util.service'

const WapEdit = () => {
    const [wap, setWap] = useState({
        id: makeId(),
        name: 'my wap',
        cmps: [] as Cmp[],
        imgUrl: '',
        margin: {
            small: 40,
            medium: 40,
            large: 40
        }
    } as Wap)
    const [selectedSection, setSelectedSection] = useState<Section | null>(null)
    const [hoveredSection, setHoveredSection] = useState<Section | null>(null)
    const [addSectionPosition, setAddSectionPosition] = useState<'top' | 'bottom'>('bottom')
    const [selectedElement, setSelectedElement] = useState<Section | null>(null)
    const [media, setMedia] = useState<'large' | 'medium' | 'small'>('large')

    const [sections, setSections] = useState([
        {
            id: makeId(),
            name: '',
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '400px' } },
            ref: null,
            panelRef: null
        },
        {
            id: makeId(),
            name: '',
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '400px' } },
            ref: null,
            panelRef: null
        }
    ] as Section[])

    const [header, setHeader] = useState({
        id: makeId(),
        name: 'site-header',
        kind: 'header',
        styles: { small: {}, medium: {}, large: { height: '60px' } },
        ref: null,
        panelRef: null
    } as Section)
    const [footer, setFooter] = useState({
        id: makeId(),
        name: 'site-footer',
        kind: 'footer',
        styles: { small: {}, medium: {}, large: { height: '60px' } },
        ref: null,
        panelRef: null
    } as Section)

    const hoverHandler = (ev: MouseEvent) => {
        hoveredSectionHandler(ev)
    }

    const clickHandler = (ev: MouseEvent) => {
        const foundSection = getSectionUnderPointer(ev)
        if (selectedSection !== foundSection) setSelectedSection(foundSection)
    }

    const getSectionUnderPointer = (ev: MouseEvent) => {
        const { clientX, clientY } = ev
        let foundSection: Section | null = null
        for (let section of [header, ...sections, footer]) {
            if (!section.ref) continue
            const { x, y, height } = section.ref.getBoundingClientRect()
            if (clientX >= x && clientY >= y && clientY <= y + height) {
                foundSection = section
                break
            }
        }
        return foundSection
    }

    const hoveredSectionHandler = (ev: MouseEvent) => {
        const target = ev.target! as HTMLElement
        if (target.classList.contains('add-section-btn')) return

        const foundSection = getSectionUnderPointer(ev)
        const position = foundSection ? getVerticalHalf(ev, foundSection.ref!) : addSectionPosition
        if (position !== addSectionPosition) setAddSectionPosition(position)

        if (!foundSection || foundSection !== hoveredSection) setHoveredSection(foundSection)
    }

    useEffect(() => {

        document.addEventListener('mousemove', hoverHandler)
        document.addEventListener('click', clickHandler)

        return () => {
            document.removeEventListener('mousemove', hoverHandler)
            document.removeEventListener('click', clickHandler)
        }
    })

    return (
        <section className='wap-edit-page relative'>
            <div className="page-container flex">
                <div className="wap-edit-page__tool-sidebar"
                    style={{ height: calcTotalHeight([...sections, header, footer], media) }}></div>
                <main className='wap-edit-page__page grow-1 relative'>
                    {hoveredSection?.ref && <SectionMouseOver section={hoveredSection} sections={[header, ...sections, footer]} media={media} buttonPosition={addSectionPosition} selectedSection={selectedSection}/>}
                    {selectedSection?.ref && <SectionMouseOver section={selectedSection} sections={[header, ...sections, footer]} media={media} buttonPosition={((selectedSection === hoveredSection) && addSectionPosition)} selectedSection={selectedSection}/>}
                    {/* {selectedSection && <SelectedSectionOverlay section={selectedSection} sections={[header, ...sections, footer]} media={media} />} */}
                    <WapEditHeader header={header} media={media} selectedSection={selectedSection} />
                    {sections.map((section) => {
                        return (<WapEditSection
                            key={`wap-${section.kind}__${section.id}}`}
                            section={section} media={media} selectedSection={selectedSection}
                        />)
                    })}
                    <WapEditFooter footer={footer} media={media} selectedSection={selectedSection} />

                </main>
                <WapEditPanel sections={[header, ...sections, footer]} media={media} />
                <Overlay wap={wap} sections={[header, ...sections, footer]} selectedSection={selectedSection} media={media} />
            </div>
        </section>
    )
}

export default WapEdit