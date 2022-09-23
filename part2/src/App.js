import { useState, useEffect } from 'react';

import {
  getAll,
  createPerson,
  updatePerson,
  deletePerson,
} from './services/phonebookServices';
import People from './components/People';
import SearchForm from './components/SearchForm';
import AddNameForm from './components/AddNameForm';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchText, setSearchText] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationStyle, setNotificationStyle] = useState('');

  useEffect(() => {
    getAll().then((people) => setPersons(people));
  }, []);

  const addNewPerson = (e) => {
    e.preventDefault();
    const checkName = persons.find((el) => el.name === newName);
    if (checkName !== undefined) {
      if (checkName.number !== newNumber) {
        const confirmNumberChange = window.confirm(
          `${checkName.name} is already added to phonebook, replace the old number with a new one`,
        );

        const person = persons.find((person) => person.id === checkName.id);
        const changedPerson = { ...person, number: newNumber };

        if (confirmNumberChange) {
          updatePerson(checkName.id, changedPerson).then((response) => {
            const newPersons = persons.map((person) =>
              person.id !== checkName.id ? person : changedPerson,
            );

            setPersons(newPersons);
            setNotificationStyle('success');
            setNotificationMessage(
              `${changedPerson.name}'s number was changed successfully`,
            );
            setShowNotification(true);
            setTimeout(() => {
              setShowNotification(false);
              setNotificationStyle('');
            }, 3000);
            setNewName('');
            setNewNumber('');

            return;
          });
        }
        return;
      }
    } else {
      const checkNumber = persons.find((el) => el.number === newNumber);
      if (checkNumber === undefined) {
        const newPerson = {
          name: newName,
          number: newNumber,
        };
        createPerson(newPerson).then((response) => {
          setPersons([...persons, newPerson]);
          setNotificationStyle('success');
          setNotificationMessage(`Added ${newName}`);
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
            setNotificationStyle('');
          }, 3000);
          setNewName('');
          setNewNumber('');
        });
        return;
      } else {
        return alert(`${newNumber} is already added to phonebook`);
      }
    }
    return alert(`${newName} is already added to phonebook`);
  };

  const deleteEntry = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const newPersons = persons.filter(
      (person) => person.id === personToDelete.id,
    );

    if (!personToDelete) {
      setNotificationStyle('error');
      setNotificationMessage(
        `Information of ${personToDelete.name} has already been removed from server`,
      );
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setNotificationStyle('');
      }, 3000);
    } else {
      deletePerson(id, newPersons).then((response) => {
        const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`);
        if (confirmDelete) {
          setNotificationStyle('success');
          setNotificationMessage(
            `${personToDelete.name} was successfully deleted`,
          );
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
            setNotificationStyle('');
          }, 3000);
          getAll().then((response) => setPersons(newPersons));
        }
      });
    }
  };

  const capitalizeName = (name) => {
    const splitName = name.split(' ');
    const capitalizedNameArray = splitName.map((name) => {
      if (name[0] !== undefined) {
        return name[0].toUpperCase() + name.slice(1);
      }
      return '';
    });

    const formattedName = capitalizedNameArray.join(' ');
    return formattedName;
  };

  const filteredNames = persons.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleNameInputChange = (e) =>
    setNewName(capitalizeName(e.target.value));

  const handleNumberInputChange = (e) => setNewNumber(e.target.value);

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {showNotification && (
        <Notification
          notificationMessage={notificationMessage}
          notificationStyle={notificationStyle}
        />
      )}

      <SearchForm handleSearchInput={handleSearchInput} />
      <AddNameForm
        handleSubmit={addNewPerson}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
        name={newName}
        number={newNumber}
      />

      <People people={filteredNames} deletePerson={deleteEntry} />
    </div>
  );
};

export default App;
