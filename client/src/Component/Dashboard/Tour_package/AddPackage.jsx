import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import TextEditor from "../Auth/TextEditor.jsx";
import TextEditor from "../Auth/TextEditor.jsx";
import {useNavigate} from 'react-router-dom'

const AddPackage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [travelPlan, setTravelPlan] = useState("");
  const [pricing, setpricing] = useState("");
  const [location, setlocation] = useState("");
  const [images, setImages] = useState([null, null, null]);


  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };


  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("travelPlan", travelPlan);
    formData.append("location", location);
    formData.append("pricing", pricing);
    images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });

    try {
      const response = await axios.post("http://localhost:3000/api/tour-packages/", formData,  {
          headers: {
            "Content-Type": "multipart/form-data",}
        })
            
      .then(response => {
        toast.success('tour successfully inserted', {
            autoClose: 2500 // Notification will be displayed for 2 seconds
        });
        setTimeout(() => {
            navigate('/dashboard/protected/package'); // Redirect to login page after 2 seconds
        }, 3200);
    })
  
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, { autoClose: 10000 });
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else {
        toast.error('username already exist', { autoClose: 10000 });
        console.error('Error message:', error.message);
      }
      console.error('Login failed:', error);
      console.error('Error config:', error.config);

    }
  };

  const styles = {
    fileInput: {
      display: "block",
      marginBottom: "10px",
      background: "transparent", // Corrected: 'transparent' should be a string
    },
  };

  return (
    <div className="addpackage">
      <div className="form-page">
        <div className="form">
          <div className="logo">

            <p>Add TOUR PACKAGES</p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="part">
              <div className="crd">
                <label>Tour title</label>
                <div className="crd-input">
                  <input
                    type="text"
                    placeholder="Tour title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 48 48"
                    >
                      <path d="M24 4C18.494917 4 14 8.494921 14 14C14 19.505079 18.494917 24 24 24C29.505083 24 34 19.505079 34 14C34 8.494921 29.505083 4 24 4 z M 24 7C27.883764 7 31 10.116238 31 14C31 17.883762 27.883764 21 24 21C20.116236 21 17 17.883762 17 14C17 10.116238 20.116236 7 24 7 z M 12.5 28C10.032499 28 8 30.032499 8 32.5L8 33.699219C8 36.640082 9.8647133 39.277974 12.708984 41.091797C15.553256 42.90562 19.444841 44 24 44C28.555159 44 32.446744 42.90562 35.291016 41.091797C38.135287 39.277974 40 36.640082 40 33.699219L40 32.5C40 30.032499 37.967501 28 35.5 28L12.5 28 z M 12.5 31L35.5 31C36.346499 31 37 31.653501 37 32.5L37 33.699219C37 35.364355 35.927463 37.127823 33.677734 38.5625C31.428006 39.997177 28.068841 41 24 41C19.931159 41 16.571994 39.997177 14.322266 38.5625C12.072537 37.127823 11 35.364355 11 33.699219L11 32.5C11 31.653501 11.653501 31 12.5 31 z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="crd">
                <label>location</label>
                <div className="crd-input">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                    placeholder="tour location"
                  />
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 48 48"
                    >
                      <path d="M24 4C19.599415 4 16 7.599415 16 12L16 16L12.5 16C10.032499 16 8 18.032499 8 20.5L8 39.5C8 41.967501 10.032499 44 12.5 44L35.5 44C37.967501 44 40 41.967501 40 39.5L40 20.5C40 18.032499 37.967501 16 35.5 16L32 16L32 12C32 7.599415 28.400585 4 24 4 z M 24 7C26.779415 7 29 9.220585 29 12L29 16L19 16L19 12C19 9.220585 21.220585 7 24 7 z M 12.5 19L35.5 19C36.346499 19 37 19.653501 37 20.5L37 39.5C37 40.346499 36.346499 41 35.5 41L12.5 41C11.653501 41 11 40.346499 11 39.5L11 20.5C11 19.653501 11.653501 19 12.5 19 z M 17 28 A 2 2 0 0 0 17 32 A 2 2 0 0 0 17 28 z M 24 28 A 2 2 0 0 0 24 32 A 2 2 0 0 0 24 28 z M 31 28 A 2 2 0 0 0 31 32 A 2 2 0 0 0 31 28 z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="crd">
              <label>Description</label>
              <TextEditor />
            
            </div>

            <div className="part">
              <div className="crd">
                <label>pricing</label>
                <div className="crd-input">
                  <input
                    type="number"
                    placeholder="Tour price"
                    value={pricing}
                    onChange={(e) => setpricing(e.target.value)}
                  />
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 48 48"
                    >
                      <path d="M19.041016 4.0136719C18.382757 3.9657839 17.708271 4.0330649 17.046875 4.2285156L14.679688 4.9296875C12.157236 5.6756944 10.186338 7.677075 9.5195312 10.203125C8.0389548 15.820868 9.7326768 22.47029 14.140625 29.955078C18.542377 37.429539 23.558019 42.179937 29.222656 43.730469C31.773641 44.428685 34.524755 43.761709 36.457031 41.966797L38.257812 40.296875C40.272819 38.425993 40.573265 35.309882 38.945312 33.095703L36.34375 29.5625C34.949212 27.668344 32.49096 26.861916 30.230469 27.541016L26.160156 28.759766C25.989301 28.809656 25.580424 28.576963 25.224609 28.269531L25.222656 28.267578C24.588917 27.716517 23.710863 26.602712 22.771484 25.009766L22.771484 25.007812C21.764214 23.297093 21.334594 22.17828 21.162109 21.517578C20.989545 20.856572 21.031423 20.776164 21.056641 20.552734C21.069751 20.441248 21.122721 20.337948 21.212891 20.255859L21.214844 20.253906L24.25 17.478516C25.988893 15.888867 26.513843 13.348513 25.533203 11.210938L23.703125 7.21875L23.703125 7.2167969C22.841519 5.3386971 21.015266 4.1572962 19.041016 4.0136719 z M 18.824219 7.0058594C19.742414 7.0744633 20.587933 7.6252174 20.974609 8.46875L22.806641 12.460938C23.25 13.427361 23.027671 14.533274 22.226562 15.265625L19.191406 18.039062C18.569197 18.606386 18.171295 19.379878 18.076172 20.214844L18.076172 20.216797C18.051392 20.436367 17.992832 21.252897 18.259766 22.275391C18.526701 23.297884 19.077817 24.650307 20.185547 26.53125L20.1875 26.53125C21.221084 28.284258 22.197939 29.616041 23.255859 30.535156L23.257812 30.535156C23.601374 30.832583 25.041282 32.212607 27 31.640625L27.005859 31.638672L31.09375 30.414062C32.155259 30.095163 33.290273 30.475952 33.927734 31.341797L36.529297 34.875C37.266003 35.878668 37.13729 37.243002 36.216797 38.097656L34.416016 39.769531C33.264351 40.839787 31.554167 41.257578 30.013672 40.835938C25.434309 39.582469 20.90281 35.525133 16.726562 28.433594C12.544511 21.332382 11.236498 15.459007 12.419922 10.96875C12.811115 9.4868 14.009701 8.2566337 15.53125 7.8066406L17.896484 7.1054688C18.204589 7.0144199 18.518154 6.9829914 18.824219 7.0058594 z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="crd">
                <label>TRAVEL plan</label>
                <div className="crd-input">
                  <input
                    type="date"
                    id=""
                    value={travelPlan}
                    onChange={(e) => setTravelPlan(e.target.value)}
                  />
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 48 48"
                    >
                      <path d="M19.041016 4.0136719C18.382757 3.9657839 17.708271 4.0330649 17.046875 4.2285156L14.679688 4.9296875C12.157236 5.6756944 10.186338 7.677075 9.5195312 10.203125C8.0389548 15.820868 9.7326768 22.47029 14.140625 29.955078C18.542377 37.429539 23.558019 42.179937 29.222656 43.730469C31.773641 44.428685 34.524755 43.761709 36.457031 41.966797L38.257812 40.296875C40.272819 38.425993 40.573265 35.309882 38.945312 33.095703L36.34375 29.5625C34.949212 27.668344 32.49096 26.861916 30.230469 27.541016L26.160156 28.759766C25.989301 28.809656 25.580424 28.576963 25.224609 28.269531L25.222656 28.267578C24.588917 27.716517 23.710863 26.602712 22.771484 25.009766L22.771484 25.007812C21.764214 23.297093 21.334594 22.17828 21.162109 21.517578C20.989545 20.856572 21.031423 20.776164 21.056641 20.552734C21.069751 20.441248 21.122721 20.337948 21.212891 20.255859L21.214844 20.253906L24.25 17.478516C25.988893 15.888867 26.513843 13.348513 25.533203 11.210938L23.703125 7.21875L23.703125 7.2167969C22.841519 5.3386971 21.015266 4.1572962 19.041016 4.0136719 z M 18.824219 7.0058594C19.742414 7.0744633 20.587933 7.6252174 20.974609 8.46875L22.806641 12.460938C23.25 13.427361 23.027671 14.533274 22.226562 15.265625L19.191406 18.039062C18.569197 18.606386 18.171295 19.379878 18.076172 20.214844L18.076172 20.216797C18.051392 20.436367 17.992832 21.252897 18.259766 22.275391C18.526701 23.297884 19.077817 24.650307 20.185547 26.53125L20.1875 26.53125C21.221084 28.284258 22.197939 29.616041 23.255859 30.535156L23.257812 30.535156C23.601374 30.832583 25.041282 32.212607 27 31.640625L27.005859 31.638672L31.09375 30.414062C32.155259 30.095163 33.290273 30.475952 33.927734 31.341797L36.529297 34.875C37.266003 35.878668 37.13729 37.243002 36.216797 38.097656L34.416016 39.769531C33.264351 40.839787 31.554167 41.257578 30.013672 40.835938C25.434309 39.582469 20.90281 35.525133 16.726562 28.433594C12.544511 21.332382 11.236498 15.459007 12.419922 10.96875C12.811115 9.4868 14.009701 8.2566337 15.53125 7.8066406L17.896484 7.1054688C18.204589 7.0144199 18.518154 6.9829914 18.824219 7.0058594 z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="crd">
              <label>image</label>
              <div className="crd-input">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 2)}
                  style={styles.fileInput}
                />
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 48 48"
                  >
                    <path d="M10.5 8C6.9280619 8 4 10.928062 4 14.5L4 33.5C4 37.071938 6.9280619 40 10.5 40L37.5 40C41.071938 40 44 37.071938 44 33.5L44 14.5C44 10.928062 41.071938 8 37.5 8L10.5 8 z M 10.5 11L37.5 11C39.450062 11 41 12.549938 41 14.5L41 15.605469L24 24.794922L7 15.605469L7 14.5C7 12.549938 8.5499381 11 10.5 11 z M 7 19.015625L23.287109 27.820312 A 1.50015 1.50015 0 0 0 24.712891 27.820312L41 19.015625L41 33.5C41 35.450062 39.450062 37 37.5 37L10.5 37C8.5499381 37 7 35.450062 7 33.5L7 19.015625 z" />
                  </svg>
                </div>
              </div>
            </div>


            <button>Add tour package</button>
          </form>
        </div>
      </div>

      <h3>Selected Images:</h3>
      <div className="selectedimage">
        {images.map((img, index) => (
          <div key={index}>
            {img && (
              <img
                src={URL.createObjectURL(img)}
                alt={`Selected ${index + 1}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddPackage;
