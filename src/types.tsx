import { PostImgDownload } from './utils/PostImgDownload'
import { PostTag as PostTagGraphQL} from './API'
import { DeviceType as DeviceTypeGraphQL} from './API'

const stringLitArray = <L extends string>(arr: L[]) => arr
const authStates = stringLitArray(["signedIn", "signedUp", "signUp", "signUpConfirm", "signedUpAfterInvite", "firstSignIn"])
export type AuthState = (typeof authStates)[number]
export const isAuthState = (x: any): x is AuthState => authStates.includes(x);

export type PostStatus = 'OPEN' | 'PENDING' | 'RESOLVED'
export type PostTag = 'BLOCKER' | 'DESIGN'
export const allDeviceTypes = stringLitArray([
  'IPHONE_7',
  'IPHONE_7_PLUS',
  'IPHONE_8',
  'IPHONE_8_PLUS',
  'IPHONE_X',
  'IPHONE_XS',
  'IPHONE_XS_MAX',
  'IPHONE_11_PRO', 
  'IPHONE_11_PRO_MAX' 
])
export type DeviceType = (typeof allDeviceTypes)[number]

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
    case DeviceTypeGraphQL.IPHONE_7:
      return 'IPHONE_7'
    case DeviceTypeGraphQL.IPHONE_7_PLUS:
      return 'IPHONE_7_PLUS'
    case DeviceTypeGraphQL.IPHONE_8:
      return 'IPHONE_8'
    case DeviceTypeGraphQL.IPHONE_8_PLUS:
      return 'IPHONE_8_PLUS'
    case DeviceTypeGraphQL.IPHONE_X:
      return 'IPHONE_X'
    case DeviceTypeGraphQL.IPHONE_XS:
      return 'IPHONE_XS'
    case DeviceTypeGraphQL.IPHONE_XS_MAX:
      return 'IPHONE_XS_MAX'
    case DeviceTypeGraphQL.IPHONE_11_PRO:
      return 'IPHONE_11_PRO'
    case DeviceTypeGraphQL.IPHONE_11_PRO_MAX:
      return 'IPHONE_11_PRO_MAX'
  }
}

export const deviceTypeToGraphQLType = (deviceType: DeviceType): DeviceTypeGraphQL => {
  switch(deviceType) {
    case 'IPHONE_7':
      return DeviceTypeGraphQL.IPHONE_7
    case 'IPHONE_7_PLUS':
      return DeviceTypeGraphQL.IPHONE_7_PLUS
    case 'IPHONE_8':
      return DeviceTypeGraphQL.IPHONE_8
    case 'IPHONE_8_PLUS':
      return DeviceTypeGraphQL.IPHONE_8_PLUS
    case 'IPHONE_X':
      return DeviceTypeGraphQL.IPHONE_X
    case 'IPHONE_XS':
      return DeviceTypeGraphQL.IPHONE_XS    
    case 'IPHONE_XS_MAX':
      return DeviceTypeGraphQL.IPHONE_XS_MAX
    case 'IPHONE_11_PRO':
      return DeviceTypeGraphQL.IPHONE_11_PRO
    case 'IPHONE_11_PRO_MAX':
      return DeviceTypeGraphQL.IPHONE_11_PRO_MAX
  }
}

export const deviceTypePretty = (deviceType: DeviceType): string => {
  switch(deviceType) {
    case 'IPHONE_7':
      return 'iPhone 7'
    case 'IPHONE_7_PLUS':
      return 'iPhone 7 Plus'
    case 'IPHONE_8':
      return 'iPhone 8'
    case 'IPHONE_8_PLUS':
      return 'iPhone 8 Plus'
    case 'IPHONE_X':
      return 'iPhone X'
    case 'IPHONE_XS':
      return 'iPhone XS'
    case 'IPHONE_XS_MAX':
      return 'iPhone XS Max'
    case 'IPHONE_11_PRO':
      return 'iPhone 11 Pro'
    case 'IPHONE_11_PRO_MAX':
      return 'iPhone 11 Pro Max'
  }
}

export const deviceTypeAppetize = (deviceType: DeviceType): string => {
  switch(deviceType) {
    case 'IPHONE_7':
      return 'iphone7'
    case 'IPHONE_7_PLUS':
      return 'iphone7plus'
    case 'IPHONE_8':
      return 'iphone8'
    case 'IPHONE_8_PLUS':
      return 'iphone8plus'
    case 'IPHONE_X':
      return 'iphonex'
    case 'IPHONE_XS':
      return 'iphonexs'
    case 'IPHONE_XS_MAX':
      return 'iphonexsmax'
    case 'IPHONE_11_PRO':
      return 'iphone11pro'
    case 'IPHONE_11_PRO_MAX':
      return 'iphone11promax'
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
  appBuildId: string,
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
  appBuildId: string,
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