import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const ViewContact = ({ contact, onClose }) => {
  return (
    <Dialog open={!!contact} onClose={onClose}>
      <DialogTitle>{contact?.fullName}</DialogTitle>
      <DialogContent>
        <Typography>Email: {contact?.emailAddress}</Typography>
        <Typography>Contact Number: {contact?.contactNumber}</Typography>
        <Typography>Location: {contact?.location}</Typography>
        <Typography>Registered Date: {contact?.registeredDate}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewContact;