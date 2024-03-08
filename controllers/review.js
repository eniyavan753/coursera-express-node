// routes/review.js

import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

export async function addReview(req, res) {
  console.log("call")
  try {
    console.log("asd")
    const {user_id, book_id, review_text} = req.body // Destructure user_id, book_id, and review_text directly from req.body
    console.log(book_id)
    console.log(review_text)

    const existingReview = await prisma.review.findUnique({
      where: {userId_bookId: {userId: user_id, bookId: book_id}},
    })

    if (existingReview) {
      await prisma.review.update({
        where: {userId_bookId: {userId: user_id, bookId: book_id}},
        data: {review_text},
      })
    } else {
      await prisma.review.create({
        data: {userId: user_id, bookId: book_id, review_text},
      })
    }

    res.json({message: "Review added/updated successfully!"})
  } catch (error) {
    res.status(500).json({message: "Internal Server Error!!", error})
  }
}

export async function getReview(req, res) {
  try {
    const book_id = parseInt(req.params.id) // Assuming id is a number

    const bookReview = await prisma.review.findMany({
      select: {review_text: true},
      where: {bookId: book_id},
    })

    if (!bookReview.length) {
      return res.json({message: "No review found for this book!"})
    }

    res.json({message: "Review found for this book", bookReview})
  } catch (error) {
    res.status(500).json({message: "Internal Server Error!!", error})
  }
}

export async function deleteReview(req, res) {
  try {
    const {user_id} = req.user
    const book_id = parseInt(req.params.id) // Assuming id is a number

    const deletedReview = await prisma.review.deleteMany({
      where: {userId_bookId: {userId: user_id, bookId: book_id}},
    })

    if (!deletedReview.count) {
      return res.json({message: "No review found for that user to delete!"})
    }

    res.json({message: "Review deleted for that user successfully!"})
  } catch (error) {
    res.status(500).json({message: "Internal Server Error!!", error})
  }
}
export async function modifyReview(req, res) {
  try {
    const {user_id, book_id, review_text} = req.body

    const existingReview = await prisma.review.findUnique({
      where: {userId_bookId: {userId: user_id}},
    })

    if (!existingReview) {
      return res.json({message: "Review not found for modification!"})
    }

    const modifiedReview = await prisma.review.update({
      where: {userId_bookId: {userId: user_id, bookId: book_id}},
      data: {review_text},
    })

    res.json({message: "Review modified successfully!", modifiedReview})
  } catch (error) {
    res.status(500).json({message: "Internal Server Error!!", error})
  }
}
