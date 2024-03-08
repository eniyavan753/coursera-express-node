// routes/auth.js
import prisma from "../prisma/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import {hashPassword, compare_hashed_passwords} from "../utils/hashing.js"
import {createToken} from "../utils/tokens.js"

export async function register(req, res) {
  try {
    const {username, password} = req.body

    // Check if the username is already registered
    const foundUser = await prisma.user.findUnique({
      where: {username: username},
    })

    if (foundUser) {
      return res.json({message: "This user is already registered!"})
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Log the hashed password

    // Execute the registration
    const newUser = await prisma.user.create({
      data: {username, password: hashedPassword},
    })

    res.json({message: "User registered successfully!"})
  } catch (error) {
    console.error("Error during registration:", error)
    res.status(500).json({message: "Internal Server Error!!", error})
  }
}

export async function login(req, res) {
  try {
    const {username, password} = req.body

    // Check if the user is registered
    const registeredUser = await prisma.user.findUnique({where: {username}})
    if (!registeredUser) {
      return res.json({message: "Invalid Credentials!"})
    }

    // Check password matching
    const isMatched = await bcrypt.compare(password, registeredUser.password)
    if (!isMatched) {
      return res.json({message: "Invalid Credentials!"})
    }

    // Create token
    const token = jwt.sign(
      {userId: registeredUser.id, username},
      process.env.TOKEN_SECRET_KEY,
      {expiresIn: "1h"} // You can adjust the expiration time as needed
    )

    return res.json({message: "User logged in successfully!", token})
  } catch (error) {
    res.status(500).json({message: "Internal Server Error!!", error})
  }
}
