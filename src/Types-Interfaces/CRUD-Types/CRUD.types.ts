export interface User {
  _id: string
  admin: boolean
  firstName: string
  lastName: string
  adressMail: string
  jwt: string
  password: string
}

export interface Post {
  _id: string
  type: string
  title: string
  author: User
  body: string
  img?: Img | undefined
}

export interface CreatePostPayload extends Omit<Post, '_id' | 'img' | 'author'> {
  author: User['_id']
  img: Pick<File, 'name' | 'type' | 'size'> | undefined
}

export interface Img {
  originalname: string
  type: string
  fileName: string
  path: string
  size: number
}

export interface CreateImgPayload extends Omit<Img, '_id' | 'originalname' | 'path'> {
}

export interface AuthResponse {
  id: User['_id']
  jwt: User['jwt']
}

export type PostPopulatableKeys = keyof Pick<Post, 'author' | 'img' >;

export type ImgPopulatableKeys = keyof Pick<Img, 'originalname' | 'type' | 'size' | 'path' >;

