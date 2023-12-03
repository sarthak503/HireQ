import React from 'react';
import '../../src/App.css'; // Importing CSS file for styling
import Icon from "react-crud-icons"; // Importing icons library

function UserTable({
  currentUsers,
  selectedRows,
  handleCheckboxChange,
  editingId,
  editedFields,
  handleEdit,
  handleSave,
  handleDelete,
  handleFieldChange,
  openEditModal,
  handleSelectAll
}) {
  return (
    <table>
      <thead>
        <tr>
          {/* Header row */}
          <th>
            {/* Checkbox for select/deselect all */}
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
          <th className='action' colSpan="2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Mapping through users and displaying data */}
        {currentUsers.map(user => (
          <tr key={user.id}>
            <td>
              {/* Checkbox for individual rows */}
              <input
                type="checkbox"
                checked={selectedRows.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
            </td>
            <td>
              {/* Render name with editable field if in edit mode */}
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
              {/* Render email with editable field if in edit mode */}
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
              {/* Render role with editable field if in edit mode */}
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
            <td>
              {/* Edit or Save button based on edit mode */}
              {editingId === user.id ? (
                <button className="save" onClick={() => handleSave(user.id)}>Save</button>
              ) : ( 
                <div className='editBtn'>
                  {/* Icon for edit */}
                  <Icon
                    name="edit"
                    theme="light"
                    size="medium"
                    onClick={() => handleEdit(user.id)}
                  />
                </div>
              )}
            </td>
            <td>
              {/* Render Delete button if not in edit mode */}
              {editingId !== user.id && (
                <div className='delBtn'>
                  {/* Icon for delete */}
                  <Icon
                    name="delete"
                    theme="light"
                    size="medium"
                    onClick={() => handleDelete(user.id)}
                  />
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
