import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { DarkModeContext } from '../DarkModeContext/DarkModeContext';  
import { useContext } from 'react';

const UploadTable = ({ filesDetails }) => {
  const tags = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];
  const { isDarkMode } = useContext(DarkModeContext);

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (filesDetails) {
      setSelectedTags(filesDetails.map(() => []));
    }
  }, [filesDetails]);

  const handleTagSelect = (rowIndex, tag) => {
    if (!selectedTags[rowIndex]?.includes(tag) && tag !== "") {
      const updatedTags = [...selectedTags];
      updatedTags[rowIndex] = [...updatedTags[rowIndex], tag];
      setSelectedTags(updatedTags);
    }
  };

  const handleTagRemove = (rowIndex, tagToRemove) => {
    const updatedTags = [...selectedTags];
    updatedTags[rowIndex] = updatedTags[rowIndex].filter(
      (tag) => tag !== tagToRemove
    );
    setSelectedTags(updatedTags);
  };

  return (
    <div className={`md:p-5 ${isDarkMode ? '' : 'bg-[#f5f5f57f]'}  mt-10 `}>
      <div className="overflow-x-auto rounded-md shadow-md">
        <Table className={`w-full ${isDarkMode ? 'bg-[#0D0D0D] text-[#FFFF]' : 'bg-white text-[#000000]'} `}>
          <Thead className={`text-md ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-gray-200'} `}>
            <Tr>
              <Th className="p-2 text-center align-middle rounded-tl-md">
                Sl No.
              </Th>
              <Th className="p-2 text-center align-middle">Links</Th>
              <Th className="p-2 text-center align-middle">Prefix</Th>
              <Th className="p-2 text-center align-middle">Add Tags</Th>
              <Th className="p-2 text-center align-middle rounded-tr-md">
                Selected Tags
              </Th>
            </Tr>
          </Thead>
          <Tbody className={`${isDarkMode ? 'bg-[#0D0D0D] text-[#FFFF]' : 'bg-[#f5f5f57f] text-[#000000]'} `}>
            {filesDetails &&
              filesDetails.map((file, rowIndex) => (
                <Tr
                  key={rowIndex}
                  className={`${isDarkMode ? 'bg-[#1e1e1efc]' : 'bg-white'} border-none ${isDarkMode ? 'text-[#FFFF]' : 'text-[#000000]'}`}
                >
                  <Td className="p-2 text-center align-middle ">
                    {rowIndex + 1}
                  </Td>
                  <Td className="p-2 text-center align-middle">
                    <a href={`${file.fileUrl}`} className="text-blue-500 hover:text-blue-700">
                      {file.fileUrl.length > 20
                        ? `${file.fileUrl.substring(0, 20)}...`
                        : file.fileUrl}
                    </a>
                  </Td>
                  <Td className="p-2 text-center align-middle">{file.name}</Td>
                  <Td className={`p-2 text-center align-middle `}>
                    <select
                      className={` rounded-md p-1 ${isDarkMode ? 'bg-[#0D0D0D] border-none text-[#FFFF]' : 'bg-[#ffff] border text-[#000000]'}`}
                      onChange={(e) =>
                        handleTagSelect(rowIndex, e.target.value)
                      }
                    >
                      <option value="">Select Tags</option>
                      {tags.map((tag, i) => (
                        <option key={i} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </Td>
                  <Td className="p-2">
                    {selectedTags[rowIndex]?.map((tag, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center bg-[#605BFF] p-1 m-1 rounded ${isDarkMode ? 'text-[#000000]' : 'text-[#FFFF]'}`}
                      >
                        {tag}
                        <button
                          className="ml-2"
                          onClick={() => handleTagRemove(rowIndex, tag)}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default UploadTable;
