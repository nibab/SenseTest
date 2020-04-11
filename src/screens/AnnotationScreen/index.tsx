import React, { useState, useEffect } from "react"
import { Post } from "../../types"
import { Loading } from "aws-amplify-react"
import { useSelector } from "../../store"
import { DataLayerClient } from "../../clients/DataLayerClient"
import { useDispatch } from "react-redux"
import PostView from "./PostView"
import CreatePostView from "./CreatePostView"
import { ModelPostFilterInput, ListPostsQuery } from "../../API"
import { graphqlOperation, API } from "aws-amplify"
import { listPosts } from "../../graphql/queries"
import { PostImgDownload } from "../../utils/PostImgDownload"
import { addPost } from "../../store/post/actions"
import Log from "../../utils/Log"
import PostFooterBar from "./PostsFooterBar.tsx"

export const AnnotationScreen = ({ }) => {
    // Posts
    const [getPostsFetchInProgress, setGetPostsFetchInProgress] = useState(false)
    const postsSelector = useSelector(state => state.post)
    const [currentPost, setCurrentPost] = useState<Post>()
    const [displayCreateNewPost, setDisplayCreateNewPost] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getPostsAndStoreInRedux = async (projectId: string) => {
        const query: ModelPostFilterInput = {
            projectId: {
                eq: projectId
            }
        }
        try {
            const response = await API.graphql(graphqlOperation(listPosts, {filter: query})) as { data: ListPostsQuery }
            if (response.data.listPosts !== null) {
                const posts = response.data.listPosts.items
                posts?.forEach(async (post) => {
                    if (post !== null) {
                        const postImgDownload = new PostImgDownload(post, (blob) => {})
                        const newPost = await postImgDownload.imagePromise
                        dispatch(addPost(newPost))
                    }
                })
            }            
        } catch {
            Log.error("There was an issue getting all posts.", "AnnotationScreen")
        }
    }

    useEffect(() => {
        getPostsAndStoreInRedux('1')
    }, [])

    const renderPostDetailView = () => {
        if (!displayCreateNewPost) {
            if (currentPost) {
                return (<PostView post={currentPost} />) 
            }
        } else {
            return (<CreatePostView />)
        }
        
    }

    return getPostsFetchInProgress ? <Loading /> : (
        <>
        {/* <PostHeader></PostHeader> */}
        <div className="flex flex-row h-full bg-gray-100 relative">  
            { renderPostDetailView() }
        </div>
        <PostFooterBar posts={postsSelector.posts} currentPost={currentPost} setCurrentPost={setCurrentPost} setDisplayCreateNewPost={setDisplayCreateNewPost} />
        </>
        
    )
}

export default AnnotationScreen;





