import { createContext } from "react";

export interface IPage {
    _id: string,
    title: string,
    date: Date,
    body: string,
    author: string,
    jots: any[],
    images: any[]
}

export interface IPageContext {
    page: IPage,
    setPage: (page: IPage) => void
}

export const emptyPage: IPage = {
    _id: "",
    title: "",
    date: new Date(),
    body: "",
    author: "",
    jots: [],
    images: []
}

const PageContext = createContext<IPageContext>({
    page: {
        _id: "",
        title: "",
        date: new Date(),
        body: "",
        author: "",
        jots: [],
        images: []
    },
    setPage: (p => p)
})

export default PageContext