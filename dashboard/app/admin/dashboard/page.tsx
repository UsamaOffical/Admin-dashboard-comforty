// "use client"
// import { client } from "@/sanity/lib/client";
// import Swal from "sweetalert2";
// import React, { useEffect, useState } from "react";
// import order from "@/sanity/schemaTypes/order";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import ProtectedRoute from "@/app/component/protectedRoute";



// interface order{
//     _id:string,
//     firstName:string,
//     lasName:string,
//     email:string,
//     phone:number,
//     address:string,
//     zipCode:string,
//     discount:number,
//     total:number,
//     orderDate:string,
//     status:string | null,
//     cartItem:{
//         map(arg0: (item: any) => any): React.ReactNode | Iterable<React.ReactNode>;title:string,image:string
// },
//     city:string
// }

// export default function AdminDashboard(){
//     const [orders , setOrders ] = useState<order[]>([])
//     const [seletedOrderId , setSelectedOrderId] = useState <string | null>(null)
//     const [filter , setFilter] = useState ("All")

//     useEffect(()=>{
//         client.fetch(
//             `*[_type == "order]{
//             _id:,
//             firstName,
//             lasName,
//             email,
//             phone,
//             address,
//             zipCode,
//             discount,
//             total,
//             orderDate,
//             status:string | null,
//             cartItem[]->{
//             title,
//             image
//             }
//             city,
            
//             }`
//         ).then((data)=>setOrders(data))
//         .catch((error) => console.log("Error Fetching Products",error)
//         )
//     },[])

//     const filteredOrder = filter === 'All' ? orders :orders.filter((order) => order.status === filter)
//     const toggleOrderDetails = (orderId :string)=>{
//         setSelectedOrderId((prev)=>(prev === orderId ? null : orderId))
//         const handleDelete = async (orderId:string)=>{
//             const result = await Swal.fire({
//                 title:"Are you sure!",
//                 text:"You Won't be able to revert this",
//                 icon:"warning",
//                 showCancelButton:true,
//                 confirmButtonColor:"#3085d6",
//                 cancelButtonColor:"#d33",
//                 confirmButtonText:"Yes, Delete it!"
//             })
//             if(!result.isConfirmed)return
//             try{
//                 await client.delete(orderId)
//                 setOrders((prevOrder)=> prevOrder.filter((order)=>order._id !== orderId))
//                 Swal.fire("Delete!","Your Order has been deleted","success")
//             }catch(error){
//                 Swal.fire("Error","Failed to delete order","error")
//             }
//         }
//         const handleStatusChange = async( orderId:string, newStatus:string)=>{

//             try{
//                 await client
//                 .patch(orderId)
//                 .set({status : newStatus})
//                 .commit()

//                 setOrders((prevOrder)=>prevOrder.map((order) => order._id === orderId?
//             {
//                 ...order,
//                 status:newStatus
//             }:order))
//             if(newStatus === "dispatch"){
//                 Swal.fire("Your dispatched","Your order has been dispatched","success")
//             }else if(newStatus === "success"){
//                 Swal.fire("success","Your order has been received","success")
//             }
    
//             }catch(error){
//                 Swal.fire("Error","Failed to change status","error")
//             }
//         }
//     }
//     function handleStatus (_id:string,value:string):void{
//         throw new Error("Function not implemented ")
//     }
//     function handleDelete() {
//         throw new Error("Function not implemented.");
//     }

//         return(
//             <ProtectedRoute>
//                 <div className="flex flex-col h-screen bg-gray-100">
//                     <nav className="bg-[#029FAE] text-white flex justify-between p-4 shadow-md">
//                         <h2 className="text-2xl font-semibold"> 
//                             Admin Dashboard
//                         </h2>
//                         <div className="flex space-x-4">
//                             {["All","success","dispatch","pending"].map((status)=>(
//                                 <button key={status} className={`px-4 py-2 rounded-lg transition-all ${
//                                 filter === status ? "bg-[#029FAE] text-white font-bold":"text-white"}`}
//                                 onClick={()=> setFilter(status)}>
//                                     {status.charAt(0).toUpperCase() + status.slice(1)}

//                                 </button>
//                             ))}
//                         </div>
//                     </nav>
//                     <div className="flex-1 p-6 overflow-y-auto">
//                         <h2 className="text-2xl font-semibold text-center">Order</h2>
//                         <div className="overflow-y-auto bg-white rounded-lg shadow-sm"> 
//                             <table>
//                                 <thead>
//                                     <tr>
//                                     <th>ID</th>
//                                     <th>Customer</th>
//                                     <th>Address</th>
//                                     <th>Date</th>
//                                     <th>Total</th>
//                                     <th>Status</th>
//                                     <th>Action</th>
//                                     </tr>
                                    
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-100">
//                                     {filteredOrder.map((order)=>(
//                                         <React.Fragment key={order._id}>
//                                             <tr className="cursor-pointer hover:bg-[#3097a0] transition-all" onClick={()=> toggleOrderDetails(order._id)}>
//                                                 <td>{order._id}</td>
//                                                 <td>{order.firstName} {order.lasName}</td>
//                                                 <td>{order.address}</td>
//                                                 <td>{new Date(order.orderDate).toLocaleString()}</td>
//                                                 <td>${order.total}</td>
//                                             </tr>
//                                             <td>

