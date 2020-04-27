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
      appVersion
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
            appVersion
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
          appVersion
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
      appBuilds {
        items {
          id
          project {
            id
            name
            posts {
              nextToken
            }
            appBuilds {
              nextToken
            }
            currentAppBuild
            admin
            members {
              nextToken
            }
            active
          }
          name
          assetId
          appetizeKey
          version
          uploadedByUserId
          createdAt
          updatedAt
        }
        nextToken
      }
      currentAppBuild
      admin
      members {
        items {
          id
          project {
            id
            name
            posts {
              nextToken
            }
            appBuilds {
              nextToken
            }
            currentAppBuild
            admin
            members {
              nextToken
            }
            active
          }
          user {
            id
            name
            projects {
              nextToken
            }
          }
        }
        nextToken
      }
      active
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
            appVersion
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
        appBuilds {
          items {
            id
            project {
              id
              name
              currentAppBuild
              admin
              active
            }
            name
            assetId
            appetizeKey
            version
            uploadedByUserId
            createdAt
            updatedAt
          }
          nextToken
        }
        currentAppBuild
        admin
        members {
          items {
            id
            project {
              id
              name
              currentAppBuild
              admin
              active
            }
            user {
              id
              name
            }
          }
          nextToken
        }
        active
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      projects {
        items {
          id
          project {
            id
            name
            posts {
              nextToken
            }
            appBuilds {
              nextToken
            }
            currentAppBuild
            admin
            members {
              nextToken
            }
            active
          }
          user {
            id
            name
            projects {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        projects {
          items {
            id
            project {
              id
              name
              currentAppBuild
              admin
              active
            }
            user {
              id
              name
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
        appVersion
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
              appVersion
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
        appVersion
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
              appVersion
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
              appVersion
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
          appVersion
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
      nextToken
    }
  }
`;
export const getSubComment = /* GraphQL */ `
  query GetSubComment($id: ID!) {
    getSubComment(id: $id) {
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
          appVersion
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
export const listSubComments = /* GraphQL */ `
  query ListSubComments(
    $filter: ModelSubCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
            appVersion
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAppBuild = /* GraphQL */ `
  query GetAppBuild($id: ID!) {
    getAppBuild(id: $id) {
      id
      project {
        id
        name
        posts {
          items {
            id
            title
            imageId
            projectId
            text
            appVersion
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
        appBuilds {
          items {
            id
            project {
              id
              name
              currentAppBuild
              admin
              active
            }
            name
            assetId
            appetizeKey
            version
            uploadedByUserId
            createdAt
            updatedAt
          }
          nextToken
        }
        currentAppBuild
        admin
        members {
          items {
            id
            project {
              id
              name
              currentAppBuild
              admin
              active
            }
            user {
              id
              name
            }
          }
          nextToken
        }
        active
      }
      name
      assetId
      appetizeKey
      version
      uploadedByUserId
      createdAt
      updatedAt
    }
  }
`;
export const listAppBuilds = /* GraphQL */ `
  query ListAppBuilds(
    $filter: ModelAppBuildFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppBuilds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        project {
          id
          name
          posts {
            items {
              id
              title
              imageId
              projectId
              text
              appVersion
              createdAt
              updatedAt
              status
              tags
              attachments
            }
            nextToken
          }
          appBuilds {
            items {
              id
              name
              assetId
              appetizeKey
              version
              uploadedByUserId
              createdAt
              updatedAt
            }
            nextToken
          }
          currentAppBuild
          admin
          members {
            items {
              id
            }
            nextToken
          }
          active
        }
        name
        assetId
        appetizeKey
        version
        uploadedByUserId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const projectPostsByTime = /* GraphQL */ `
  query ProjectPostsByTime(
    $projectId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    projectPostsByTime(
      projectId: $projectId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        imageId
        projectId
        text
        appVersion
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
              appVersion
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
      nextToken
    }
  }
`;
export const subCommentByTime = /* GraphQL */ `
  query SubCommentByTime(
    $postId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subCommentByTime(
      postId: $postId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
            appVersion
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
