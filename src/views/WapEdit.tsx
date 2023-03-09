import { useEffect, useState } from 'react'
import { WapEditFooter } from '../cmps/wap-edit/WapEditFooter'
import { WapEditHeader } from '../cmps/wap-edit/WapEditHeader'
import { WapEditHover } from '../cmps/wap-edit/WapEditHover'
import { WapEditOverlay } from '../cmps/wap-edit/WapEditOverlay'
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
        if (!(ev.target as HTMLElement).classList.contains('add-section-btn')) hoveredSectionHandler(ev)

    }

    const hoveredSectionHandler = (ev: MouseEvent) => {
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
        const position = foundSection ? getVerticalHalf(ev, foundSection.ref!) : addSectionPosition
        if (position !== addSectionPosition) setAddSectionPosition(position)
        if (!foundSection || foundSection !== hoveredSection) setHoveredSection(foundSection)
    }

    useEffect(() => {

        document.addEventListener('mousemove', hoverHandler)

        return () => {
            document.removeEventListener('mousemove', hoverHandler)
        }
    })

    return (
        <section className='wap-edit-page relative'>
            <div className="page-container flex">
                <div className="wap-edit-page__tool-sidebar"
                    style={{ height: calcTotalHeight([...sections, header, footer], media) }}></div>
                <main className='wap-edit-page__page grow-1 relative'>
                    {hoveredSection?.ref && hoveredSection.id !== selectedSection?.id &&
                        <WapEditHover section={hoveredSection} sections={[header, ...sections, footer]} media={media} buttonPosition={addSectionPosition} />}
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
                <WapEditOverlay wap={wap} sections={[header, ...sections, footer]} selectedSection={selectedSection} media={media} />
            </div>
        </section>
    )
}

export default WapEdit