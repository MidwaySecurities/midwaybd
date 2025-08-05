'use server'

import connectDB from "@/lib/db";
import User from "@/model/User";

export const createUser = async (userData) => {
    const { name, email, password, phone, address, role, permissions } = userData;
    console.log("Creating user with data:", userData);
    // Validate required fields
    if (!name || !email || !password || !phone || !address) {
        console.log("Validation failed: All fields are required");
        // throw new Error("All fields are required");
    }

    // Check if user already exists
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    // Create new user
    const newUser = new User({
        name,
        email,
        password,
        phone,
        address,
        role: role || 'user',
        permissions: permissions || []
    });

    // Save user to database
    await newUser.save();

    return newUser;
}