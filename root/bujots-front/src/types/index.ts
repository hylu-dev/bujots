export interface IJot {
    _id?: string,
    text: string
}

export interface IImage {
    _id: string,
    name?: string,
    source?: string
}

export interface ISticker {
    _id?: string
    position: [number, number],
    image_id: string
}

export interface IPage {
    _id: string,
    title: string,
    date: string,
    body: string,
    author: string,
    jots: IJot[],
    stickers: ISticker[]
}

export const emptyJot: IJot = {
    text: ""
}

export const emptyPage: IPage = {
    _id: "",
    title: "",
    date: new Date().toString(),
    body: "",
    author: "",
    jots: [],
    stickers: []
}