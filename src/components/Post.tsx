import React, { useState } from 'react'
import { UserCircle} from 'tabler-icons-react'
import Image from 'next/image'
import { IconHeartFilled, IconSend, IconMessageCircle2, IconBookmark, IconTrash } from '@tabler/icons-react'
import { PostPropsType } from '../../types'
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../util/firebase"
import { useAuth } from '../components/auth/AuthUserProvider'


export default function Post(postProps: PostPropsType){
    const { user } = useAuth();
    const {uid} = user || {}
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(postProps.likes)
    const [bookmarked, setBookmarked] = useState(false)
    const [followed, setFollowed] = useState(false)

    const deletePost = () => {
        const postDoc = doc(collection(db, "posts"), postProps.user)
        deleteDoc(postDoc)
    }
    return(
        <>
            <div className = "border rounded-xl border-blue-400 flex flex-col p-6 w-[600px] h-[550px] gap-5">
                <div className = "flex justify-between">
                    <div className = "flex items-center gap-4">
                        <UserCircle className = "w-10 h-10"/>
                        <span className = "font-semibold text-lg">{postProps.user}</span>
                    </div>
                    <div className = "flex gap-3">
                    <button className = {followed ? "p-2 bg-gray-500 text-white font-semibold border rounded-md hover:bg-blue-400 mr-3" : "py-1 px-3 bg-blue-500 text-white font-semibold border rounded-md hover:bg-blue-400 mr-3"} onClick = {()=>{
                        setFollowed(!followed)
                    }}>
                        {followed ? "Followed" : "Follow"}
                    </button>
                    {user && user.uid == postProps.user && <button onClick = {deletePost}>
                    <IconTrash className = "w-7 h-7 text-gray-400 hover:text-red-500"/>
                        </button>}
                    </div>
                    
                </div>
                
                
                    <div className = "h-[350px] w-full border rounded-md">
                        <img src = {postProps.imageURL} alt = "Post Image" className = "h-full w-full cursor-pointer border rounded-md object-cover"/>
                    </div>
                <div className = "flex justify-between px-3">
                    <div className = "flex gap-4">
                    <button onClick = {() => {
                        setLiked(!liked)
                        if(liked){
                            setLikes(likes+1)
                        }
                        else{
                            setLikes(likes-1)
                        }
                    }}>
                        <IconHeartFilled className = {liked ? "w-7 h-7 text-red-500 hover:text-red-400" : "w-7 h-7 text-gray-400 hover:text-red-500"}/>   
                    </button>
                    <button>
                        <IconMessageCircle2 className = "w-7 h-7 hover:text-green-400"/>
                    </button>
                    <button>
                        <IconSend className = "w-7 h-7 hover:text-blue-400"/>
                    </button>
                    
                    </div>
                    <button onClick = {() => {
                        setBookmarked(!bookmarked)
                    }}>
                        <IconBookmark className = {bookmarked ? "w-9 h-7 text-purple-500 hover:text-purple-300" : "w-9 h-7 hover:text-purple-400"}/>
                    </button>
                </div>
                <div className = "flex flex-col px-1.5 gap-2">
                    {likes>0 ? <span>{likes} likes</span> : <></>}
                    <span>{postProps.caption}</span>
                </div>

                
                
                
            </div>
        </>
    )
}