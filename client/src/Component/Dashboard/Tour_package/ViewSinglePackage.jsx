import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../../assets/Style/client_style/Custom.css'; // Import the CSS file for custom styles

function ViewPackageDetails() {
  const { id } = useParams(); // Get the package ID from the URL
  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/tour-packages/${id}`)
      .then((response) => {
        setPackageDetails(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the package details!", error);
      });
  }, [id]);

  if (!packageDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="package-details-container">
      {/* Top section with big image and description */}
      <div className="top-section">
        <div className="image-section">
          <img src={`http://localhost/Tours&&Travel/backend/uploads/${packageDetails.image1}`} alt={packageDetails.title} className="main-image"
          
          />
          
        </div>
      
      </div>

      {/* Bottom section with two small images and table */}
      <div className="description-section">
          <h1>{packageDetails.title}</h1>
          <p>{packageDetails.description}</p>
        </div>
      <div className="bottom-section">
        
        <div className="info-table">
          <table>
            <tbody>
              <tr>
                <td>Date:</td>
                <td>{packageDetails.travelPlan}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>{packageDetails.pricing}</td>
              </tr>
              <tr>
                <td>Location:</td>
                <td>{packageDetails.location}</td>
              </tr>
               <tr>

               &nbsp;
                      <button
                        onClick={() => console.log(`Update ${tourPackage.id}`)}
                      >
                        Update
                      </button>
                      &nbsp;
                      <button
                        className="del"
                        onClick={() => handleDeleteClick(tourPackage.id)}
                      >
                        <span className="del-txt">Delete</span>
                      </button>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="images-section">
          <img src={`http://localhost/Tours&&Travel/backend/uploads/${packageDetails.image2}`} alt="Additional Image 1" className="small-image" />
          <img src={`http://localhost/Tours&&Travel/backend/uploads/${packageDetails.image3}`} alt="Additional Image 2" className="small-image" />
        </div>
      </div>
    </div>
  );
}

export default ViewPackageDetails;
