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
    email: String
});

const Usr = mongoose.model("Usr", userSchema);

const postSchema = new schema({
    content: String,
    likes: Number,
    user: {
        type: schema.Types.ObjectId,
        ref: Usr
    }
});

const Post = mongoose.model("Post", postSchema);

// const addData = async () => {
//     let user1 = new Usr({
//         username: "Aman Verma",
//         email: "9330nama@gmail.com"
//     });

//     let post1 = new Post({
//         content: "Hi there! I am Aman Verma",
//         likes: 100,
//     });

//     post1.user = user1

//     await user1.save();
//     await post1.save();

//     let userr = await Usr.findOne({ username: "Aman Verma" });

//     let post2 = new Post({
//         content: "This is second post.",
//         likes: 50,
//     });

//     post2.user = userr;

//     await post2.save();
// };

// addData();

const getData = async () => {
    let res = await Post.find({}).populate("user", "username");
    console.log(res);
}

getData();