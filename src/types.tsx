export type Post = {
  id: string,
  title?: string,
  image: Blob,
  projectId: string,
  text?: string,
  dateCreated?: string
}

export type PostRaw = {
  id: string,
  title?: string,
  imageId: string,
  projectId: string,
  text?: string,
  dateCreated?: string
}