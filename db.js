const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
});
const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

const courseSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    createrId: ObjectId,
    price: Number,
    description: String
})

const purchasesSchema = new mongoose.Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admin", userSchema);
const courseModel = mongoose.model('courses', courseSchema);
const purchaseModel = mongoose.model("purchases", purchasesSchema);