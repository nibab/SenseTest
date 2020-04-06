// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      title
      imageId
      projectId
      text
      createdAt
      updatedAt
      comments {
        id
        content
        post {
          id
          title
          imageId
          projectId
          text
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      title
      imageId
      projectId
      text
      createdAt
      updatedAt
      comments {
        id
        content
        post {
          id
          title
          imageId
          projectId
          text
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      title
      imageId
      projectId
      text
      createdAt
      updatedAt
      comments {
        id
        content
        post {
          id
          title
          imageId
          projectId
          text
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      content
      post {
        id
        title
        imageId
        projectId
        text
        createdAt
        updatedAt
        comments {
          id
          content
        }
      }
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      content
      post {
        id
        title
        imageId
        projectId
        text
        createdAt
        updatedAt
        comments {
          id
          content
        }
      }
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      content
      post {
        id
        title
        imageId
        projectId
        text
        createdAt
        updatedAt
        comments {
          id
          content
        }
      }
    }
  }
`;
