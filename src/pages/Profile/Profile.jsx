import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {
  getProfile,
  updateProfileData,
  uploadAvatar
} from "../../firebase";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Profile.css";

const planOptions = [
  { name: "Mobile", resolution: "480p", price: "₹149" },
  { name: "Basic", resolution: "720p (HD)", price: "₹199" },
  { name: "Standard", resolution: "1080p (Full HD)", price: "₹499" },
  { name: "Premium", resolution: "4K (Ultra HD) + HDR", price: "₹649" }
];

const durationOptions = [
  { label: "1 Month", months: 1 },
  { label: "6 Months", months: 6 },
  { label: "1 Year", months: 12 },
  { label: "2 Years", months: 24 }
];

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // Membership management state
  const [isManagingPlan, setIsManagingPlan] = useState(false);
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(1);

  ////////////////////////////////////////////////////
  // LOAD USER
  ////////////////////////////////////////////////////
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await getProfile();
    setUser(data);
    if (data?.planName) {
      setSelectedTier(data.planName);
    }
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

      // Add a timestamp cache-buster so the browser re-fetches the image
      const cacheBustedUrl = `${url}?t=${new Date().getTime()}`;
      setUser({ ...user, avatar: cacheBustedUrl });

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
  // SAVE PLAN CHANGES
  ////////////////////////////////////////////////////
  const savePlanChanges = () => {
    const plan = planOptions.find(p => p.name === selectedTier);
    navigate("/checkout", {
      state: {
        plan,
        durationMonths: parseInt(selectedDuration)
      }
    });
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

              {user.planName && (
                <div className="active-membership">
                  <div className="membership-header">
                    <h3>Active Membership</h3>
                    <button
                      className="manage-plan-toggle"
                      onClick={() => setIsManagingPlan(!isManagingPlan)}
                    >
                      {isManagingPlan ? "Cancel" : "Manage Plan"}
                    </button>
                  </div>

                  {!isManagingPlan ? (
                    <div className="membership-details">
                      <p><strong>Plan:</strong> {user.planName} ({user.planResolution})</p>
                      <p><strong>Price:</strong> {user.planPrice}/month</p>
                      <p className="expiry-date">
                        <strong>Valid Until:</strong> {new Date(user.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <div className="manage-plan-form">
                      <div className="manage-field">
                        <label>Change Plan Type</label>
                        <select
                          value={selectedTier}
                          onChange={(e) => setSelectedTier(e.target.value)}
                        >
                          {planOptions.map(opt => (
                            <option key={opt.name} value={opt.name}>{opt.name} ({opt.price})</option>
                          ))}
                        </select>
                      </div>

                      <div className="manage-field">
                        <label>Renew / Extend For</label>
                        <select
                          value={selectedDuration}
                          onChange={(e) => setSelectedDuration(e.target.value)}
                        >
                          {durationOptions.map(opt => (
                            <option key={opt.months} value={opt.months}>{opt.label}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        className="confirm-plan-btn"
                        onClick={savePlanChanges}
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Confirm & Pay"}
                      </button>
                    </div>
                  )}
                </div>
              )}

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
