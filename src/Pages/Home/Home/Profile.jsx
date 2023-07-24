import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setprofile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from the server
    axios
      .get('https://endgame-task-server.vercel.app/users')
      .then((response) => {
        setprofile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, []);
console.log(profile)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Make an API call to save the updated user data to the server
    axios
      .put('https://endgame-task-server.vercel.app/users', user)
      .then((response) => {
        setEditing(false);
      })
      .catch((error) => {
        console.error('Error saving user data:', error);
      });
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-60">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      <div className="mb-4">
        <label className="font-semibold">Name:{profile.name}</label>
        {editing ? (
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
        ) : (
          <span>{profile.name}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="font-semibold">Email:</label>
        {editing ? (
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
        ) : (
          <span>{profile.email}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="font-semibold">University:</label>
        {editing ? (
          <input
            type="text"
            name="university"
            value={profile.university}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
        ) : (
          <span>{profile.university}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="font-semibold">Address:</label>
        {editing ? (
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
        ) : (
          <span>{profile.address}</span>
        )}
      </div>
      {editing ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSave}
        >
          Save
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default Profile;
