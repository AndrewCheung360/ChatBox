import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from "../components/Navbar"
import Post from "../components/Post"
import { PostPropsType } from '../../types/index'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth/AuthUserProvider'
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../util/firebase'
import PostList from '@/components/PostList'
export default function Home() {
  const postList: Array<PostPropsType> = [
    {
      imageURL: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2022-12/pup-meme-leukemia-liver-disease-zz-221228-29fbb2.jpg",
      caption: "This is Doge. Respect the Doge. Doge rules.",
      user: "DogePerson420",
      likes: 0
    },
    {
      imageURL: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      caption: "Cats are great. Look at how great this cat is.",
      user: "CatPerson360",
      likes: 0
    },
    {
      imageURL: "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
      caption: "I love capybaras.",
      user: "MrCapybara123",
      likes: 0
    },
    {
      imageURL: "https://m.media-amazon.com/images/I/41FaeFr8VOL._SX354_SY354_BL0_QL100__UXNaN_FMjpg_QL85_.jpg",
      caption: "Reject Humanity Embrace Monke.",
      user: "Harambe420",
      likes: 0
    },
  ]
  const [posts, setTasks] = useState<Array<PostPropsType> | null>(null)

  const { user } = useAuth()

  const taskQuery = query(
    collection(db, "posts"),
  )

  useEffect(() => {
    const unsubscribe = onSnapshot(taskQuery, (querySnapshot) => {
      const snapshotTasks: Array<PostPropsType> = querySnapshot.docs.map((doc) => {
        const data = doc.data() as PostPropsType
        return { ...data}
      })
      setTasks(snapshotTasks)
    })
    return unsubscribe
  }, [])
  return (
    <>
    <div className = "flex">
      <Navbar/>
      <div className = "flex flex-grow flex-col items-center justify-center gap-8 pl-[400px] py-8">
        {postList.map((post) => {
          return(
            <Post imageURL={post.imageURL} caption={post.caption} user={post.user} key={post.caption} likes={0}/>
          )
        })
        }
        {posts ? (
          <>
            <PostList posts={posts}/>
          </>
        ): (
          <></>
        )}
      </div>
    </div>
    
    </>
  )
}
