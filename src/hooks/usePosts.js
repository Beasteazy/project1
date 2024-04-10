import {useMemo} from "react";

// ВОЗВРАЩАЕМ СРАЗУ useMemo() ЧТОБЫ НЕ БЫЛО ИЗБЫТОЧНЫХ ПЕРЕМЕННЫХ

export const useSortedPosts = (posts,sort) => {

    return useMemo(() => {
            if(sort) {
                return [...posts].sort((a,b) => a[sort].localeCompare(b[sort]));
            }
            return posts;
        },
        [sort,posts]
    );



}

export const  usePosts = (posts,sort,query) =>{

    const sortedPosts = useSortedPosts(posts,sort);

    return useMemo(() => {
            return sortedPosts.filter(post => post.title.toLowerCase().includes(query))
        },
        [query,sortedPosts]
    )

}

