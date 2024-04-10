import React from 'react';
import cl from './Pagination.module.css'
import {usePagination} from "../../../hooks/usePagination";

const Pagination = ({totalPages,page,changePage}) => {

    const pagesArray = usePagination(totalPages) ;

    return (
        <div className={cl.page_wrapper}>
            {pagesArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? cl.page__current + ' ' + cl.page : cl.page}
                >
                      {p}
                  </span>
            )}
        </div>
    );
};

export default Pagination;