import React from 'react';
import Navbar from '../components/Navbar'
import ImageUpload from '../components/ImageUpload'
export default function CreatePost () {
    return(
        <>
            
            <div className = "flex">
                <Navbar/>
                <div className = "w-full h-full flex flex-col items-center justify-start">
                <div className="w-[700px] h-[500px] flex items-center justify-center p-6">
      <ImageUpload size={1000000} />
    </div>
                </div>
                
                
            </div>
            
            
        </>
    )
}