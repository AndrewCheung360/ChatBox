import { PostPropsType } from '../../types'
import Post from "./Post"

type Props = {
  readonly posts: Array<PostPropsType>
}

const PostList = ({ posts}: Props) => {
  return (
    <>
      {posts.length ? (
        posts.map(post =><Post imageURL={post.imageURL} caption={post.caption} user={post.user} key={post.caption} likes={0}/>
        )
      ) : (
        <></>
      )}
      </>
  )
}

export default PostList
