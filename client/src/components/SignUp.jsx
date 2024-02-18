import React, { useContext ,} from 'react'
import { Link,useLocation , useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { AuthContext } from '../context/AuthProvider';
import Modal from './Modal';


const SignUp = () => {
    const {createUser} = useContext(AuthContext) 
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm()
  
    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email,data.password)
        .then((result)=>{
            const user = result.user;
            console.log(user);
            alert("Account create Successful")
            navigate(from,{replace:true})
        }).catch((error) => {
            console.log(error);
        })
    }
        
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="modal-box flex flex-col justify-center">
                <form className="card-body w-full" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-bold text-lg text-center">Create Account !</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Email</span>
                        </label>
                        <input 
                        type="email" 
                        placeholder="email" 
                        className="input input-bordered" 
                        required
                        {...register("email")} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input 
                        type="password" 
                        placeholder="password" 
                        className="input input-bordered" 
                        required 
                        {...register("password")} />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <button className="btn bg-red text-white w-full mt-6 mb-4" type="submit">
                        Sign Up
                    </button>
                    <div className='text-center'>
                        <p>
                            Have an account?{' '}
                            <button to="#" className='text-red' >
                                Login
                            </button>
                        </p>
                    </div>
                </form>
                <div className='text-center space-x-3 mb-3'>
                    <button className='btn btn-ghost btn-circle hover:bg-red hover:text-white'>
                        <FaGoogle />
                    </button>
                    <button className='btn btn-ghost btn-circle hover:bg-red hover:text-white'>
                        <FaFacebookF />
                    </button>
                    <button className='btn btn-ghost btn-circle hover:bg-red hover:text-white'>
                       <FaGithub />
                    </button>
                </div>
            </div>
            <Modal name={"login"}/>
  </div>
    )
}

export default SignUp