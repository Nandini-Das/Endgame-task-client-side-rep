import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider';
import ReviewForm from './ReviewForm';

const MyCollege = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [college, setCollege] = useState(null);

  useEffect(() => {
    if (!user) {
      // User object is null, do not proceed with fetching college details
      return;
    }
    console.log('User:', user);
    // Fetch all college details
    axios
      .get("https://endgame-task-server.vercel.app/admittedCollege")
      .then((response) => {
        const allColleges = response.data;
        // Filter college details based on the user's email
        const userCollege = allColleges.find(college => college.candidateEmail === user.email);
        if (userCollege) {
          setCollege(userCollege);
          console.log(college)
        } else {
          console.error('College not found or unauthorized access');
        }
      })
      .catch((error) => {
        console.error('Error fetching college details:', error);
      });
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My College Details</h2>
      {college ? (
        <>
          <h3 className="text-xl font-semibold mb-2">College Name: {college.collegeName}</h3>
          {/* Display other college details here */}
          <ReviewForm collegeId={id} user={user} />
        </>
      ) : (
        <p>College not found or unauthorized access</p>
      )}
    </div>
  );
};

export default MyCollege;
