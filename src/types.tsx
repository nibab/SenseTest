import { PostImgDownload } from './utils/PostImgDownload'
import { PostTag as PostTagGraphQL} from './API'
import { DeviceType as DeviceTypeGraphQL} from './API'

export type PostStatus = 'OPEN' | 'PENDING' | 'RESOLVED'
export type PostTag = 'BLOCKER' | 'DESIGN'
export type DeviceType = 'IPHONE_X' | 'IPHONE_11' | 'IPHONE_11_PLUS' | 'IPHONE_8' | 'IPHONE_XR'

export const postTagToGraphQLType = (postTag: PostTag): PostTagGraphQL => {
  switch(postTag) {
    case 'BLOCKER':
      return PostTagGraphQL.BLOCKER
    case 'DESIGN':
      return PostTagGraphQL.DESIGN 
  }
}

export const postTagGraphQLToLocalType = (postTag: PostTagGraphQL): PostTag => {
  switch(postTag) {
    case PostTagGraphQL.BLOCKER:
      return 'BLOCKER'
    case PostTagGraphQL.DESIGN:
      return 'DESIGN'
  }
}

export const deviceTypeGraphQLToLocalType = (deviceType: DeviceTypeGraphQL): DeviceType => {
  switch(deviceType) {
    case DeviceTypeGraphQL.IPHONE_11:
      return 'IPHONE_11'
    case DeviceTypeGraphQL.IPHONE_X:
      return 'IPHONE_X'
    case DeviceTypeGraphQL.IPHONE_8:
      return 'IPHONE_8'
    case DeviceTypeGraphQL.IPHONE_11_PLUS:
      return 'IPHONE_11_PLUS'
    case DeviceTypeGraphQL.IPHONE_XR:
      return 'IPHONE_XR'
  }
}

export const deviceTypeToGraphQLType = (deviceType: DeviceType): DeviceTypeGraphQL => {
  switch(deviceType) {
    case 'IPHONE_X':
      return DeviceTypeGraphQL.IPHONE_X
    case 'IPHONE_11':
      return DeviceTypeGraphQL.IPHONE_11
    case 'IPHONE_11_PLUS':
      return DeviceTypeGraphQL.IPHONE_11_PLUS
    case 'IPHONE_8':
      return DeviceTypeGraphQL.IPHONE_8
    case 'IPHONE_XR':
      return DeviceTypeGraphQL.IPHONE_XR
  }
}

export const deviceTypePretty = (deviceType: DeviceType): string => {
  switch(deviceType) {
    case 'IPHONE_X':
      return 'iPhone X'
    case 'IPHONE_11':
      return 'iPhone 11'
    case 'IPHONE_11_PLUS':
      return 'iPhone 11 Plus'
    case 'IPHONE_8':
      return 'iPhone 8'
    case 'IPHONE_XR':
      return 'iPhone XR'
  }
}

export type Post = {
  id: string,
  title: string,
  image: Blob | PostImgDownload,
  projectId: string,
  text: string,
  dateCreated: string | null,
  comments?: Comment[]
  tags?: PostTag[]
  status?: PostStatus // this indicates whether the issue has been resolved or is still pending
  attachments?: string[] // A list of assetIds or Blobs.
  appVersion: string,
  deviceType: DeviceType
}

// // This is basically the raw type that we get from AppSync.
// export type PostGraphQl = {
//   id: string,
//   title: string,
//   imageId: string,
//   projectId: string,
//   text: string,
//   createdAt: string | null, // This is introduced by Amplify at the resolver level.
//   updatedAt: string | null// This is introduced by Amplify at the resolver level.
//   comments?: Comment[]
//   tags?: PostTag[]
//   status?: PostStatus // this indicates whether the issue has been resolved or is still pending
//   attachments?: string[] // A list of assetIds or Blobs.
//   appVersion: string
// }

export type Project = {
  id: string,
  name: string,
  posts: Post[]
  appBuilds: AppBuild[],
  currentAppBuild?: AppBuild,
  members: ProjectMember[],
  dateCreated: string
}

export type ProjectMember = {
  email: string
  id: string
  name: string
}

const stringLitArray = <L extends string>(arr: L[]) => arr
const authStates = stringLitArray(["signedIn", "signedUp", "signUp", "signedUpAfterInvite", "firstSignIn"])
export type AuthState = (typeof authStates)[number]
export const isAuthState = (x: any): x is AuthState => authStates.includes(x);

// Annotation types
export type Geometry = {
	x: number,
	y: number,
	height: number,
	type: string,
	width: number
}

export type Annotation = {
	geometry: Geometry,
	selection?: {
		showEditor: boolean,
		mode: string
	},
	data: {
		text: string,
		id: string
	}
}

export type Comment = {
  postId: string,
  id: string,
  author: string,
  authorAvatarSrc: string,
  date: string,
  annotation?: Annotation,
  text: string,
  subcomments: SubComment[] 
}

export type SubComment = {
  id: string,
  author: string,
  authorAvatarSrc: string,
  date: string,
  text: string,
  parentCommentId: string
}

export type AppBuild = {
	id: string,
	project: string,
	name: string,
	assetId: string,
	appetizeKey: string,
	version: string,
	uploadedByUserId: string,
	createdAt: string,
  updatedAt?: string
}


// Adding new app builds
export type AppBuildRequestBodyType = {
  assetId: string, 
  appName: string,
  appVersion: string,
  assetUrl: string, //"https://appetizetest.s3.amazonaws.com/MovieSwift.zip"
  projectId: string
}

export type InviteUserRequestType = {
  userId: string,
  projectId: string
}

export type CreateUserRequestType = {
  userName: string
}

export type CreateAndInviteUserRequestType = {
  userEmail: string,
  projectId: string
}