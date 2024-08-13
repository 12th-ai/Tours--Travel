import { NavLink } from "react-router-dom";
function ClientNav() {
  return (
    <div className="nav">
      <div className="logo">
        <img src={require("../assets/images/frexilogo.png")} alt="" />
      </div>
      <div className="links">
        <NavLink to="/">home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/about">services</NavLink>
        <NavLink to="/about">destination</NavLink>
        <NavLink to="/about">packages</NavLink>
        {/* <NavLink to="/about">news and update</NavLink> */}
        <NavLink to="/about">contact us</NavLink>
      </div>
      <div className="icon">loginss</div>
    </div>
  );
}

export default ClientNav;
