import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';

export const Shopping_Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    console.log(cartItems)

    const token = localStorage.getItem("token")
    if (!token) {
        toast.error("User is not authenticated. Please log in.");
        return;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://ten-fashion.onrender.com/cartItems',{
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartItems(response.data.flatMap((resp) => (resp.products)))
            } catch (err) {
                console.log('error on fecting cart product data :' + err)
            }
        }
        fetchData();
    }, [])

    const updateQuantity = async (productId, amount) => {
        const updatedCart = cartItems.map(item =>
            item._id === productId ? { ...item, quantity: item.quantity + amount } : item
        );
        setCartItems(updatedCart);

        try {
            const response = await axios.patch('https://ten-fashion.onrender.com/cartItem',
                {
                    productId,
                    quantity:  amount,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setCartItems(response.data.products)
        } catch (error) {
            console.error(error)
        }
    };

    const totalAmount = () => {
        return cartItems.reduce((acc, item) => acc + item.price * (item.quantity), 0);
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`https://ten-fashion.onrender.com/cartItems`,{
                data : { productId: id },
                headers: { Authorization: `Bearer ${token}` }   
            });
            setCartItems(cartItems.filter(item => item.productId !== id));
            toast.success('product removed from cart');
        } catch (error) {
            console.error("Error Deleteing item:", error)
            toast.error('Error During removing the product');
        }
    };

    return (
        <>
            {
                cartItems.length !== 0 ? (
                    <div className="w-[98%] h-auto mx-auto mt-5 flex flex-col justify-center bg-white dark:bg-primary-dark-bg">
                        <div className="mt-5 mb-2 md:mb-6 lg:mb-10 flex justify-center">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">Shopping Cart</h1>
                        </div>
                        <div className="flex flex-col md:flex-col lg:flex-row">
                            <div className="w-auto md:w-auto lg:w-[65%] flex-1 p-4">
                                <div className="hidden md:ml-56 md:flex md:justify-between md:text-lg md:font-medium md:mb-5 lg:ml-56 lg:flex lg:justify-between lg:text-xl lg:font-medium lg:mb-5">
                                    <div>Product</div>
                                    <div>Price</div>
                                    <div>Quantity</div>
                                    <div>Subtotal</div>
                                </div>
                                <hr className="hidden md:block md:h-[1px] md:black md:mb-4 lg:block lg:h-[1px] lg:black lg:mb-4" />
                                {
                                    cartItems.map((item) => (
                                        <div key={item._id} className="border-2 my-3 md:border-0 lg:border-0 p-2">
                                            <div className="flex flex-col md:flex-row lg:flex-row md:items-center lg:items-center md:gap-6 lg:gap-6 py-4 text-xl md:text-lg lg:text-md font-normal md:mb-3 lg:mb-4">
                                                <button onClick={() => deleteItem(item.productId)} className="absolute md:relative md:block lg:block text-[1.5rem]">×</button>
                                                <img src={item.images} alt={item.productTitle} className="mx-auto rounded-lg w-20 h-20 object-cover md:w-24 md:h-24 lg:w-28 lg:h-28" />
                                                <div className="md:flex-1 lg:flex-1 mt-4 md:mt-0 lg:mt-0">
                                                    <div className="text-center md:font-normal lg:font-normal font-medium md:text-left lg:text-left md:ml-10 lg:ml-10">{item.productTitle}</div>
                                                </div>
                                                <div className="flex justify-between gap-[3.5rem] md:flex-row lg:flex-row items-center md:gap-[5.5rem] lg:gap-[8rem] md:mt-0 lg:mt-0 mt-8">
                                                    <div>₹{item.price}</div>
                                                    <div className="flex items-center gap-[2rem] border-2 rounded-xl">
                                                        <button className="ml-2 text-md md:text-lg lg:text-xl font-medium" onClick={() => updateQuantity(item.productId, -1)} disabled={item.quantity === 1}>-</button>
                                                        <div className="text-sm">{item.quantity}</div>
                                                        <button className="mr-2 text-md md:text-lg lg:text-xl font-medium" onClick={() => updateQuantity(item.productId, 1)}>+</button>
                                                    </div>
                                                    <div className="font-semibold">₹{item.quantity * item.price}</div>
                                                </div>
                                            </div>
                                            <hr className="hidden md:block md:h-[.7px] md:black md:mb-4 lg:block lg:h-[1px] lg:black lg:mb-4" />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="w-[92%] lg:w-[33%] h-[100%] flex flex-col gap-5 p-8 border-2 my-5 mx-auto lg:mx-0">
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Basket Totals</h1>
                                <div className="flex mt-5 justify-between mx-5">
                                    <div className="text-sm font-medium">Subtotal</div>
                                    <div>₹{totalAmount()}</div>
                                </div>
                                <hr className="h-[1.5px] bg-slate-400" />
                                <div className="flex justify-between mx-5">
                                    <div className="text-sm font-medium">Total</div>
                                    <div className="text-4xl font-semibold">₹{totalAmount()}.00</div>
                                </div>
                                <button className="border-2 rounded-full py-4 mt-6 bg-black text-white font-semibold text-xl hover:text-black hover:bg-white hover:border-black">
                                <Link to='/order-form'>
                                    Proceed to checkout
                                </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center">
                            <div className="text-3xl my-2">Your basket is currently empty.</div>
                            <Link to='/'>
                            <button className="border-2 rounded-full py-4 mt-6 bg-black text-white font-semibold text-xl hover:text-black hover:bg-white hover:border-black w-full">
                                Return to shop
                            </button>
                            </Link>
                        </div>
                    </div>
                )
            }
        </>
    );
};