import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for making API requests
import { useState, useEffect } from "react";
import ConfirmModal from '../WIdget/Confirm';
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'


function ViewPackage() {
  const [tourPackages, setTourPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

  const handleDeleteClick = (packageId) => {
    setPackageToDelete(packageId);
    setIsModalOpen(true);
  };

  // Fetch tour packages from the API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tour-packages/")
      .then((response) => {
        setTourPackages(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("There was an error fetching the tour packages!", error);
      });
  }, []);

  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    // Delete the tour package by ID using the packageToDelete state
    if (packageToDelete) {
      axios
        .delete(`http://localhost:3000/api/tour-packages/${packageToDelete}`)
        .then((response) => {
          toast.success(response.data.message, {
            autoClose: 2500,
          });
          setTourPackages(tourPackages.filter((pkg) => pkg.id !== packageToDelete));
          setTimeout(() => {
            navigate('');
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


  return (
    <div>
      <h1>View Tour Packages</h1>

      <div>
        <h1>Overall Statistics For Tour Packages</h1>
        <div className="data-cards">
          <a href="#" className="data-card">
            <h1>Total Packages</h1>
            <p>{tourPackages.length}</p>
            <div className="icon push">
              {/* SVG Icon for Total Packages */}
            </div>
          </a>
        </div>

        <div className="data-table">
          <div className="titles">
            <h1>All Tour Packages</h1>
            <div className="title-actions">
             <Link to='/dashboard/protected/package/addpackage/'>add package</Link>
            </div>
          </div>

          {tourPackages.length === 0 ? (
            <p className="center">
              <br />
              <span>No tour packages found</span>
            </p>
          ) : (
            <table cellSpacing="0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>location</th>
                  <th>pricing</th>
                  <th>date</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {tourPackages.map((tourPackage, index) => (
                  <tr key={tourPackage.id}>
                    <td>{index + 1}</td>
                    <td className="upper">{tourPackage.title}</td>
                    <td>{tourPackage.location}</td>
                    <td>{tourPackage.pricing}</td>
                    <td>{tourPackage.travelPlan}</td>
                    <td>
                      <Link
                        exact
                        to={`viewdetail/${tourPackage.id}`}
                      >
                        View Details
                      </Link>
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
        message="Are you sure you want to delete this package?"
      />
      

      {/* Add Tour Package Modal/Popup would be here */}
    </div>
  );
}

export default ViewPackage;
