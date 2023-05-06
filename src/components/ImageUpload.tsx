import React, { useState, useRef, useEffect } from "react";
import {CloudUpload} from "tabler-icons-react"
import Caption from "../components/Caption"

//takes in size in bytes for limitation
type ImageUploadComponentPropTypes = {
    size: number;
  };
  

export default function ImageUpload(ImgUploadProps: ImageUploadComponentPropTypes) {
     //creates ref object that holds a reference to an <input> element
  const fileInputRef = useRef<HTMLInputElement>(null);

  //creates a state to store image file url as a string
  const [imageURL, setImageURL] = useState<string | null>(null);

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

  //function that handles image file input change
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //gets first file from list of selected files
    const imageFile = e.target.files && e.target.files[0];
    if (imageFile) {
        //limits image selection based on size specified in image props
        if (imageFile.size > ImgUploadProps.size) {
            alert(`Image size should not exceed ${ImgUploadProps.size} bytes`);
            return;
          }
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
  return (
    <>
      <div className=" w-[100%] h-[100%] bg-blue-100 p-[30px] rounded-2xl flex flex-col gap-4">
        <div
          className=" relative w-[100%] h-[100%] bg-white rounded-xl border-dashed border-blue-400 hover:border-blue-600 hover:border-[3px] border-2 overflow-hidden flex justify-center items-center flex-col gap-2"
          onClick={handleSelectImageClick}
        >
          {imageURL ? (
            <img
              className="w-full h-full object-cover cursor-pointer"
              src={imageURL}
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
            onChange={handleImageFileChange}
          />
        </div>
        <Caption/>
        <button className=" bg-blue-500 text-white font-semibold text-xl p-2 mt-2 rounded-lg hover:bg-blue-600 active:bg-blue-700"
        >
          Post
        </button>
      </div>
    </>
  );
}