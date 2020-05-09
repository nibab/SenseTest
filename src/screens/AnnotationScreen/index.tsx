import React, { useState, useEffect } from "react"
import { Post, Comment, postTagGraphQLToLocalType, SubComment, Project, deviceTypeGraphQLToLocalType } from "../../types"
import { Loading } from "aws-amplify-react"
import { useSelector } from "../../store"
import { DataLayerClient } from "../../clients/DataLayerClient"
import { useDispatch } from "react-redux"
import PostView from "./PostView"
import CreatePostView from "./CreatePostView"
import { ModelPostFilterInput, ListPostsQuery, GetPostQuery, GetProjectQuery,ProjectPostsByTimeQuery } from "../../API"
import { graphqlOperation, API } from "aws-amplify"
import { listPosts, getPost, getProject , projectPostsByTime} from "../../graphql/queries"
import { PostImgDownload } from "../../utils/PostImgDownload"
import { addPost, updateImageForPost } from "../../store/post/actions"
import Log from "../../utils/Log"
import PostFooterBar from "./PostsFooterBar.tsx"
import { ReleaseStatusBar } from "./ReleaseStatusBar"
import { PostToolbar } from "./PostToolbar"
import { addComment } from "../../store/comment/actions"
import { AppBuildClient } from "../../clients/AppBuildClient"
import { useLocation } from "react-router-dom"
import { addsubComment } from "../../store/subcomment/actions"

export const AnnotationScreen = ({ }) => {
    // Posts
    const [getPostsFetchInProgress, setGetPostsFetchInProgress] = useState(false)
    const postsSelector = useSelector(state => state.post)
    const [currentPost, setCurrentPost] = useState<Post>()
    const [displayCreateNewPost, setDisplayCreateNewPost] = useState<boolean>(true)
    const location = useLocation()
    const dispatch = useDispatch()
    const [currentProject, setCurrentProject] = useState<Project>()
    const [isLoading, setIsLoading] = useState(false)

    const getAllCommentsForPost = async (postId: string) => { 
        const query = {
            id: postId
        }
        const _post = await API.graphql(graphqlOperation(getPost, query)) as { data: GetPostQuery }
        const comments = _post.data.getPost?.comments
        if (comments !== null && comments !== undefined) {
            if (comments.items !== null) {
                comments.items.forEach((comment) => {

                    const _subComments = comment?.subComments !== null ? comment?.subComments.items : [] 
                    let subComments: SubComment[] = []

                    _subComments?.forEach((subComment) => {
                        if (subComment !== null) subComments.push({
                            id: subComment.id,
                            author: subComment.author,
                            authorAvatarSrc: subComment.authorAvatar,
                            date: subComment.createdAt !== null ? subComment.createdAt : '',
                            text: subComment.content,
                            parentCommentId: comment!.id
                        })
                    })
                    
                    const newComment: Comment = {
                        postId: postId,
                        text: comment!.content,
                        author: comment!.author,
                        id: comment!.id,
                        authorAvatarSrc: comment!.authorAvatar,
                        date: comment !== null && comment.createdAt !== null? comment.createdAt : '' ,
                        annotation: comment?.annotation !== null ? comment?.annotation : undefined,
                        subcomments: subComments !== null && subComments !== undefined ?  subComments : []
                    }
                    dispatch(addComment(newComment))
                    subComments.forEach((subcomment) => dispatch(addsubComment(newComment, subcomment)))
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
            const response = await API.graphql(graphqlOperation(projectPostsByTime, {projectId: projectId, limit: 100})) as { data: ProjectPostsByTimeQuery }
            if (response.data.projectPostsByTime?.items !== null) {
                const posts = response.data.projectPostsByTime?.items
                posts?.forEach(async (post) => {
                    if (post !== null) {
                        const postImgDownload = new PostImgDownload(post.imageId, (blob) => {})
                        
                        const newPost: Post = {
                            id: post.id,
                            image: postImgDownload,
                            projectId: post.projectId,
                            text: post.text,
                            title: post.title,
                            dateCreated: post.createdAt,
                            tags: post.tags.filter((tag) => tag !== null).map((tag) => postTagGraphQLToLocalType(tag!) ),
                            appBuildId: post.appBuildId,
                            status: post.status,
                            deviceType: deviceTypeGraphQLToLocalType(post.deviceType)
                        }
                        postImgDownload.imagePromise.then((blob) => {
                            dispatch(updateImageForPost(newPost, blob))
                            Log.info("Downloaded post with title " + post.title)
                        })
                        //const newPost = await postImgDownload.imagePromise
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
        const pathName = location.pathname
        const projectId = pathName.split("/")[2]
        setIsLoading(true)
        DataLayerClient.getProjectInfo(projectId).then( async (project) => {
            setCurrentProject(project); 
            await getPostsAndStoreInRedux(projectId) // TODO: This call should not be made again. We already have all the information.
            setIsLoading(false)
        })
    }, [])    

    const renderPostDetailView = (project: Project) => {
        if (!displayCreateNewPost) {
            if (currentPost) {
                return (<PostView project={project} post={postsSelector.posts[project.id][currentPost.id]} />) 
            }
        } else {
            return (<CreatePostView project={project} />)
        }   
    }

    const render = () => {
        if (currentProject !== undefined && !isLoading) {
            return (
                <div className='flex flex-row w-screen h-screen'>	
                    <PostToolbar project={currentProject} posts={postsSelector.posts[currentProject?.id]} currentPost={currentPost} setCurrentPost={setCurrentPost} setDisplayCreateNewPost={setDisplayCreateNewPost}/>
                    <div className='flex flex-col w-full bg-gray-50'>
                        {/* <ReleaseStatusBar /> */}
                        <div className="relative flex flex-row h-full overflow-scroll">  
                            { renderPostDetailView(currentProject) }
                        </div>
                        {/* <PostFooterBar posts={postsSelector.posts} currentPost={currentPost} setCurrentPost={setCurrentPost} setDisplayCreateNewPost={setDisplayCreateNewPost} /> */}
                    </div>
                </div>
            )
        } else {
            return <div className='flex w-screen h-screen'> <div className='mx-auto my-auto spinner-large'/></div>
        }
    }

    return (<>{render()}</>)
}

export default AnnotationScreen;