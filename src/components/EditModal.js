import React, { useState } from 'react';

// Importing CSS file for styling
import '../../src/App.css';

function EditModal({ editedUser, updateUser, closeEditModal }) {
  // State to handle edited fields
  const [editedFields, setEditedFields] = useState({});

  // Function to handle changes in input fields
  const handleFieldChange = (field, value) => {
    setEditedFields(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  // Function to save changes and close the modal
  const handleSave = () => {
    updateUser({ ...editedUser, ...editedFields }); // Update user with edited fields
    closeEditModal(); // Close the modal
  };

  // Function to cancel and close the modal
  const handleCancel = () => {
    closeEditModal();
  };

  return (
    <div className="modal">
      {/* Modal content */}
      <h2>Edit User</h2>
      <form>
        {/* Inputs for editing user details */}
        <div style={{ fontFamily: '"JetBrains Mono", monospace' }}>
          <label>
            Name:
            <input
              className='inpbox1'
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              type="text"
              value={editedFields.name || editedUser.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              className='inpbox1'
              type="text"
              value={editedFields.email || editedUser.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
            />
          </label>
          <label>
            Role:
            <input
              className='inpbox1'
              type="text"
              value={editedFields.role || editedUser.role}
              onChange={(e) => handleFieldChange('role', e.target.value)}
            />
          </label>
        </div>

        {/* Buttons for saving or cancelling changes */}
        <div className="modal-buttons">
          <button className="save button-29" onClick={handleSave}>Save</button>
          <button className="cancel button-29" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditModal;
