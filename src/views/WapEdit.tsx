import { useEffect, useRef, useState } from 'react'
import { Overlay } from '../cmps/wap-edit/Overlay'
import { WapEditSection } from '../cmps/wap-edit/section/WapEditSection'
import { Cmp, Section } from '../interfaces/dynamic-element'
import { Wap } from '../interfaces/wap'
import { calcTotalHeight, extractValueFromTransform, getRotationAngleDiff, handleTransformChange, makeId } from '../services/util.service'
import { ToolSidebar } from '../cmps/wap-edit/ToolSidebar'

const WapEdit = () => {
    // const [wap, setWap] = useState({
    //     id: makeId(),
    //     name: 'my wap',
    //     sections: [] as Section[],
    //     imgUrl: '',
    //     styles: {
    //         small: {},
    //         medium: {},
    //         large: {
    //             margin: '40px',
    //             maxWidth: '800px'
    //         }
    //     },
    //     margin: {
    //         small: 40,
    //         medium: 40,
    //         large: 40
    //     }
    // } as Wap)
    const wap = {
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
    } as Wap
    const [selectedSection, setSelectedSection] = useState<Section | null>(null)
    // const selectedSection = useRef<Section | null>(null)
    // const [hoveredSection, setHoveredSection] = useState<Section | null>(null)
    // const [addSectionPosition, setAddSectionPosition] = useState<'top' | 'bottom'>('bottom')
    // const [selectedEl.current, setSelectedEl] = useState<Cmp | null>(null)
    const selectedEl = useRef<Cmp | null>(null)
    // const [addedEl, setAddedEl] = useState<Cmp | null>(null)
    const addedEl = useRef<Cmp | null>(null)
    const [media, setMedia] = useState<'large' | 'medium' | 'small'>('large')
    // const [grabMode, grabMode.current=] = useState<string>('')
    const grabMode = useRef('')
    // const [isQuickView, setIsQuickView] = useState(false)
    const pageRef = useRef<HTMLElement>(null)
    const [page, setPage] = useState<HTMLElement | null>(pageRef.current)
    const addedElRef = useRef<HTMLDivElement>(null)
    // const [mouseStartPos, setMouseStartPos] = useState({ x: 0, y: 0 })
    const mouseStartPos = useRef({ x: 0, y: 0 })
    // const [mouseRelPos, setMouseRelPos] = useState([0, 0])
    const mouseRelPos = useRef({ x: 0, y: 0 })
    const [userSelect, setUserSelect] = useState('auto' as 'auto'|'none')

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
            cmps: [
                {
                    id: "Phmr9-tzEbS",
                    txt: "Helvetica Light is an easy-to-read font, with tall and narrow letters, that works well on almost every site.",
                    name: "paragraph",
                    parent: null,
                    tag: "p",
                    kind: 'text',
                    styles: {
                        small: {},
                        medium: {},
                        large: {
                            height: "55.5px",
                            width: "310px",
                            top: "29px",
                            left: "313px"
                        }
                    },
                    attributes: { className: 'dyn-el text' },
                    ref: null
                } as Cmp
            ] as Cmp[],
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


    const connectCmpsAndParents = () => [header, footer, ...sections].forEach(section => section.cmps.forEach(cmp => cmp.parent = section))

    const setGrabMode = (mode = '') => { 
        grabMode.current = mode
        if (!mode) setUserSelect('auto')
        else setUserSelect('none')
    }
    const setSelectedEl = (el: Cmp | null = null) => { selectedEl.current = el }
    // const setSelectedSection = (section: Section | null = null) => selectedSection = section
    const setAddedEl = (el: Cmp | null = null) => { addedEl.current = el }
    const setMouseRelPos = ({ x, y } = { x: 0, y: 0 }) => { mouseRelPos.current = { x, y } }
    const setMouseStartPos = ({ x, y } = { x: 0, y: 0 }) => mouseStartPos.current = { x, y }

    const mousemoveHandler = (ev: MouseEvent) => {
        if (grabMode.current === 'resize-section') return resizeSectionHandler(ev)
        if (grabMode.current === 'add-el') grabAddedEl(ev)
        if (grabMode.current === 'rotate-el') elRotationHandler(ev)
        // hoveredSectionHandler(ev)
    }

    const mouseupHandler = (ev: MouseEvent) => {
        if (grabMode.current === 'add-el') positionAddedEl(ev)
        if (grabMode.current === 'rotate-el') endElRotation(ev)
        setGrabMode('')
    }

    const mousedownHandler = (ev: MouseEvent) => {
        const foundSection = getSectionUnderPointer(ev)
        if (!foundSection) setSelectedSection(null)
    }

    // const setHoveredSectionHandler = (ev: MouseEvent | null) => {
    //     if (!ev) return setHoveredSection(null)
    //     const section = getSectionUnderPointer(ev)
    //     setHoveredSection(section)
    // }

    const elSelectedHandler = (el: Cmp) => {
        if (selectedEl.current?.id !== el.id) setSelectedEl(el)
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
        if (!selectedSection?.ref) return
        const diff = ev.pageY < selectedSection.ref.getBoundingClientRect().top && ev.movementY > 0
            ? 0
            : window.innerHeight - ev.clientY < 10 && ev.movementY >= 0
                ? 5
                : ev.movementY
        const height = calcTotalHeight([selectedSection], media) + diff + 'px'
        const styles = selectedSection.styles
        styles[media] = { ...styles[media], height }
        selectedSection.ref!.style.height = height
        selectedSection.styles = styles
        setSelectedSection({ ...selectedSection })
        if (ev.movementY >= 0 && window.innerHeight - ev.clientY < 10) (ev.target as HTMLElement).scrollIntoView({ block: 'end' })
        // if (ev.movementY < 0) (ev.target as HTMLElement).scrollIntoView(false)
        // if (window.innerHeight - ev.clientY)(ev.target as HTMLElement).scrollIntoView({block:'end'})
        // if (ev.movementY < 0) page!.style.height = calcTotalHeight([header, ...sections, footer], media) + 'px'
        // ;(ev.target as HTMLElement).scrollIntoView()
    }

    const getSectionUnderPointer = (ev: MouseEvent) => {
        const { clientY } = ev
        let foundSection: Section | null = null
        for (let section of [header, ...sections, footer]) {
            if (!section.ref) continue
            const { y, height } = section.ref.getBoundingClientRect()
            if (clientY >= y && clientY <= y + height) {
                foundSection = section
                break
            }
        }
        return foundSection
    }

    const grabAddedEl = (ev: MouseEvent) => {
        if (!addedEl.current || !addedElRef.current) return
        const { clientX, clientY } = ev
        addedElRef.current.style.left = clientX - mouseRelPos.current.x + 'px'
        addedElRef.current.style.top = clientY - mouseRelPos.current.y + 'px'
    }

    const positionAddedEl = (ev: MouseEvent) => {
        if (!addedEl.current) return
        const { clientX, clientY } = ev
        const targetSection = getSectionUnderPointer(ev)
        if (targetSection && targetSection.ref) {
            const { x, y } = targetSection.ref.getBoundingClientRect()
            addedEl.current.styles[media].top = clientY - y - mouseRelPos.current.y + 'px'
            addedEl.current.styles[media].left = clientX - x - mouseRelPos.current.x + 'px'
            targetSection.cmps = [...targetSection.cmps, addedEl.current]
        }

        setGrabMode('')
        setAddedEl(null)
        setMouseRelPos()
        addedElRef.current!.hidden = true
        setSections([...sections])
    }

    const onElEditHandler = (el: Cmp) => {
        if (el.tag === 'textarea') return
        el.prevTag = el.tag
        el.tag = 'textarea'
        el.attributes = {
            ...(el.attributes || {}), defaultValue: el.txt || '',
        }
        delete el.txt
        selectedSection!.cmps = selectedSection!.cmps.map(c => c.id === el.id ? el : c)
        setSections([...sections])
    }

    const onSaveElHandler = (el: Cmp, txt: string) => {
        if (el.tag !== 'textarea') return
        el.txt = txt
        el.tag = el.prevTag!
        delete el.attributes?.onBlur
        delete el.prevTag
        delete el.attributes?.defaultValue
        selectedSection!.cmps = selectedSection!.cmps.map(c => c.id === el.id ? el : c)
        setSections([...sections])
    }

    const elRotationHandler = (ev: MouseEvent) => {
        if (!selectedEl.current?.ref) return
        const { clientX: x, clientY: y } = ev
        const startAngle = extractValueFromTransform(selectedEl.current.styles[media], 'rotate')
        const newAngle = getRotationAngleDiff(selectedEl.current!.ref!, mouseStartPos.current, { x, y })
        const styles = handleTransformChange(selectedEl.current!.styles[media], `rotate(${newAngle + startAngle}deg)`)
        selectedEl.current.containerRef!.style.transform = styles.transform
    }

    const startElRotation = (ev: MouseEvent, el: Cmp) => {
        const { clientX: x, clientY: y } = ev
        setMouseStartPos({ x, y })
        setSelectedEl(el)
        setGrabMode('rotate-el')
    }

    const endElRotation = (ev: MouseEvent) => {
        if (!selectedEl.current?.ref) return
        const { clientX: x, clientY: y } = ev
        const startAngle = extractValueFromTransform(selectedEl.current.styles[media], 'rotate')
        const angle = getRotationAngleDiff(selectedEl.current!.ref!, mouseStartPos.current, { x, y }) + startAngle
        const styles = handleTransformChange(selectedEl.current!.styles[media], `rotate(${angle}deg)`)
        selectedEl.current.styles[media] = styles
        setMouseStartPos({ x: 0, y: 0 })
    }

    // const hoveredSectionHandler = (ev: MouseEvent) => {
    //     const target = ev.target! as HTMLElement
    //     if (target.classList.contains('btn')) return

    //     const foundSection = getSectionUnderPointer(ev)
    //     const position = foundSection ? getVerticalHalf(ev, foundSection.ref!) : addSectionPosition
    //     if (position !== addSectionPosition) setAddSectionPosition(position)

    //     if (!foundSection || foundSection !== hoveredSection) setHoveredSection(foundSection)
    // }

    useEffect(() => {
        document.addEventListener('mousemove', mousemoveHandler)
        document.addEventListener('mousedown', mousedownHandler)
        document.addEventListener('mouseup', mouseupHandler)
        if (pageRef.current) setPage(pageRef.current)
        connectCmpsAndParents()
        return () => {
            document.removeEventListener('mousemove', mousemoveHandler)
            document.removeEventListener('mousedown', mousedownHandler)
            document.removeEventListener('mousedown', mousedownHandler)
        }
    }, [pageRef.current, userSelect])

    return (
        <section className='wap-edit-page' style={{ userSelect}} >
            <div className="added-el absolute" ref={addedElRef}></div>
            <div className="page-container flex">
                <ToolSidebar setSelectedSection={setSelectedSection} setAddedEl={addElHandler} media={media} setMouseRelPos={setMouseRelPos} />
                <div className="main-container relative grow-1">
                    <main className='wap-edit-page__page relative' ref={pageRef}>
                        <WapEditSection section={header} media={media} selectedSection={selectedSection}
                            sections={[header, ...sections, footer]} grabMode={grabMode.current}
                            setGrabMode={setGrabMode} setSelectedSection={setSelectedSection}
                            pageRef={page!} onEditElHandler={onElEditHandler}
                            onSaveElHandler={onSaveElHandler} onSelectEl={elSelectedHandler}
                            onStartRotate={startElRotation} selectedEl={selectedEl.current}
                        />
                        {sections.map((section) => {
                            return (<WapEditSection
                                key={`wap-${section.kind}__${section.id}}`}
                                setGrabMode={setGrabMode} sections={[header, ...sections, footer]} grabMode={grabMode.current}
                                setSelectedSection={setSelectedSection}
                                section={section} media={media} selectedSection={selectedSection}
                                pageRef={page!} onEditElHandler={onElEditHandler}
                                onSaveElHandler={onSaveElHandler} onSelectEl={elSelectedHandler}
                                onStartRotate={startElRotation} selectedEl={selectedEl.current}
                            />)
                        })}
                        <WapEditSection section={footer} media={media} selectedSection={selectedSection}
                            sections={[header, ...sections, footer]} grabMode={grabMode.current}
                            setGrabMode={setGrabMode} setSelectedSection={setSelectedSection}
                            pageRef={page!} onEditElHandler={onElEditHandler}
                            onSaveElHandler={onSaveElHandler} onSelectEl={elSelectedHandler}
                            onStartRotate={startElRotation} selectedEl={selectedEl.current}
                        />
                        <div style={{ width: '100%', height: '60px' }}></div>
                    </main>
                    <Overlay pageRef={page!} wap={wap} sections={[header, ...sections, footer]} selectedSection={selectedSection} media={media} />
                </div>
            </div>
        </section >
    )
}

export default WapEdit