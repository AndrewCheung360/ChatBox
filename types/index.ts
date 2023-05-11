export type PostPropsType = {
    imageURL: string|undefined,
    caption: string,
    user: string,
    likes:number,
}

export type PostPropsTypeWithID = PostPropsType & {
    id: string
}


