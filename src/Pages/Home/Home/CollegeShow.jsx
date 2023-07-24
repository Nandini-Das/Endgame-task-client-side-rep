import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CollegeShow = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    // Fetch data from the server using the provided URL
    axios.get('https://endgame-task-server.vercel.app/colleges')
      .then((response) => {
        const data = response.data;
        setColleges(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to sort colleges based on the number of reviews
  const getCollegesWithMostReviews = () => {
    const sortedColleges = colleges.slice(); // Create a copy of the colleges array to avoid modifying the original state

    sortedColleges.sort((a, b) => {
      // Check if the 'reviews' property exists and is an array for both colleges
      const aReviewsLength = Array.isArray(a.reviews) ? a.reviews.length : 0;
      const bReviewsLength = Array.isArray(b.reviews) ? b.reviews.length : 0;

      return bReviewsLength - aReviewsLength;
    });

    return sortedColleges.slice(0, 3);
  };

 

  const mostReviewedColleges = getCollegesWithMostReviews();

  return (
    <div className="container mx-auto py-8">
     <h2 className="text-3xl font-bold mb-4 mx-auto text-center" > Renowned Colleges</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {mostReviewedColleges.map((college) => (
          <div key={college.id} className="rounded-lg shadow-lg">
          <img src={college.collegeImage} alt={college.name} className="w-full h-48 object-cover rounded-t-lg" />
          <div className="p-4 bg-white rounded-b-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{college.collegeName}</h2>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Admission Date:</span> {college.admissionDate}
            </p>
            
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Research History:</span> {college.researchWorks} 
            </p>
            <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Events:</span> <li>{college.events[0]}</li> <li>{college.events[1]}</li> <li>{college.events[2]}</li> 
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Sports:</span> <li>{college.sports[0]}</li> <li>{college.sports[1]}</li> <li>{college.sports[2]}</li> 
            </p>
          </div>
          <div className="p-4 bg-blue-500 rounded-b-lg">
            <button
              className="w-full text-center text-white font-semibold hover:bg-blue-600 focus:outline-none"
              onClick={() => {
                // Handle the click event to navigate to the college details route
                // You can use React Router or any other routing library for this
              }}
            >
              Details
            </button>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeShow;
