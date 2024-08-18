// import { Link } from "react-router-dom";


// function Tourpackage() {


//   return (
//     <div className="">
//       <h1>View Tour Packages</h1>
//       <div className="data-cards">
//         {tourPackages.length === 0 ? (
//           <p className="center">
//             <br />
//             <span>No tour packages found</span>
//           </p>
//         ) : (
//           <div className="package-grid">
//             {tourPackages.map((tourPackage) => (
//               <div key={tourPackage.id} className="package-card">
//                 <img
//    src={`http://localhost/Tours&&Travel/backend/uploads/${tourPackage.image1}`}  // Replace with your actual image path
//                   alt={tourPackage.title}
//                   className="package-image"
//                 />
//                 <div className="package-details">
//                   <h2 className="package-title">{tourPackage.title}</h2>
//                   <p className="package-date">{tourPackage.travelPlan}</p>
//                   <p className="package-price">${tourPackage.pricing}</p>
//                   <Link to={`viewdetail/${tourPackage.id}`} className="book-now">
//                     Book Now
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Tourpackage;


import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";

import { useNavigate,Link } from 'react-router-dom'


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
    <div className='tour_package'>
      
    <div className="header">
     <div className="left">
        <h1>Popular Tour Package</h1>
        <p>Duis rutrum nisl urna. Maecenas vel libero faucibus nisi venenatis hendrerit a id lectus. Suspendissendt blandit interdum. Sed pellentesque at nunc eget consectetur.</p>

     </div>
      <a href="">view all tour</a>      
    </div>


     {/* /tours card x */}

     <div className="data-card">
       {tourPackages.length === 0 ? (
          <p className="center">
            <br />
            <span>No tour packages found</span>
          </p>
        ) : (
          <div className="package-grid">
            {tourPackages.map((tourPackage) => (
              < Link to={`viewdetail/${tourPackage.id}`}  key={tourPackage.id} className="package-card">
                <div className="images">
                <img
   src={`http://localhost/Tours&&Travel/backend/uploads/${tourPackage.image1}`}  // Replace with your actual image path
                  alt={tourPackage.title}
             
                />
             
                </div>
                <div className="curve">
               <p> {new Date(tourPackage.travelPlan).toLocaleDateString()} </p>
                </div>  
                <div className="package-details">
                  <h2 className="package-title">{tourPackage.title}</h2>
                <div className="pricing">
                   <div className="cost">
                    <p>from</p>
                   <span className="package-price">${tourPackage.pricing}</span>
                   <i>per person</i>
                  
                   </div>
                 
                  <Link to={`viewdetail/${tourPackage.id}`} className="book-now">
                    Book Now
                  </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    
   
    </div>
  )
}

export default Tourpackage

