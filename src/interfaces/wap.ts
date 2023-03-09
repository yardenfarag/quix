export interface Wap {
    id: string
    name: string
    imgUrl: string
    cmps: Cmp[]
    margin:{
        small:number
        medium:number
        large:number
    }

}

export interface Cmp {
    id: string
    txt: string
    style: {}
}