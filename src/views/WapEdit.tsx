import React, { useRef, useState } from 'react'
import { WapEditFooter } from '../cmps/wap-edit/WapEditFooter'
import { WapEditHeader } from '../cmps/wap-edit/WapEditHeader'
import { WapEditOverlay } from '../cmps/wap-edit/WapEditOverlay'
import { WapEditPanel } from '../cmps/wap-edit/WapEditPanel'
import { WapEditSection } from '../cmps/wap-edit/WapEditSection'
import { Section } from '../interfaces/dynamic-element'
import { Cmp, Wap } from '../interfaces/wap'
import { calcTotalHeight, makeId } from '../services/util.service'

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
                <main className='wap-edit-page__page grow-1'>
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