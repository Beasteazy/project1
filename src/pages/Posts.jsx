import React, {useEffect, useState} from "react";
import '../styles/Posts.css';
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {

    //  СОСТОЯНИЯ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    const [posts,setPosts] = useState([]);

    const [filter,setFilter] = useState({sort: '', query: ''});

    const [modal,setModal] = useState(false);

    const [totalPages, setTotalPages] = useState(0);

    const [limit,setLimit] = useState(10);
    const [page, setPage] = useState(1);

    //  СОСТОЯНИЯ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



    //  КАСТОМНЫЙ ХУК usePosts() <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.query);

    //  КАСТОМНЫЙ ХУК usePosts() >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



    //  КАСТОМНЫЙ ХУК useFetching() <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const [fetchPosts, isPostsLoading, postError] =

        useFetching(async (limit,page) => {

                const response = await PostService.getAll(limit,page);
                setPosts(response.data);

                // console.log(response.headers['x-total-count']);

                const totalCount = response.headers['x-total-count'];
                setTotalPages(
                    getPageCount(totalCount, limit)
                );
            }

        );
    // console.log(totalPages);

    //  КАСТОМНЫЙ ХУК useFetching() >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



    //  ФУНКЦИИ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    const createPost = (newPost) => {
        setPosts([...posts,newPost]);
        setModal(false);
    }


    // Получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id) )
    }


    const changePage = (page) =>{
        setPage(page);
        fetchPosts(limit,page)
    }


    //  ФУНКЦИИ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>





    //  Хук useEffect <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    useEffect(() => {
            // console.log('USE EFFECT отработал');
            fetchPosts(limit, page);
        },
        []
    );

    //  Хук useEffect >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




    // КОРНЕВОЙ КОМПОНЕНТ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    return (
        <div className="App">

            <MyButton style = {{marginTop: 30}} /* */ onClick = {() => setModal(true)} >
                Создать пользователя
            </MyButton>

            <MyModal visible={modal} /* */ setVisible={setModal} >
                <PostForm create={createPost}/>
            </MyModal>


            <hr style={{margin: '15px 0'}}/>

            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }

            {isPostsLoading // ===true

                ? <div style={{display: 'flex', justifyContent: 'center',marginTop: 50}}>
                    <Loader/>
                </div>

                : <PostList remove={removePost} /* */ posts={sortedAndSearchedPost} /* */ title="Посты про JS"/>

            }

            <Pagination
                page = {page}
                changePage = {changePage}
                totalPages = {totalPages}
            />

        </div>
    );
}

// КОРНЕВОЙ КОМПОНЕНТ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


export default Posts;
