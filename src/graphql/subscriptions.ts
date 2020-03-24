// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
        dateCreated
        comments {
          nextToken
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
        dateCreated
        comments {
          nextToken
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
        dateCreated
        comments {
          nextToken
        }
      }
    }
  }
`;
