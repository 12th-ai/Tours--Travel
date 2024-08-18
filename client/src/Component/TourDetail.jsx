import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TourDetail() {
  const { id } = useParams(); // Get the package ID from the URL
  const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState(null);
  const [relatedPackages, setRelatedPackages] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    // Fetch single package details
    axios
      .get(`http://localhost:3000/api/tour-packages/${id}`)
      .then((response) => {
        const data = response.data;
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

    // Fetch related packages
    axios
      .get(`http://localhost:3000/api/tour-packages?relatedTo=${id}`)
      .then((response) => {
        const related = response.data;
        setRelatedPackages(related.slice(0, 4)); // Limit to 4 items on the frontend
      })
      .catch((error) => {
        console.error("There was an error fetching related packages!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/api/booking', {
      tourPackageId: id,
      fullName: formData.fullName,
      email: formData.email,
      amount: packageDetails.pricing, // Assuming you get this from packageDetails
      message: formData.message,
    })
      .then((response) => {
        alert('Booking successful!');
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error booking the package!', error);
        alert('Booking failed!');
      });
  };

  if (!packageDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='tour-details'>
      <div className="main-header">
        <div className="position"></div>
        <div className="header">
          <h1>Tour Package Detail</h1>
          <div className="links">
            <Link to="/">Home <span>||</span></Link>
            <Link to={`/tour-packages/${id}`}>PACKAGE DETAIL</Link>
          </div>
        </div>
      </div>

      <div className="main-section">
        <div className="data-section">
          <div className="upper">
            <div className="image1-section">
              <img src={`http://localhost/Tours&&Travel/backend/uploads/${packageDetails.image1}`} alt={packageDetails.title} className="main-image" />
            </div>
            <div className="title-section">
              <p>{packageDetails.location}</p>
              <h1>{packageDetails.title}</h1>
            </div>
          </div>

          <div className="lower-section">
            <h1>Package Details</h1>
            <p>{packageDetails.description}</p>
            <div className="secand-images">
              <div className="imag1">
                <img src={`http://localhost/Tours&&Travel/backend/uploads/${packageDetails.image2}`} alt={packageDetails.title} />
              </div>
              <div className="imag1">
                <img src={`http://localhost/Tours&&Travel/backend/uploads/${packageDetails.image3}`} alt={packageDetails.title} className="main-image" />
              </div>
            </div>
            <div className="detail">
              <p>Destination: {packageDetails.location}</p>
              <p>Date: {new Date(packageDetails.travelPlan).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="booking-section">
          <h1>Book This Tour for {packageDetails.pricing} RWF</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" name="fullName" placeholder="Your Full Name" value={formData.fullName} onChange={handleChange} required /> <br />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required /> <br />
            <input type="tel" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} required /><br />
            <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} cols="30" rows="5"></textarea> <br />
            <button type="submit">Book Now</button>
          </form>

          <div className="related_packages">
            <h1>Related Packages</h1>
            <div className="cards">
              {relatedPackages.map((pkg) => (
                <div className="card" key={pkg.id}>
                  <div className="left">
                    <img src={`http://localhost/Tours&&Travel/backend/uploads/${pkg.image1}`} className="main-image" />
                  </div>
                  <div className="text">
                    <h3>{pkg.title}</h3>
                    <p>From: <br /> <span> {pkg.pricing} Rwf</span> per person</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetail;
