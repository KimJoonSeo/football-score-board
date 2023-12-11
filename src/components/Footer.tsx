import {Layout, Pagination} from "antd";
import React, {useContext} from "react";
import {PaginationContext} from "../contexts";

const Footer: React.FC = () => {
    const { state, actions} = useContext(PaginationContext)
    return (
        <Layout.Footer style={{textAlign: 'center', padding: 0}}>
            <Pagination defaultCurrent={state.currentPage} total={state.totalCount}
                        pageSize={12} onChange={page => {actions.setCurrentPage(page)}}/>
        </Layout.Footer>
    )
}

export default Footer