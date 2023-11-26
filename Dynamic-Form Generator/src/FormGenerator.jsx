
import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import GeneratedForm from './GeneratedForm';

const FormGenerator = () => {
  const [formFields, setFormFields] = useState([]);
  const [formName, setFormName] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedQualification, setSelectedQualification] = useState('');
  const [showQualificationFields, setShowQualificationFields] = useState(false);
  const [jsonData, setJsonData] = useState('');

  
  useEffect(() => {                                                           // to set the json configurtaion on click of sae configuration 
    const json = JSON.stringify(formFields, null, 2);  
    setJsonData(json);
  }, [formFields]);

  const addFormField = (fieldType) => {
    setFormFields([...formFields, { type: fieldType, label: '', options: [] }]);  // function to add new field 
  };

  const removeFormField = (index) => {                                        // function to remove field 
    const updatedFormFields = [...formFields];
    updatedFormFields.splice(index, 1);
    setFormFields(updatedFormFields);
  };

  const handleFieldChange = (index, key, value) => {                           // to handle field change 
    const updatedFormFields = [...formFields];
    updatedFormFields[index][key] = value;
    setFormFields(updatedFormFields);
  };

  const validateForm = () => {
    const errors = {};

    formFields.forEach((field, index) => {                                   // function to check erroes on each field 
      if (!field.label.trim()) {
        errors[index] = 'Label cannot be empty';
      }

      if (
        (field.type === 'dropdown' || field.type === 'radio') &&
        field.options.length === 0
      ) {
        errors[index] = `${field.type} must have options`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {                                    // to handle submit button 
    const isValid = validateForm();

    if (isValid) {
      setSubmitted(true);
      setEditMode(false); // After submitting, switch to view mode
    } else {
      console.log('Form validation failed');
    }
  };

  const handleEditClick = () => {                                                 // to handle edit button 
    setEditMode(true); 
    setSubmitted(false); 
  };

  const handleQualificationChange = (event) => {                             // to handle qualification tab 
    const selectedQualification = event.target.value;
    setSelectedQualification(selectedQualification);
    setShowQualificationFields(selectedQualification !== '');
  };

  const renderFormFields = () => {
    return formFields.map((field, index) => {
      return (
        <Paper key={index} elevation={3} className="form-section">
          <Typography variant="h6" gutterBottom>
            Field {index + 1}
          </Typography>
          <TextField
            label="Field Label"
            fullWidth
            margin="normal"
            value={field.label}
            onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
          />
          {field.type === 'dropdown' && (
            <TextField
              label="Dropdown Options (comma-separated)"
              fullWidth
              margin="normal"
              value={field.options.join(',')}
              onChange={(e) =>
                handleFieldChange(index, 'options', e.target.value.split(','))
              }
            />
          )}
          {(field.type === 'checkbox' || field.type === 'radio') && (
            <TextField
              label="Options (comma-separated)"
              fullWidth
              margin="normal"
              value={field.options.join(',')}
              onChange={(e) =>
                handleFieldChange(index, 'options', e.target.value.split(','))
              }
            />
          )}
          {formErrors[index] && (
            <Typography variant="body2" color="error" gutterBottom>
              {formErrors[index]}
            </Typography>
          )}
          <Button variant="outlined" onClick={() => removeFormField(index)}>
            Remove Field
          </Button>
        </Paper>
      );
    });
  };

  const renderQualificationSpecificFields = () => {
    if (showQualificationFields) {
      return (
        <Paper elevation={3} className="form-section">
          <Typography variant="h6" gutterBottom>
            Qualification Specific Fields
          </Typography>
          {selectedQualification === 'HSC' && (
            <TextField label="HSC Marks" fullWidth margin="normal" />
          )}
          {selectedQualification === 'Diploma' && (
            <TextField label="Diploma Marks" fullWidth margin="normal" />
          )}
          {selectedQualification === 'UG' && (
            <TextField label="UG Marks" fullWidth margin="normal" />
          )}
          {selectedQualification === 'PG' && (
            <TextField label="PG Marks" fullWidth margin="normal" />
          )}
        </Paper>
      );
    }

    return null;
  };

  const handleSaveClick = () => {                                // to save the field configuration into json 
    const json = JSON.stringify(formFields, null, 2);
    console.log('Form configuration saved:', json);
  };

  const handleLoadClick = () => {                             // to handle loade configuration of json 
    try {
      const loadedFormFields = JSON.parse(jsonData);
      setFormFields(loadedFormFields);
    } catch (error) {
      console.error('Error loading form configuration:', error.message);
    }
  };

  return (
    <Container>
      {!submitted && !editMode ? (
        <>
          <Typography variant="h4" gutterBottom>
            Form Generator
          </Typography>
          <TextField
            label="Form Name"
            fullWidth
            margin="normal"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />

          {/* Qualification dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Qualification</InputLabel>
            <Select onChange={handleQualificationChange}>
              <MenuItem value="">Select Qualification</MenuItem>
              <MenuItem value="HSC">HSC</MenuItem>
              <MenuItem value="Diploma">Diploma</MenuItem>
              <MenuItem value="UG">UG</MenuItem>
              <MenuItem value="PG">PG</MenuItem>
              <MenuItem value="government_servant">Government Servant</MenuItem>
            </Select>
          </FormControl>

          {/* Conditional fields based on qualification */}
          {renderQualificationSpecificFields()}

          <Button variant="contained" onClick={() => addFormField('text')}>
            Add Text Input
          </Button>
          <Button variant="contained" onClick={() => addFormField('textarea')}>
            Add Text Area
          </Button>
          <Button variant="contained" onClick={() => addFormField('dropdown')}>
            Add Dropdown
          </Button>
          <Button variant="contained" onClick={() => addFormField('checkbox')}>
            Add Checkbox
          </Button>
          <Button variant="contained" onClick={() => addFormField('radio')}>
            Add Radio Button
          </Button>
          <Button variant="contained" onClick={() => addFormField('file')}>
            Add File Upload
          </Button>

          {renderFormFields()}

          {Object.keys(formErrors).length > 0 && (
            <Paper elevation={3} className="form-section">
              <Typography variant="body2" color="error" gutterBottom>
                Please fix the following errors:
              </Typography>
              {Object.keys(formErrors).map((index) => (
                <Typography key={index} variant="body2" color="error" gutterBottom>
                  {formErrors[index]}
                </Typography>
              ))}
            </Paper>
          )}

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Form
          </Button>
          <Button variant="contained" onClick={handleSaveClick}>
            Save Form Configuration
          </Button>
          <Button variant="contained" onClick={handleLoadClick}>
            Load Form Configuration
          </Button>
        </>
      ) : (
        <>
          {submitted && !editMode ? (
            <>
              <GeneratedForm formName={formName} formFields={formFields} />
              <Button variant="outlined" color="primary" onClick={handleEditClick}>
                Edit Form
              </Button>
            </>
          ) : (
            <Paper elevation={3} className="form-section">
              <Typography variant="h5" gutterBottom>
                Edit Form Mode
              </Typography>
              <Button variant="contained" color="primary" onClick={() => setEditMode(false)}>
                Back to Form Generation
              </Button>
            </Paper>
          )}
        </>
      )}
    </Container>
  );
};

export default FormGenerator;
