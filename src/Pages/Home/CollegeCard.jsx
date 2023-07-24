import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSpinner,FaStar, FaStarHalfAlt  } from 'react-icons/fa';

const CollegeCard = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend using Axios
    axios
      .get('https://endgame-task-server.vercel.app/colleges')
      .then((response) => {
        setColleges(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <FaSpinner className="animate-spin text-primary text-4xl" />
      </div>
    );
  }
  const renderCollegeRating = (rating) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = hasHalfStar ? 5 - filledStars - 1 : 5 - filledStars;

    return (
      <div className="flex">
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaStar key={index} className="text-gray-400" />
        ))}
      </div>
    );
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {colleges.map((college) => (
        <div key={college.id} className="w-full p-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <img
                src={college.collegeImage}
                alt={college.collegeName}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <h2 className="text-lg font-bold mt-4">{college.collegeName}</h2>
              <div className="flex items-center mt-2">
              <span className="">
        
        {renderCollegeRating(college.collegeRating)}
      </span>
                <span className="text-gray-600 ml-2">({college.researchWorks} Research)</span>
              </div>
              <p className="text-gray-600 mt-2">Admission Date: {college.admissionDate}</p>
              <div className="mt-4">
                <Link to={`/colleges/${college._id}`} className="btn btn-primary">
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollegeCard;
