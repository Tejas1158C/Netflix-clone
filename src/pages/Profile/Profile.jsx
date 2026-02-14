import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  getProfile,
  updateProfileData,
  uploadAvatar
} from "../../firebase";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Profile.css";

const Profile = () => {

  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  ////////////////////////////////////////////////////
  // LOAD USER
  ////////////////////////////////////////////////////
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await getProfile();
    setUser(data);
  };

  ////////////////////////////////////////////////////
  // INPUT CHANGE
  ////////////////////////////////////////////////////
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  ////////////////////////////////////////////////////
  // UPLOAD AVATAR
  ////////////////////////////////////////////////////
  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    setLoading(true);

    try {
      const url = await uploadAvatar(file, user.id);
      setUser({ ...user, avatar: url });

      toast.success("Avatar uploaded");

    } catch (err) {
      console.log(err);
      toast.error("Upload failed");
    }

    setLoading(false);
  };

  ////////////////////////////////////////////////////
  // SAVE PROFILE
  ////////////////////////////////////////////////////
  const saveProfile = async () => {
    if (!user?.id) {
      toast.error("User not loaded");
      return;
    }

    setLoading(true);

    try {
      await updateProfileData(user.id, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar
      });

      toast.success("Profile updated successfully ✅");
      setEdit(false);

    } catch (err) {
      console.log(err);
      toast.error("Update failed ❌");
    }

    setLoading(false);
  };

  ////////////////////////////////////////////////////
  if (!user) return <h1 style={{ color: "white" }}>Loading...</h1>;

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-card">

          <img
            src={
              user.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="avatar"
          />

          {edit ? (
            <>
              <input type="file" onChange={handleAvatar} />

              <input
                name="name"
                value={user.name || ""}
                onChange={handleChange}
                placeholder="Name"
              />

              <input
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                placeholder="Email"
              />

              <input
                name="phone"
                value={user.phone || ""}
                onChange={handleChange}
                placeholder="Phone"
              />

              <button onClick={saveProfile} className="save-btn">
                {loading ? "Saving..." : "Save"}
              </button>
            </>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.phone}</p>

              <button
                onClick={() => setEdit(true)}
                className="edit-btn"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
