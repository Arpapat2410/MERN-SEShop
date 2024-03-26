import React from 'react'
import { FaSave } from "react-icons/fa";

const Productadmin = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto">
      <div className="bg-gradient-to-r from-0%  to-[#FCFCFC] to-100%">
        <div className="py-4 flex flex-col item center justify-center">
          <div className=" px-2 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The <span className="text-red">Cart</span>
            </h2>
          </div>

          <label className="form-control w-full py-5 ">
            <div className="label ">
              <span className="label-text ">Product Name<span> *</span></span>
            </div>
            <input type="text" placeholder="Product Name" className="input input-bordered w-full rounded-md mt-2 " />
          </label>

          <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
            <div className='md:w-1/2'>
              <label className="form-control w-full ">
                <div className="label ">
                  <span className="label-text ">Category<span> *</span></span>
                </div>
                <select className="select select-bordered rounded-md mt-2">
                  <option disabled selected>Select a category</option>
                  <option>Clothing</option>
                  <option>Accessories</option>
                  <option>Gadgets</option>
                  <option>Swag</option>
                </select>
              </label>
            </div>

            <div className='md:w-1/2'>
              <label className="form-control w-full py-5 ">
                <div className="label ">
                  <span className="label-text ">Price<span> *</span></span>
                </div>
                <input type="text" placeholder="Price" className="input input-bordered w-full rounded-md mt-2 " />
              </label>
            </div>
          </div>

          <label className="form-control  py-5 ">
            <div className="label">
              <span className="label-text">Product Detalls</span>
            </div>
            <textarea className="textarea textarea-bordered h-24 rounded-md mt-2" placeholder="Product Detalls..."></textarea>
          </label>

          <label className="form-control w-full py-5 ">
            <div className="label ">
              <span className="label-text ">Image URL<span> *</span></span>
            </div>
            <input type="text" placeholder="Image URL" className="input input-bordered w-full rounded-md mt-2 " />
          </label>

          <div className="card-actions mt-2 ">
          <button className="btn bg-red text-white rounded-lg w-36" >
            Add Item
            <FaSave />
          </button>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Productadmin