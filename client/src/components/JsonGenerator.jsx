import React, { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import RecursiveForm from "./RecursiveForm";

const JsonGenerator = () => {
  const [jsonStructure, setJsonStructure] = useState({});

  const [textToCopy, setTextToCopy] = useState(''); // The text you want to copy
  const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied

//   const handleSaveField = (fields) => {
//     let newStructure = { ...jsonStructure };
//     console.log(fields);
//     fields.forEach((field) => {
//       if (field.type === "array") {
//         newStructure[field.name] = field.nestedFields.length ? [...field.nestedFields] : [];
//       } else if (field.type === "object") {
//         newStructure[field.name] = field.nestedFields.length ? { ...field.nestedFields } : {};
//       } else {
//         newStructure[field.name] = field.content;
//       }
//     });
//     console.log(newStructure)
//     setJsonStructure(newStructure);
//   };

const onCopyText = () => {
    setCopyStatus(true);
    console.log("textToCopy",JSON.stringify(textToCopy))
    setTimeout(() => setCopyStatus(false), 1000); // Reset status after 1 seconds
  };

const handleSaveField = (fields) => {
    let newStructure = { ...jsonStructure }; // Copy the existing JSON structure
  
    // Recursive function to handle nested fields
    const buildNestedStructure = (field) => {
      if (field.type === "array") {
        return field.nestedFields.length 
          ? field.nestedFields.map((nestedField) => buildNestedStructure(nestedField)) 
          : []; // Return an empty array if no nested fields
      } else if (field.type === "object") {
        const nestedObject = {};
        field.nestedFields.forEach((nestedField) => {
          nestedObject[nestedField.name] = buildNestedStructure(nestedField);
        });
        return nestedObject;
      } else {
        return field.content; // Return the content for simple fields
      }
    };
  
    // Iterate over all fields and build their nested structures
    fields.forEach((field) => {
      newStructure[field.name] = buildNestedStructure(field);
    });
  
    console.log('Updated Structure:', newStructure); // Log the updated structure for debugging
    setJsonStructure(newStructure); // Update the state with the new structure
    setTextToCopy(JSON.stringify(newStructure));
  };
  

  // Function to download the JSON structure as a file
  const handleDownloadJson = () => {
    const json = JSON.stringify(jsonStructure, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dynamic JSON Generator</h1>

      {/* RecursiveForm component for adding fields */}
      <RecursiveForm onSave={handleSaveField} />

      {/* Display JSON structure */}
      <div className="mt-6">
       

        {/* Download JSON Button */}
        <button
          onClick={handleDownloadJson}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Download JSON
        </button>


        <h2 className="mt-6 text-xl font-semibold">Generated JSON Structure</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-lg mt-2">
          {JSON.stringify(jsonStructure, null, 2)}
        </pre>

        <CopyToClipboard text={textToCopy} onCopy={onCopyText}>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Copy</button>
      </CopyToClipboard>
      {copyStatus && <p className=" text-md text-gray-700">Text copied to clipboard!</p>}
      </div>
    </div>
  );
};

export default JsonGenerator;
