import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactForm from './ContactForm';
import ContactTable from './ContactTable';
import UpdateContact from './UpdateContact';
import DeleteContact from './DeleteContact';

const Main = () => {
  const [contacts, setContacts] = useState([]);

  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  return (
    <Router>
      <div>
        <div className="table-container">
          <Switch>
            {/* Route to display ContactTable */}
            <Route path="/" exact>
              <ContactTable contacts={contacts} />
            </Route>

            {/* Route to display ContactForm */}
            <Route path="/contactform" exact>
              <ContactForm onAddContact={handleAddContact} />
            </Route>

            {/* Route to display UpdateContact */}
            <Route path="/updatecontact/:id" exact>
              <UpdateContact contacts={contacts} />
            </Route>

             {/* Route to display UpdateContact */}
             <Route path="/deletecontact/:id" exact>
              <DeleteContact contacts={contacts} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));