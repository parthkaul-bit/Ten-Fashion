import axios from "axios";
import { useEffect, useState } from "react";
import {MdExpandLess, MdExpandMore} from 'react-icons/md'

export const OrderStatus = () => {

    const [orderData, setOrderData] = useState([]);
    const [expandOrder, setExpandOrder] = useState(null);
    console.log(orderData)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const fetch_OrderList = async () => {
            try {
                const response = await axios.get("https://ten-fashion.onrender.com/api/orders",{
                    headers: { Authorization: `Bearer ${token}` }
                })
                setOrderData(response.data.orders)
            } catch (error) {
                console.error(error)
            }
        }
        fetch_OrderList();        
    }, [])

    const toggleAccordian = (orderId) => {
        setExpandOrder(expandOrder === orderId ? null : orderId)
    }

    return (
        <>
        {
            orderData.length !== 0 ? (
                <div className="my-5 w-[95%] md:w-[80%] lg:w-[70%] p-5 rounded-md border-[.05rem] shadow-md dark:bg-slate-700">
                    <div className="flex justify-center text-3xl md:text-4xl lg:text-4xl font-medium mb-8">
                        <div>Order History</div>
                    </div>
                    <hr className="my-5 h-0.5 bg-black" />
                    <div className="flex justify-between font-semibold text-sm md:text-xl lg:text-xl ml-3 mr-0 lg:ml-6 lg:mr-4 md:ml-6 md:mr-4">
                        <div>OrderID</div>
                        <div>Date</div>
                        <div className="lg:ml-16 sm:ml-0">Items</div>
                        <div>Total amount</div>
                        <div>Status</div>
                    </div>
                    <hr className="my-5 h-0.5 bg-black" />
                    {
                        orderData.map((data, index) => (
                            <>
                            <div key={data._id} className="flex justify-between font-medium text-xs md:text-lg lg:text-lg mr-0 md:mr-2 lg:mr-2 text-slate-600 dark:text-white my-5">
                                <div className="flex items-center gap-2">
                                    <button onClick={() => toggleAccordian(data._id)} className="ml-3 hover:underline">
                                        {expandOrder === data._id ? <MdExpandLess size={"1.3rem"}/> : <MdExpandMore size={"1.3rem"}/>}
                                    </button>
                                    <div>#00{index + 1}</div>
                                </div>
                                <div>{`${data.createdAt.split("T")[0]}`}</div>
                                <div>{data.products.reduce((acc, item) => acc + item.quantity, 0)}</div>
                                <div>₹{data.totalAmount}.00</div>
                                <div className={`${data.status === 'Pending' ? "text-yellow-400" : data.status === 'Processing' ? "text-blue-600" : data.status === 'Shipped' ? "text-purple-600" : data.status === 'Delivered' ? "text-green-600" : data.status === 'Cancelled' ? "text-red-600" : "text-gray-600" }`}>{data.status}</div>
                            </div>
                            <div>
                            {expandOrder === data._id && (
                                <div className="ml-4 mt-2 p-4 bg-gray-100 rounded-md text-sm md:text-md lg:text-md my-10 text-gray-700">
                                    <div><b>Order By : </b>{data.CustomerName}</div>
                                    <div>
                                        <b>Items : </b>
                                            {data.products.map((data, index) => (
                                                <div key={index} className="text-xs md:text-sm lg:text-sm">{data.productTitle} × {data.quantity}</div>
                                            ))}
                                        <div>
                                        </div>
                                    </div>
                                    <div><b>Shipping Address : </b>{data.shippingAddress}</div>
                                    <div><b>Contact no. : </b>{data.Phone}</div>
                                    <div><b>Email : </b>{data.Email}</div>
                                </div>
                            )}
                            </div>
                            </>
                        ))
                    }
                    <hr className="my-5 h-0.5 bg-black" />
                </div>
            ) : (
                <div className="my-5 w-[95%] md:w-[80%] lg:w-[70%] p-5 rounded-md border-[.05rem] shadow-md">
                    <div className="flex justify-center text-4xl md:text-5xl lg:text-5xl font-medium mb-8">
                        <div>Order History</div>
                    </div>
                    <hr className="mt-5 mb-0.5 h-[.15rem] bg-black w-[45%] mx-auto" />
                    <hr className="mb-5 h-[.15rem] bg-black w-[48%] mx-auto" />
                    <h1 className="flex justify-center my-5 text-xl">There is no order history</h1>
                </div>
            )
        }
        </>
    );
};