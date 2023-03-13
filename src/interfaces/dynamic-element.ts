import React from "react"

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
    ref: HTMLElement | null
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
    containerRef?: HTMLElement | null
    kind: string
    styles: {
        small: {[key: string]: string},
        medium: {[key: string]: string},
        large: {[key: string]: string},
    }
    ref: HTMLElement | null
    attributes?: React.HTMLAttributes<Element>
}