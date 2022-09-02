export interface IJot {
    _id?: string,
    text: string
}

export interface IImage {
    _id: string,
    name: string
}

export interface IPage {
    _id: string,
    title: string,
    date: string,
    body: string,
    author: string,
    jots: any[],
    images: any[]
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
    images: []
}