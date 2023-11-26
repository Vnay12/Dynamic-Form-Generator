// GeneratedForm.jsx

import React from 'react';
import { Typography, Paper, Button } from '@mui/material';

const GeneratedForm = ({ formName, formFields }) => {
  const renderFormFields = () => {
    return formFields.map((field, index) => {
      return (
        <Paper key={index} elevation={3} className="generated-form-field">
          <Typography variant="h6" gutterBottom>
            {field.label}
          </Typography>
          {field.type === 'text' && <input type="text" />}
          {field.type === 'textarea' && <textarea rows="4" />}
          {field.type === 'dropdown' && (
            <select>
              {field.options.map((option, optionIndex) => (
                <option key={optionIndex}>{option}</option>
              ))}
            </select>
          )}
          {field.type === 'checkbox' && (
            <div>
              {field.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input type="checkbox" />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          )}
          {field.type === 'radio' && (
            <div>
              {field.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input type="radio" name={`radio_${index}`} />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          )}
          {field.type === 'file' && (
            <div>
              <input
                type="file"
                accept={field.accept}
                onChange={(e) => handleFileChange(index, e.target.files[0])}
              />
              {field.value && (
                <Typography variant="body2" gutterBottom>
                  File: {field.value.name}
                </Typography>
              )}
            </div>
          )}
        </Paper>
      );
    });
  };

  const handleFileChange = (index, file) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index].value = file;

    // Check file type based on the accept attribute
    if (file && updatedFormFields[index].accept) {
      const acceptedTypes = updatedFormFields[index].accept.split(',').map((type) => type.trim());
      if (!acceptedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload a valid file.');
        // You may clear the file input or handle the error as needed
        return;
      }
    }

    // Continue with the rest of your logic
    // ...
  };

  return (
    <div className="generated-form">
      <Typography variant="h4" gutterBottom>
        {formName}
      </Typography>
      {renderFormFields()}
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </div>
  );
};

export default GeneratedForm;
