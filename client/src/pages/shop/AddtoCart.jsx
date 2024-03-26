import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useCart from "../../hook/useCart";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const [cartItem, setCartItems] = useState([]);
    const [cart, refetch] = useCart();
    const { user } = useContext(AuthContext);
    const calculateTotalPrice = (item) => item.price * item.quantity;
    // const calculateTotal = () => {
    //   let total = 0;
    //   cart.map((item) => {
    //     total += calculateTotalPrice(item);
    //   });
    //   return total;
    // };
    const calculateTotal = () =>
        cart.reduce((total, item) => total + calculateTotalPrice(item), 0);

    const handleDecrease = async (item) => {
        if (item.quantity > 1) {
            try {
                const response = await fetch(
                    "http://localhost:4000/carts/" + item._id,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ quantity: item.quantity - 1 }),
                    }
                );
                if (response.ok) {
                    const updatedCart = cartItem.map((cartItem) => {
                        if (cartItem.id === item.id) {
                            return { ...cartItem, quantity: cartItem.quantity - 1 };
                        }
                        return cartItem;
                    });
                    await refetch();
                    setCartItems(updatedCart);
                } else {
                    console.log("Failed to update quantity");
                }
            } catch (error) {
                console.log("Error updating qunatity:", error);
            }
        }
    };
    const handleIncrease = async (item) => {
        try {
            const response = await fetch("http://localhost:4000/carts/" + item._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: item.quantity + 1 }),
            });
            if (response.ok) {
                const updatedCart = cartItem.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return { ...cartItem, quantity: cartItem.quantity - 1 };
                    }
                    return cartItem;
                });
                await refetch();
                setCartItems(updatedCart);
            } else {
                console.log("Failed to update quantity");
            }
        } catch (error) {
            console.log("Error updating qunatity:", error);
        }
    };
    const handleDelete = async (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            position: "center",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete("http://localhost:4000/carts/" + item._id)
                    .then((response) => {
                        if (response) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "You product has been deleted",
                                icon: "success",
                            });
                        }
                    });
            }
        });
    };

    const handleClearCart = async () => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "This will remove all items from your cart!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, clear it!'
            });

            if (result.isConfirmed) {
                const response = await axios.delete(`http://localhost:4000/carts/clear/${user.email}`);
                if (response.status === 200) {
                    setCartItems([]); // Clear the cart items in the state
                    refetch()
                    await Swal.fire(
                        'Cleared!',
                        'All items have been removed from your cart.',
                        'success'
                    );
                }
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to clear cart items. Please try again later.',
            });
        }
    };

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
                <div className="py-28 flex flex-col item center justify-center">
                    <div className="text-center px-4 space-y-7">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                            Items Added to The <span className="text-red">Cart</span>
                        </h2>
                    </div>
                </div>
            </div>
            {cart.length > 0 ? (
                <div className="overflow-x-auto items-center">
                    <table className="table text-center">
                        <thead>
                            <tr className="bg-red text-white text-center">
                                <th className='text-white'></th>
                                <th>Product</th>
                                <th>Items Name</th>
                                <th>Quantity</th>
                                <th>price Per Unit</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Item */}
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-12 mask mask-squircle">
                                                <img src={item.image} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-start">{item.name}</td>
                                    <td className='justify-center flex items-center'>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <button
                                                className='btn cursor-pointer bg-base-300 rounded-1 py-1 px-5 duration-100 hover:bg-red hover:text-white'
                                                onClick={() => handleDecrease(item)}
                                                style={{ marginRight: "5px" }}
                                            >
                                                {"-"}
                                            </button>
                                            <td>{item.quantity}</td>
                                            <button
                                                className='btn cursor-pointer bg-base-300 rounded-1 py-1 px-5 duration-100 hover:bg-red hover:text-white'
                                                onClick={() => handleIncrease(item)}
                                                style={{ marginLeft: "5px" }}
                                            >
                                                {"+"}
                                            </button>
                                        </div>
                                    </td>
                                    <td>{item.price}</td>
                                    <td>{calculateTotalPrice(item)}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm border-none text-red bg-transparent"
                                            onClick={() => {
                                                handleDelete(item);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    <div className="py-10 flex flex-col justify-end items-end">
                        <div className='space-y-7 px-4 text-center'>
                            <button className="btn bg-red text-white rounded-lg" onClick={handleClearCart}>
                                Clear all Carts
                            </button>
                        </div>
                    </div>
                    <div className='section-container mt-10'>
                        <div className='flex flex-col md:flex-row  justify-between gap-12'>
                            <div className='md:w-1/2'>
                                <div className='text-left md:w-4/5 space-y-2'>
                                    <p className='text-lg text-red uppercase font-semibold'>Customer Details</p>
                                    {user && (
                                        <>
                                            <p>Name : {user.displayName}</p>
                                            <p>Email : {user.email}</p>
                                            <p>User_id : {user.uid}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='md:w-1/2'>
                                <div className='text-left md:w-4/5 space-y-2'>
                                    <p className='text-lg text-red uppercase font-semibold'>Cart Summary</p>
                                    <p>Total Item : {cart.length}</p>
                                    <p>Total Price : {cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)} <span> $</span></p>

                                    <button className="btn bg-red text-white rounded-lg" >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            ) : (
                <div className="text-center mt-20">
                    <p>cart is empty. Please add products.</p>
                    <Link to="/shop">
                        <button className="btn bg-red text-white mt-3">Back to Shop</button>
                    </Link>
                </div>
            )}
        </div>
    );
};
export default Cart;