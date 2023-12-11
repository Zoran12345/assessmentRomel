import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './delStyle.css';

const DeleteContact = () => {
    const { id } = useParams();
    const history = useHistory();
    const [contact, setContact] = useState({
        fullName: '',
        emailAddress: '',
        contactNumber: '',
        location: '',
        registeredDate: '',
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

    const handleDeleteContact = () => {
        // Open the confirmation modal
        setConfirmationOpen(true);
    };

    const handleConfirmYes = () => {
        // Delete the contact from local storage
        const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const updatedContacts = storedContacts.filter((c) => c.id !== parseInt(id));

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
            <div className="container">
                <div className="card">
                    <h2>Delete Contact</h2>
                    <h3>ID: {contact.id}</h3>
                    <form className="form">
                        <TextField
                            label="Full Name"
                            value={contact.fullName} disabled
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                        />
                        <TextField
                            label="Email Address"
                            value={contact.emailAddress} disabled
                            onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                        />
                        <TextField
                            label="Contact Number"
                            value={contact.contactNumber} disabled
                            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                        />
                        <TextField
                            label="Location"
                            value={contact.location} disabled
                            onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                        <TextField
                            label="Registered Date"
                            type="date"
                            value={contact.registeredDate} disabled
                            onChange={(e) => handleInputChange('registeredDate', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                         <div className="button-container">
                        <Button variant="contained" color="primary" onClick={handleBack}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleDeleteContact}>
                            Delete
                        </Button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Confirmation Modal */}
            <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
                <DialogTitle>Please confirm the deletion of the following contact:</DialogTitle>
                <DialogContent>
                    {/* Display the details of the contact to be deleted in the modal */}
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

export default DeleteContact;
