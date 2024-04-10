import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {

    const params = useParams();

    const [post,setPost] = useState({});

    const [comments,setComments] = useState([]);

    const [fetchPostById, isLoading, error] =
        useFetching (async (id)=> {
            const response = await PostService.getById(id);
            setPost(response.data);
            }
        );

    const [fetchComments, isCommLoading, comError] =
        useFetching (async (id)=> {
                const response = await PostService.getCommentsByPostId(id);
                setComments(response.data);
            }
        );

    useEffect( () => {
        fetchPostById(params.id)
        fetchComments(params.id)
        },
        []
    );

    return (
        <div>
            <h1>Вы открыли страницу поста № {params.id} </h1>

            {isLoading

                ? <Loader/>

                : <div>{post.id}. {post.title}</div>
            }

            <h1 style={{marginTop:'30px'}} >
                Комментарии
            </h1>

            {isCommLoading

                ? <Loader/>

                : <div>
                    {comments.map(comm =>
                        <div style={{marginTop:'30px'}} >
                            <h5>{comm.email}</h5>
                            <h5>{comm.body}</h5>
                        </div>
                    )}
                </div>
            }

        </div>
    );
};

export default PostIdPage;