import React, { useState } from "react";

const RecursiveForm = ({ onSave }) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [content, setContent] = useState("");
  const [fields, setFields] = useState([]);
  const [currentFieldPath, setCurrentFieldPath] = useState([]); // Track the path to the current nested structure

  // Handle adding new fields to the main structure
  const handleAddField = () => {
    if (!fieldName || !fieldType) return;

    const newField = {
      name: fieldName,
      type: fieldType,
      content: fieldType === "string" || fieldType === "number" ? content : null,
      nestedFields: fieldType === "array" || fieldType === "object" ? [] : null,
    };

    setFields([...fields, newField]);
    resetForm();
  };

  // Recursive helper to traverse the nested structure based on the path (array of indices)
  const traverseToNestedField = (field, path) => {
    if (path.length === 0) return field;
    const [currentIndex, ...restPath] = path;
    return traverseToNestedField(field.nestedFields[currentIndex], restPath);
  };

  // Add nested fields within an array or object using current path
  const handleAddNestedField = () => {
    if (!fieldName || !fieldType || currentFieldPath.length === 0) return;

    const newNestedField = {
      name: fieldName,
      type: fieldType,
      content: fieldType === "string" || fieldType === "number" ? content : null,
      nestedFields: fieldType === "array" || fieldType === "object" ? [] : null,
    };

    let updatedFields = [...fields];
    let targetField = traverseToNestedField({ nestedFields: updatedFields }, currentFieldPath);

    targetField.nestedFields.push(newNestedField);
    setFields(updatedFields);
    resetForm();
  };

  // Save the nested structure to the main JSON
  const handleSave = () => {
    if (currentFieldPath.length > 0) {
      setCurrentFieldPath([]);
    } else {
      onSave(fields); // Save the entire form fields
      setFields([]);  // Clear after saving
    }
  };

  // Append nested field: set path to the field being edited
  const handleAppendField = (path) => {
    setCurrentFieldPath(path);
  };

  // Reset form inputs
  const resetForm = () => {
    setFieldName("");
    setFieldType("");
    setContent("");
  };

  // Recursive render of the field structure
  const renderFields = (fieldList, path = []) => {
    return fieldList.map((field, index) => {
      const currentPath = [...path, index];
      return (
        <li key={index} className="border-b border-gray-300 py-2">
          <strong>{field.name} ({field.type}):</strong> {field.content || "Nested"}
          {field.type === "array" || field.type === "object" ? (
            <button
              className="bg-green-500 text-white px-2 py-1 ml-4"
              onClick={() => handleAppendField(currentPath)}
            >
              Append to {field.name}
            </button>
          ) : null}
          {field.nestedFields && field.nestedFields.length > 0 && (
            <ul className="ml-6">
              {renderFields(field.nestedFields, currentPath)}
            </ul>
          )}
        </li>
      );
    });
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
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        {currentFieldPath.length === 0 ? (
          <button
            onClick={handleAddField}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto text-center"
          >
            Add Field
          </button>
        ) : (
          <button
            onClick={handleAddNestedField}
            className="bg-green-500 text-white px-4 py-2 rounded-md w-full md:w-auto text-center"
          >
            Append Field
          </button>
        )}

        <button
          onClick={handleSave}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md w-full md:w-auto text-center"
        >
          Save Field
        </button>
      </div>

      {/* Display added fields */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Added Fields</h3>
        <ul>
          {renderFields(fields)}
        </ul>
      </div>
    </div>
  );
};

export default RecursiveForm;
