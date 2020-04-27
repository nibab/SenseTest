// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const onDeleteProjectUserEdge = /* GraphQL */ `
  subscription OnDeleteProjectUserEdge {
    onDeleteProjectUserEdge {
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
      user {
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
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateSubComment = /* GraphQL */ `
  subscription OnCreateSubComment {
    onCreateSubComment {
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
export const onUpdateSubComment = /* GraphQL */ `
  subscription OnUpdateSubComment {
    onUpdateSubComment {
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
export const onDeleteSubComment = /* GraphQL */ `
  subscription OnDeleteSubComment {
    onDeleteSubComment {
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
export const onDeleteAppBuild = /* GraphQL */ `
  subscription OnDeleteAppBuild {
    onDeleteAppBuild {
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
export const onCreateProjectUserEdge = /* GraphQL */ `
  subscription OnCreateProjectUserEdge {
    onCreateProjectUserEdge {
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
      user {
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
    }
  }
`;
export const onUpdateProjectUserEdge = /* GraphQL */ `
  subscription OnUpdateProjectUserEdge {
    onUpdateProjectUserEdge {
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
      user {
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
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onCreateAppBuild = /* GraphQL */ `
  subscription OnCreateAppBuild {
    onCreateAppBuild {
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
export const onUpdateAppBuild = /* GraphQL */ `
  subscription OnUpdateAppBuild {
    onUpdateAppBuild {
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
