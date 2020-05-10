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

    useEffect(() => {  
        const pathName = location.pathname
        const projectId = pathName.split("/")[2]
        setIsLoading(true)
        DataLayerClient.getProjectInfo(projectId).then( async (project) => {
            setCurrentProject(project); 
            project.posts.forEach((post) => {
                dispatch(addPost(post))
                if (typeof post.image !== typeof Blob) {
                    (post.image as PostImgDownload).imagePromise.then((blob) => dispatch(updateImageForPost(post, blob)))
                } 
                
                getAllCommentsForPost(post.id)
            })

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