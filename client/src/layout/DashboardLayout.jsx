import React from 'react'
import logo from "/logo.png"
import { Link, Outlet } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { IoBagCheckSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";


const DashboardLayout = () => {
    const isAmin = true;

    return (
        <div>
            {isAmin ? (
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <div>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><MdDashboard/></label>
                    <button class="btn btn-outline btn-warning">Log Out</button>
                    <div className='mt-5 md:mt-2 mx-4'>contant<Outlet/></div>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content  ">
                        {/* Sidebar content here */}
                        <li>
                            <Link to="/Dashboard" className='flex justify-center mb-3' >

                                <img src="./logo.png" alt="" className='w-24 h-24 ' />
                                <div className="badge badge-primary">primary</div>


                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link>
                                <MdDashboard />
                                Dashboard</Link>
                        </li>
                        <li><Link ><IoBagCheckSharp />
                            Manage Orders</Link></li>
                        <li><Link><IoIosAddCircle />
                            Add Product</Link></li>
                        <li><Link><LuLayoutDashboard />
                            Manage Item</Link></li>
                        <li><Link to="/Dashboard"><FaUserEdit />
                            All Users</Link></li>
                    </ul>

                </div>
            </div>): ( <div className="h-screen " >
                <Link to="/" className=""> </Link>
            </div>) }

            
        </div>
    )
}

export default DashboardLayout