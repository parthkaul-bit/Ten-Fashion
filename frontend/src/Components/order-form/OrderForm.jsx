import { useEffect, useState } from "react";
import { data } from "./data";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export const OrderForm = () => {

    const [cartItems, setCartItems] = useState([])
    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        country: '',
        address: '',
        city: '',
        postcode: '',
        state: '',
        phone: '',
        message: '',
        payment: {
            Cash_on_delivery: 'Cash on delivery',
            card_payment: 'card-payment',
            upi: 'upi',
            Net_Banking: 'Net-Banking',
        }
    });
    console.log(cartItems)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

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

    const totalAmount = () => {
        return cartItems.reduce((acc, item) => acc + item.price * (item.quantity), 0);
    };

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData((prev) => (
            {
                ...prev,
                [id] : value
            }
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const backendData = {
                products: cartItems,
                totalAmount: totalAmount(),
                shippingAddress: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.country}, ${formData.postcode}`,
                paymentMethod: formData.payment,
                CustomerName: `${formData.firstname} ${formData.lastname}`,
                Email: formData.email,
                Phone: formData.phone,
                notes: formData.message,
            }
            const response = await axios.post("https://ten-fashion.onrender.com/api/orders",backendData,{
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(response.data)
            if (data) {
                navigate("/order-tracking")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="my-10 flex flex-col lg:flex-row md:flex-col gap-7 w-full justify-center h-auto">
            <div className="border-[1.5px] rounded-sm h-[100%] w-[95%] md:w-[95%] lg:w-[60%] mx-auto lg:mx-0 p-8">
            <h1 className="text-[3rem] font-medium">Billing details</h1>   
            <div className="mt-8">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-4 ml-2 text-lg text-gray-900 dark:text-white">Email Address</label>
                    <input type="email" id="email" onChange={handleChange} value={formData.email} className="ml-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex mb-5 justify-between lg:gap-10 md:gap-6 gap-3">
                    <div className="w-[50%]">
                        <label htmlFor="firstname" className="block mb-4 ml-2 text-lg text-gray-900 dark:text-white">First name</label>
                        <input type="text" id="firstname" onChange={handleChange} value={formData.firstname} className="ml-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="lastname" className="block mb-4 ml-2 text-lg text-gray-900 dark:text-white">Last name</label>
                        <input type="text" id="lastname" onChange={handleChange} value={formData.lastname} className="ml-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="country" className="block mb-4 ml-2 text-lg text-gray-900 dark:text-white">Country/Region</label>
                    <input type="text" id="country" onChange={handleChange} value={formData.country} className="ml-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="address" className="block mb-4 ml-2 text-lg text-gray-900 dark:text-white">Street address</label>
                    <input type="text" id="address" onChange={handleChange} value={formData.address} className="ml-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex mb-5 justify-between lg:gap-10 md:gap-6 gap-3">
                    <div className="w-[50%]">
                        <label htmlFor="city" className="block mb-4 ml-2 text-lg text-gray-900 dark:text-white">Town / City</label>
                        <input type="text" id="city" onChange={handleChange} value={formData.city} className="ml-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="postcode" className="block mb-4 ml-2 text-lg text-gray-900 dark:text-white">Postcode / ZIP</label>
                        <input type="text" id="postcode" onChange={handleChange} value={formData.postcode} className="ml-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="state" className="block mb-4 ml-2 text-lg text-gray-900 dark:text-white">State</label>
                    <input type="text" id="state" onChange={handleChange} value={formData.state} className="ml-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-4 ml-2 text-lg text-gray-900 dark:text-white">Phone</label>
                    <input type="text" id="phone" onChange={handleChange} value={formData.phone} className="ml-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="message" className="block mb-4 ml-2 text-lg text-gray-900 dark:text-white">Order notes</label>
                    <textarea id="message" rows="4" onChange={handleChange} value={formData.message} className="ml-1.5 block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                </div>
            </div>
            </div>
            <div className="border-[1.5px] rounded-sm w-[95%] md:w-[95%] lg:w-[30%] mx-auto lg:mx-0 max-h-max p-8 bg-slate-300">
                <h1 className="text-[2rem] font-medium text-white">Your order</h1>
                <div className="mt-7">
                    <div className="text-[1.2rem] font-medium flex justify-between">
                        <div className="ml-1">Product</div>
                        <div className="mr-1">Subtotal</div>
                    </div>
                    <hr className="my-5 h-[2px] bg-black" />
                </div>
                {
                    cartItems.map((item) => (
                        <div key={item.productId} className="my-4">
                            <div className="text-[1.1rem] flex justify-between items-center">
                                <div className="w-[60%] ml-1">{`${item.productTitle}  × ${item.quantity}`}</div>
                                <div className="mr-2.5">{`₹${item.price * item.quantity}`}</div>
                            </div>
                            <hr className="my-5 h-[2px] bg-black" />
                        </div>
                    ))
                }
                <div className="my-5">
                    <div className="text-[1.2rem] font-medium flex justify-between">
                        <div className="ml-1">Total</div>
                        <div className="mr-2.5 text-[1.3rem]">₹{totalAmount()}</div>
                    </div>
                    <hr className="my-5 h-[2px] bg-black" />
                </div>
                <div className="mt-8">
                    <label className="block mb-4 text-lg text-gray-900 dark:text-white">Payment Method</label>
                    <select id="payment" onChange={handleChange} value={formData.payment} className="ml-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="" >Select Payment Method</option>
                        <option value="Cash on delivery">Cash on delivery</option>
                        <option value="card payment">Credit/Debit Card</option>
                        <option value="upi">UPI</option>
                    </select>
                </div>
                <div className="mt-4">
                    <p className="text-md font-medium text-gray-500">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                </div>
                <button className="border-2 rounded-full py-4 mt-5 bg-black text-white font-semibold text-xl hover:text-black hover:bg-white hover:border-black w-full">Place order</button>
            </div>
        </form>
    );
};