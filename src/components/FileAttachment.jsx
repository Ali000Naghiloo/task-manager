import React, { useRef, useState } from 'react';
import { serCreateAttachment } from '../services/masterServices';
import asyncWrapper from '../utils/asyncWrapper';
import { useDispatch } from 'react-redux';
import { RsetShowLoading, RsetShowToast } from '../hooks/slices/main';

const FileAttachment = () => {
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch();

  const handleIconClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = asyncWrapper(async (event) => {
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    // const data = await toBase64(postData);
    dispatch(RsetShowLoading({ value: true }));
    const response = await serCreateAttachment(formData);
    dispatch(RsetShowLoading({ value: false }));
    if (response?.data?.code === 1) {
      dispatch(RsetShowToast({ show: true, title: response?.data?.msg, bg: 'success' }));
    }
    else {
      dispatch(RsetShowToast({ show: true, title: response?.data?.msg, bg: 'danger' }));
    }
  });


  return (
    <div className='mt-2' >
      <i onClick={handleIconClick}
        className="rounded-pill ps-2 bg-DarkPrimary text-secondary bi bi-pin-angle cursorPointer"
      />
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileAttachment;


//   const toBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result.split(',')[1]);
//       reader.onerror = (error) => reject(error);
//     });

// import React, { useState } from 'react';

// function FileUploadComponent() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file.size >= 512000 * 10 * 3) {
//       setMessage('حجم فایل بیش از 15 مگابایت است');
//       setMessageColor('red');
//       return;
//     }
//     setSelectedFile(file);
//   };

//   const uploadFile = async () => {
//     if (!selectedFile) return;
//     const formData = new FormData();
//     formData.append('filearray', selectedFile);
//     formData.append('filesize', selectedFile.size);
//     formData.append('path', "upload\\attachfile\\");

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={uploadFile}>Upload</button>
//       <p style={{ color: messageColor }}>{message}</p>
//     </div>
//   );
// }

// export default FileUploadComponent;
