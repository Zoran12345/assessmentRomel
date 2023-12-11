import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const UpdateContact = () => {
  const { id } = useParams();
  const history = useHistory();
  const [contact, setContact] = useState({
    fullName: '',
    emailAddress: '',
    contactNumber: '',
    location: '',
    registeredDate: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    emailAddress: '',
    contactNumber: '',
    location: '',
  });

  const [confirmationOpen, setConfirmationOpen] = useState(false);

  // Fetch contact details from local storage on component mount
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const selectedContact = storedContacts.find((c) => c.id === parseInt(id));

    if (selectedContact) {
      setContact(selectedContact);
    }
  }, [id]);

  const handleInputChange = (name, value) => {
    setContact({
      ...contact,
      [name]: value,
    });
  };
  const validateForm = () => {
    let isValid = true;
    const errors = {
      emailAddress: '',
      contactNumber: '',
      location: '',
    };

    if (!contact.emailAddress.trim()) {
      errors.emailAddress = 'Email Address cannot be blank';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(contact.emailAddress)) {
      errors.emailAddress = 'Invalid Email Address format';
      isValid = false;
    } else if (contact.emailAddress.length > 45) {
      errors.emailAddress = 'Email Address accepts up to 45 characters only';
      isValid = false;
    }

    if (!contact.contactNumber.trim()) {
      errors.contactNumber = 'Contact Number cannot be blank';
      isValid = false;
    } else if (!/^\d+$/.test(contact.contactNumber)) {
      errors.contactNumber = 'Contact Number field accepts numeric values only';
      isValid = false;
    } else if (contact.contactNumber.length > 11) {
      errors.contactNumber = 'Contact Number accepts up to 11 digits only';
      isValid = false;
    }

    if (!contact.location.trim()) {
      errors.location = 'Location cannot be blank';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleUpdateContact = () => {
    if (validateForm()) {
      setConfirmationOpen(true);
    }
  };

  const handleConfirmYes = () => {
    // Update the contact in local storage
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const updatedContacts = storedContacts.map((c) =>
      c.id === parseInt(id) ? { ...c, ...contact } : c
    );

    localStorage.setItem('contacts', JSON.stringify(updatedContacts));

    // Close the confirmation modal
    setConfirmationOpen(false);

    // Navigate back to the ContactTable component
    history.push('/');
  };

  const handleBack = () => {
    // Navigate to the ContactForm page
    history.push('/');
  };

  const handleConfirmNo = () => {
    // Close the confirmation modal
    setConfirmationOpen(false);
  };

  return (
    <div>
      <h2>Update Contact</h2>
      <h3>ID: {contact.id}</h3>
      <form>
        <TextField
          label="Full Name"
          value={contact.fullName} disabled
          onChange={(e) => handleInputChange('fullName', e.target.value)}
        />
        <TextField
          label="Email Address"
          value={contact.emailAddress}
          onChange={(e) => handleInputChange('emailAddress', e.target.value)}
          error={!!validationErrors.emailAddress}
          helperText={validationErrors.emailAddress}
        />
        <TextField
          label="Contact Number"
          value={contact.contactNumber}
          onChange={(e) => handleInputChange('contactNumber', e.target.value)}
          error={!!validationErrors.contactNumber}
          helperText={validationErrors.contactNumber}
        />
        <FormControl>
          <InputLabel>Location</InputLabel>
          <Select
            value={contact.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            error={!!validationErrors.location}
          >
            <MenuItem value="Cebu">Cebu</MenuItem>
            <MenuItem value="Manila">Manila</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Registered Date"
          type="date"
          value={contact.registeredDate} disabled
          onChange={(e) => handleInputChange('registeredDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleUpdateContact}>
          Save
        </Button>
      </form>
      {/* Confirmation Modal */}
      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle>Please confirm the updates to the following:</DialogTitle>
        <DialogContent>
          {/* Display the updated details in the modal */}
          <div>
            <p>Email Address: {contact.emailAddress}</p>
            <p>Contact Number: {contact.contactNumber}</p>
            <p>Location: {contact.location}</p>
            {/* Add more fields as needed */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmNo} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmYes} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateContact;