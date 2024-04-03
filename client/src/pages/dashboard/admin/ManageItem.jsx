import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import { GrLinkNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const ManageItem = () => {
    const axios = useAxiosSecure();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [axios]);

    // Calculate indexes of current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDeleteProduct = async (productId) => {
        try {
            // Show confirmation alert
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You want to delete this product?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                // If confirmed, delete product
                await axios.delete(`/products/${productId}`);
                // Update product list
                setProducts(products.filter(product => product._id !== productId));
                // Show success message
                Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            // Show error message
            Swal.fire('Error!', 'Failed to delete product.', 'error');
        }
    };

    return (
        <div className="max-w-screen-2xl container mx-auto">
            <div className="py-4 flex flex-col item center justify-center">
                <div className=" px-2 space-y-7">
                    <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                        Manage All <span className="text-red">Product Items!</span>
                    </h2>
                </div>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="table text-center mt-5">
                    <thead className=" text-center">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 mask mask-squircle">
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">{product.name}</td>
                                <td className="text-center">{product.price}</td>
                                <td>
                                    <Link
                                        to={`/dashboard/updateproduct/${product._id}`}
                                        className="btn cursor-pointer bg-orange-400 text-white justify-center items-center rounded-1 py-1 px-4 duration-100 hover:bg-white hover:text-orange-400">
                                        <FaEdit />
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className='btn cursor-pointer bg-red text-white rounded-1 py-1 px-4 duration-100 hover:bg-white hover:text-red'
                                        onClick={() => handleDeleteProduct(product._id)}
                                    >
                                        <MdOutlineDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="flex justify-center mt-6">
                    <button
                        className="btn bg-red text-white rounded-lg mr-2"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <FaArrowLeft /> Previous
                    </button>
                    <button
                        className="btn bg-red text-white rounded-lg"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastItem >= products.length}
                    >
                        Next <GrLinkNext />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageItem;
