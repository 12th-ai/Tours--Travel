import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePackage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [travelPlan, setTravelPlan] = useState("");
  const [pricing, setPricing] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([null, null, null]);
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve the package ID from the URL

  useEffect(() => {
    // Fetch the existing package data
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/tour-packages/${id}`);
        const packageData = response.data;

        setTitle(packageData.title);
        setDescription(packageData.description);
        setTravelPlan(packageData.travelPlan);
        setPricing(packageData.pricing);
        setLocation(packageData.location);
        setImages([
          packageData.image1 || null,
          packageData.image2 || null,
          packageData.image3 || null
        ]);
      } catch (error) {
        console.error("Error fetching package data:", error);
        toast.error("Failed to load package data.");
      }
    };

    fetchPackageData();
  }, [id]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index - 1] = file;
      setImages(updatedImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("travelPlan", travelPlan);
    formData.append("location", location);
    formData.append("pricing", pricing);
    images.forEach((image, index) => {
      if (image && typeof image !== "string") {
        formData.append(`image${index + 1}`, image);
      }
    });

    try {
      await axios.put(`http://localhost:3000/api/tour-packages/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Tour package successfully updated.", {
        autoClose: 2500,
      });
      setTimeout(() => {
        navigate("/dashboard/protected/package");
      }, 3200);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, { autoClose: 10000 });
        console.error("Error response data:", error.response.data);
      } else {
        toast.error(error.message, { autoClose: 10000 });
      }
      console.error("Update failed:", error);
    }
  };

  const styles = {
    fileInput: {
      display: "block",
      marginBottom: "10px",
      background: "transparent",
    },
    imagePreview: {
      width: "150px",
      height: "auto",
      margin: "10px 0",
    },
  };

  return (
    <div className="addpackage">
      <div className="form-page">
        <div className="form">
          <div className="logo">
            <p>Update TOUR PACKAGE</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="part">
              <div className="crd">
                <label>Tour Title</label>
                <div className="crd-input">
                  <input
                    type="text"
                    placeholder="Tour title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="crd">
                <label>Location</label>
                <div className="crd-input">
                  <input
                    type="text"
                    placeholder="Tour location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="crd">
              <label>Description</label>
              <div className="crd-input">
                <textarea
                  placeholder="Tour description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="part">
              <div className="crd">
                <label>Pricing</label>
                <div className="crd-input">
                  <input
                    type="number"
                    placeholder="Tour price"
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value)}
                  />
                </div>
              </div>
              <div className="crd">
                <label>Travel Plan</label>
                <div className="crd-input">
                  <input
                    type="date"
                    value={travelPlan}
                    onChange={(e) => setTravelPlan(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {images.map((img, index) => (
              <div className="crd" key={index}>
                <label>Image {index + 1}</label>
                <div className="crd-input">
                  {img && typeof img === "string" ? (
                    <img
                      src={`http://localhost/Tours&&Travel/backend/uploads/${img}`}
                      alt={`Image ${index + 1}`}
                      style={styles.imagePreview}
                    />
                  ) : img ? (
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Image ${index + 1}`}
                      style={styles.imagePreview}
                    />
                  ) : null}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index + 1)}
                    style={styles.fileInput}
                  />
                </div>
              </div>
            ))}

            <button type="submit" className="btn btn-primary">
              Update Package
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePackage;
