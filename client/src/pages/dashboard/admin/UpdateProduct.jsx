import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";

const UpdateProduct = () => {
  const { id } = useParams();

  const axios = useAxiosSecure();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data);
      setIsLoading(false);
    };
    fetchProduct();
  }, [axios, id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  console.log(product);

  const handleUpdateProduct = async (data) => {

    try {
      const newProduct = {
        name: data.productName ? data.productName : product.name,
        category: data.category ? data.category : product.category,
        price: data.price ? data.price : product.price,
        description: data.details ? data.details : product.description,
        image: data.imageUrl ? data.imageUrl : product.image,
      };
      console.log(newProduct);
      await axios.put(`/products/${id}`, newProduct);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product updated successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update product!",
      });
      console.error("Error updating product:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto">
      <form
        className="bg-gradient-to-r from-0%  to-[#FCFCFC] to-100%"
        onSubmit={handleSubmit(handleUpdateProduct)}>
        <div className="py-4 flex flex-col item center justify-center">
          <div className=" px-2 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Update <span className="text-red">Menu Item</span>
            </h2>
          </div>

          <label className="form-control w-full py-5">
            <div className="label">
              <span className="label-text">
                Product Name<span> *</span>
              </span>
            </div>
            <input
              {...register("productName")}
              type="text"
              defaultValue={product.name}
              className="input input-bordered w-full rounded-md mt-2"
            />
          </label>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Category<span> *</span>
                  </span>
                </div>
                <select
                  {...register("category")}
                  defaultValue={product.category}
                  className="select select-bordered rounded-md mt-2">
                  <option disabled selected>
                    Select a category
                  </option>
                  <option>Clothing</option>
                  <option>Accessories</option>
                  <option>Gadgets</option>
                  <option>Swag</option>
                </select>
              </label>
            </div>

            <div className="md:w-1/2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Price<span> *</span>
                  </span>
                </div>
                <input
                  {...register("price")}
                  type="text"
                  defaultValue={product.price}
                  className="input input-bordered w-full rounded-md mt-2"
                />
              </label>
            </div>
          </div>

          <label className="form-control w-full py-5">
            <div className="label">
              <span className="label-text">Product Details</span>
            </div>
            <textarea
              {...register("details")}
              className="textarea textarea-bordered h-24 rounded-md mt-2"
              defaultValue={product.description}></textarea>
          </label>

          <label className="form-control w-full py-">
            <div className="label">
              <span className="label-text">
                Image URL<span> *</span>
              </span>
            </div>
            <input
              {...register("imageUrl")}
              type="text"
              defaultValue={product.image}
              className="input input-bordered w-full rounded-md mt-2"
            />
          </label>

          <div className="card-actions py-10">
            <button
              type="submit"
              className="btn bg-red text-white rounded-lg w-36">
              Update Item <FaSave />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;