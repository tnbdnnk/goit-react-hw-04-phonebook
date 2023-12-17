import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import css from './App.module.css';

export const App = () => {
    const [contacts, setContacts] = useState(() => {
        try {
        const localStorageData = JSON.parse(localStorage.getItem('contacts'));
        return Array.isArray(localStorageData) ? localStorageData : [];
        } catch (error) {
        console.error('Error parsing localStorage data:', error);
        return [];
        }
    });

    const [filter, setFilter] = useState('');

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const addContact = (name, number, id) => {
        if (
        contacts.find(
            (contact) =>
            contact.name.toLowerCase() === name.toLowerCase()
        )
        ) {
        alert(`${name} is already in contacts.`);
        return;
        }

        setContacts((prevState) => [...prevState, { name, number, id }]);
    };

    const filterContacts = () => {
        return contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(filter.toLowerCase());
        });
    };

    const deleteContact = (id) => {
        const deleteContacts = contacts.filter(
        (contact) =>
            contact.id.toLowerCase() !== id.toLowerCase()
        );

        setContacts(deleteContacts);
    };

    return (
        <div className={css.container}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm addContact={addContact} />
        <h2 className={css.title}>Contacts</h2>
        <Filter
            filter={filter}
            handleFilterChange={handleFilterChange}
        />
        <ContactList
            contacts={filterContacts()}
            deleteContact={deleteContact}
        />
        </div>
    );
};


// import { useEffect, useState } from 'react';
// import { ContactForm } from './ContactForm/ContactForm';
// import { ContactList } from './ContactList/ContactList';
// import { Filter } from './Filter/Filter';

// import css from './App.module.css';

// export const App = () => {
//     const [contacts, setContacts] = useState([]);

//     const [filter, setFilter] = useState('');

//     useEffect(() => {
//         const localStorageData = JSON.parse(localStorage.getItem('contacts'));

//         // Check if the retrieved data is an array
//         if (Array.isArray(localStorageData)) {
//         setContacts(localStorageData);
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('contacts', JSON.stringify(contacts));
//     }, [contacts]);

//     const handleFilterChange = (e) => {
//         setFilter(e.target.value);
//     };

//     const addContact = (name, number, id) => {
//         if (
//         contacts.find(
//             (contact) =>
//             contact.name.toLowerCase() === name.toLowerCase()
//         )
//         ) {
//             alert(`${name} is already in contacts.`);
//             return;
//         }

//         setContacts((prevState) => [...prevState, { name, number, id }]);
//     };

//     const filterContacts = () => {
//         return contacts.filter((contact) => {
//             return contact.name.toLowerCase().includes(filter.toLowerCase());
//         });
//     };

//     const deleteContact = (id) => {
//         const deleteContacts = contacts.filter(
//         (contact) =>
//             contact.id.toLowerCase() !== id.toLowerCase()
//         );

//         setContacts(deleteContacts);
//     };

//     return (
//         <div className={css.container}>
//         <h2 className={css.title}>Phonebook</h2>
//         <ContactForm addContact={addContact} />
//         <h2 className={css.title}>Contacts</h2>
//         <Filter
//             filter={filter}
//             handleFilterChange={handleFilterChange}
//         />
//         <ContactList
//             contacts={filterContacts()}
//             deleteContact={deleteContact}
//         />
//         </div>
//     );
// };


