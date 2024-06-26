import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'; // Adjust path as necessary

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/all-users');
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error.response?.data || 'Server error');
        }
    };

    const deleteUser = async (email) => {
        try {
            await axios.delete('http://localhost:8080/api/users/delete-profile', { data: { email } });
            setUsers(users.filter(user => user.email !== email)); // Optimistically remove the user from the UI
        } catch (error) {
            console.error('Failed to delete user:', error.response?.data || 'Server error');
        }
    };

    const viewUserInfo = async (email) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/user-details/${email}`);
            setSelectedUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user details:', error.response?.data || 'Server error');
        }
    };
    const handleAdminDashboard = () => {
        navigate("/AdminDashboard");
      }

    return (
        <div className={styles.admin_container}>
            <div className={styles.admin_navbar}>
                <h1>User Management</h1>
            </div>
            <div className={styles.functions_container}>
                <div className={styles.main_content}>
                    <h1>List of Current Users:</h1>
                    <div className={styles.user_cards}>
                        {users.map((user) => (
                            <div key={user._id} className={styles.user_card}>
                                <h3>{user.firstName} {user.lastName}</h3>
                                <button onClick={() => viewUserInfo(user.email)} className={styles.white_btn}>View Information</button>
                                <button onClick={() => deleteUser(user.email)} className={styles.white_btn}>Delete</button>
                            </div>
                        ))}
                    </div>
                    {selectedUser && (
                        <div className={styles.recipeDetails}>
                            <h3>User Information</h3>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
                            <p><strong>Joined:</strong> {new Date(selectedUser.createdAt).toLocaleDateString("en-US", {
                                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
                            })}</p>
                            <button onClick={() => setSelectedUser(null)} className={styles.white_btn}>Close</button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.back_button_container}>
            <button className={styles.white_btn2} onClick={handleAdminDashboard}>
                Back to Admin Dashboard</button>
            </div>
        </div>
    );
};

export default UserList;
