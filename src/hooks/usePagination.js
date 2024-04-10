import {useMemo} from "react";
import {getPagesArray} from "../utils/pages";


export const usePagination = (totalPages) => {

    return  useMemo( () => {

        console.log([getPagesArray(totalPages)]);
        return getPagesArray(totalPages);
        },
        [totalPages]

    )

}

// export const usePagination = (totalPages) => {
//
//     const paginationArray = useMemo( () => {
//
//             let pagesArray = getPagesArray(totalPages);
//             console.log([pagesArray]);
//             return pagesArray;
//         },
//         [totalPages]
//
//     )
//     return paginationArray;
//
// }