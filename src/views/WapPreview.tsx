import React, { useState } from 'react'
import { Section } from '../interfaces/dynamic-element'
import { Wap } from '../interfaces/wap'
import { Cmp } from '../interfaces/dynamic-element'
import DynEl from '../cmps/general/DynEl'
import CmpList from '../cmps/wap-preview/CmpList'

const DUMMY_WAP = {
    id: '1',
    name: 'my wap',
    sections: [
        {
            id: 'a',
            name: 'header',
            cmps: [
                {
                    id: 'z',
                    txt: 'im h1',
                    name: 'h1',
                    tag: 'h1',
                    kind: 'text',
                    parent: null,
                    styles: {
                        small: {},
                        medium: {},
                        large: {height: '100px', backgroundColor: '#ddc'},
                    },
                    ref: null,
                    attributes: 'h1'
                }
            ] as Cmp[],
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '200px', backgroundColor: '#bfb' } },
            ref: null,
        },
        {
            id: 'b',
            name: 'main',
            cmps: [
                {
                    id: 'x',
                    txt: 'im p',
                    name: 'p',
                    tag: 'p',
                    kind: 'text',
                    parent: null,
                    styles: {
                        small: {},
                        medium: {},
                        large: {height: '100px', backgroundColor: '#bfb'},
                    },
                    ref: null,
                    attributes: 'p'
                }
            ] as Cmp[],
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '200px', backgroundColor: '#fbb' } },
            ref: null
        },
        {
            id: 'c',
            name: 'banner',
            cmps: [
                {
                    id: 'k',
                    txt: 'im button',
                    name: 'button',
                    tag: 'button',
                    kind: 'text',
                    parent: null,
                    styles: {
                        small: {},
                        medium: {},
                        large: {height: '100px', backgroundColor: '#fbb'},
                    },
                    ref: null,
                    attributes: 'button'
                }
            ] as Cmp[],
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '200px', backgroundColor: '#bbf' } },
            ref: null
        },
        {
            id: 'd',
            name: 'footer',
            cmps: [
                {
                    id: 'f',
                    txt: 'im input',
                    name: 'input',
                    kind: 'text',
                    tag: 'input',
                    parent: null,
                    styles: {
                        small: {},
                        medium: {},
                        large: {height: '100px', backgroundColor: '#bbf'},
                    },
                    ref: null,
                    attributes: 'input'
                }
            ] as Cmp[],
            kind: 'section',
            styles: { small: {}, medium: {}, large: { height: '200px', backgroundColor: '#ddc' } },
            ref: null
        }
    ] as Section[],
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

const WapPreview = () => {
    const [wap, setWap] = useState(DUMMY_WAP)
    const sections = wap.sections

    const styles = { height: '200px', color: 'yellow' }

    return (
        <>
            {sections.map(sect => {
                return <section key={sect.id} style={sect.styles.large}>
                    <p>{sect.name} section</p>
                     <CmpList cmps={sect.cmps}/>
                </section>
            })}
        </>
    )
}

export default WapPreview