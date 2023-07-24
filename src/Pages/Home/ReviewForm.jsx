import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ReviewForm = ({ collegeId, user }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Prepare the review data to be posted to the server
    const newReview = {
      collegeName: data.collegeName,
      author: data.author,
      date: data.date,
      content: data.content,
      rating: parseFloat(data.rating), // Convert the rating to a number
    };

    // Send a POST request to add the new review
    axios
      .post('https://endgame-task-server.vercel.app/collegeReviews', newReview)
      .then((response) => {
        if (response.data) {
          // Reset the form after successful submission
          reset();
          Swal.fire({
            icon: 'success',
            title: 'Review Added',
            text: 'Your review has been added successfully!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          console.log('Review added successfully:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error adding review:', error);
      });
  };

  // Function to render the rating stars
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
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Add Your Review</h3>
      <div className="form-control">
        <label htmlFor="collegeName" className="label">
          <span className="label-text">College Name</span>
        </label>
        <input
          type="text"
          id="collegeName"
          {...register('collegeName', { required: true })}
          className={`input input-bordered ${errors.collegeName ? 'input-error' : ''}`}
          placeholder="College Name"
        />
        {errors.collegeName && <span className="text-xs text-error">College Name is required.</span>}
      </div>
      <div className="form-control">
        <label htmlFor="author" className="label">
          <span className="label-text">Author</span>
        </label>
        <input
          type="text"
          id="author"
          {...register('author', { required: true })}
          defaultValue={user?.displayName || ''} // Set default value to the user's name
          className={`input input-bordered ${errors.author ? 'input-error' : ''}`}
          placeholder="Author"
        />
        {errors.author && <span className="text-xs text-error">Author is required.</span>}
      </div>
      <div className="form-control">
        <label htmlFor="date" className="label">
          <span className="label-text">Date</span>
        </label>
        <input
          type="date"
          id="date"
          {...register('date', { required: true })}
          className={`input input-bordered ${errors.date ? 'input-error' : ''}`}
        />
        {errors.date && <span className="text-xs text-error">Date is required.</span>}
      </div>
      <div className="form-control">
        <label htmlFor="content" className="label">
          <span className="label-text">Review</span>
        </label>
        <textarea
          id="content"
          {...register('content', { required: true })}
          className={`input input-bordered ${errors.content ? 'input-error' : ''}`}
          placeholder="Write your review here"
          rows={4}
        />
        {errors.content && <span className="text-xs text-error">Review content is required.</span>}
      </div>
      <div className="form-control">
        <label htmlFor="rating" className="label">
          <span className="label-text">Rating</span>
        </label>
        <input
          type="number"
          id="rating"
          {...register('rating', { required: true, min: 0, max: 5 })}
          step={0.1}
          className={`input input-bordered ${errors.rating ? 'input-error' : ''}`}
          placeholder="Rating (0 - 5)"
        />
        {errors.rating && <span className="text-xs text-error">Rating is required (0 - 5).</span>}
      </div>
      <div className="form-control">
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
