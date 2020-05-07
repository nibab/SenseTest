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
          deviceType
          osVersion
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
            createdAt
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
            createdAt
          }
          user {
            id
            name
            projects {
              nextToken
            }
            email
          }
        }
        nextToken
      }
      active
      createdAt
    }
  }
`;
export const createProjectUserEdge = /* GraphQL */ `
  mutation CreateProjectUserEdge(
    $input: CreateProjectUserEdgeInput!
    $condition: ModelProjectUserEdgeConditionInput
  ) {
    createProjectUserEdge(input: $input, condition: $condition) {
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
            deviceType
            osVersion
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
              createdAt
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
              createdAt
            }
            user {
              id
              name
              email
            }
          }
          nextToken
        }
        active
        createdAt
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
              createdAt
            }
            user {
              id
              name
              email
            }
          }
          nextToken
        }
        email
      }
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
            createdAt
          }
          user {
            id
            name
            projects {
              nextToken
            }
            email
          }
        }
        nextToken
      }
      email
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
      deviceType
      osVersion
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
            deviceType
            osVersion
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
      deviceType
      osVersion
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
            deviceType
            osVersion
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
      deviceType
      osVersion
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
            deviceType
            osVersion
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
        deviceType
        osVersion
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
              deviceType
              osVersion
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
              deviceType
              osVersion
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
        deviceType
        osVersion
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
              deviceType
              osVersion
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
              deviceType
              osVersion
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
        deviceType
        osVersion
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
              deviceType
              osVersion
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
              deviceType
              osVersion
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
          deviceType
          osVersion
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
          deviceType
          osVersion
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
          deviceType
          osVersion
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
export const deleteAppBuild = /* GraphQL */ `
  mutation DeleteAppBuild(
    $input: DeleteAppBuildInput!
    $condition: ModelAppBuildConditionInput
  ) {
    deleteAppBuild(input: $input, condition: $condition) {
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
            deviceType
            osVersion
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
              createdAt
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
              createdAt
            }
            user {
              id
              name
              email
            }
          }
          nextToken
        }
        active
        createdAt
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
export const updateProjectUserEdge = /* GraphQL */ `
  mutation UpdateProjectUserEdge(
    $input: UpdateProjectUserEdgeInput!
    $condition: ModelProjectUserEdgeConditionInput
  ) {
    updateProjectUserEdge(input: $input, condition: $condition) {
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
            deviceType
            osVersion
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
              createdAt
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
              createdAt
            }
            user {
              id
              name
              email
            }
          }
          nextToken
        }
        active
        createdAt
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
              createdAt
            }
            user {
              id
              name
              email
            }
          }
          nextToken
        }
        email
      }
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
            createdAt
          }
          user {
            id
            name
            projects {
              nextToken
            }
            email
          }
        }
        nextToken
      }
      email
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
            createdAt
          }
          user {
            id
            name
            projects {
              nextToken
            }
            email
          }
        }
        nextToken
      }
      email
    }
  }
`;
export const createAppBuild = /* GraphQL */ `
  mutation CreateAppBuild(
    $input: CreateAppBuildInput!
    $condition: ModelAppBuildConditionInput
  ) {
    createAppBuild(input: $input, condition: $condition) {
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
            deviceType
            osVersion
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
              createdAt
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
              createdAt
            }
            user {
              id
              name
              email
            }
          }
          nextToken
        }
        active
        createdAt
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
export const updateAppBuild = /* GraphQL */ `
  mutation UpdateAppBuild(
    $input: UpdateAppBuildInput!
    $condition: ModelAppBuildConditionInput
  ) {
    updateAppBuild(input: $input, condition: $condition) {
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
            deviceType
            osVersion
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
              createdAt
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
              createdAt
            }
            user {
              id
              name
              email
            }
          }
          nextToken
        }
        active
        createdAt
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
