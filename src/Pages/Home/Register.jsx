import { Link , useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';

import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const { createUser, logOut } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const university = form.university.value;
        const address = form.address.value;
        const password = form.password.value;
        const photo = form.photo.value;
      
        if (password.length < 6) {
          setError("Password should be at least 6 characters long.");
          return;
        }
      
        // Create the user account using Firebase Authentication
        createUser(email, password)
          .then((result) => {
            const createdUser = result.user;
            console.log(createdUser);
            updateUserData(createdUser, name, photo); // Move the function call inside the promise block
          })
          .catch((error) => {
            console.log(error);
          });
      
        const updateUserData = (user, name, photo) => {
          // Update the user profile data in Firebase Authentication
          updateProfile(user, {
            displayName: name,
            photoURL: photo,
          })
            .then(() => {
              const saveUser = {
                name: name, 
                email: email, 
                university: university,
                address: address,
                role: 'student',
              };
              // Send the user data to the server using a POST request
              fetch('https://endgame-task-server.vercel.app/users', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify(saveUser),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.insertedId) {
                    
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'User created successfully.',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    navigate('/'); // Assuming navigate() is a function to navigate to another page
                  }
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        };
      };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src="" alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Register Now!!!</h1>
                        <form onSubmit={handleSignUp}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="Email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">University</span>
                                </label>
                                <input type="text" name='university' placeholder="Your Current University" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input type="text" name='address' placeholder="Your Address" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" name='password' placeholder="Password" className="input input-bordered" />
                                
                            </div>
                            <div className="form-control">
                            <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                          <input type="text" name='photo' placeholder="Photo URL" className="input input-bordered"  required />
                         </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Register" />
                            </div>
                        </form>
                        <p className='my-4 text-center'>Already Have an Account? <Link className='text-orange-600 font-bold' to="/login">Login</Link> </p>
                    </div>
                    <div className="text-danger">
                    {error && <p className="p-2 bg-red-900 text-white">{error}</p>}
                </div>
                </div>
            </div>
        </div>
    );
};

export default Register;