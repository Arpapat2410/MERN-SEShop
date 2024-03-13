import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider'; 
import useCart from '../../hook/useCart';

const AddtoCart = () => {
    const { user } = useContext(AuthContext); // เรียกใช้ข้อมูลผู้ใช้จาก Context API
    const [cartItems, setCartItems] = useState([]);
    const [ cart , refetch ] = useCart()

    useEffect(() => {
        axios.get("http://localhost:4000/carts")
            .then(res => {
                setCartItems(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDecreaseQuantity = async (index) => {
        try {
            const updatedItem = { ...cartItems[index], quantity: cartItems[index].quantity - 1 };
            const response = await axios.put(`http://localhost:4000/carts/${updatedItem._id}`, updatedItem);
            setCartItems(prevState => {
                const newCartItems = [...prevState];    
                newCartItems[index] = response.data;
                return newCartItems;
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleIncreaseQuantity = async (index) => {
        try {
            const updatedItem = { ...cartItems[index], quantity: cartItems[index].quantity + 1 };
            const response = await axios.put(`http://localhost:4000/carts/${updatedItem._id}`, updatedItem);
            setCartItems(prevState => {
                const newCartItems = [...prevState];
                newCartItems[index] = response.data;
                return newCartItems;
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteCartItem = async (index) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const response = await axios.delete(`http://localhost:4000/carts/${cartItems[index]._id}`);
                if (response.status === 200) {
                    setCartItems(prevState => {
                        const newCartItems = [...prevState];
                        newCartItems.splice(index, 1);
                        return newCartItems;
                    });
                    refetch()
                    await Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
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
        <div className='section-container bg-gradient-to-r from-0%  to-100%'>
            <div className="py-48 flex flex-col justify-center items-center">
                <div className='space-y-7 px-4 text-center'>
                    <h2 className='md:text-4xl text-4xl font-bold md:leading-snug leading-snug'>
                        Items Added To The<span className='text-red'>Cart</span>
                    </h2>
                </div>
            </div>

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
                        {cartItems.map((item, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 mask mask-squircle">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td className='justify-center flex items-center'>
                                    <div className='flex items-center border-gray-100'>
                                        <span 
                                            className='btn cursor-pointer bg-base-300 rounded-1 py-1 px-5 duration-100 hover:bg-red hover:text-white'
                                            onClick={() => handleDecreaseQuantity(index)} disabled={item.quantity === 0}
                                        >
                                            {" "}
                                            -{" "}
                                        </span>
                                        <span className='px-5'>
                                            {item.quantity}
                                        </span>
                                        <span 
                                            className='btn cursor-pointer bg-base-300 py-1 px-5 duration-100  hover:bg-red hover:text-white'
                                            onClick={() => handleIncreaseQuantity(index)}
                                        >
                                            {" "}
                                            +{" "}
                                        </span>
                                    </div>
                                </td>
                                <td>{item.price}<span> $</span></td>
                                <td>{(item.price * item.quantity).toFixed(2)}<span> $</span></td>
                                <td>
                                    <button 
                                        className='btn btn-ghost btn-circle hover:bg-red hover:text-white'
                                        onClick={() => handleDeleteCartItem(index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
                            <p>Total Item : {cartItems.length}</p>
                            <p>Total Price : {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)} <span> $</span></p>
                            <button className="btn bg-red text-white rounded-lg" >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddtoCart;
