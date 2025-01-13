import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

const uplodOnCloudinary = async (filePath)=> {

    try {
        if (!filePath) return null;
      
        console.log(filePath);
        
    const response = await cloudinary.uploader.upload(filePath, {
    resource_type : "auto",
  })
  // file has been upload successfully
  console.log('File uploaded successfully', response.url);
fs.unlinkSync(filePath); // delete the file
  return response.url;
  
    } catch (error) {
        fs.unlinkSync(filePath); // delete the file
        return null;
    }

}

export default uplodOnCloudinary;