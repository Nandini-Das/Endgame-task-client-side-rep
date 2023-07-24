import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';

const CollegeReviews = () => {
  const [reviews, setReviews] = useState([]);
  const authorImage =
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80';

  useEffect(() => {
    // Fetch college reviews from the API
    axios
      .get('https://endgame-task-server.vercel.app/collegeReviews')
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching college reviews:', error);
      });
  }, []);

  const [openAccordion, setOpenAccordion] = useState(null); // Set the initial open accordion item to null

  const handleAccordionClick = (reviewId) => {
    // Toggle the accordion when it's clicked
    setOpenAccordion((prevAccordion) => (prevAccordion === reviewId ? null : reviewId));
  };

  const renderRatingStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FaStar className="text-yellow-500 half-star" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <section className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-4">College Reviews</h2>
          {reviews.length > 0 ? (
            <div className="join join-vertical w-full">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={`collapse collapse-arrow join-item border border-base-300 ${
                    openAccordion === review.id ? 'open' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="my-accordion-4"
                    checked={openAccordion === review.id}
                    onChange={() => handleAccordionClick(review.id)}
                  />
                  <div className="collapse-title text-xl font-medium">
                    {review.collegeName} - {review.author}
                  </div>
                  <div className="collapse-content">
                    <div className="mb-2">{renderRatingStars(review.rating)}</div>
                    <p>{review.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-4">No reviews available.</p>
          )}
        </div>
        <div className="flex justify-center items-center">
          <div className="rounded-md h-48 w-96">
            <img src={authorImage} alt="College Graduate" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeReviews;
