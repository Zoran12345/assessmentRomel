import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
} from '@mui/material';
import ViewContact from './ViewContact';
import UpdateContact from './UpdateContact';

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch contacts from local storage on component mount
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const handleAddContact = () => {
    // Navigate to the ContactForm page
    history.push('/contactform');
  };

  const handleUpdateContact = (contactId) => {
    // Set the selected contact and navigate to the UpdateContact page
    const selectedContact = contacts.find((contact) => contact.id === contactId);
    setSelectedContact(selectedContact);
    history.push(`/updatecontact/${contactId}`);
  };

  const handleDeleteContact = (contactId) => {
    // Set the selected contact and navigate to the UpdateContact page
    const selectedContact = contacts.find((contact) => contact.id === contactId);
    setSelectedContact(selectedContact);
    history.push(`/deletecontact/${contactId}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <button onClick={handleAddContact}>Add New Contact</button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Registered Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.id}</TableCell>
                <TableCell>{contact.fullName}</TableCell>
                <TableCell>{contact.emailAddress}</TableCell>
                <TableCell>{contact.contactNumber}</TableCell>
                <TableCell>{contact.location}</TableCell>
                <TableCell>{contact.registeredDate}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateContact(contact.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ViewContact contact={selectedContact} onClose={() => setSelectedContact(null)} />
    </div>
  );
};

export default ContactTable;