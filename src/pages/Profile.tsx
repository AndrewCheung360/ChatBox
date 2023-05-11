import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProfilePicUpload from "../components/ProfilePicUpload";
import { useAuth } from "../components/auth/AuthUserProvider";
import { signInWithGoogle, db } from "../../util/firebase";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { PostPropsType } from "../../types";
import PostList from "@/components/PostList";
export default function Profile() {
  const { user } = useAuth();
  const [followers, setFollowers] = useState(0);
  const [followed, setFollowed] = useState(0);
  const [numPosts,setNumPosts] = useState(0)

  const [posts, setTasks] = useState<Array<PostPropsType> | null>(null)


  const taskQuery = query(
    collection(db, "posts"),
    where("owner", "==", user!.email!)

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
      <div className="flex w-full h-full">
        <Navbar />
        {!user && (
          <div className="flex items-center justify-center pl-[400px] w-full bg-gray-100">
            <div className="w-[400px] h-[260px] p-8 border-2 rounded-xl flex flex-col justify-between bg-white ">
              <span className="font-bold text-3xl">
                Please sign in with Google below to access profile
              </span>
              <button onClick={signInWithGoogle}>
                <div className="flex items-center justify-center gap-3 p-3 border-2 rounded-xl border-gray-200 hover:bg-gray-100">
                  <img
                    className="w-6 h-6"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
                  />
                  <span className=" font-semibold">Sign In with Google</span>
                </div>
              </button>
            </div>
          </div>
        )}
        {user && (
          <div className="flex flex-col w-full pl-[400px]">
            <div className="flex flex-col w-full border-2 border-gray-200 rounded-md">
              <div className="flex flex-col gap-11">
                <div className="relative">
                  <div className="h-72">
                    <img
                      src="https://cdn.vanderbilt.edu/vu-web/insidedores-wpcontent/20190412155028/doge-pattern-27481-2880x1800.jpg"
                      alt="banner"
                      className="h-full w-full"
                    />
                  </div>
                  <div className="absolute rounded-full border-blue-400 border-8 w-32 h-32 top-52 left-14">
                    <img
                      src="data:image/jpeg;base64,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"
                      className="border rounded-full w-full h-full"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between px-14 py-6">
                  <span className="font-bold text-2xl">
                    {user!.displayName}
                  </span>
                  <span></span>
                </div>
                <div className = "flex flex-grow flex-col items-center justify-center gap-8 pl-[400px] py-8">
       
                {posts ? (
                <>
                  <PostList posts={posts}/>
                  </>
                ): (
                  <></>
                 )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
