import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { AuthContext } from '../context/AuthProvider';

const Modal = ({ name }) => {   
    const { login, signUpWithPopup } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        login(data.email, data.password)
            .then((reslt) => {
                const user = reslt.user;
                console.log(user);
                alert("Login Successful")
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const googleSignUp = () => {
        signUpWithPopup()
            .then((reslt) => {
                const user = reslt.user;
                console.log(user);
                alert("Google SignUp Successfully")
                document.getElementById("login").close();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    return (
        <dialog id={name} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box flex flex-col justify-center">
                <form className="card-body w-full" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-bold text-lg text-center">Pleas Login!</h3>
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
                    <div className="form-control mt-6">
                        <input type='submit' value="login" className="btn bg-red text-white" />
                    </div>
                    <p className='text-center my-2'>Dont't have a account? <Link to={"/SignUp"} className='underline text-red ml-1'>Signup Now!</Link></p>
                    <button htmlFor={name} className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2' onClick={() => document.getElementById(name).close()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                        </svg>
                    </button>
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
        </dialog >
    )
}

export default Modal