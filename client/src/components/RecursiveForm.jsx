import React, { useState } from "react";

const RecursiveForm = ({ onSave }) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [content, setContent] = useState("");
  const [fields, setFields] = useState([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(null); // Track the current nested structure

  // Handle adding new fields to the main structure
  const handleAddField = () => {
    if (!fieldName || !fieldType) return;

    const newField = {
      name: fieldName,
      type: fieldType,
      content: fieldType === "string" || fieldType === "number" ? content : null,
      nestedFields: fieldType === "array" || fieldType === "object" ? [] : null,
    };
    console.log(newField);
    setFields([...fields, newField]);
    console.log("Fields", fields);
    resetForm();
  };

  // Append nested fields to arrays or objects
  const handleAppendField = (index) => {
    setCurrentFieldIndex(index);
  };

  // Add nested fields within an array or object
  const handleAddNestedField = () => {
    let updatedFields = [...fields];
    let currentField = updatedFields[currentFieldIndex];

    if (!currentField || !currentField.nestedFields) return;

    currentField.nestedFields.push({
      name: fieldName,
      type: fieldType,
      content: fieldType === "string" || fieldType === "number" ? content : null,
      nestedFields: fieldType === "array" || fieldType === "object" ? [] : null,
    });

    updatedFields[currentFieldIndex] = currentField;
    setFields(updatedFields);
    resetForm();
  };

  // Save the nested structure to the main JSON
  const handleSave = () => {
    if (currentFieldIndex !== null) {
      setCurrentFieldIndex(null);
    } else {
      onSave(fields); // Save the entire form fields
      setFields([]);  // Clear after saving
    }
  };

  // Reset form inputs
  const resetForm = () => {
    setFieldName("");
    setFieldType("");
    setContent("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create JSON Structure</h2>

      {/* Input for field name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Field Name</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
      </div>

      {/* Select field type */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Field Type</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="object">Object</option>
          <option value="array">Array</option>
        </select>
      </div>

      {/* Input for content for string/number types */}
      {(fieldType === "string" || fieldType === "number") && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Content</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      )}

      {/* Action buttons */}
      <div className="flex space-x-4">
        {currentFieldIndex === null ? (
          <button
            onClick={handleAddField}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Field
          </button>
        ) : (
          <button
            onClick={handleAddNestedField}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Append to Nested
          </button>
        )}

       
          <button
            onClick={handleSave}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            Save Field
          </button>
       
      </div>

      {/* Display added fields */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Added Fields</h3>
        <ul>
          {fields.map((field, index) => (
            <li key={index} className="border-b border-gray-300 py-2">
              <strong>{field.name} ({field.type}):</strong> {field.content || "Nested"}
              {field.type === "array" || field.type === "object" ? (
                <button
                  className="bg-green-500 text-white px-2 py-1 ml-4"
                  onClick={() => handleAppendField(index)}
                >
                  Append to {field.name}
                </button>
              ) : null}
              {field.nestedFields && field.nestedFields.length > 0 && (
                <ul className="ml-6">
                  {field.nestedFields.map((nestedField, idx) => (
                    <li key={idx}>
                      <strong>{nestedField.name} ({nestedField.type}):</strong> {nestedField.content}
                      {nestedField.type === "array" || nestedField.type === "object" ? (
                <button
                  className="bg-green-500 text-white px-2 py-1 ml-4"
                  onClick={() => handleAppendField(idx)}
                >
                  Append to {nestedField.name}
                </button>
              ) : null}
                    </li>
                  ))}
                </ul> 
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecursiveForm;
