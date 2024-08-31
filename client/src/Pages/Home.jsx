import React, { useState, useRef, useEffect, useContext } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import profilePic from "../Assets/profile-pic.svg";
import baseLogo from "../Assets/base-home-logo.svg";
import { IoNotificationsOutline } from "react-icons/io5";
import excelLogo from "../Assets/excel.svg";
import { FiUpload } from "react-icons/fi";
import { getUserData } from "../Services/AuthServices";
import UploadsTable from "../Components/Upload/UploadTable";
import { getAllFiles, uploadFile } from "../Services/FileUploadServices";
import { toast } from "react-toastify";
import { DarkModeContext } from "../Components/DarkModeContext/DarkModeContext";
import { GiHamburgerMenu } from "react-icons/gi";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [filesDetails, setFilesDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { isDarkMode } = useContext(DarkModeContext);

  const getData = async () => {
    try {
      const [response, fileData] = await Promise.all([
        getUserData(),
        getAllFiles(),
      ]);
      setFilesDetails(fileData);
      setUserDetails(response);
    } catch (error) {
      toast.error("Failed to load data. Please try again later.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  const sendFile = async () => {
    try {
      await uploadFile(selectedFile);
      setSelectedFile(null);
      getData();
    } catch (error) {
      toast.error("File upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      setLoading(true);
      await sendFile();
    } else {
      toast.warning("Please select a file to upload.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        closeSidebar={toggleSidebar}
      />

      <div
        className={`md:flex-1 flex flex-col ${
          isDarkMode ? "text-[#FFFF]" : "text-[#000000]"
        }`}
      >
        <div className=" justify-between items-center px-8 py-7 hidden md:flex">
          <h1 className="text-2xl font-semibold">Upload CSV</h1>
          <div className="flex items-center gap-7">
            <IoNotificationsOutline className="text-2xl cursor-pointer" />
            <img
              src={
                userDetails && userDetails.image
                  ? userDetails.image
                  : profilePic
              }
              alt="User Profile"
              className="h-10 w-10 rounded-full border border-gray-200 cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-white p-4 flex justify-between md:hidden">
          <div className="flex items-center gap-3">
            <GiHamburgerMenu
              className="text-xl cursor-pointer"
              onClick={toggleSidebar}
            />
            <div className="flex items-center gap-2">
              <div className="h-6 w-6">
                <img src={baseLogo} alt="Base-Logo" className="h-full w-full" />
              </div>
              <p
                className={`font-semibold font-montserrat text-xl ${
                  isDarkMode ? "text-[#FFFF]" : "text-[#000000]"
                }`}
              >
                Base
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <IoNotificationsOutline className="text-2xl cursor-pointer" />
            <img
              src={userDetails.image || profilePic}
              alt="User Profile"
              className="h-10 w-10 rounded-full border border-gray-200 cursor-pointer"
            />
          </div>
        </div>
        <h1 className="text-2xl font-semibold md:hidden p-5">Upload CSV</h1>

        <main className="flex flex-col items-center justify-center mx-5  md:mx-0 md:flex-1 md:p-8">
          <div
            className={`w-full max-w-lg mx-auto ${
              isDarkMode ? "bg-[#0D0D0D]" : "bg-white"
            } p-4 rounded-lg shadow-md`}
          >
            <div className="flex flex-col items-center border-dotted border-2 border-gray-400 rounded-md px-3 py-10 md:p-20">
              <img
                src={excelLogo}
                alt="Excel Logo"
                className="h-10 w-10 mb-4"
              />

              {selectedFile ? (
                <>
                  <p className="text-lg font-medium text-[#6E6E6E] mb-2">
                    {selectedFile.name}
                  </p>
                  <button
                    onClick={handleRemoveFile}
                    className="text-red-600 mb-4"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <>
                  <p className=" text-center md:text-sm text-[#6E6E6E] my-2">
                    Drop your excel sheet here or{" "}
                    <button
                      onClick={handleBrowseClick}
                      className="text-blue-600 hover:underline"
                    >
                      browse
                    </button>
                  </p>
                </>
              )}
            </div>
            <button
              className={`${
                isDarkMode ? "text-[#000000]" : "text-[#FFFF]"
              } mt-4 w-full bg-[#605BFF] font-semibold py-2 px-4 rounded-md hover:bg-[#4b4aed] transition-colors duration-200 flex justify-center items-center gap-2`}
              onClick={handleUploadClick}
            >
              {loading ? (
                <span
                  className={`loader ${
                    isDarkMode ? "border-[#000000]" : "border-[#FFFF]"
                  }`}
                ></span>
              ) : (
                <>
                  <FiUpload /> <span>Upload</span>
                </>
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </main>
        <div className="flex flex-col justify-between mt-14 p-5 md:p-8">
          <p className="text-2xl font-semibold">Uploads</p>
          {filesDetails.length > 0 && (
            <UploadsTable filesDetails={filesDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
