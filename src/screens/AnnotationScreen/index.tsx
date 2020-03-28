import React, { useState, useRef, useEffect } from "react"
import { PostsClient } from '../../clients/PostsClient'
import { Post } from "../../types";
import { API, graphqlOperation } from "aws-amplify";
import { listPosts } from "../../graphql/queries"
import { ListPostsQuery, ModelPostFilterInput, CreatePostInput } from "../../API";
import { useSelector as useReduxSelector, useDispatch } from "react-redux";
import { addPost } from '../../store/post/actions'
import { PostImgDownload } from "../../utils/PostImgDownload";
import { PostsGrid } from "./PostsGrid";
import { AppetizeScreen } from './AppetizeScreen'
import Log from "../../utils/Log";
import { Loading } from "aws-amplify-react";

export const AnnotationScreen = ({ }) => {
    // Posts
    const [getPostsFetchInProgress, setGetPostsFetchInProgress] = useState(false)
    const dispatch = useDispatch()


    
    const getPostsGraphQl = async (projectId: string) => {
        const query: ModelPostFilterInput = {
            projectId: {
                eq: projectId
            }
        }
        try {
            setGetPostsFetchInProgress(true)
            const response = await API.graphql(graphqlOperation(listPosts, {filter: query})) as { data: ListPostsQuery }
            setGetPostsFetchInProgress(false)
            if (response.data.listPosts !== null) {
                const posts = response.data.listPosts.items
                posts?.forEach(async (post) => {
                    if (post !== null) {
                        const postImgDownload = new PostImgDownload(post, (blob) => {})
                        const newPost = await postImgDownload.imagePromise
                        // We want to make sure that after a post image is fully downloaded, it's updated in the redux store.
                        // const newPost: Post = {
                        //     id: post?.id,    
                        //     image: ,
                        //     projectId: projectId,
                        //     text: post.text
                        // }
                        dispatch(addPost(newPost))
                    }
                })
            }            
        } catch {
            setGetPostsFetchInProgress(false)
            Log.error("There was an issue getting all posts.", "AnnotationScreen")
        }
    }

    useEffect(() => {
        getPostsGraphQl('1')
    }, [])

    return getPostsFetchInProgress ? <Loading /> : (
        <div>
            <h4>Annotation </h4>
            <div style={{ display: 'flex', width: '100%' }}>
                <AppetizeScreen />
                <PostsGrid />
            </div>
        </div>
    )
}

export default AnnotationScreen;





