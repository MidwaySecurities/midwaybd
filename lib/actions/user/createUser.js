'use server';

import connectDB from "@/lib/db";
import User from "@/model/User";

export const createUser = async (formData) => {
    await connectDB();

    // Extract values from FormData
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const role = formData.get('role') || 'user';
    const permissions = formData.get('permissions') || [];

    console.log("Creating user with data:", { name, email, password, phone, address });

    // Validate required fields
    if (!name || !email || !password || !phone || !address) {
        return { error: "All fields are required." };
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return { error: "User with this email already exists." };
    }

    // Create new user
    const newUser = new User({
        name,
        email,
        password,
        phone,
        address,
        role,
        permissions
    });

    // Save user to database
    await newUser.save();

    return { success: true };
};
