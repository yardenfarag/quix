export interface Section {
    id: string
    kind: string
    name: string
    styles: {
        small:{[key:string]:string}
        medium:{[key:string]:string}
        large:{[key:string]:string}
    }
    ref: HTMLElement | null,
    panelRef: HTMLElement | null
}