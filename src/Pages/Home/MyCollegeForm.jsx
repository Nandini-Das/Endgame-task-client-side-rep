import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const MyCollegeForm = () => {
    const { id } = useParams();

    const { user } = useContext(AuthContext);
    const img_hosting_token = '0c51ad587a5a7b8be44273eb96ad919a';
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [college, setCollege] = useState(null);

    useEffect(() => {
      // Fetch college details by ID from the backend
      axios
        .get(`https://endgame-task-server.vercel.app/colleges/${id}`)
        .then((response) => {
          setCollege(response.data);
        })
        .catch((error) => {
          console.error('Error fetching college details:', error);
        });
    }, [id]);
  
    if (!college) {
      return <div>Loading...</div>;
    }
    const onSubmit = (data) => {
        if (data.picture && data.picture[0]) {
            const formData = new FormData();
            formData.append('image', data.picture[0]);
      
            fetch(img_hosting_url, {
              method: 'POST',
              body: formData,
            })
            .then((res) => res.json())
            .then((imgResponse) => {
              if (imgResponse.success) {
                const imgURL = imgResponse.data.display_url;
                const { collegeName, candidateName, subject, candidateEmail, candidatePhone, address, dateOfBirth } = data;
                const newItem = {
                  collegeName,
                  candidateName,
                  subject,
                  candidateEmail,
                  candidatePhone,
                  address,
                  dateOfBirth,
                  image: imgURL,
                };
      
                axios.post('https://endgame-task-server.vercel.app/admittedCollege', newItem)
                  .then((response) => {
                    const data = response.data;
                    console.log('after posting new item', data);
      
                    if (data.insertedId
                        ) {
                      reset();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Admission Successful',
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                  })
                  .catch((error) => {
                    console.error('Error submitting form:', error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Admission Failed',
                      text: 'There was an error processing your admission.',
                    });
                  });
              } else {
                // Handle the case where the image upload fails
                Swal.fire({
                  icon: 'error',
                  title: 'Image Upload Failed',
                  text: 'There was an error uploading the image.',
                });
              }
            });
          } else {
            // Handle the case where the image is not selected or is not an array
            Swal.fire({
              icon: 'error',
              title: 'Image Upload Failed',
              text: 'Please select an image to upload.',
            });
          }
        };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h2 className="text-2xl font-bold mb-4">My College</h2>
      <div className="grid grid-cols-1 gap-4">
      <div className="form-control">
          <label htmlFor="collegeName" className="label">
            <span className="label-text">College Name</span>
          </label>
          <input
            type="text"
            id="collegeName"
            {...register('collegeName', { required: true })}
            defaultValue={college?.collegeName || ''} // Set default value to the user's name
            className={`input input-bordered ${errors.candidateName ? 'input-error' : ''}`}
            placeholder="Candidate Name"
          />
          {errors.candidateName && <span className="text-xs text-error">Candidate Name is required.</span>}
        </div>
      <div className="form-control">
          <label htmlFor="candidateName" className="label">
            <span className="label-text">Candidate Name</span>
          </label>
          <input
            type="text"
            id="candidateName"
            {...register('candidateName', { required: true })}
            defaultValue={user?.displayName || ''} // Set default value to the user's name
            className={`input input-bordered ${errors.candidateName ? 'input-error' : ''}`}
            placeholder="Candidate Name"
          />
          {errors.candidateName && <span className="text-xs text-error">Candidate Name is required.</span>}
        </div>
        <div className="form-control">
          <label htmlFor="subject" className="label">
            <span className="label-text">Subject</span>
          </label>
          <input
            type="text"
            id="subject"
            {...register('subject', { required: true })}
            className={`input input-bordered ${errors.subject ? 'input-error' : ''}`}
            placeholder="Subject"
          />
          {errors.subject && <span className="text-xs text-error">Subject is required.</span>}
        </div>
        <div className="form-control">
          <label htmlFor="candidateEmail" className="label">
            <span className="label-text">Candidate Email</span>
          </label>
          <input
            type="email"
            id="candidateEmail"
            {...register('candidateEmail', { required: true })}
            defaultValue={user?.email || ''} // Set default value to the user's email
            className={`input input-bordered ${errors.candidateEmail ? 'input-error' : ''}`}
            placeholder="Candidate Email"
          />
          {errors.candidateEmail && <span className="text-xs text-error">Candidate Email is required.</span>}
        </div>
        <div className="form-control">
          <label htmlFor="candidatePhone" className="label">
            <span className="label-text">Candidate Phone Number</span>
          </label>
          <input
            type="tel"
            id="candidatePhone"
            {...register('candidatePhone', { required: true })}
            className={`input input-bordered ${errors.candidatePhone ? 'input-error' : ''}`}
            placeholder="Candidate Phone Number"
          />
          {errors.candidatePhone && <span className="text-xs text-error">Candidate Phone Number is required.</span>}
        </div>
        <div className="form-control">
          <label htmlFor="address" className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            type="text"
            id="address"
            {...register('address', { required: true })}
            className={`input input-bordered ${errors.address ? 'input-error' : ''}`}
            placeholder="Address"
          />
          {errors.address && <span className="text-xs text-error">Address is required.</span>}
        </div>
        <div className="form-control">
          <label htmlFor="dob" className="label">
            <span className="label-text">Date of Birth</span>
          </label>
          <input
            type="date"
            id="dob"
            {...register('dob', { required: true })}
            className={`input input-bordered ${errors.dob ? 'input-error' : ''}`}
          />
          {errors.dob && <span className="text-xs text-error">Date of Birth is required.</span>}
        </div>
        <div className="form-control">
        <label htmlFor="image" className="label">
          <span className="label-text">Image</span>
        </label>
        <input
          type="file"
          id="image"
          {...register('picture', { required: true })}
          className={`input input-bordered ${errors.picture ? 'input-error' : ''}`}
        />
        {errors.picture && <span className="text-xs text-error">Image is required.</span>}
      </div>
      <div className="form-control">
        <input type="submit" value="Submit" className="btn btn-primary" />
      </div>
      </div>
    </form>
  );
};

export default MyCollegeForm;
