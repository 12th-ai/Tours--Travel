import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../../../Services/authService"; // Adjust the path as needed

const Setting = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [id,setid] = useState("")

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user profile data
    const fetchUserData = async () => {
      try {
        const user = await userService.fetchProfileData(); // Replace with actual API call

        // const user = response.data;
        // Set each state variable separately
        setid(user.user.id)
        setUsername(user.user.username);
        setEmail(user.user.email);
        setPhone(user.user.phone);
        setPassword(user.user.password)
     

        // console.log("Fetched User Data:", user);
      } catch (error) {
        toast.error("Failed to load user data.", { autoClose: 3000 });
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Construct an object with the updated data
      const updatedUser = { username, email, phone, password};

      

      await userService.updateUser(id,updatedUser); // Replace with actual API call
      toast.success("Profile updated successfully", { autoClose: 1300 });

      setLoading(false);
      navigate(""); // Adjust this to your desired path
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 });
      console.error("Error updating profile:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="setting">
    <div className="form-page">
   
      <div className="form">
        <div className="logo">
         
          <p>Update your profile</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="part">
            <div className="crd">
              <label>Username</label>
              <div className="crd-input">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update state directly
                  required
                />
              </div>
            </div>
            <div className="crd">
              <label>Password</label>
              <div className="crd-input">
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update state directly
                  required={false} // Password is optional for updates
                />
              </div>
            </div>
          </div>
          <div className="crd">
            <label>Email</label>
            <div className="crd-input">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state directly
                required
              />
            </div>
          </div>
          <div className="crd">
            <label>Phone Number</label>
            <div className="crd-input">
              <input
                type="number"
                placeholder="Phone Number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} // Update state directly
                required
              />
            </div>
          </div>
       
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Setting;
