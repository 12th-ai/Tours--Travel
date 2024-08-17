import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../../assets/Style/client_style/Custom.css'; // Import the CSS file for custom styles
import ConfirmModal from '../WIdget/Confirm';
import { toast } from "react-toastify";

function ViewPackageDetails() {
  const { id } = useParams(); // Get the package ID from the URL
  const navigate = useNavigate();
  
  const [packageDetails, setPackageDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);
  
  const handleDeleteClick = (packageId) => {
    setPackageToDelete(packageId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/tour-packages/${id}`)
      .then((response) => {
        const data = response.data;
        // Parse the description if it's in JSON format
        if (data.description) {
          try {
            data.description = JSON.parse(data.description);
          } catch (e) {
            console.error("Error parsing description JSON:", e);
          }
        }
        setPackageDetails(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the package details!", error);
        toast.error("Failed to fetch package details.");
      });
  }, [id]);

  const handleConfirmDelete = () => {
    // Delete the tour package by ID using the packageToDelete state
    if (packageToDelete) {
      axios
        .delete(`http://localhost:3000/api/tour-packages/${packageToDelete}`)
        .then((response) => {
          toast.success(response.data.message, {
            autoClose: 2500,
          });
          setTimeout(() => {
            navigate('/'); // Redirect to the appropriate route after deletion
          }, 3200);
        })
        .catch((error) => {
          console.error("There was an error deleting the package!", error);
          toast.error("Failed to delete the package.");
        })
        .finally(() => {
          setIsModalOpen(false);
          setPackageToDelete(null);
        });
    }
  };

  // If packageDetails is still loading (null), show a loading spinner or placeholder
  if (!packageDetails) {
    return <div>Loading...</div>; // You can replace this with a spinner or a more styled loading indicator
  }

  return (
    <div className="package-details-container">
      {/* Top section with big image and description */}
      <div className="top-section">
        <div className="image-section">
          <img 
            src={`http://localhost/Tours&&Travel/backend/uploads/${packageDetails.image1}`} 
            alt={packageDetails.title} 
            className="main-image"
          />
        </div>
        <div className="description-section">
          <img 
            src={`http://localhost/Tours&&Travel/backend/uploads/${packageDetails.image2}`} 
            alt="Additional Image 1" 
            className="small-image" 
          />
          <img 
            src={`http://localhost/Tours&&Travel/backend/uploads/${packageDetails.image3}`} 
            alt="Additional Image 2" 
            className="small-image" 
          />
        </div>
      </div>

      {/* Bottom section with two small images and table */}
      <div className="bottom-section">
        <div className="content-section">
          <h1>{packageDetails.title}</h1>
          <p>{packageDetails.description}</p>
        </div>
        <div className="info-table">
          <table>
            <tbody>
              <tr>
                <th>Date:</th>
                <td>{packageDetails.travelPlan}</td>
              </tr>
              <tr>
                <th>Price:</th>
                <td>{packageDetails.pricing} RWF</td>
              </tr>
              <tr>
                <th>Location:</th>
                <td>{packageDetails.location}</td>
              </tr>
              <tr>
                <td>
                  <Link exact to={`/dashboard/protected/package/update/${packageDetails.id}`}>Update</Link>
                </td>
                <td>
                  <button
                    className="del"
                    onClick={() => handleDeleteClick(packageDetails.id)}
                  >
                    <span className="del-txt">Delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this package?"
      />
    </div>
  );
}

export default ViewPackageDetails;
