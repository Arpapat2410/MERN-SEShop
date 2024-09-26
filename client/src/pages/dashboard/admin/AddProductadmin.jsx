import React from "react";
import { FaSave } from "react-icons/fa";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AddProductadmin = () => {
  const axios = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddProduct = async (data) => {
    try {
      const newProduct = {
        name: data.productName,
        category: data.category,
        price: data.price,
        description: data.details,
        image: data.imageUrl,
      };

      const resp = await axios.post("/products", newProduct);
      if (resp.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product added successfully!",
        });
        return reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add product!",
      });
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto">
      <form
        className="bg-gradient-to-r from-0%  to-[#FCFCFC] to-100%"
        onSubmit={handleSubmit(handleAddProduct)}>
        <div className="py-4 flex flex-col item center justify-center">
          <div className=" px-2 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The <span className="text-red">Cart</span>
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
              placeholder="Product Name"
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
                  placeholder="Price"
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
              placeholder="Product Details..."></textarea>
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
              placeholder="Image URL"
              className="input input-bordered w-full rounded-md mt-2"
            />
          </label>

          <div className="card-actions py-10">
            <button
              type="submit"
              className="btn bg-red text-white rounded-lg w-36">
              Add Item <FaSave />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductadmin;