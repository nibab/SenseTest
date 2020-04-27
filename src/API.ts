/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProjectInput = {
  id?: string | null,
  name: string,
};

export type ModelProjectConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelProjectConditionInput | null > | null,
  or?: Array< ModelProjectConditionInput | null > | null,
  not?: ModelProjectConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export enum PostStatus {
  OPEN = "OPEN",
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
}


export enum PostTag {
  BLOCKER = "BLOCKER",
  DESIGN = "DESIGN",
}


export type DeleteProjectUserEdgeInput = {
  id?: string | null,
};

export type ModelProjectUserEdgeConditionInput = {
  and?: Array< ModelProjectUserEdgeConditionInput | null > | null,
  or?: Array< ModelProjectUserEdgeConditionInput | null > | null,
  not?: ModelProjectUserEdgeConditionInput | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type CreatePostInput = {
  id?: string | null,
  title: string,
  imageId: string,
  projectId: string,
  text: string,
  appVersion: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  status: PostStatus,
  tags: Array< PostTag | null >,
  attachments?: Array< string | null > | null,
};

export type ModelPostConditionInput = {
  title?: ModelStringInput | null,
  imageId?: ModelIDInput | null,
  projectId?: ModelIDInput | null,
  text?: ModelStringInput | null,
  appVersion?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  status?: ModelPostStatusInput | null,
  tags?: ModelPostTagListInput | null,
  attachments?: ModelIDInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelPostStatusInput = {
  eq?: PostStatus | null,
  ne?: PostStatus | null,
};

export type ModelPostTagListInput = {
  eq?: Array< PostTag | null > | null,
  ne?: Array< PostTag | null > | null,
  contains?: PostTag | null,
  notContains?: PostTag | null,
};

export type UpdatePostInput = {
  id: string,
  title?: string | null,
  imageId?: string | null,
  projectId?: string | null,
  text?: string | null,
  appVersion?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  status?: PostStatus | null,
  tags?: Array< PostTag | null > | null,
  attachments?: Array< string | null > | null,
};

export type DeletePostInput = {
  id?: string | null,
};

export type CreateCommentInput = {
  id?: string | null,
  author: string,
  authorAvatar: string,
  annotation?: AnnotationInput | null,
  content: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  commentPostId: string,
};

export type AnnotationInput = {
  geometry: GeometryInput,
  data: AnnotationDataInput,
};

export type GeometryInput = {
  x: number,
  y: number,
  height: number,
  width: number,
  type: string,
};

export type AnnotationDataInput = {
  text: string,
  id: string,
};

export type ModelCommentConditionInput = {
  author?: ModelStringInput | null,
  authorAvatar?: ModelIDInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
};

export type UpdateCommentInput = {
  id: string,
  author?: string | null,
  authorAvatar?: string | null,
  annotation?: AnnotationInput | null,
  content?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  commentPostId?: string | null,
};

export type DeleteCommentInput = {
  id?: string | null,
};

export type CreateSubCommentInput = {
  id?: string | null,
  postId: string,
  author: string,
  authorAvatar: string,
  content: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  subCommentParentCommentId: string,
};

export type ModelSubCommentConditionInput = {
  postId?: ModelIDInput | null,
  author?: ModelStringInput | null,
  authorAvatar?: ModelIDInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSubCommentConditionInput | null > | null,
  or?: Array< ModelSubCommentConditionInput | null > | null,
  not?: ModelSubCommentConditionInput | null,
};

export type UpdateSubCommentInput = {
  id: string,
  postId?: string | null,
  author?: string | null,
  authorAvatar?: string | null,
  content?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  subCommentParentCommentId?: string | null,
};

export type DeleteSubCommentInput = {
  id?: string | null,
};

export type DeleteAppBuildInput = {
  id?: string | null,
};

export type ModelAppBuildConditionInput = {
  name?: ModelStringInput | null,
  assetId?: ModelIDInput | null,
  appetizeKey?: ModelStringInput | null,
  version?: ModelStringInput | null,
  uploadedByUserId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAppBuildConditionInput | null > | null,
  or?: Array< ModelAppBuildConditionInput | null > | null,
  not?: ModelAppBuildConditionInput | null,
};

export type CreateProjectUserEdgeInput = {
  id?: string | null,
  projectUserEdgeProjectId: string,
  projectUserEdgeUserId: string,
};

export type UpdateProjectUserEdgeInput = {
  id: string,
  projectUserEdgeProjectId?: string | null,
  projectUserEdgeUserId?: string | null,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
};

export type CreateAppBuildInput = {
  id?: string | null,
  name: string,
  assetId: string,
  appetizeKey: string,
  version: string,
  uploadedByUserId: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  appBuildProjectId: string,
};

export type UpdateAppBuildInput = {
  id: string,
  name?: string | null,
  assetId?: string | null,
  appetizeKey?: string | null,
  version?: string | null,
  uploadedByUserId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  appBuildProjectId?: string | null,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  imageId?: ModelIDInput | null,
  projectId?: ModelIDInput | null,
  text?: ModelStringInput | null,
  appVersion?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  status?: ModelPostStatusInput | null,
  tags?: ModelPostTagListInput | null,
  attachments?: ModelIDInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  author?: ModelStringInput | null,
  authorAvatar?: ModelIDInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type ModelSubCommentFilterInput = {
  id?: ModelIDInput | null,
  postId?: ModelIDInput | null,
  author?: ModelStringInput | null,
  authorAvatar?: ModelIDInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSubCommentFilterInput | null > | null,
  or?: Array< ModelSubCommentFilterInput | null > | null,
  not?: ModelSubCommentFilterInput | null,
};

export type ModelAppBuildFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  assetId?: ModelIDInput | null,
  appetizeKey?: ModelStringInput | null,
  version?: ModelStringInput | null,
  uploadedByUserId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAppBuildFilterInput | null > | null,
  or?: Array< ModelAppBuildFilterInput | null > | null,
  not?: ModelAppBuildFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type CreateProjectMutation = {
  createProject:  {
    __typename: "Project",
    id: string,
    name: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        title: string,
        imageId: string,
        projectId: string,
        text: string,
        appVersion: string,
        createdAt: string | null,
        updatedAt: string | null,
        status: PostStatus,
        tags: Array< PostTag | null >,
        attachments: Array< string | null > | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    appBuilds:  {
      __typename: "ModelAppBuildConnection",
      items:  Array< {
        __typename: "AppBuild",
        id: string,
        project:  {
          __typename: "Project",
          id: string,
          name: string,
          posts:  {
            __typename: "ModelPostConnection",
            nextToken: string | null,
          } | null,
          appBuilds:  {
            __typename: "ModelAppBuildConnection",
            nextToken: string | null,
          } | null,
          currentAppBuild: string | null,
          admin: string | null,
          members:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
          active: boolean,
        },
        name: string,
        assetId: string,
        appetizeKey: string,
        version: string,
        uploadedByUserId: string,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    currentAppBuild: string | null,
    admin: string | null,
    members:  {
      __typename: "ModelProjectUserEdgeConnection",
      items:  Array< {
        __typename: "ProjectUserEdge",
        id: string,
        project:  {
          __typename: "Project",
          id: string,
          name: string,
          posts:  {
            __typename: "ModelPostConnection",
            nextToken: string | null,
          } | null,
          appBuilds:  {
            __typename: "ModelAppBuildConnection",
            nextToken: string | null,
          } | null,
          currentAppBuild: string | null,
          admin: string | null,
          members:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
          active: boolean,
        },
        user:  {
          __typename: "User",
          id: string,
          name: string,
          projects:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
    active: boolean,
  } | null,
};

export type DeleteProjectUserEdgeMutationVariables = {
  input: DeleteProjectUserEdgeInput,
  condition?: ModelProjectUserEdgeConditionInput | null,
};

export type DeleteProjectUserEdgeMutation = {
  deleteProjectUserEdge:  {
    __typename: "ProjectUserEdge",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectUserEdgeConnection",
      items:  Array< {
        __typename: "ProjectUserEdge",
        id: string,
        project:  {
          __typename: "Project",
          id: string,
          name: string,
          posts:  {
            __typename: "ModelPostConnection",
            nextToken: string | null,
          } | null,
          appBuilds:  {
            __typename: "ModelAppBuildConnection",
            nextToken: string | null,
          } | null,
          currentAppBuild: string | null,
          admin: string | null,
          members:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
          active: boolean,
        },
        user:  {
          __typename: "User",
          id: string,
          name: string,
          projects:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost:  {
    __typename: "Post",
    id: string,
    title: string,
    imageId: string,
    projectId: string,
    text: string,
    appVersion: string,
    createdAt: string | null,
    updatedAt: string | null,
    status: PostStatus,
    tags: Array< PostTag | null >,
    attachments: Array< string | null > | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        author: string,
        authorAvatar: string,
        annotation:  {
          __typename: "Annotation",
          geometry:  {
            __typename: "Geometry",
            x: number,
            y: number,
            height: number,
            width: number,
            type: string,
          },
          data:  {
            __typename: "AnnotationData",
            text: string,
            id: string,
          },
        } | null,
        content: string,
        post:  {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        },
        subComments:  {
          __typename: "ModelSubCommentConnection",
          items:  Array< {
            __typename: "SubComment",
            id: string,
            postId: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost:  {
    __typename: "Post",
    id: string,
    title: string,
    imageId: string,
    projectId: string,
    text: string,
    appVersion: string,
    createdAt: string | null,
    updatedAt: string | null,
    status: PostStatus,
    tags: Array< PostTag | null >,
    attachments: Array< string | null > | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        author: string,
        authorAvatar: string,
        annotation:  {
          __typename: "Annotation",
          geometry:  {
            __typename: "Geometry",
            x: number,
            y: number,
            height: number,
            width: number,
            type: string,
          },
          data:  {
            __typename: "AnnotationData",
            text: string,
            id: string,
          },
        } | null,
        content: string,
        post:  {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        },
        subComments:  {
          __typename: "ModelSubCommentConnection",
          items:  Array< {
            __typename: "SubComment",
            id: string,
            postId: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost:  {
    __typename: "Post",
    id: string,
    title: string,
    imageId: string,
    projectId: string,
    text: string,
    appVersion: string,
    createdAt: string | null,
    updatedAt: string | null,
    status: PostStatus,
    tags: Array< PostTag | null >,
    attachments: Array< string | null > | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        author: string,
        authorAvatar: string,
        annotation:  {
          __typename: "Annotation",
          geometry:  {
            __typename: "Geometry",
            x: number,
            y: number,
            height: number,
            width: number,
            type: string,
          },
          data:  {
            __typename: "AnnotationData",
            text: string,
            id: string,
          },
        } | null,
        content: string,
        post:  {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        },
        subComments:  {
          __typename: "ModelSubCommentConnection",
          items:  Array< {
            __typename: "SubComment",
            id: string,
            postId: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment:  {
    __typename: "Comment",
    id: string,
    author: string,
    authorAvatar: string,
    annotation:  {
      __typename: "Annotation",
      geometry:  {
        __typename: "Geometry",
        x: number,
        y: number,
        height: number,
        width: number,
        type: string,
      },
      data:  {
        __typename: "AnnotationData",
        text: string,
        id: string,
      },
    } | null,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      imageId: string,
      projectId: string,
      text: string,
      appVersion: string,
      createdAt: string | null,
      updatedAt: string | null,
      status: PostStatus,
      tags: Array< PostTag | null >,
      attachments: Array< string | null > | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
    subComments:  {
      __typename: "ModelSubCommentConnection",
      items:  Array< {
        __typename: "SubComment",
        id: string,
        postId: string,
        author: string,
        authorAvatar: string,
        content: string,
        parentComment:  {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment:  {
    __typename: "Comment",
    id: string,
    author: string,
    authorAvatar: string,
    annotation:  {
      __typename: "Annotation",
      geometry:  {
        __typename: "Geometry",
        x: number,
        y: number,
        height: number,
        width: number,
        type: string,
      },
      data:  {
        __typename: "AnnotationData",
        text: string,
        id: string,
      },
    } | null,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      imageId: string,
      projectId: string,
      text: string,
      appVersion: string,
      createdAt: string | null,
      updatedAt: string | null,
      status: PostStatus,
      tags: Array< PostTag | null >,
      attachments: Array< string | null > | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
    subComments:  {
      __typename: "ModelSubCommentConnection",
      items:  Array< {
        __typename: "SubComment",
        id: string,
        postId: string,
        author: string,
        authorAvatar: string,
        content: string,
        parentComment:  {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment:  {
    __typename: "Comment",
    id: string,
    author: string,
    authorAvatar: string,
    annotation:  {
      __typename: "Annotation",
      geometry:  {
        __typename: "Geometry",
        x: number,
        y: number,
        height: number,
        width: number,
        type: string,
      },
      data:  {
        __typename: "AnnotationData",
        text: string,
        id: string,
      },
    } | null,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      imageId: string,
      projectId: string,
      text: string,
      appVersion: string,
      createdAt: string | null,
      updatedAt: string | null,
      status: PostStatus,
      tags: Array< PostTag | null >,
      attachments: Array< string | null > | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
    subComments:  {
      __typename: "ModelSubCommentConnection",
      items:  Array< {
        __typename: "SubComment",
        id: string,
        postId: string,
        author: string,
        authorAvatar: string,
        content: string,
        parentComment:  {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type CreateSubCommentMutationVariables = {
  input: CreateSubCommentInput,
  condition?: ModelSubCommentConditionInput | null,
};

export type CreateSubCommentMutation = {
  createSubComment:  {
    __typename: "SubComment",
    id: string,
    postId: string,
    author: string,
    authorAvatar: string,
    content: string,
    parentComment:  {
      __typename: "Comment",
      id: string,
      author: string,
      authorAvatar: string,
      annotation:  {
        __typename: "Annotation",
        geometry:  {
          __typename: "Geometry",
          x: number,
          y: number,
          height: number,
          width: number,
          type: string,
        },
        data:  {
          __typename: "AnnotationData",
          text: string,
          id: string,
        },
      } | null,
      content: string,
      post:  {
        __typename: "Post",
        id: string,
        title: string,
        imageId: string,
        projectId: string,
        text: string,
        appVersion: string,
        createdAt: string | null,
        updatedAt: string | null,
        status: PostStatus,
        tags: Array< PostTag | null >,
        attachments: Array< string | null > | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
      },
      subComments:  {
        __typename: "ModelSubCommentConnection",
        items:  Array< {
          __typename: "SubComment",
          id: string,
          postId: string,
          author: string,
          authorAvatar: string,
          content: string,
          parentComment:  {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          },
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type UpdateSubCommentMutationVariables = {
  input: UpdateSubCommentInput,
  condition?: ModelSubCommentConditionInput | null,
};

export type UpdateSubCommentMutation = {
  updateSubComment:  {
    __typename: "SubComment",
    id: string,
    postId: string,
    author: string,
    authorAvatar: string,
    content: string,
    parentComment:  {
      __typename: "Comment",
      id: string,
      author: string,
      authorAvatar: string,
      annotation:  {
        __typename: "Annotation",
        geometry:  {
          __typename: "Geometry",
          x: number,
          y: number,
          height: number,
          width: number,
          type: string,
        },
        data:  {
          __typename: "AnnotationData",
          text: string,
          id: string,
        },
      } | null,
      content: string,
      post:  {
        __typename: "Post",
        id: string,
        title: string,
        imageId: string,
        projectId: string,
        text: string,
        appVersion: string,
        createdAt: string | null,
        updatedAt: string | null,
        status: PostStatus,
        tags: Array< PostTag | null >,
        attachments: Array< string | null > | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
      },
      subComments:  {
        __typename: "ModelSubCommentConnection",
        items:  Array< {
          __typename: "SubComment",
          id: string,
          postId: string,
          author: string,
          authorAvatar: string,
          content: string,
          parentComment:  {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          },
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type DeleteSubCommentMutationVariables = {
  input: DeleteSubCommentInput,
  condition?: ModelSubCommentConditionInput | null,
};

export type DeleteSubCommentMutation = {
  deleteSubComment:  {
    __typename: "SubComment",
    id: string,
    postId: string,
    author: string,
    authorAvatar: string,
    content: string,
    parentComment:  {
      __typename: "Comment",
      id: string,
      author: string,
      authorAvatar: string,
      annotation:  {
        __typename: "Annotation",
        geometry:  {
          __typename: "Geometry",
          x: number,
          y: number,
          height: number,
          width: number,
          type: string,
        },
        data:  {
          __typename: "AnnotationData",
          text: string,
          id: string,
        },
      } | null,
      content: string,
      post:  {
        __typename: "Post",
        id: string,
        title: string,
        imageId: string,
        projectId: string,
        text: string,
        appVersion: string,
        createdAt: string | null,
        updatedAt: string | null,
        status: PostStatus,
        tags: Array< PostTag | null >,
        attachments: Array< string | null > | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
      },
      subComments:  {
        __typename: "ModelSubCommentConnection",
        items:  Array< {
          __typename: "SubComment",
          id: string,
          postId: string,
          author: string,
          authorAvatar: string,
          content: string,
          parentComment:  {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          },
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type DeleteAppBuildMutationVariables = {
  input: DeleteAppBuildInput,
  condition?: ModelAppBuildConditionInput | null,
};

export type DeleteAppBuildMutation = {
  deleteAppBuild:  {
    __typename: "AppBuild",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    name: string,
    assetId: string,
    appetizeKey: string,
    version: string,
    uploadedByUserId: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type CreateProjectUserEdgeMutationVariables = {
  input: CreateProjectUserEdgeInput,
  condition?: ModelProjectUserEdgeConditionInput | null,
};

export type CreateProjectUserEdgeMutation = {
  createProjectUserEdge:  {
    __typename: "ProjectUserEdge",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type UpdateProjectUserEdgeMutationVariables = {
  input: UpdateProjectUserEdgeInput,
  condition?: ModelProjectUserEdgeConditionInput | null,
};

export type UpdateProjectUserEdgeMutation = {
  updateProjectUserEdge:  {
    __typename: "ProjectUserEdge",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectUserEdgeConnection",
      items:  Array< {
        __typename: "ProjectUserEdge",
        id: string,
        project:  {
          __typename: "Project",
          id: string,
          name: string,
          posts:  {
            __typename: "ModelPostConnection",
            nextToken: string | null,
          } | null,
          appBuilds:  {
            __typename: "ModelAppBuildConnection",
            nextToken: string | null,
          } | null,
          currentAppBuild: string | null,
          admin: string | null,
          members:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
          active: boolean,
        },
        user:  {
          __typename: "User",
          id: string,
          name: string,
          projects:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectUserEdgeConnection",
      items:  Array< {
        __typename: "ProjectUserEdge",
        id: string,
        project:  {
          __typename: "Project",
          id: string,
          name: string,
          posts:  {
            __typename: "ModelPostConnection",
            nextToken: string | null,
          } | null,
          appBuilds:  {
            __typename: "ModelAppBuildConnection",
            nextToken: string | null,
          } | null,
          currentAppBuild: string | null,
          admin: string | null,
          members:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
          active: boolean,
        },
        user:  {
          __typename: "User",
          id: string,
          name: string,
          projects:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateAppBuildMutationVariables = {
  input: CreateAppBuildInput,
  condition?: ModelAppBuildConditionInput | null,
};

export type CreateAppBuildMutation = {
  createAppBuild:  {
    __typename: "AppBuild",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    name: string,
    assetId: string,
    appetizeKey: string,
    version: string,
    uploadedByUserId: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type UpdateAppBuildMutationVariables = {
  input: UpdateAppBuildInput,
  condition?: ModelAppBuildConditionInput | null,
};

export type UpdateAppBuildMutation = {
  updateAppBuild:  {
    __typename: "AppBuild",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    name: string,
    assetId: string,
    appetizeKey: string,
    version: string,
    uploadedByUserId: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost:  {
    __typename: "Post",
    id: string,
    title: string,
    imageId: string,
    projectId: string,
    text: string,
    appVersion: string,
    createdAt: string | null,
    updatedAt: string | null,
    status: PostStatus,
    tags: Array< PostTag | null >,
    attachments: Array< string | null > | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        author: string,
        authorAvatar: string,
        annotation:  {
          __typename: "Annotation",
          geometry:  {
            __typename: "Geometry",
            x: number,
            y: number,
            height: number,
            width: number,
            type: string,
          },
          data:  {
            __typename: "AnnotationData",
            text: string,
            id: string,
          },
        } | null,
        content: string,
        post:  {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        },
        subComments:  {
          __typename: "ModelSubCommentConnection",
          items:  Array< {
            __typename: "SubComment",
            id: string,
            postId: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject:  {
    __typename: "Project",
    id: string,
    name: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        title: string,
        imageId: string,
        projectId: string,
        text: string,
        appVersion: string,
        createdAt: string | null,
        updatedAt: string | null,
        status: PostStatus,
        tags: Array< PostTag | null >,
        attachments: Array< string | null > | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    appBuilds:  {
      __typename: "ModelAppBuildConnection",
      items:  Array< {
        __typename: "AppBuild",
        id: string,
        project:  {
          __typename: "Project",
          id: string,
          name: string,
          posts:  {
            __typename: "ModelPostConnection",
            nextToken: string | null,
          } | null,
          appBuilds:  {
            __typename: "ModelAppBuildConnection",
            nextToken: string | null,
          } | null,
          currentAppBuild: string | null,
          admin: string | null,
          members:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
          active: boolean,
        },
        name: string,
        assetId: string,
        appetizeKey: string,
        version: string,
        uploadedByUserId: string,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    currentAppBuild: string | null,
    admin: string | null,
    members:  {
      __typename: "ModelProjectUserEdgeConnection",
      items:  Array< {
        __typename: "ProjectUserEdge",
        id: string,
        project:  {
          __typename: "Project",
          id: string,
          name: string,
          posts:  {
            __typename: "ModelPostConnection",
            nextToken: string | null,
          } | null,
          appBuilds:  {
            __typename: "ModelAppBuildConnection",
            nextToken: string | null,
          } | null,
          currentAppBuild: string | null,
          admin: string | null,
          members:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
          active: boolean,
        },
        user:  {
          __typename: "User",
          id: string,
          name: string,
          projects:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
    active: boolean,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectUserEdgeConnection",
      items:  Array< {
        __typename: "ProjectUserEdge",
        id: string,
        project:  {
          __typename: "Project",
          id: string,
          name: string,
          posts:  {
            __typename: "ModelPostConnection",
            nextToken: string | null,
          } | null,
          appBuilds:  {
            __typename: "ModelAppBuildConnection",
            nextToken: string | null,
          } | null,
          currentAppBuild: string | null,
          admin: string | null,
          members:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
          active: boolean,
        },
        user:  {
          __typename: "User",
          id: string,
          name: string,
          projects:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      imageId: string,
      projectId: string,
      text: string,
      appVersion: string,
      createdAt: string | null,
      updatedAt: string | null,
      status: PostStatus,
      tags: Array< PostTag | null >,
      attachments: Array< string | null > | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment:  {
    __typename: "Comment",
    id: string,
    author: string,
    authorAvatar: string,
    annotation:  {
      __typename: "Annotation",
      geometry:  {
        __typename: "Geometry",
        x: number,
        y: number,
        height: number,
        width: number,
        type: string,
      },
      data:  {
        __typename: "AnnotationData",
        text: string,
        id: string,
      },
    } | null,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      imageId: string,
      projectId: string,
      text: string,
      appVersion: string,
      createdAt: string | null,
      updatedAt: string | null,
      status: PostStatus,
      tags: Array< PostTag | null >,
      attachments: Array< string | null > | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
    subComments:  {
      __typename: "ModelSubCommentConnection",
      items:  Array< {
        __typename: "SubComment",
        id: string,
        postId: string,
        author: string,
        authorAvatar: string,
        content: string,
        parentComment:  {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      author: string,
      authorAvatar: string,
      annotation:  {
        __typename: "Annotation",
        geometry:  {
          __typename: "Geometry",
          x: number,
          y: number,
          height: number,
          width: number,
          type: string,
        },
        data:  {
          __typename: "AnnotationData",
          text: string,
          id: string,
        },
      } | null,
      content: string,
      post:  {
        __typename: "Post",
        id: string,
        title: string,
        imageId: string,
        projectId: string,
        text: string,
        appVersion: string,
        createdAt: string | null,
        updatedAt: string | null,
        status: PostStatus,
        tags: Array< PostTag | null >,
        attachments: Array< string | null > | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
      },
      subComments:  {
        __typename: "ModelSubCommentConnection",
        items:  Array< {
          __typename: "SubComment",
          id: string,
          postId: string,
          author: string,
          authorAvatar: string,
          content: string,
          parentComment:  {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          },
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSubCommentQueryVariables = {
  id: string,
};

export type GetSubCommentQuery = {
  getSubComment:  {
    __typename: "SubComment",
    id: string,
    postId: string,
    author: string,
    authorAvatar: string,
    content: string,
    parentComment:  {
      __typename: "Comment",
      id: string,
      author: string,
      authorAvatar: string,
      annotation:  {
        __typename: "Annotation",
        geometry:  {
          __typename: "Geometry",
          x: number,
          y: number,
          height: number,
          width: number,
          type: string,
        },
        data:  {
          __typename: "AnnotationData",
          text: string,
          id: string,
        },
      } | null,
      content: string,
      post:  {
        __typename: "Post",
        id: string,
        title: string,
        imageId: string,
        projectId: string,
        text: string,
        appVersion: string,
        createdAt: string | null,
        updatedAt: string | null,
        status: PostStatus,
        tags: Array< PostTag | null >,
        attachments: Array< string | null > | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
      },
      subComments:  {
        __typename: "ModelSubCommentConnection",
        items:  Array< {
          __typename: "SubComment",
          id: string,
          postId: string,
          author: string,
          authorAvatar: string,
          content: string,
          parentComment:  {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          },
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListSubCommentsQueryVariables = {
  filter?: ModelSubCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubCommentsQuery = {
  listSubComments:  {
    __typename: "ModelSubCommentConnection",
    items:  Array< {
      __typename: "SubComment",
      id: string,
      postId: string,
      author: string,
      authorAvatar: string,
      content: string,
      parentComment:  {
        __typename: "Comment",
        id: string,
        author: string,
        authorAvatar: string,
        annotation:  {
          __typename: "Annotation",
          geometry:  {
            __typename: "Geometry",
            x: number,
            y: number,
            height: number,
            width: number,
            type: string,
          },
          data:  {
            __typename: "AnnotationData",
            text: string,
            id: string,
          },
        } | null,
        content: string,
        post:  {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        },
        subComments:  {
          __typename: "ModelSubCommentConnection",
          items:  Array< {
            __typename: "SubComment",
            id: string,
            postId: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string | null,
        updatedAt: string | null,
      },
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetAppBuildQueryVariables = {
  id: string,
};

export type GetAppBuildQuery = {
  getAppBuild:  {
    __typename: "AppBuild",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    name: string,
    assetId: string,
    appetizeKey: string,
    version: string,
    uploadedByUserId: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListAppBuildsQueryVariables = {
  filter?: ModelAppBuildFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAppBuildsQuery = {
  listAppBuilds:  {
    __typename: "ModelAppBuildConnection",
    items:  Array< {
      __typename: "AppBuild",
      id: string,
      project:  {
        __typename: "Project",
        id: string,
        name: string,
        posts:  {
          __typename: "ModelPostConnection",
          items:  Array< {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
        appBuilds:  {
          __typename: "ModelAppBuildConnection",
          items:  Array< {
            __typename: "AppBuild",
            id: string,
            name: string,
            assetId: string,
            appetizeKey: string,
            version: string,
            uploadedByUserId: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
        currentAppBuild: string | null,
        admin: string | null,
        members:  {
          __typename: "ModelProjectUserEdgeConnection",
          items:  Array< {
            __typename: "ProjectUserEdge",
            id: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        active: boolean,
      },
      name: string,
      assetId: string,
      appetizeKey: string,
      version: string,
      uploadedByUserId: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ProjectPostsByTimeQueryVariables = {
  projectId?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProjectPostsByTimeQuery = {
  projectPostsByTime:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      imageId: string,
      projectId: string,
      text: string,
      appVersion: string,
      createdAt: string | null,
      updatedAt: string | null,
      status: PostStatus,
      tags: Array< PostTag | null >,
      attachments: Array< string | null > | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type SubCommentByTimeQueryVariables = {
  postId?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSubCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SubCommentByTimeQuery = {
  subCommentByTime:  {
    __typename: "ModelSubCommentConnection",
    items:  Array< {
      __typename: "SubComment",
      id: string,
      postId: string,
      author: string,
      authorAvatar: string,
      content: string,
      parentComment:  {
        __typename: "Comment",
        id: string,
        author: string,
        authorAvatar: string,
        annotation:  {
          __typename: "Annotation",
          geometry:  {
            __typename: "Geometry",
            x: number,
            y: number,
            height: number,
            width: number,
            type: string,
          },
          data:  {
            __typename: "AnnotationData",
            text: string,
            id: string,
          },
        } | null,
        content: string,
        post:  {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        },
        subComments:  {
          __typename: "ModelSubCommentConnection",
          items:  Array< {
            __typename: "SubComment",
            id: string,
            postId: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string | null,
        updatedAt: string | null,
      },
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnDeleteProjectUserEdgeSubscription = {
  onDeleteProjectUserEdge:  {
    __typename: "ProjectUserEdge",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectUserEdgeConnection",
      items:  Array< {
        __typename: "ProjectUserEdge",
        id: string,
        project:  {
          __typename: "Project",
          id: string,
          name: string,
          posts:  {
            __typename: "ModelPostConnection",
            nextToken: string | null,
          } | null,
          appBuilds:  {
            __typename: "ModelAppBuildConnection",
            nextToken: string | null,
          } | null,
          currentAppBuild: string | null,
          admin: string | null,
          members:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
          active: boolean,
        },
        user:  {
          __typename: "User",
          id: string,
          name: string,
          projects:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost:  {
    __typename: "Post",
    id: string,
    title: string,
    imageId: string,
    projectId: string,
    text: string,
    appVersion: string,
    createdAt: string | null,
    updatedAt: string | null,
    status: PostStatus,
    tags: Array< PostTag | null >,
    attachments: Array< string | null > | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        author: string,
        authorAvatar: string,
        annotation:  {
          __typename: "Annotation",
          geometry:  {
            __typename: "Geometry",
            x: number,
            y: number,
            height: number,
            width: number,
            type: string,
          },
          data:  {
            __typename: "AnnotationData",
            text: string,
            id: string,
          },
        } | null,
        content: string,
        post:  {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        },
        subComments:  {
          __typename: "ModelSubCommentConnection",
          items:  Array< {
            __typename: "SubComment",
            id: string,
            postId: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost:  {
    __typename: "Post",
    id: string,
    title: string,
    imageId: string,
    projectId: string,
    text: string,
    appVersion: string,
    createdAt: string | null,
    updatedAt: string | null,
    status: PostStatus,
    tags: Array< PostTag | null >,
    attachments: Array< string | null > | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        author: string,
        authorAvatar: string,
        annotation:  {
          __typename: "Annotation",
          geometry:  {
            __typename: "Geometry",
            x: number,
            y: number,
            height: number,
            width: number,
            type: string,
          },
          data:  {
            __typename: "AnnotationData",
            text: string,
            id: string,
          },
        } | null,
        content: string,
        post:  {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        },
        subComments:  {
          __typename: "ModelSubCommentConnection",
          items:  Array< {
            __typename: "SubComment",
            id: string,
            postId: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeletePostSubscription = {
  onDeletePost:  {
    __typename: "Post",
    id: string,
    title: string,
    imageId: string,
    projectId: string,
    text: string,
    appVersion: string,
    createdAt: string | null,
    updatedAt: string | null,
    status: PostStatus,
    tags: Array< PostTag | null >,
    attachments: Array< string | null > | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        author: string,
        authorAvatar: string,
        annotation:  {
          __typename: "Annotation",
          geometry:  {
            __typename: "Geometry",
            x: number,
            y: number,
            height: number,
            width: number,
            type: string,
          },
          data:  {
            __typename: "AnnotationData",
            text: string,
            id: string,
          },
        } | null,
        content: string,
        post:  {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        },
        subComments:  {
          __typename: "ModelSubCommentConnection",
          items:  Array< {
            __typename: "SubComment",
            id: string,
            postId: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment:  {
    __typename: "Comment",
    id: string,
    author: string,
    authorAvatar: string,
    annotation:  {
      __typename: "Annotation",
      geometry:  {
        __typename: "Geometry",
        x: number,
        y: number,
        height: number,
        width: number,
        type: string,
      },
      data:  {
        __typename: "AnnotationData",
        text: string,
        id: string,
      },
    } | null,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      imageId: string,
      projectId: string,
      text: string,
      appVersion: string,
      createdAt: string | null,
      updatedAt: string | null,
      status: PostStatus,
      tags: Array< PostTag | null >,
      attachments: Array< string | null > | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
    subComments:  {
      __typename: "ModelSubCommentConnection",
      items:  Array< {
        __typename: "SubComment",
        id: string,
        postId: string,
        author: string,
        authorAvatar: string,
        content: string,
        parentComment:  {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment:  {
    __typename: "Comment",
    id: string,
    author: string,
    authorAvatar: string,
    annotation:  {
      __typename: "Annotation",
      geometry:  {
        __typename: "Geometry",
        x: number,
        y: number,
        height: number,
        width: number,
        type: string,
      },
      data:  {
        __typename: "AnnotationData",
        text: string,
        id: string,
      },
    } | null,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      imageId: string,
      projectId: string,
      text: string,
      appVersion: string,
      createdAt: string | null,
      updatedAt: string | null,
      status: PostStatus,
      tags: Array< PostTag | null >,
      attachments: Array< string | null > | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
    subComments:  {
      __typename: "ModelSubCommentConnection",
      items:  Array< {
        __typename: "SubComment",
        id: string,
        postId: string,
        author: string,
        authorAvatar: string,
        content: string,
        parentComment:  {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment:  {
    __typename: "Comment",
    id: string,
    author: string,
    authorAvatar: string,
    annotation:  {
      __typename: "Annotation",
      geometry:  {
        __typename: "Geometry",
        x: number,
        y: number,
        height: number,
        width: number,
        type: string,
      },
      data:  {
        __typename: "AnnotationData",
        text: string,
        id: string,
      },
    } | null,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      imageId: string,
      projectId: string,
      text: string,
      appVersion: string,
      createdAt: string | null,
      updatedAt: string | null,
      status: PostStatus,
      tags: Array< PostTag | null >,
      attachments: Array< string | null > | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
    subComments:  {
      __typename: "ModelSubCommentConnection",
      items:  Array< {
        __typename: "SubComment",
        id: string,
        postId: string,
        author: string,
        authorAvatar: string,
        content: string,
        parentComment:  {
          __typename: "Comment",
          id: string,
          author: string,
          authorAvatar: string,
          content: string,
          post:  {
            __typename: "Post",
            id: string,
            title: string,
            imageId: string,
            projectId: string,
            text: string,
            appVersion: string,
            createdAt: string | null,
            updatedAt: string | null,
            status: PostStatus,
            tags: Array< PostTag | null >,
            attachments: Array< string | null > | null,
          },
          subComments:  {
            __typename: "ModelSubCommentConnection",
            nextToken: string | null,
          } | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnCreateSubCommentSubscription = {
  onCreateSubComment:  {
    __typename: "SubComment",
    id: string,
    postId: string,
    author: string,
    authorAvatar: string,
    content: string,
    parentComment:  {
      __typename: "Comment",
      id: string,
      author: string,
      authorAvatar: string,
      annotation:  {
        __typename: "Annotation",
        geometry:  {
          __typename: "Geometry",
          x: number,
          y: number,
          height: number,
          width: number,
          type: string,
        },
        data:  {
          __typename: "AnnotationData",
          text: string,
          id: string,
        },
      } | null,
      content: string,
      post:  {
        __typename: "Post",
        id: string,
        title: string,
        imageId: string,
        projectId: string,
        text: string,
        appVersion: string,
        createdAt: string | null,
        updatedAt: string | null,
        status: PostStatus,
        tags: Array< PostTag | null >,
        attachments: Array< string | null > | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
      },
      subComments:  {
        __typename: "ModelSubCommentConnection",
        items:  Array< {
          __typename: "SubComment",
          id: string,
          postId: string,
          author: string,
          authorAvatar: string,
          content: string,
          parentComment:  {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          },
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnUpdateSubCommentSubscription = {
  onUpdateSubComment:  {
    __typename: "SubComment",
    id: string,
    postId: string,
    author: string,
    authorAvatar: string,
    content: string,
    parentComment:  {
      __typename: "Comment",
      id: string,
      author: string,
      authorAvatar: string,
      annotation:  {
        __typename: "Annotation",
        geometry:  {
          __typename: "Geometry",
          x: number,
          y: number,
          height: number,
          width: number,
          type: string,
        },
        data:  {
          __typename: "AnnotationData",
          text: string,
          id: string,
        },
      } | null,
      content: string,
      post:  {
        __typename: "Post",
        id: string,
        title: string,
        imageId: string,
        projectId: string,
        text: string,
        appVersion: string,
        createdAt: string | null,
        updatedAt: string | null,
        status: PostStatus,
        tags: Array< PostTag | null >,
        attachments: Array< string | null > | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
      },
      subComments:  {
        __typename: "ModelSubCommentConnection",
        items:  Array< {
          __typename: "SubComment",
          id: string,
          postId: string,
          author: string,
          authorAvatar: string,
          content: string,
          parentComment:  {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          },
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnDeleteSubCommentSubscription = {
  onDeleteSubComment:  {
    __typename: "SubComment",
    id: string,
    postId: string,
    author: string,
    authorAvatar: string,
    content: string,
    parentComment:  {
      __typename: "Comment",
      id: string,
      author: string,
      authorAvatar: string,
      annotation:  {
        __typename: "Annotation",
        geometry:  {
          __typename: "Geometry",
          x: number,
          y: number,
          height: number,
          width: number,
          type: string,
        },
        data:  {
          __typename: "AnnotationData",
          text: string,
          id: string,
        },
      } | null,
      content: string,
      post:  {
        __typename: "Post",
        id: string,
        title: string,
        imageId: string,
        projectId: string,
        text: string,
        appVersion: string,
        createdAt: string | null,
        updatedAt: string | null,
        status: PostStatus,
        tags: Array< PostTag | null >,
        attachments: Array< string | null > | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          } | null > | null,
          nextToken: string | null,
        } | null,
      },
      subComments:  {
        __typename: "ModelSubCommentConnection",
        items:  Array< {
          __typename: "SubComment",
          id: string,
          postId: string,
          author: string,
          authorAvatar: string,
          content: string,
          parentComment:  {
            __typename: "Comment",
            id: string,
            author: string,
            authorAvatar: string,
            content: string,
            createdAt: string | null,
            updatedAt: string | null,
          },
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnDeleteAppBuildSubscription = {
  onDeleteAppBuild:  {
    __typename: "AppBuild",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    name: string,
    assetId: string,
    appetizeKey: string,
    version: string,
    uploadedByUserId: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnCreateProjectUserEdgeSubscription = {
  onCreateProjectUserEdge:  {
    __typename: "ProjectUserEdge",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnUpdateProjectUserEdgeSubscription = {
  onUpdateProjectUserEdge:  {
    __typename: "ProjectUserEdge",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectUserEdgeConnection",
      items:  Array< {
        __typename: "ProjectUserEdge",
        id: string,
        project:  {
          __typename: "Project",
          id: string,
          name: string,
          posts:  {
            __typename: "ModelPostConnection",
            nextToken: string | null,
          } | null,
          appBuilds:  {
            __typename: "ModelAppBuildConnection",
            nextToken: string | null,
          } | null,
          currentAppBuild: string | null,
          admin: string | null,
          members:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
          active: boolean,
        },
        user:  {
          __typename: "User",
          id: string,
          name: string,
          projects:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectUserEdgeConnection",
      items:  Array< {
        __typename: "ProjectUserEdge",
        id: string,
        project:  {
          __typename: "Project",
          id: string,
          name: string,
          posts:  {
            __typename: "ModelPostConnection",
            nextToken: string | null,
          } | null,
          appBuilds:  {
            __typename: "ModelAppBuildConnection",
            nextToken: string | null,
          } | null,
          currentAppBuild: string | null,
          admin: string | null,
          members:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
          active: boolean,
        },
        user:  {
          __typename: "User",
          id: string,
          name: string,
          projects:  {
            __typename: "ModelProjectUserEdgeConnection",
            nextToken: string | null,
          } | null,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateAppBuildSubscription = {
  onCreateAppBuild:  {
    __typename: "AppBuild",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    name: string,
    assetId: string,
    appetizeKey: string,
    version: string,
    uploadedByUserId: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnUpdateAppBuildSubscription = {
  onUpdateAppBuild:  {
    __typename: "AppBuild",
    id: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        items:  Array< {
          __typename: "Post",
          id: string,
          title: string,
          imageId: string,
          projectId: string,
          text: string,
          appVersion: string,
          createdAt: string | null,
          updatedAt: string | null,
          status: PostStatus,
          tags: Array< PostTag | null >,
          attachments: Array< string | null > | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      appBuilds:  {
        __typename: "ModelAppBuildConnection",
        items:  Array< {
          __typename: "AppBuild",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          name: string,
          assetId: string,
          appetizeKey: string,
          version: string,
          uploadedByUserId: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      currentAppBuild: string | null,
      admin: string | null,
      members:  {
        __typename: "ModelProjectUserEdgeConnection",
        items:  Array< {
          __typename: "ProjectUserEdge",
          id: string,
          project:  {
            __typename: "Project",
            id: string,
            name: string,
            currentAppBuild: string | null,
            admin: string | null,
            active: boolean,
          },
          user:  {
            __typename: "User",
            id: string,
            name: string,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
      active: boolean,
    },
    name: string,
    assetId: string,
    appetizeKey: string,
    version: string,
    uploadedByUserId: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};
