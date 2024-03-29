import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
  });
  const axios = useAxiosSecure();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${productId}`); // ต้องรับค่า productId มาจาก props หรือ params
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [axios, productId]); // ต้องรับค่า productId มาจาก props หรือ params

  const handleUpdateProduct = async () => {
    try {
      // Send PUT request to update product
      await axios.put(`/products/${productId}`, product); // ต้องรับค่า productId มาจาก props หรือ params

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product updated successfully!',
      });
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update product!',
      });
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleUpdateProduct}>
        <label>
          Product Name:
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={product.category} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={product.price} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={product.description} onChange={handleChange} />
        </label>
        <label>
          Image URL:
          <input type="text" name="image" value={product.image} onChange={handleChange} />
        </label>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
