import React from 'react';
import './css/user.css';

const User = ({ onClose }) => {
  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logged out");
  };

  return (
    <div className="user-dropdown">
      <div className="user-content">
        <h2>User Component</h2>
        <p>This is your user information.</p>
        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      </div>
      <div className="close-btn" onClick={onClose}>×</div>
    </div>
  );
};

export default User;
