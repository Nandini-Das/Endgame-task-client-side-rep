import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';


const AdmissionPage = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);

  // Handler for when the "+" button is clicked
  const handleCollegeClick = (collegeId) => {
    setSelectedCollegeId(collegeId);
  };
  useEffect(() => {
    // Fetch college names from the backend using Axios
    axios
      .get('https://endgame-task-server.vercel.app/colleges')
      .then((response) => {
        setColleges(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching college names:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admission</h2>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {colleges.map((college) => (
            <div
              key={college._id}
              className="bg-white p-4 shadow rounded-lg flex items-center justify-between"
            >
              <div>{college.collegeName}</div>
              <Link
                to={`/myCollegeForm/${college._id}`}
                className="text-primary"
              >Apply
                <FaPlus className="text-xl" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdmissionPage;
