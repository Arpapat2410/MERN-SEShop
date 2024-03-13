import React from 'react'

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
                    {/* Sidebar content here */}
                    <div className='border-b-2 border-b-slate-400 py-4'>
                      <img src="./logo.png" alt="" className='w-24 h-24 ' />  
                    </div>
                    
                    <li><a>Dashboard</a></li>
                    <li><a>Manage Orders</a></li>
                    <li><a>Add Product</a></li>
                    <li><a>Manage Item</a></li>
                    <li><a>All Users</a></li>
                </ul>

            </div>
        </div>
    )
}

export default Dashboard