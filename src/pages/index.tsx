import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from "../components/Navbar"
import Post from "../components/Post"
import { PostPropsType } from '../components/Post'
export default function Home() {
  const postList: Array<PostPropsType> = [
    {
      imageURL: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2022-12/pup-meme-leukemia-liver-disease-zz-221228-29fbb2.jpg",
      caption: "This is Doge. Respect the Doge. Doge rules.",
      userName: "DogePerson420"
    },
    {
      imageURL: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      caption: "Cats are great. Look at how great this cat is.",
      userName: "CatPerson360"
    },
    {
      imageURL: "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
      caption: "I love capybaras.",
      userName: "MrCapybara123"
    },
    {
      imageURL: "https://m.media-amazon.com/images/I/41FaeFr8VOL._SX354_SY354_BL0_QL100__UXNaN_FMjpg_QL85_.jpg",
      caption: "Reject Humanity Embrace Monke.",
      userName: "Harambe420"
    },
  ]
  return (
    <>
    <div className = "flex">
      <Navbar/>
      <div className = "flex flex-grow flex-col items-center justify-center gap-8 p-8">
        {postList.map((post) => {
          return(
            <Post imageURL={post.imageURL} caption={post.caption} userName={post.userName} key={post.caption}/>
          )
        })}
      </div>
    </div>
    
    </>
  )
}
