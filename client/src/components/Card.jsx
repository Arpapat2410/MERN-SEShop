import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const Card = ({ item }) => {
    const { _id, name, image, price, description } = item;
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    const handleAddtoCart = (item) => {
        const cartItem = {
            productId: item._id,
            email: user.email,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        };
        console.log(cartItem);

        if (user && user.email) {
            axios.post("http://localhost:4000/carts", cartItem)
                .then(() => {
                    console.log("Item successfully added to the cart or updated.");
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Product added to the cart",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(() => {
                    console.error("Internal Server Error.");
                    Swal.fire({
                        icon: "error",
                        title: "Internal Server Error",
                        text: "Something went wrong while adding the item to the cart.",
                        position: "center",
                        showConfirmButton: true
                    });
                });
        } else {
            Swal.fire({
                icon: "warning",
                title: "Please login to add an item to your cart",
                position: "center",
                showConfirmButton: false,
                timer: 1500,
                confirmButtonText: "Login now",
                confirmButtonColor: "#3085b6",
                cancelButtonColor: "#d33"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className="card shadow-md relative mr-5 md:my-5 hover:scale-105 transition-all duration-300">
            <div
                className="rating gap-1 right-2 top-2 absolute p-4 heartStar bg-red"
                onClick={handleHeartClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={`${isHeartFilled ? "white" : "none"}`}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer ">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>
            </div>
            <Link to={`/product/${_id}`}>
                <figure>
                    <img
                        src={image}
                        alt={name}
                        className="md:h-72 h-[250px] w-auto"
                    />
                </figure>
            </Link>
            <div className="card-body ">
                <Link to={`/product/${_id}`}>
                    <h2 className="card-title">{name}</h2>
                </Link>
                <div className="overflow-hidden max-h-[48px] md:max-h-[70px] md:relative md:mb-[10px]">
                    <p className="m-0">{description}</p>
                </div>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className="font-semibold">{price}</h5>
                    <button className="btn bg-red text-white" onClick={() => { handleAddtoCart(item) }}>Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
