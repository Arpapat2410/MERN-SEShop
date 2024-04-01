import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from "../hook/useAxiosSecure"
import useAuth from './useAuth';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    console.log(user.email);
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
      queryKey: [user?.email, "isAdmin"],
      queryFn: async () => {
        try {
          const res = await axiosSecure.get(`/users/admin/${user?.email}`);
          console.log(res.data);
          return res.data.isAdmin;  
        } catch (error) {
          console.log(error);
        }
        
      },
    });
    //สร้าง data
    return [isAdmin, isAdminLoading];
  };
  
  export default useAdmin;