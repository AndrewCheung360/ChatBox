import React, {useState} from 'react';
import Navbar from '../components/Navbar'
import ImageUpload from '../components/ImageUpload'
import { useAuth } from "../components/auth/AuthUserProvider";
import { signInWithGoogle, db } from "../../util/firebase";
import { addDoc, collection } from "firebase/firestore"
import { PostPropsType } from '../../types';
export default function CreatePost () {
    const {user} = useAuth();
    const {uid} = user || {};
    const [input, setInput] = useState('')
    const [imageURL,setImageURL] = useState<string|undefined>(undefined)
    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInput(event.target.value);
      };
      const addPost = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (imageURL == undefined) return
        const post: PostPropsType = {
          caption: input,
          imageURL: imageURL,
          user: user!.uid!,
          likes:0
        }
        addDoc(collection(db, "posts"), post)
        setInput("")
        setImageURL(undefined)
      }

      //function that handles image file input change
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //gets first file from list of selected files
    const imageFile = e.target.files && e.target.files[0];
    if (imageFile != undefined) {
      //if file is found, create a FileReader Object
      const reader = new FileReader();
      //read contents of file as data url
      reader.readAsDataURL(imageFile);
      //when file loads, sets imageURL state to data url that was read previously
      reader.onload = () => {
        setImageURL(reader.result as string);
      };
      // clears the file input value to prevent caching of the selected file
      e.target.value = "";
    }
  };
    return(
        <>
            
            <div className = "flex">
                <Navbar/>
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
                {user && <div className = "flex flex-grow items-center justify-center pl-[400px]">
                    <div className="w-[800px] h-[600px] flex items-center justify-center p-6">
                        <ImageUpload  caption={input} imageURL={imageURL} setImageURL={handleImageFileChange} setCaption={handleInputChange} uploadPost={addPost}/>
                    </div>
                </div>}
                
                
            </div>
            
            
        </>
    )
}