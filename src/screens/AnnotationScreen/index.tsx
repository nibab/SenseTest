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

export const AnnotationScreen = ({ }) => {
    // Posts
    const [getPostsFetchInProgress, setGetPostsFetchInProgress] = useState(false)
    const dispatch = useDispatch()

    const getPosts = () => {
        setGetPostsFetchInProgress(true)
        PostsClient.getPostsForProject('1').then((response) => {
            const data = response['data']
        }).catch((err) => {
            //debugger
        })
    }

    const getPostsGraphQl = async () => {
        const query: ModelPostFilterInput = {
            projectId: {
                eq: '1'
            }
        }
        try {
            const response = await API.graphql(graphqlOperation(listPosts, {filter: query})) as { data: ListPostsQuery }
            if (response.data.listPosts !== null) {
                const posts = response.data.listPosts.items
                posts?.forEach(async (post) => {
                    if (post !== null) {
                        const newPost: Post = {
                            id: post?.id,    
                            image: new PostImgDownload(post?.id, (blob) => {
                                const _post = {
                                    id: post?.id,
                                    image: blob,
                                    projectId: '1'
                                }
                                dispatch(addPost(_post))
                                console.log('blea updated post in store')
                            }),
                            projectId: '1'
                        }
                        dispatch(addPost(newPost))
                    }
                })
            }            
        } catch {
            console.log("Couldnt get all posts.")
        }
    }

    useEffect(() => {
        getPosts()
        getPostsGraphQl()
    }, [])

    return (
        <div>
            <h4>Annotation </h4>
            <div style={{ display: 'flex', width: '100%' }}>
                <AppetizeScreen />
                <PostsGrid />
                {/* {renderAnnotationCardDetailView()} */}
            </div>
        </div>
    )
}

export default AnnotationScreen;





