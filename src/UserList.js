import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);

  // Add new state variables for tracking edited fields
  const [editingId, setEditingId] = useState(null);
  const [editedFields, setEditedFields] = useState({});


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

  // Rest of the code remains the same for rendering and handling checkboxes, edit, delete functionalities


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

  // Implement logic for select/deselect all displayed rows
  const handleSelectAll = () => {
    if (selectedRows.length === currentUsers.length) {
      setSelectedRows([]);
    } else {
      const allUserIds = currentUsers.map(user => user.id);
      setSelectedRows(allUserIds);
    }
  };

  // Function to enable editing for a specific row
  const handleEdit = (userId) => {
    setEditingId(userId);
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

  return (
    <div className='container'>
      <h1>Admin Dashboard</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearch}
      />


      <table>
        <thead>
          <tr>
          <th>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedRows.length === currentUsers.length && currentUsers.length !== 0}
              indeterminate={selectedRows.length !== currentUsers.length && selectedRows.length !== 0}
            />
          </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {currentUsers.map(user => (
          <tr key={user.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
            </td>
            {/* <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>

            <td>
              <button className="edit" onClick={() => openEditModal(user.id)}>Edit</button>
            </td>
            <td>
              <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
            </td> */}
            <td>
              {editingId === user.id ? (
                <input
                  type="text"
                  value={editedFields.name || user.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {editingId === user.id ? (
                <input
                  type="text"
                  value={editedFields.email || user.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                />
              ) : (
                user.email
              )}
            </td>
            <td>
              {editingId === user.id ? (
                <input
                  type="text"
                  value={editedFields.role || user.role}
                  onChange={(e) => handleFieldChange('role', e.target.value)}
                />
              ) : (
                user.role
              )}
            </td>

            {/* // Edit button to trigger editing */}
            <td>
              {editingId === user.id ? (
                <button className="save" onClick={() => handleSave(user.id)}>Save</button>
              ) : (
                <button className="edit" onClick={() => handleEdit(user.id)}>Edit</button>
              )}
            </td>
            <td>
              {editingId !== user.id && (
                <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
      </table>
  

      {/* Pagination */}
      <div>
        <button className="first-page" onClick={() => paginate(1)}>First</button>
        <button className="previous-page" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button className="next-page" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}>Next</button>
        <button className="last-page" onClick={() => paginate(Math.ceil(filteredUsers.length / usersPerPage))}>Last</button>
      </div>
    </div>
  );
}

export default AdminDashboard;

