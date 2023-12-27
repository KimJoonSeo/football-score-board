import {createContext, useState} from "react";

const setCurrentPage: Function = () => {}
const setTotalCount: Function = () => {}
const PaginationContext = createContext({
    state: { currentPage: 1, totalCount: 1},
    actions: {
        setCurrentPage: setCurrentPage,
        setTotalCount: setTotalCount,
    }
})

const PaginationProvider = ({ children }: {children: any}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(1)

    const value = {
        state: { currentPage, totalCount },
        actions: { setCurrentPage, setTotalCount },
    }

    return (
        <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>
    )

}

export { PaginationContext, PaginationProvider }