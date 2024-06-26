import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import SimpleModal from './SimpleModal.jsx';
 // Ensure this is properly implemented
import './UpdateProfile.css'; // Make sure this points to your CSS for styles

const UpdateProfile = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalState, setModalState] = useState(''); // This will control the modal view
  const [modalMessage, setModalMessage] = useState(''); // Message to display in the modal

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem("user");
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8080/api/users/getProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const userData = await response.json();
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        console.error('Fetch user data error:', error);
        setError(`Failed to fetch user data: ${error.message}`);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.firstName.trim() || !user.lastName.trim() || !user.email.trim()) {
      setError('All fields are required and cannot be empty.');
      return;
    }
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email, // Assume email is not changeable in this form or handle accordingly
    };
  
    try {
      const { data } = await axios.post('http://localhost:8080/api/users/update-profile', payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setModalMessage('Profile updated successfully');
      setModalState('showMessage');
    } catch (error) {
      console.error('Update profile error:', error);
      setError(`Failed to update profile: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = () => {
    setModalMessage('Are you sure you want to delete your profile? This cannot be undone.');
    setModalState('confirmDelete');
  };

  const confirmDelete = async () => {
    try {
      const email = localStorage.getItem("user");
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:8080/api/users/delete-profile', {
        data: { email },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setModalMessage('Profile deleted successfully. Redirecting you to our Login Page...');
      setModalState('messageOnly');

      setTimeout(() => {
          window.location = "/login";
      }, 3000); // 3000 milliseconds = 3 seconds
    } catch (error) {
      console.error('Delete profile error:', error);
      setError(`Failed to delete profile: ${error.response?.data?.message || error.message}`);
      setModalState('');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="update-profile-container">
      <div className="update-profile-form-container">
        <div className="update-profile-form-card">
          <h2>Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label><strong>First Name:</strong></label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                className="update-profile-input"
                required
              />
            </div>
            <div>
              <label><strong>Last Name:</strong></label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
                className="update-profile-input"
                required
              />
            </div>
            <div>
              <label><strong>Email:</strong></label>
              <input
                type="email"
                name="email"
                value={user.email}
                readOnly
                className="update-email"
              />
            </div>
            <div>
              <Link to="/forgot-password">
                <button type="button" className="btn">Reset Password</button>
              </Link>
            </div>
            <button type="submit" className="green_btn">Save Changes</button>
            <div>
              <button type="button" onClick={handleDelete} className="button">Delete Profile</button>
            </div>
          </form>
          {error && <p className="update-profile-error-msg">{error}</p>}
        </div>
      </div>
      <SimpleModal isOpen={modalState !== ''} onClose={() => setModalState('')}>
        {modalState === 'confirmDelete' && (
          <>
            <p>{modalMessage}</p>
            <button onClick={confirmDelete}>Yes, Delete</button>
            <button onClick={() => setModalState('')}>Cancel</button>
          </>
        )}
        {(modalState === 'showMessage' || modalState === 'messageOnly') && (
          <>
            <p>{modalMessage}</p>
            {modalState !== 'messageOnly' && <button onClick={() => setModalState('')}>OK</button>}
          </>
        )}
      </SimpleModal>
    </div>
  );
};

export default UpdateProfile;
