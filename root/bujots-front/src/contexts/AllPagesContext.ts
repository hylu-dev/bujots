import { createContext } from "react";
import { IPage } from "./PageContext"

export interface IAllPagesContext {
    allPages: IPage[],
    setAllPages: (pages: IPage[]) => void
}

const AllPagesContext = createContext<IAllPagesContext>({
    allPages: [],
    setAllPages: (p => p)
})

export default AllPagesContext