export interface Wap {
    id: string
    name: string
    imgUrl: string
    cmps: Cmp[]

}

export interface Cmp {
    id: string
    txt: string
    style: {}
}