//                                             <select value={order.status || ""} onChange={((e)=>handleStatus(order._id,e.target.value))}
//                                                 className="bg-gray-100 p-1 rounded"
//                                                 >
//                                                     <option value="pending">Pending</option>
//                                                     <option value="success">Success</option>
//                                                     <option value="dispatch">Dispatched</option>
//                                                 </select>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <button onClick={(e)=>{
//                                                     e.stopPropagation()
//                                                     handleDelete()
//                                                 }}
//                                                 className=" text-white px-3 py-1 bg-red-600 hover:bg-red-800 transition-all">
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                             {seletedOrderId === order._id &&(
//                                                 <tr>
//                                                     <td colSpan={7} className="p-4 bg-gray-50 transition-all" >
//                                                         <h3 className="font-semibold">Order Details</h3>
//                                                         <p>Phone:<strong>{order.phone}</strong></p>
//                                                         <p>Email:<strong>{order.email}</strong></p>
//                                                         <p>City:<strong>{order.city}</strong></p>
//                                                         <ul>
//                                                             {order.cartItem.map((item)=>(
//                                                                 <li className="flex items-center gap-2" key={`${order._id}`}>
//                                                                     {item.image &&(
//                                                                         <Image
//                                                                         src={urlFor(item.image).url()}
//                                                                         alt="image"
//                                                                         width={100}
//                                                                         height={100}

//                                                                         />
//                                                                     )}
//                                                                 </li>
//                                                             ))}
//                                                         </ul>

//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </React.Fragment>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </ProtectedRoute>
//         )
   
// }
"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";
import ProtectedRoute from "@/app/component/protectedRoute";


interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  total: number;
  discount: number;
  orderDate: string;
  status: string | null;
  cartItems: { title: string; image: string }[];
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "order"]{
          _id,
          firstName,
          lastName,
          phone,
          email,
          address,
          city,
          zipCode,
          total,
          discount,
          orderDate,
          status,
          cartItems[]->{
            title,
            image
          }
        }`
      )
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const filteredOrders =
    filter === "All" ? orders : orders.filter((order) => order.status === filter);

  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await client.delete(orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      Swal.fire("Deleted!", "Your order has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire("Error!", "Something went wrong while deleting.", "error");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await client
        .patch(orderId)
        .set({ status: newStatus })
        .commit();
      
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      if (newStatus === "dispatch") {
        Swal.fire("Dispatch", "The order is now dispatched.", "success");
      } else if (newStatus === "success") {
        Swal.fire("Success", "The order has been completed.", "success");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal.fire("Error!", "Something went wrong while updating the status.", "error");
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-[#029FAE] text-white p-4 shadow-lg flex justify-between">
          <h2 className="text-2xl font-bold">Admin Dashboard Comforty</h2>
          <div className="flex space-x-4">
            {["All", "pending", "dispatch", "success"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filter === status ? "bg-white text-[#029FAE] font-bold" : "text-white"
                }`}
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        {/* Orders Table */}
        <div className="flex-1 p-6 overflow-y-auto ">
          <h2 className="text-3xl font-bold mb-4 text-center">Orders</h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-sm lg:text-base">
              <thead className="bg-gray-50 text-[#029FAE]">
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {filteredOrders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr
                      className="cursor-pointer hover:bg-gray-50 transition-all "
                      onClick={() => toggleOrderDetails(order._id)}
                    >
                      <td >{order._id}</td>
                      <td>{order.firstName} {order.lastName}</td>
                      <td>{order.address}</td>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td>${order.total}</td>
                      <td>
                        <select
                          value={order.status || ""}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="bg-gray-100 p-1 rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="dispatch">Dispatch</option>
                          <option value="success">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(order._id);
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {selectedOrderId === order._id && (
                      <tr>
                        <td colSpan={7} className="bg-gray-50 p-4 transition-all animate-fadeIn">
                          <h3 className="font-bold">Order Details</h3>
                          <p><strong>Phone:</strong> {order.phone}</p>
                          <p><strong>Email:</strong> {order.email}</p>
                          <p><strong>City:</strong> {order.city}</p>
                          <ul>
                            {order.cartItems.map((item, index) => (
                              <li key={`${order._id}-${index}`} className="flex items-center gap-2">
                                {item.title}
                                {item.image && (
                                  <Image src={urlFor(item.image).url()} width={40} height={40} alt={item.title} />
                                )}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}