import axios from "axios";

export const fileUpload = async (file) => {
  const cloudUrl = process.env.REACT_APP_CLOUDINARY_URL;
  
  const formData = new FormData();
  formData.append("upload_preset", "ml_default");
  formData.append("file", file);

  try {
    const { statusText, data } = await axios.post(cloudUrl, formData);

    if (statusText === "OK") {
      return data.secure_url;
    } else {
      console.log(statusText);
    }

  } catch (error) {
    throw error;
  }
};
