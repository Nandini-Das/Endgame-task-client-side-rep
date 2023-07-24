import { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { AuthContext } from '../../../provider/AuthProvider';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data based on the user's email
    if (user?.email) {
      axios
        .get(`https://endgame-task-server.vercel.app/users?email=${user.email}`)
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
        <p className="text-gray-600 text-lg">{profileData.name}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Email:</h3>
        <p className="text-gray-600 text-lg">{profileData.email}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">University:</h3>
        <p className="text-gray-600 text-lg">{profileData.university}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Address:</h3>
        <p className="text-gray-600 text-lg">{profileData.address}</p>
      </div>
      <div>
        <Link to="/updateUser"><button  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >Edit</button></Link>
      </div>
    </div>
  );
};

export default Profile;
