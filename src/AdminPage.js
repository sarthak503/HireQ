import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import EditModal from './components/EditModal';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);

  const [editingId, setEditingId] = useState(null); // Define editingId state
  const [editedFields, setEditedFields] = useState({}); // Define editedFields state


  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


   // Search functionality
   const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCheckboxChange = (userId) => {
    const newSelectedRows = [...selectedRows];
    if (newSelectedRows.includes(userId)) {
      newSelectedRows.splice(newSelectedRows.indexOf(userId), 1);
    } else {
      newSelectedRows.push(userId);
    }
    setSelectedRows(newSelectedRows);
  };


  const [editedUser, setEditedUser] = useState(null);

  const openEditModal = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    setEditedUser(userToEdit);
    // Logic to open your edit modal or form here
  };

  const closeEditModal = () => {
    setEditedUser(null);
    // Logic to close your edit modal or form here
  };

  const updateUser = (updatedUserInfo) => {
    // Update the user data in the `users` state array
    const updatedUsers = users.map(user => {
      if (user.id === updatedUserInfo.id) {
        return { ...user, ...updatedUserInfo };
      }
      return user;
    });
    setUsers(updatedUsers);
    closeEditModal();
  };



  // Function to save edited fields for a specific row
  const handleSave = (userId) => {
    // Update the users' data with the edited fields
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, ...editedFields };
      }
      return user;
    });
    setUsers(updatedUsers);
    setEditingId(null);
    setEditedFields({});
  };

  // Function to handle changes in the edited fields
  const handleFieldChange = (field, value) => {
    setEditedFields(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  // Function to delete a specific user
  const handleDelete = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleEdit = (userId) => {
    setEditingId(userId);
  };

  // Function to handle select/deselect all displayed rows
  const handleSelectAll = () => {
    if (selectedRows.length === currentUsers.length) {
      setSelectedRows([]);
    } else {
      const allUserIds = currentUsers.map(user => user.id);
      setSelectedRows(allUserIds);
    }
  };


  return (
    <div className='container'>
      <h1>Admin Dashboard</h1>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <UserTable
        currentUsers={currentUsers}
        selectedRows={selectedRows}
        handleCheckboxChange={handleCheckboxChange}
        editingId={editingId}
        editedFields={editedFields}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleFieldChange={handleFieldChange}
        openEditModal={openEditModal}
        handleSelectAll={handleSelectAll}
      />
      <Pagination
        currentPage={currentPage}
        paginate={paginate}
        filteredUsers={filteredUsers}
        usersPerPage={usersPerPage}
      />
      {editedUser && (
        <EditModal
          editedUser={editedUser}
          updateUser={updateUser}
          closeEditModal={closeEditModal}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
