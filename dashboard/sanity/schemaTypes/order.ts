export default{
    name:"order",
    type:"document",
    title:"Order",
    fields : [
        {
            name: "firstName",
            title: "First Name",
            type: "string",
        },
        {
            name: "lastName",
            title: "Last Name",
            type: "string",
        },
        {
            name: "address",
            title: "Address",
            type: "string",
        },
        {
            name: "city",
            title: "City",
            type: "string",
        },
        {
            name: "zipCOde",
            title: "Zip Code",
            type: "number",
        },
        {
            name: "phone",
            title: "Phone",
            type: "number",
        },
        {
            name: "email",
            title: "Email",
            type: "string",
        },
        {
            name: "discount",
            title: "Discount",
            type: "number",
        },
        {
            name: "cartItems",
            title: "Cart Items",
            type: "array",
            of:[{
                type:"reference",
                to:{
                    type:"products"
                }
            }]
        },
        {
            name: "status",
            title: "Order Status",
            type: "string",
            options:{
                list:[
                    {
                        title:"Pending",
                        value:"pending"
                    },
                    {
                        title:"Success",
                        value:"success"
                    },
                    {
                        title:"Dispatch",
                        value:"dispatch"
                    }

                ],
                layout:"radio"
            },
            initialValue:"pending"
        }
    ]
}