interface Comment {
  name: string,
  email: string | undefined,
  content: string,
  link: string | undefined,
  postId: number | undefined
}

export {
  Comment
}
