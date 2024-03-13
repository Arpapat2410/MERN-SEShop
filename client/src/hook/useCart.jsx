import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthProvider';

const useCart = () => {
    const { user } = useContext(AuthContext);

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ["carts", user?.email],
        queryFn: async () => {
            if (user?.email) {
                const res = await fetch(`http://localhost:4000/carts/${user.email}`);
                return res.json();
            } else {
                return [];
            }
        }
    });

    return [cart, refetch];
};

export default useCart;
