import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function Tourpackage() {
  const [tourPackages, setTourPackages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tour-packages")
      .then((response) => {
        setTourPackages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tour packages!", error);
      });
  }, []);

  return (
    <div className="">
      <h1>View Tour Packages</h1>
      <div className="data-cards">
        {tourPackages.length === 0 ? (
          <p className="center">
            <br />
            <span>No tour packages found</span>
          </p>
        ) : (
          <div className="package-grid">
            {tourPackages.map((tourPackage) => (
              <div key={tourPackage.id} className="package-card">
                <img
   src={`http://localhost/Tours&&Travel/backend/uploads/${tourPackage.image1}`}  // Replace with your actual image path
                  alt={tourPackage.title}
                  className="package-image"
                />
                <div className="package-details">
                  <h2 className="package-title">{tourPackage.title}</h2>
                  <p className="package-date">{tourPackage.travelPlan}</p>
                  <p className="package-price">${tourPackage.pricing}</p>
                  <Link to={`viewdetail/${tourPackage.id}`} className="book-now">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tourpackage;
