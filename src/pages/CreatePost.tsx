import React from 'react';
import Navbar from '../components/Navbar'
import ImageUpload from '../components/ImageUpload'
export default function CreatePost () {
    return(
        <>
            
            <div className = "flex">
                <Navbar/>
                <div className = "flex flex-grow items-center justify-center pl-[400px]">
                    <div className="w-[800px] h-[600px] flex items-center justify-center p-6">
                        <ImageUpload size={1000000} />
                    </div>
                </div>
                
                
            </div>
            
            
        </>
    )
}