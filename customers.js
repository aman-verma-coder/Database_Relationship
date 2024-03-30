const mongoose = require("mongoose");
const schema = mongoose.Schema;

main()
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/dbRelation");
}

const orderSchema = new schema({
    item: String,
    price: Number
});

const Order = mongoose.model("Order", orderSchema);

const customerSchema = new schema({
    name: String,
    orders: [
        {
            type: schema.Types.ObjectId,
            ref: Order
        },
    ],
});

// customerSchema.pre("findOneAndDelete", async () => {
//     console.log("Pre Deletion Middleware");
// });

customerSchema.post("findOneAndDelete", async (data) => {
    if (data.orders.length) {
        let res = await Order.deleteMany({ _id: { $in: data.orders } });
        console.log(res);
    }
    // console.log(data);
});

const Customer = mongoose.model("Customer", customerSchema);

// const addOrders = async () => {
//     let res = await Order.insertMany([
//         { item: "Samosa", price: 5 },
//         { item: "Kachori", price: 4 },
//         { item: "Chocolate", price: 20 }
//     ]);
//     // console.log(res);
// };

// addOrders();

// const addCustomers = async () => {
//     let cust1 = new Customer({
//         name: "Karan Arjun",
//     });
//     let order1 = await Order.findOne({ item: "Chocolate" });
//     let order2 = await Order.findOne({ item: "Kachori" });

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     await cust1.save();
//     // console.log(res);
// }

// addCustomers();

// const findCustomer = async () => {
//     let result = await Customer.find();
//     console.log(result);
// }

// findCustomer();

const delCust = async () => {
    let data = await Customer.findByIdAndDelete("65aff8005c85be6f78e39a91");
    console.log(data);
}

delCust();