import React from 'react';
import { FaSave } from "react-icons/fa";
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Swal from 'sweetalert2';

const AddProductadmin = () => {
  const axios = useAxiosSecure();

  const handleAddProduct = async () => {
    try {
      // Get values from form fields
      const productName = document.getElementById('productName').value;
      const category = document.getElementById('category').value;
      const price = document.getElementById('price').value;
      const details = document.getElementById('details').value;
      const imageUrl = document.getElementById('imageUrl').value;

      // Create new product object
      const newProduct = {
        name: productName,
        category: category,
        price: price,
        description: details,
        image: imageUrl
      };

      // Send POST request to add product
      await axios.post('/products', newProduct);

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product added successfully!',
      });

      // Clear form fields
      document.getElementById('productName').value = '';
      document.getElementById('category').selectedIndex = 0;
      document.getElementById('price').value = '';
      document.getElementById('details').value = '';
      document.getElementById('imageUrl').value = '';
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add product!',
      });
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto">
      <div className="bg-gradient-to-r from-0%  to-[#FCFCFC] to-100%">
        <div className="py-4 flex flex-col item center justify-center">
          <div className=" px-2 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The <span className="text-red">Cart</span>
            </h2>
          </div>

          <label className="form-control w-full py-5">
            <div className="label">
              <span className="label-text">Product Name<span> *</span></span>
            </div>
            <input id="productName" type="text" placeholder="Product Name" className="input input-bordered w-full rounded-md mt-2" />
          </label>

          <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
            <div className='md:w-1/2'>
              {/* Category dropdown */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Category<span> *</span></span>
                </div>
                <select id="category" className="select select-bordered rounded-md mt-2">
                  <option disabled selected>Select a category</option>
                  <option>Clothing</option>
                  <option>Accessories</option>
                  <option>Gadgets</option>
                  <option>Swag</option>
                </select>
              </label>
            </div>

            <div className='md:w-1/2'>
              {/* Product Price */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Price<span> *</span></span>
                </div>
                <input id="price" type="text" placeholder="Price" className="input input-bordered w-full rounded-md mt-2" />
              </label>
            </div>
          </div>


          {/* Product details textarea */}
          
          <label className="form-control w-full py-5">
            <div className="label">
              <span className="label-text">Product Details</span>
            </div>
            <textarea id="details" className="textarea textarea-bordered h-24 rounded-md mt-2" placeholder="Product Details..."></textarea>
          </label>

        {/* Image URL input */}
        <label className="form-control w-full py-">
          <div className="label">
            <span className="label-text">Image URL<span> *</span></span>
          </div>
          <input id="imageUrl" type="text" placeholder="Image URL" className="input input-bordered w-full rounded-md mt-2" />
        </label>

        {/* Add product button */}
        <div className="card-actions py-10">
          <button onClick={handleAddProduct} className="btn bg-red text-white rounded-lg w-36">
            Add Item <FaSave />
          </button>
        </div>
        </div>

      </div>
    </div>
  );
}

export default AddProductadmin;
