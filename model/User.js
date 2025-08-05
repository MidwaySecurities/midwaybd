import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    permissions: {
        type: [String],
        default: []
    }
})
// ⨯ OverwriteModelError: Cannot overwrite `User` model once compiled.
if (mongoose.models.User) {
    mongoose.deleteModel('User');
}
const User = mongoose.model("User", UserSchema);
export default User;