import { PostImgDownload } from './utils/PostImgDownload'

export type Post = {
  id: string,
  title: string,
  image: Blob | PostImgDownload,
  projectId: string,
  text: string,
  dateCreated: string | null
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

const stringLitArray = <L extends string>(arr: L[]) => arr
const authStates = stringLitArray(["signedIn", "signedUp", "signUp", "signedUpAfterInvite"])
export type AuthState = (typeof authStates)[number]
export const isAuthState = (x: any): x is AuthState => authStates.includes(x);