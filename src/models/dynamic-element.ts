import React from "react"
import { Wap } from "./wap"

export interface Section {
    id: string
    kind: string
    name: string
    styles: {
        small:{[key:string]:string}
        medium:{[key:string]:string}
        large:{[key:string]:string}
    }
    cmps: Cmp[]
    ref?: HTMLElement
}

export interface Kind {
    title: string;
    categories: {
        title: string;
        items: Cmp[];
    }[];
}

export interface Cmp {
    id: string
    txt?: string
    name: string
    parent: Section | null
    tag: keyof JSX.IntrinsicElements
    prevTag?: keyof JSX.IntrinsicElements
    containerRef?: HTMLElement
    kind: string
    styles: {
        small: {[key: string]: string},
        medium: {[key: string]: string},
        large: {[key: string]: string},
    }
    ref?: HTMLElement
    attributes?: React.HTMLAttributes<Element>
}