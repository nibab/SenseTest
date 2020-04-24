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
          parentComment
          subComments {
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
            parentComment
            subComments {
              id
              author
              authorAvatar
              content
              parentComment
            }
          }
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
          parentComment
          subComments {
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
            parentComment
            subComments {
              id
              author
              authorAvatar
              content
              parentComment
            }
          }
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
          parentComment
          subComments {
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
            parentComment
            subComments {
              id
              author
              authorAvatar
              content
              parentComment
            }
          }
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
            parentComment
            subComments {
              id
              author
              authorAvatar
              content
              parentComment
            }
          }
          nextToken
        }
      }
      parentComment
      subComments {
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
              parentComment
            }
            nextToken
          }
        }
        parentComment
        subComments {
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
          parentComment
          subComments {
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
            parentComment
            subComments {
              id
              author
              authorAvatar
              content
              parentComment
            }
          }
        }
      }
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
            parentComment
            subComments {
              id
              author
              authorAvatar
              content
              parentComment
            }
          }
          nextToken
        }
      }
      parentComment
      subComments {
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
              parentComment
            }
            nextToken
          }
        }
        parentComment
        subComments {
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
          parentComment
          subComments {
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
            parentComment
            subComments {
              id
              author
              authorAvatar
              content
              parentComment
            }
          }
        }
      }
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
            parentComment
            subComments {
              id
              author
              authorAvatar
              content
              parentComment
            }
          }
          nextToken
        }
      }
      parentComment
      subComments {
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
              parentComment
            }
            nextToken
          }
        }
        parentComment
        subComments {
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
          parentComment
          subComments {
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
            parentComment
            subComments {
              id
              author
              authorAvatar
              content
              parentComment
            }
          }
        }
      }
    }
  }
`;
