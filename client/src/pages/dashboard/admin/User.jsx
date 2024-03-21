import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hook/useAxiosSecure'
import useAuth from '../../../hook/useAuth'
import Swal from "sweetalert2"
import useAxiosPublic from '../../../hook/useAxiosPublic'
import useAdmin from '../../../hook/useAdmin';
import { AiOutlineDelete } from "react-icons/ai";



const User = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    }
  })

  const handleMakeAdmin = async (user) => {
    if (user.role === "admin") {
      axiosPublic.patch(`/users/user/${user._id}`).then((res) => {
        refetch()
        Swal.fire({
          title: `${user.name} is a user now!`,
          icon: "success",
          itmer: 1500,
        })
      }).catch((error) => {
        const errorStatus = error?.response?.status
        const errorMessage = error?.response?.data?.message
        Swal.fire({
          title: `${errorStatus} `,
          icon: "error",
          itmer: 1500,
        })
      })
    } else {
      axiosPublic.patch(`/users/admin/${user._id}`).then((res) => {
        refetch()
        Swal.fire({
          title: `${user.name} is a user now!`,
          icon: "success",
          itmer: 1500,
        })
      }).catch((error) => {
        const errorStatus = error?.response?.status
        const errorMessage = error?.response?.data?.message
        Swal.fire({
          title: `${errorStatus} - ${errorMessage}`,
          icon: "error",
          itmer: 1500,
        })
      })
    }
  }

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res)=>{
          refetch()
          Swal.fire({
            title: "Deleted!",
            text: `${res.data.name} has been deleted`,
            icon: "success"
          });
        })
      }
    })
  }
  

  return (
    <div>
      <div className='flex justify-between m-4'>
        <h2 className='text-2xl'>All Users:</h2>
        <h2 className='text-2xl'>Total Users: {users.length} </h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px] text-center">
            {/* head */}
            <thead className='bg-red text-center text-white'>
              <tr>
                <th>
                  <label>
                    #
                  </label>
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className='text-center '>
                  <th>
                    <label>
                      {index + 1}
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.email}
                  </td>
                  <td>
                    <div className='flex'>
                      <p>
                        User
                      </p>
                      <input
                        type="checkbox"
                        className="toggle toggle-success mx-2"
                        checked={user.role === "admin"}
                        onClick={() => handleMakeAdmin(user)}  // Pass the user object to handleMakeAdmin
                      />

                      <p>
                        {user.role}
                      </p>
                    </div>
                  </td>
                  <th>
                    <button className='btn btn-ghost btn-circle bg-red   hover:bg-whi 
                    text-white hover:text-red' onClick={() => handleDeleteUser(user)}>
                      <AiOutlineDelete />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default User