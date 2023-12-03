import React, { useState } from 'react';

function EditModal({ editedUser, updateUser, closeEditModal }) {
  const [editedFields, setEditedFields] = useState({});

  const handleFieldChange = (field, value) => {
    setEditedFields(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Logic to update user with edited fields
    updateUser({ ...editedUser, ...editedFields });
    closeEditModal();
  };

  return (
    <div className="modal">
      {/* Modal content */}
      <h2>Edit User</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={editedFields.name || editedUser.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={editedFields.email || editedUser.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            value={editedFields.role || editedUser.role}
            onChange={(e) => handleFieldChange('role', e.target.value)}
          />
        </label>
        <div className="modal-buttons">
          <button className="save" onClick={handleSave}>Save</button>
          <button className="cancel" onClick={closeEditModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditModal;
