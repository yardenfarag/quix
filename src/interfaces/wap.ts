export interface Wap {
    id: string
    name: string
    imgUrl: string
    cmps: Cmp[]
    styles: {
        small: {[key: string]: string},
        medium: {[key: string]: string},
        large: {[key: string]: string},
    }
    margin:{
        small:number
        medium:number
        large:number
    }

}

export interface Cmp {
    id: string
    txt: string
    name: string
    kind: string
    styles: {
        small: {[key: string]: string},
        medium: {[key: string]: string},
        large: {[key: string]: string},
    }
}