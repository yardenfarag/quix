import { useEffect, useRef, useState } from 'react'
import { WapEditFooter } from '../cmps/wap-edit/WapEditFooter'
import { WapEditHeader } from '../cmps/wap-edit/WapEditHeader'
import { Overlay } from '../cmps/wap-edit/Overlay'
import { WapEditPanel } from '../cmps/wap-edit/WapEditPanel'
import { WapEditSection } from '../cmps/wap-edit/WapEditSection'
import { Cmp, Section } from '../interfaces/dynamic-element'
import { Wap } from '../interfaces/wap'
import { calcTotalHeight, getVerticalHalf, makeId } from '../services/util.service'
import { ToolSidebar } from '../cmps/wap-edit/ToolSidebar'

const WapEdit = () => {
    const [wap, setWap] = useState({
        id: makeId(),
        name: 'my wap',
        sections: [] as Section[],
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
    const [selectedElement, setSelectedElement] = useState<Cmp | null>(null)
    const [addedEl, setAddedEl] = useState<Cmp | null>(null)
    const [media, setMedia] = useState<'large' | 'medium' | 'small'>('large')
    const [grabMode, setGrabMode] = useState<string>('')
    const [isQuickView, setIsQuickView] = useState(false)
    const pageRef = useRef<HTMLElement>(null)
    const addedElRef = useRef<HTMLDivElement>(null)

    const [mouseRelPos, setMouseRelPos] = useState([0, 0])

    const [sections, setSections] = useState([
        {
            id: makeId(),
            name: '',
            cmps: [],
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '200px' } },
            ref: null,
        },
        {
            id: makeId(),
            name: '',
            cmps: [],
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '200px' } },
            ref: null
        },
        {
            id: makeId(),
            name: '',
            cmps: [],
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '200px' } },
            ref: null
        },
        {
            id: makeId(),
            name: '',
            cmps: [],
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '200px' } },
            ref: null
        }
    ] as Section[])

    const [header, setHeader] = useState({
        id: makeId(),
        name: 'site-header',
        kind: 'header',
        styles: { small: {}, medium: {}, large: { height: '60px' } },
        cmps: [],
        ref: null,
        panelRef: null
    } as Section)
    const [footer, setFooter] = useState({
        id: makeId(),
        name: 'site-footer',
        kind: 'footer',
        cmps: [],
        styles: { small: {}, medium: {}, large: { height: '60px' } },
        ref: null,
        panelRef: null
    } as Section)

    const mousemoveHandler = (ev: MouseEvent) => {
        if (grabMode === 'resize-section') return resizeSectionHandler(ev)
        if (grabMode === 'add-el') grabAddedEl(ev)
        // hoveredSectionHandler(ev)
    }

    const mouseupHandler = (ev: MouseEvent) => {
        if (grabMode === 'add-el') positionAddedEl(ev)
        setGrabMode('')
    }

    const mousedownHandler = (ev: MouseEvent) => {
        const foundSection = getSectionUnderPointer(ev)
        if (!foundSection) setSelectedSection(null)
    }

    const setHoveredSectionHandler = (ev: MouseEvent | null) => {
        if (!ev) return setHoveredSection(null)
        const section = getSectionUnderPointer(ev)
        setHoveredSection(section)
    }

    const addElHandler = (el: Cmp | null) => {
        setAddedEl(el)
        if (el) {
            setGrabMode('add-el')
            addedElRef.current!.hidden = false
            const { height, width } = el.styles[media]
            addedElRef.current!.style.height = height
            addedElRef.current!.style.width = width
        }
        else {
            addedElRef.current!.hidden = true
            setGrabMode('')
        }
    }

    const resizeSectionHandler = (ev: MouseEvent) => {
        const diff = ev.pageY < selectedSection!.ref!.getBoundingClientRect().top && ev.movementY > 0
            ? 0
            : window.innerHeight - ev.clientY < 10 && ev.movementY >= 0
                ? 5
                : ev.movementY
        const height = calcTotalHeight([selectedSection!], media) + diff + 'px'
        const styles = selectedSection!.styles
        styles[media] = { ...styles[media], height }
        selectedSection!.ref!.style.height = height
        selectedSection!.styles = styles
        setSelectedSection({ ...selectedSection! })
        if (ev.movementY >= 0 && window.innerHeight - ev.clientY < 10) (ev.target as HTMLElement).scrollIntoView({ block: 'end' })
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
            if (clientY >= y && clientY <= y + height) {
                foundSection = section
                break
            }
        }
        return foundSection
    }

    const grabAddedEl = (ev: MouseEvent) => {
        if (!addedEl || !addedElRef.current) return
        const { clientX, clientY } = ev
        addedElRef.current.style.left = clientX - mouseRelPos[0] + 'px'
        addedElRef.current.style.top = clientY - mouseRelPos[1] + 'px'
    }

    const positionAddedEl = (ev: MouseEvent) => {
        if (!addedEl) return
        const { clientX, clientY } = ev
        const targetSection = getSectionUnderPointer(ev)
        if (targetSection && targetSection.ref) {
            const { x, y } = targetSection.ref.getBoundingClientRect()
            addedEl.styles[media].top = clientY - y - mouseRelPos[1] + 'px'
            addedEl.styles[media].left = clientX - x - mouseRelPos[0] + 'px'
            targetSection.cmps = [...targetSection.cmps, addedEl]
        }

        setGrabMode('')
        setAddedEl(null)
        setMouseRelPos([0, 0])
        addedElRef.current!.hidden = true
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
        document.addEventListener('mousemove', mousemoveHandler)
        document.addEventListener('mousedown', mousedownHandler)
        document.addEventListener('mouseup', mouseupHandler)

        return () => {
            document.removeEventListener('mousemove', mousemoveHandler)
            document.removeEventListener('mousedown', mousedownHandler)
            document.removeEventListener('mousedown', mousedownHandler)
        }
    })

    return (
        <section className='wap-edit-page' >
            <div className="added-el absolute" ref={addedElRef}></div>
            <div className="page-container flex">
                <ToolSidebar setSelectedSection={setSelectedSection} setAddedEl={addElHandler} media={media} setMouseRelPos={setMouseRelPos} />
                {/* <WapEditPanel sections={[header, ...sections, footer]} media={media} /> */}


                <div className="main-container relative grow-1" onMouseMove={ev => setHoveredSectionHandler(ev.nativeEvent)} onMouseLeave={() => setHoveredSectionHandler(null)}>

                    <main className='wap-edit-page__page relative' ref={pageRef}>
                        {/* {[header, ...sections, footer].map(section => (<div key={`${section.id}-pseudo'`} className="absolute"></div>))} */}
                        {/* {hoveredSection && hoveredSection.ref && <div className="shadow-hover absolute"
                            style={{
                                height: hoveredSection.ref.offsetHeight + 'px',
                                width: '100vw',
                                zIndex: '-1',
                                top: hoveredSection.ref.getBoundingClientRect().top - 60 + 'px',
                                left:-hoveredSection.ref.getBoundingClientRect().left+'px',
                            }}
                        >

                        </div>} */}

                        <WapEditHeader header={header} media={media} selectedSection={selectedSection}
                            sections={[header, ...sections, footer]} grabMode={grabMode}
                            setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />
                        {sections.map((section) => {
                            return (<WapEditSection
                                key={`wap-${section.kind}__${section.id}}`}
                                sections={[header, ...sections, footer]} grabMode={grabMode}
                                setGrabMode={setGrabMode} setSelectedSection={setSelectedSection}
                                section={section} media={media} selectedSection={selectedSection}
                            />)
                        })}
                        <WapEditFooter footer={footer} media={media} selectedSection={selectedSection}
                            sections={[header, ...sections, footer]} grabMode={grabMode}
                            setGrabMode={setGrabMode} setSelectedSection={setSelectedSection} />
                        <div style={{ width: '100%', height: '60px' }}>

                        </div>

                    </main>
                    <Overlay pageRef={pageRef.current} wap={wap} sections={[header, ...sections, footer]} selectedSection={selectedSection} media={media} />
                </div>
            </div>
        </section >
    )
}

export default WapEdit