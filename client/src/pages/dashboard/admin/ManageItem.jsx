import React from 'react'

const ManageItem = () => {
    return (
        <div className="max-w-screen-2xl container mx-auto">
            <div className="bg-gradient-to-r from-0%  to-[#FCFCFC] to-100%">
                <div className="py-4 flex flex-col item center justify-center">
                    <div className=" px-2 space-y-7">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                            Manage All <span className="text-red">Product Items!</span>
                        </h2>
                    </div>
                </div>
            </div>

            <div className=' w-full'>
                <div className="overflow-x-auto">
                    <table className="table table-zebra text-center mt-5">
                        <thead className='bg-red text-center text-white'>
                            <tr className="">
                                <th>#</th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Item */}

                            <tr >
                                <td></td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 mask mask-squircle">
                                            <img />
                                        </div>
                                    </div>
                                </td>
                                <td className="text-start"></td>
                                <td className="text-start"></td>



                                <td>
                                    <button
                                        className="btn btn-sm border-none text-red bg-transparent"

                                    >

                                    </button>
                                </td>
                            </tr>


                        </tbody>
                    </table>
                    <div className="py-10 flex flex-col justify-end items-end">
                        <div className='space-y-7 px-4 text-center'>
                            <button className="btn bg-red text-white rounded-lg" >
                                Clear all Carts
                            </button>
                        </div>
                    </div>

                </div></div>
        </div>
    )
}

export default ManageItem