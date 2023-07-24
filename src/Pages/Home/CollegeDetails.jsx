import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner,FaStar, FaStarHalfAlt } from 'react-icons/fa';

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend using Axios
    axios
      .get(`https://endgame-task-server.vercel.app/colleges/${id}`)
      .then((response) => {
        setCollege(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <FaSpinner className="animate-spin text-primary text-4xl" />
      </div>
    );
  }

  if (!college) {
    return <p>College not found</p>;
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{college.collegeName} Details</h2>
      <img
        src={college.collegeImage}
        alt={college.collegeName}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
       <div className="mb-4">
        <h3 className="text-xl font-semibold">College Rating:</h3>
        {renderCollegeRating(college.collegeRating)}
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Admission Date:</h3>
        <p className="text-gray-600 text-lg">{college.admissionDate}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Number of Research Works:</h3>
        <p className="text-gray-600 text-lg">{college.researchWorks}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Events:</h3>
        <ul className="list-disc list-inside">
          {college.events.map((event, index) => (
            <li key={index} className="text-gray-600 text-lg">
              {event}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Sports Facilities:</h3>
        <ul className="list-disc list-inside">
          {college.sports.map((sport, index) => (
            <li key={index} className="text-gray-600 text-lg">
              {sport}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollegeDetails;
