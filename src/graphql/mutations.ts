// tslint:disable
// this is an auto generated file. This will be overwritten

export const createProject = `mutation CreateProject(
  $input: CreateProjectInput!
  $condition: ModelProjectConditionInput
) {
  createProject(input: $input, condition: $condition) {
    id
    name
    posts {
      items {
        id
        title
        imageId
        projectId
        text
        dateCreated
      }
      nextToken
    }
  }
}
`;
export const updateProject = `mutation UpdateProject(
  $input: UpdateProjectInput!
  $condition: ModelProjectConditionInput
) {
  updateProject(input: $input, condition: $condition) {
    id
    name
    posts {
      items {
        id
        title
        imageId
        projectId
        text
        dateCreated
      }
      nextToken
    }
  }
}
`;
export const deleteProject = `mutation DeleteProject(
  $input: DeleteProjectInput!
  $condition: ModelProjectConditionInput
) {
  deleteProject(input: $input, condition: $condition) {
    id
    name
    posts {
      items {
        id
        title
        imageId
        projectId
        text
        dateCreated
      }
      nextToken
    }
  }
}
`;
export const createPost = `mutation CreatePost(
  $input: CreatePostInput!
  $condition: ModelPostConditionInput
) {
  createPost(input: $input, condition: $condition) {
    id
    title
    imageId
    projectId
    text
    dateCreated
    comments {
      items {
        id
        content
      }
      nextToken
    }
  }
}
`;
export const updatePost = `mutation UpdatePost(
  $input: UpdatePostInput!
  $condition: ModelPostConditionInput
) {
  updatePost(input: $input, condition: $condition) {
    id
    title
    imageId
    projectId
    text
    dateCreated
    comments {
      items {
        id
        content
      }
      nextToken
    }
  }
}
`;
export const deletePost = `mutation DeletePost(
  $input: DeletePostInput!
  $condition: ModelPostConditionInput
) {
  deletePost(input: $input, condition: $condition) {
    id
    title
    imageId
    projectId
    text
    dateCreated
    comments {
      items {
        id
        content
      }
      nextToken
    }
  }
}
`;
export const createComment = `mutation CreateComment(
  $input: CreateCommentInput!
  $condition: ModelCommentConditionInput
) {
  createComment(input: $input, condition: $condition) {
    id
    content
    post {
      id
      title
      imageId
      projectId
      text
      dateCreated
      comments {
        nextToken
      }
    }
  }
}
`;
export const updateComment = `mutation UpdateComment(
  $input: UpdateCommentInput!
  $condition: ModelCommentConditionInput
) {
  updateComment(input: $input, condition: $condition) {
    id
    content
    post {
      id
      title
      imageId
      projectId
      text
      dateCreated
      comments {
        nextToken
      }
    }
  }
}
`;
export const deleteComment = `mutation DeleteComment(
  $input: DeleteCommentInput!
  $condition: ModelCommentConditionInput
) {
  deleteComment(input: $input, condition: $condition) {
    id
    content
    post {
      id
      title
      imageId
      projectId
      text
      dateCreated
      comments {
        nextToken
      }
    }
  }
}
`;
