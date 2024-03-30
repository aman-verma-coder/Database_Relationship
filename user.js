const mongoose = require("mongoose");
const schema = mongoose.Schema;

main()
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/dbRelation");
}

const userSchema = new schema({
    username: String,
    addresses: [
        {

            Location: String,
            City: String
        },
    ],
})

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
    let user1 = new User({
        username: "Aman",
        addresses: [{
            Location: "Kankinara",
            City: "Kolkata"
        }]
    });

    user1.addresses.push({ Location: "Bhatpara", City: "Kolkata" });
    let result = await user1.save();
    console.log(result);
};

addUsers();