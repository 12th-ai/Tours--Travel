import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ConfirmModal from '../WIdget/Confirm';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { userService } from "../../../Services/authService"; // Using the service

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        console.log('Full response:', response); // Log the full response to inspect
        
        // Ensure the data is an array before setting it
        const usersData = response.data; // Adjust this based on your API response structure
        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          console.error("The fetched data is not an array");
          toast.error("Failed to load users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
        toast.error("There was an error fetching the users!");
      }
    };

    fetchUsers();
  }, []);

  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    // Delete the user by ID using the userToDelete state and the service
    if (userToDelete) {
      try {
        const response = await userService.deleteUser(userToDelete);
        toast.success(response.message, {
          autoClose: 2500,
        });
       //  console.log(userId);
        setUsers(users.filter((user) => user.id !== userToDelete));

        setTimeout(() => {
          navigate('');
        }, 3200);
      } catch (error) {
        console.error("There was an error deleting the user!", error);
        toast.error("Failed to delete the user.");
       //  console.log(user.id);
      } finally {
        setIsModalOpen(false);
        setUserToDelete(null);
       //  console.log(userId);
      }
    }
  };

  return (
    <div>
      <h1>View Users</h1>

      <div>
        <h1>Overall Statistics For Users</h1>
        <div className="data-cards">
          <a href="#" className="data-card">
            <h1>Total Users</h1>
            <p>{users.length}</p>
            <div className="icon push">
              {/* SVG Icon for Total Users */}
            </div>
          </a>
        </div>

        <div className="data-table">
          <div className="titles">
            <h1>All Users</h1>
          </div>

          {users.length === 0 ? (
            <p className="center">
              <br />
              <span>No users found</span>
            </p>
          ) : (
            <table cellSpacing="0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td className="upper">{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
              
                      &nbsp;
                      <button
                        className="del"
                        onClick={() => handleDeleteClick(user.id)}
                      >
                        <span className="del-txt">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
}

export default ViewUsers;
