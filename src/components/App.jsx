import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import css from './App.module.css';

export class App extends Component {
    state = {
        contacts: [],
        filter: '',
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    addContact = (name, number, id) => {
        if (this.state.contacts.find(
                contact => contact.name.toLowerCase() === name.toLowerCase())
                ) {
                    alert(`${name} is already in contacts.`);
                    return;
                }
        
        this.setState(prevState => {
            return {
                contacts: [...prevState.contacts, { name, number, id }],
            };
        });
    };

    filterContacts = () => {
        return this.state.contacts.filter(contact => {
            return contact.name
                .toLowerCase()
                .includes(this.state.filter.toLowerCase());
        });
    };

    deleteContact = id => {
        const contacts = this.state.contacts.filter(contact => {
            return contact.id.toLowerCase() !== id.toLowerCase();
        });

        this.setState(() => {
            return {
                contacts: [...contacts],
            };
        });
    };

    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);
    
        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
    }

    render() {
        return (
            <div className={css.container}>
                <h2 className={css.title}>Phonebook</h2>
                <ContactForm addContact={this.addContact}/>
                <h2 className={css.title}>Contacts</h2>
                <Filter
                    filter={this.state.filter}
                    handleFilterChange={this.handleInputChange}
                />
                <ContactList
                    contacts={this.filterContacts()}
                    deleteContact={this.deleteContact}
                />
            </div>
        )
    }
}