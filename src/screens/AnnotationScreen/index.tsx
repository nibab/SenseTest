import React, { useState, useEffect } from "react"
import { Post, Comment } from "../../types"
import { Loading } from "aws-amplify-react"
import { useSelector } from "../../store"
import { DataLayerClient } from "../../clients/DataLayerClient"
import { useDispatch } from "react-redux"
import PostView from "./PostView"
import CreatePostView from "./CreatePostView"
import { ModelPostFilterInput, ListPostsQuery, GetPostQuery } from "../../API"
import { graphqlOperation, API } from "aws-amplify"
import { listPosts, getPost } from "../../graphql/queries"
import { PostImgDownload } from "../../utils/PostImgDownload"
import { addPost } from "../../store/post/actions"
import Log from "../../utils/Log"
import PostFooterBar from "./PostsFooterBar.tsx"
import { ReleaseStatusBar } from "./ReleaseStatusBar"
import { PostToolbar } from "./PostToolbar"
import { addComment } from "../../store/comment/actions"

export const AnnotationScreen = ({ }) => {
    // Posts
    const [getPostsFetchInProgress, setGetPostsFetchInProgress] = useState(false)
    const postsSelector = useSelector(state => state.post)
    const [currentPost, setCurrentPost] = useState<Post>()
    const [displayCreateNewPost, setDisplayCreateNewPost] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getAllCommentsForPost = async (postId: string) => { 
        const query = {
            id: postId
        }
        const _post = await API.graphql(graphqlOperation(getPost, query)) as { data: GetPostQuery }
        const comments = _post.data.getPost?.comments
        if (comments !== null && comments !== undefined) {
            if (comments.items !== null) {
                comments.items.forEach((comment) => {
                    const newComment: Comment = {
                        postId: postId,
                        text: comment!.content,
                        author: comment!.author,
                        id: comment!.id,
                        authorAvatarSrc: comment!.authorAvatar,
                        date: 'now',
                        annotation: comment?.annotation !== null ? comment?.annotation : undefined,
                        subcomments: [] // comment?.subComments !== undefined && comment?.subComments !== null ? comment.subComments : []
                    }
                    dispatch(addComment(newComment))
                })
            }
        }
    }

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
                        getAllCommentsForPost(post.id)
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
        <div className='flex flex-row w-screen h-screen'>	
            <PostToolbar posts={postsSelector.posts} currentPost={currentPost} setCurrentPost={setCurrentPost} setDisplayCreateNewPost={setDisplayCreateNewPost}/>
            <div className='flex flex-col w-full bg-gray-50'>
                {/* <PostHeader></PostHeader> */}
                <ReleaseStatusBar />
                <div className="relative flex flex-row h-full overflow-scroll">  
                    { renderPostDetailView() }
                </div>
                {/* <PostFooterBar posts={postsSelector.posts} currentPost={currentPost} setCurrentPost={setCurrentPost} setDisplayCreateNewPost={setDisplayCreateNewPost} /> */}
            </div>
        </div>
    )
}

export default AnnotationScreen;