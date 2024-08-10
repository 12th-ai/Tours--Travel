import React from "react";

function Footer() {
  return (
    <div className="main-footer">
      <div className="position"></div>
      <div className="fotter">
        <div className="description">
          <p>
            Duis rutrum nisl urna. Maecenas vel libero faucibus nisi venenatis
            hendrerit a id lectus. Suspendissendt molestie turpis nec lacinia
            vehicula.
          </p>
          <h1>follow us on</h1>
          <div className="icon"></div>
        </div>
        <div className="links">
          <h1>Quick links</h1>

          <a href="">about us</a>
          <a href="">services </a>
          <a href="">destinations </a>
          <a href="">tour packages</a>
          <a href="">process booking</a>
        </div>
        <div className="links">
          <h1>tour type</h1>
          <a href="">wild and adventure</a>
          <a href="">group tour</a>
          <a href="">seasonal tour</a>
          <a href="">relaxation tour</a>
          <a href="">family and friend tour</a>
        </div>
        <div className="galerys">
          <h1>gallery</h1>
          <div className="gallery">
            <div className="card">
              <img src={require("../assets/images/newslatter-bg.png")} alt="" />
            </div>
            <div className="card">
              <img src={require("../assets/images/bg1.png")} alt="" />
            </div>
            <div className="card">
              <img src={require("../assets/images/bg1.png")} alt="" />
            </div>
            <div className="card">
              <img src={require("../assets/images/bg1.png")} alt="" />
            </div>
            <div className="card">
              <img src={require("../assets/images/bg1.png")} alt="" />
            </div>
            <div className="card">
              <img src={require("../assets/images/bg1.png")} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
