import axios from "axios";

export const fileUpload = async (file) => {
  const cloudUrl =
    "https://994741232167479:D3h-j3VsM4tZZd7SBBc4xhATSXw@api.cloudinary.com/v1_1/dbjzts2r9/image/upload";

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
