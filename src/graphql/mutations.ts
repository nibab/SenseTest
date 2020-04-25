// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const createProject = /* GraphQL */ `
  mutation CreateProject(
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
          createdAt
          updatedAt
          status
          tags
          attachments
          comments {
            items {
              id
              author
              authorAvatar
              content
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      imageId
      projectId
      text
      createdAt
      updatedAt
      status
      tags
      attachments
      comments {
        items {
          id
          author
          authorAvatar
          annotation {
            geometry {
              x
              y
              height
              width
              type
            }
            data {
              text
              id
            }
          }
          content
          post {
            id
            title
            imageId
            projectId
            text
            createdAt
            updatedAt
            status
            tags
            attachments
            comments {
              nextToken
            }
          }
          subComments {
            items {
              id
              postId
              author
              authorAvatar
              content
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      imageId
      projectId
      text
      createdAt
      updatedAt
      status
      tags
      attachments
      comments {
        items {
          id
          author
          authorAvatar
          annotation {
            geometry {
              x
              y
              height
              width
              type
            }
            data {
              text
              id
            }
          }
          content
          post {
            id
            title
            imageId
            projectId
            text
            createdAt
            updatedAt
            status
            tags
            attachments
            comments {
              nextToken
            }
          }
          subComments {
            items {
              id
              postId
              author
              authorAvatar
              content
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      imageId
      projectId
      text
      createdAt
      updatedAt
      status
      tags
      attachments
      comments {
        items {
          id
          author
          authorAvatar
          annotation {
            geometry {
              x
              y
              height
              width
              type
            }
            data {
              text
              id
            }
          }
          content
          post {
            id
            title
            imageId
            projectId
            text
            createdAt
            updatedAt
            status
            tags
            attachments
            comments {
              nextToken
            }
          }
          subComments {
            items {
              id
              postId
              author
              authorAvatar
              content
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      author
      authorAvatar
      annotation {
        geometry {
          x
          y
          height
          width
          type
        }
        data {
          text
          id
        }
      }
      content
      post {
        id
        title
        imageId
        projectId
        text
        createdAt
        updatedAt
        status
        tags
        attachments
        comments {
          items {
            id
            author
            authorAvatar
            content
            post {
              id
              title
              imageId
              projectId
              text
              createdAt
              updatedAt
              status
              tags
              attachments
            }
            subComments {
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      subComments {
        items {
          id
          postId
          author
          authorAvatar
          content
          parentComment {
            id
            author
            authorAvatar
            content
            post {
              id
              title
              imageId
              projectId
              text
              createdAt
              updatedAt
              status
              tags
              attachments
            }
            subComments {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      author
      authorAvatar
      annotation {
        geometry {
          x
          y
          height
          width
          type
        }
        data {
          text
          id
        }
      }
      content
      post {
        id
        title
        imageId
        projectId
        text
        createdAt
        updatedAt
        status
        tags
        attachments
        comments {
          items {
            id
            author
            authorAvatar
            content
            post {
              id
              title
              imageId
              projectId
              text
              createdAt
              updatedAt
              status
              tags
              attachments
            }
            subComments {
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      subComments {
        items {
          id
          postId
          author
          authorAvatar
          content
          parentComment {
            id
            author
            authorAvatar
            content
            post {
              id
              title
              imageId
              projectId
              text
              createdAt
              updatedAt
              status
              tags
              attachments
            }
            subComments {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      author
      authorAvatar
      annotation {
        geometry {
          x
          y
          height
          width
          type
        }
        data {
          text
          id
        }
      }
      content
      post {
        id
        title
        imageId
        projectId
        text
        createdAt
        updatedAt
        status
        tags
        attachments
        comments {
          items {
            id
            author
            authorAvatar
            content
            post {
              id
              title
              imageId
              projectId
              text
              createdAt
              updatedAt
              status
              tags
              attachments
            }
            subComments {
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      subComments {
        items {
          id
          postId
          author
          authorAvatar
          content
          parentComment {
            id
            author
            authorAvatar
            content
            post {
              id
              title
              imageId
              projectId
              text
              createdAt
              updatedAt
              status
              tags
              attachments
            }
            subComments {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createSubComment = /* GraphQL */ `
  mutation CreateSubComment(
    $input: CreateSubCommentInput!
    $condition: ModelSubCommentConditionInput
  ) {
    createSubComment(input: $input, condition: $condition) {
      id
      postId
      author
      authorAvatar
      content
      parentComment {
        id
        author
        authorAvatar
        annotation {
          geometry {
            x
            y
            height
            width
            type
          }
          data {
            text
            id
          }
        }
        content
        post {
          id
          title
          imageId
          projectId
          text
          createdAt
          updatedAt
          status
          tags
          attachments
          comments {
            items {
              id
              author
              authorAvatar
              content
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        subComments {
          items {
            id
            postId
            author
            authorAvatar
            content
            parentComment {
              id
              author
              authorAvatar
              content
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateSubComment = /* GraphQL */ `
  mutation UpdateSubComment(
    $input: UpdateSubCommentInput!
    $condition: ModelSubCommentConditionInput
  ) {
    updateSubComment(input: $input, condition: $condition) {
      id
      postId
      author
      authorAvatar
      content
      parentComment {
        id
        author
        authorAvatar
        annotation {
          geometry {
            x
            y
            height
            width
            type
          }
          data {
            text
            id
          }
        }
        content
        post {
          id
          title
          imageId
          projectId
          text
          createdAt
          updatedAt
          status
          tags
          attachments
          comments {
            items {
              id
              author
              authorAvatar
              content
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        subComments {
          items {
            id
            postId
            author
            authorAvatar
            content
            parentComment {
              id
              author
              authorAvatar
              content
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteSubComment = /* GraphQL */ `
  mutation DeleteSubComment(
    $input: DeleteSubCommentInput!
    $condition: ModelSubCommentConditionInput
  ) {
    deleteSubComment(input: $input, condition: $condition) {
      id
      postId
      author
      authorAvatar
      content
      parentComment {
        id
        author
        authorAvatar
        annotation {
          geometry {
            x
            y
            height
            width
            type
          }
          data {
            text
            id
          }
        }
        content
        post {
          id
          title
          imageId
          projectId
          text
          createdAt
          updatedAt
          status
          tags
          attachments
          comments {
            items {
              id
              author
              authorAvatar
              content
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        subComments {
          items {
            id
            postId
            author
            authorAvatar
            content
            parentComment {
              id
              author
              authorAvatar
              content
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
