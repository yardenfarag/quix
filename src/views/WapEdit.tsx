import { useEffect, useRef, useState } from 'react'
import { WapEditFooter } from '../cmps/wap-edit/WapEditFooterSection'
import { WapEditHeader } from '../cmps/wap-edit/WapEditHeader'
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
        styles: {
            small: {},
            medium: {},
            large: {
                margin: '40px',
                maxWidth: '800px'
            }
        },
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
    const [grabMode, setGrabMode] = useState<string>('')
    const pageRef = useRef<HTMLElement>(null)

    const [sections, setSections] = useState([
        {
            id: makeId(),
            name: '',
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '200px' } },
            ref: null,
            panelRef: null
        },
        {
            id: makeId(),
            name: '',
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '200px' } },
            ref: null,
            panelRef: null
        },
        {
            id: makeId(),
            name: '',
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '200px' } },
            ref: null,
            panelRef: null
        },
        {
            id: makeId(),
            name: '',
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '200px' } },
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

    const mouseoverHandler = (ev: MouseEvent) => {
        if (grabMode === 'resize-section') return resizeSectionHandler(ev)
        // hoveredSectionHandler(ev)
    }

    const mouseupHandler = (ev: MouseEvent) => {
        setGrabMode('')
    }

    const mousedownHandler = (ev: MouseEvent) => {
        // const foundSection = getSectionUnderPointer(ev)
        // if (selectedSection !== foundSection) setSelectedSection(foundSection)
    }

    const resizeSectionHandler = (ev: MouseEvent) => {
        const diff = ev.pageY < selectedSection!.ref!.getBoundingClientRect().top && ev.movementY > 0
            ? 0
            : window.innerHeight - ev.clientY < 10
                ? 5
                : ev.movementY
        const height = calcTotalHeight([selectedSection!], media) + ev.movementY + 'px'
        const styles = selectedSection!.styles
        styles[media] = { ...styles[media], height }
        selectedSection!.ref!.style.height = height
        selectedSection!.panelRef!.style.height = height
        selectedSection!.styles = styles
        setSelectedSection({ ...selectedSection! })
        // if (ev.movementY < 0) (ev.target as HTMLElement).scrollIntoView(false)
        // if (window.innerHeight - ev.clientY)(ev.target as HTMLElement).scrollIntoView({block:'end'})
        // if (ev.movementY < 0) pageRef.current!.style.height = calcTotalHeight([header, ...sections, footer], media) + 'px'
        // ;(ev.target as HTMLElement).scrollIntoView()
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
        if (target.classList.contains('btn')) return

        const foundSection = getSectionUnderPointer(ev)
        const position = foundSection ? getVerticalHalf(ev, foundSection.ref!) : addSectionPosition
        if (position !== addSectionPosition) setAddSectionPosition(position)

        if (!foundSection || foundSection !== hoveredSection) setHoveredSection(foundSection)
    }

    useEffect(() => {
        document.addEventListener('mousemove', mouseoverHandler)
        document.addEventListener('mousedown', mousedownHandler)
        document.addEventListener('mouseup', mouseupHandler)

        return () => {
            document.removeEventListener('mousemove', mouseoverHandler)
            document.removeEventListener('mousedown', mousedownHandler)
            document.removeEventListener('mousedown', mousedownHandler)
        }
    })

    return (
        <section className='wap-edit-page relative' onClick={()=>setSelectedSection(null)}>
            <div className="page-container flex">
                <div className="wap-edit-page__tool-sidebar"></div>
                <main className='wap-edit-page__page grow-1 relative' ref={pageRef}>
                    <WapEditHeader header={header} media={media} selectedSection={selectedSection}
                            sections={[header,...sections,footer]} grabMode={grabMode}
                            setGrabMode={setGrabMode} setSelectedSection={setSelectedSection}/>
                    {sections.map((section) => {
                        return (<WapEditSection
                            key={`wap-${section.kind}__${section.id}}`}
                            sections={[header,...sections,footer]} grabMode={grabMode}
                            setGrabMode={setGrabMode} setSelectedSection={setSelectedSection}
                            section={section} media={media} selectedSection={selectedSection}
                        />)
                    })}
                    <WapEditFooter footer={footer} media={media} selectedSection={selectedSection}
                            sections={[header,...sections,footer]} grabMode={grabMode}
                            setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />
                    <div style={{width:'100%',height:'60px'}}>

                    </div>

                </main>
                <WapEditPanel sections={[header, ...sections, footer]} media={media} />
                <Overlay pageRef={pageRef.current} wap={wap} sections={[header, ...sections, footer]} selectedSection={selectedSection} media={media} />
            </div>
        </section>
    )
}

export default WapEdit