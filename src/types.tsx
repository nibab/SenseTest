import { PostImgDownload } from './utils/PostImgDownload'

export type Post = {
  id: string,
  title: string,
  image: Blob | PostImgDownload,
  projectId: string,
  text: string,
  dateCreated: string | null,
  comments?: Comment[]
}

// This is basically the raw type that we get from AppSync.
export type PostGraphQl = {
  id: string,
  title: string,
  imageId: string,
  projectId: string,
  text: string,
  createdAt: string | null, // This is introduced by Amplify at the resolver level.
  updatedAt: string | null// This is introduced by Amplify at the resolver level.
}

export type Project = {
  id: string,
  name: string
}

const stringLitArray = <L extends string>(arr: L[]) => arr
const authStates = stringLitArray(["signedIn", "signedUp", "signUp", "signedUpAfterInvite"])
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
	geometry?: Geometry,
	selection?: {
		showEditor: boolean,
		mode: string
	},
	data: {
		text: string,
		id: number
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
  subcomments?: Comment[]
}