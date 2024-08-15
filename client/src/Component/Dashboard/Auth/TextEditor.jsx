import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import './TextEditor.css'; // Import the custom styles

function TextEditor() {
  const [description, setDescription] = useState('');

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  return (


        <ReactQuill 
          value={description} 
          onChange={handleEditorChange} 
          modules={TextEditor.modules}
          formats={TextEditor.formats}
          placeholder="Write your description here..."
          className="custom-quill" // Add a custom class for further styling
        />

  );
}


TextEditor.modules = {
       toolbar: [
         [{ 'header': '1'}, {'header': '2'}],
         [{size: []}],
         ['bold', 'italic', 'underline', 'strike',],
         [{'list': 'ordered'}, {'list': 'bullet'}, 
          {'indent': '-1'}, {'indent': '+1'}],
         ['link', 'image', 'video'],
       //   [{ 'direction': 'ltr' }],
         ['clean']                                         
       ],
     };


TextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'indent',
  'link', 'image',
  'direction'
];


export default TextEditor;
