// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
              parentComment
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
              nextToken
            }
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
