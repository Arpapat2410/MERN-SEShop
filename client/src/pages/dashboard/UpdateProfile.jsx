import React ,{ useContext } from 'react'
import { Link , useLocation , useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../context/AuthProvider';


const UpdateProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";
    const { updateUserProfile } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;
        updateUserProfile({ name, photoURL })
            .then(() => {
                alert("Profile Updated!")
                navigate(from, { replace: true })
            }).catch((error) => {
                console.log(error);
            });
    }
    
  return (
    <div className="w-full h-screen flex justify-center items-center">
            <div className="modal-box flex flex-col justify-center">
                <form className="card-body w-full" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-bold text-xl text-center my-2">UPDATE YOUR PROFILE</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text my-2">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="input input-bordered"
                            required
                            {...register("name")} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text  my-2">Update Profile Photo</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Photo URL"
                            className="input input-bordered"
                            {...register("photoURL")} />
                    </div>
                    <button className="btn bg-red text-white w-full mt-6 mb-4" type="submit" >
                        Update
                    </button>
                </form>
                
            </div>
            
        </div>
    )
}

export default UpdateProfile