import React, { useRef, useState } from 'react'
import { Section } from '../interfaces/dynamic-element'
import { Cmp, Wap } from '../interfaces/wap'
import { calcTotalHeight, makeId } from '../services/util.service'

const WapEdit = () => {
    const [site, setSite] = useState({
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
    const [selectedSection, setSelectedSection] = useState<HTMLElement | null>(null)
    const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null)
    const [media, setMedia] = useState<'large' | 'medium' | 'small'>('large')

    const [sections, setSections] = useState([
        {
            id: makeId(),
            name: 'default',
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

    return (
        <section className='wap-edit-page relative'>
            <div className="page-container flex">
                <div className="wap-edit-page__tool-sidebar"
                    style={{ height: calcTotalHeight([...sections, header, footer], media) }}></div>
                <div className='wap-edit-page__page grow-1'>
                    {[header, ...sections, footer].map((section) => {
                        return (<div
                            data-id={section.id}
                            data-kind={section.kind}
                            key={`wap-${section.kind}__${section.id}}`}
                            ref={ref => section.ref = ref}
                            className={`wap-${section.kind} ${selectedSection ? '' : 'dashed'}`}
                            style={{ ...section.styles[media] }}
                        >
                        </div>)
                    })}

                </div>
                <div className='wap-edit-page__side-panel'>
                    {[header, ...sections, footer].map((section) => {
                        return (<div
                            data-id={section.id}
                            data-kind={section.kind}
                            key={`wap-${section.kind}-panel__${section.id}}`}
                            ref={ref => section.panelRef = ref}
                            className={`wap-${section.kind}-panel`}
                            style={{ height: section.styles[media].height }}
                        >
                        </div>)
                    })}
                </div>

                <div className="wap-edit-page__overlay absolute flex column"
                    style={
                        {
                            height: calcTotalHeight([...sections, header, footer], media),
                        }}
                >
                    {[header, ...sections, footer].map(section => {
                        return (<div
                            data-id={section.id}
                            data-kind={section.kind}
                            className={`wap-overlay grow-1 ${section.kind} ${selectedSection ? '' : 'dashed'}`}
                            style={{height: section.styles[media].height}}
                            key={`wap-overlay-${section.kind}__${section.id}}`}>
                            <div className="dashed-pseudo" style={{ 
                                marginInline: site.margin[media] + 'px',
                                width: `calc(100% - ${2*site.margin[media]})`}}></div>
                        </div>)
                    })}
                </div>
            </div>
        </section>
    )
}

export default WapEdit