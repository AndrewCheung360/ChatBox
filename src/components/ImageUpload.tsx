import React, { useState, useRef, useEffect } from "react";
import {CloudUpload} from "tabler-icons-react"

//takes in size in bytes for limitation
type ImageUploadComponentPropTypes = {
    caption:string
    imageURL:string|undefined;
    setImageURL:(e: React.ChangeEvent<HTMLInputElement>)=>void;
    setCaption:(event: { target: { value: React.SetStateAction<string>; }; })=>void
    uploadPost:(e: { preventDefault: () => void; })=>void
  };
  

export default function ImageUpload(ImgUploadProps: ImageUploadComponentPropTypes) {
     //creates ref object that holds a reference to an <input> element
  const fileInputRef = useRef<HTMLInputElement>(null);

  //creates a state to store image file url as a string
  //const [imageURL, setImageURL] = useState<string | null>(null);
  //const [text,setText] = useState<string>('')
  //function is called when anywhere within the div or the image is clicked
  const handleSelectImageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //returns early and stops event from triggering more than once per click if event does not start from div element
    if (e.target !== e.currentTarget) {
        e.stopPropagation();
        return;
      }
    if (fileInputRef.current) {
      //triggers click event on input element => will open file selection dialog
      fileInputRef.current.click();
    }
  };

  

  
  return (
    <>
      <div className=" w-[100%] h-[100%] bg-blue-100 p-[30px] rounded-2xl flex flex-col gap-4">
        <div
          className=" relative w-[100%] h-[100%] bg-white rounded-xl border-dashed border-blue-400 hover:border-blue-600 hover:border-[3px] border-2 overflow-hidden flex justify-center items-center flex-col gap-2"
          onClick={handleSelectImageClick}
        >
          {ImgUploadProps.imageURL ? (
            <img
              className="w-full h-full object-cover cursor-pointer"
              src={ImgUploadProps.imageURL}
              alt="Selected image"
              onClick={handleSelectImageClick}
            />
          ) : (
            <label
              htmlFor="file-input"
              className="cursor-pointer flex flex-col items-center"
            >
              <CloudUpload
                className="text-blue-500"
                size = {80}
              />
              <h3 className=" font-bold text-3xl text-blue-500">Select Image</h3>
            </label>
          )}
          <input
            type="file"
            id="file-input"
            className=" hidden"
            ref={fileInputRef}
            accept="image/*"
            onChange={ImgUploadProps.setImageURL}
          />
        </div>
        <input value = {ImgUploadProps.caption} onChange = {ImgUploadProps.setCaption} placeholder="Describe your post" className = "p-2 border rounded-lg"/>
        <button className=" bg-blue-500 text-white font-semibold text-xl p-2 mt-2 rounded-lg hover:bg-blue-600 active:bg-blue-700"
        onClick = {ImgUploadProps.uploadPost}
        >
          Post
        </button>
      </div>
    </>
  );
}