import React, { useState } from "react";
import "./profile.css";
function Profile({ user, setUser }) {
  const [profileImage, setProfileImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, and WEBP images are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2 MB");
      return;
    }

    setProfileImage(file);
  };
  const uploadProfileImage = async () => {
    if (!profileImage) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("profile_image", profileImage);

    try {
      const response = await fetch(
        `https://student-registration-backend-9miv.onrender.com/upload-profile/${user.user_id}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Update user state
      setUser({
        ...user,
        profile_image: data.image,
      });

      setProfileImage(null);

      alert("Profile image uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Profile image upload failed");
    }
  };
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={uploadProfileImage}>Upload Profile</button>
      {user.profile_image ? (
        <img
          src={`https://student-registration-backend-9miv.onrender.com${user.profile_image}`}
          alt="Profile"
          className="profile-image"
        />
      ) : (
        <div className="no-profile">No Profile</div>
      )}
    </div>
  );
}

export default Profile;
