import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProfilePicUpload from "../components/ProfilePicUpload";
import { useAuth } from "../components/auth/AuthUserProvider";
import { signInWithGoogle, db } from "../../util/firebase";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { PostPropsType } from "../../types";
import PostList from "@/components/PostList";
import PostProfileAuth from "@/components/PostProfileAuth";

export default function Profile() {
  const { user } = useAuth();
  
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
        {user && <PostProfileAuth />}
      </div>
    </>
  );
}
