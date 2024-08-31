import axios from "axios";
import { toast } from "react-toastify";

const BackendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const uploadFile = async (excelFile) => {
  try {
    const formData = new FormData();
    formData.append("file", excelFile);

    const { data } = await axios.post(`${BackendUrl}/api/file/excelUpload`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success(data.message);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Something went wrong.";
    toast.error(errorMessage);
    return null;
  }
};

export const getAllFiles = async () => {
  try {
    const { data } = await axios.get(`${BackendUrl}/api/file/getFile`);
    return data.response;
  } catch (error) {
    return null;
  }
};
