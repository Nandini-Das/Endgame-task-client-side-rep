import { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { AuthContext } from '../../../provider/AuthProvider';

const UpdateUser = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data based on the user's email
    if (user?.email) {
      axios
        .get("https://endgame-task-server.vercel.app/users")
        .then((response) => {
          setProfileData(response.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching profile data:', error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const [formData, setFormData] = useState({
    name: '',
    university: '',
    address: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Update user data using axios PUT request
    if (user?.email) {
      axios
        .put(`https://endgame-task-server.vercel.app/users?email=${user.email}`, formData)
        .then((response) => {
          console.log('User data updated:', response.data);
          // Optionally, you can update the profileData state here to reflect the updated data
        })
        .catch((error) => {
          console.error('Error updating user data:', error);
        });
    }
  };

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  if (!profileData) {
    return <p>Profile data not found</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Name:</h3>
        <input
          type="text"
          name="name"
          value={formData.name || profileData.name}
          onChange={handleInputChange}
          className="input"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Email:</h3>
        <p className="text-gray-600 text-lg">{profileData.email}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">University:</h3>
        <input
          type="text"
          name="university"
          value={formData.university || profileData.university}
          onChange={handleInputChange}
          className="input"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Address:</h3>
        <input
          type="text"
          name="address"
          value={formData.address || profileData.address}
          onChange={handleInputChange}
          className="input"
        />
      </div>
      <button onClick={handleSave} className="btn btn-primary">
        Save
      </button>
    </div>
  );
};

export default UpdateUser;
