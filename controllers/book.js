import prisma from "../prisma/prisma.js"

export async function getAllBooks(req, res) {
  try {
    const books = await prisma.book.findMany()
    res.json(books)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error!!", error})
  }
}

export async function addBook(req, res) {
  try {
    const foundBook = await prisma.book.findFirst({where: req.body})
    if (foundBook) {
      return res.json({message: "Book Already Found!!"})
    }

    const newBook = await prisma.book.create({data: req.body})
    res.json({message: "Book Added Successfully!"})
  } catch (error) {
    res.status(500).json({message: "Internal Server Error!!"})
  }
}

export async function getBooksByISBN(req, res) {
  try {
    const {ISBN} = req.body

    if (!ISBN) {
      return res.json({message: "Please, provide a valid ISBN Code!"})
    }

    const foundBooks = await prisma.book.findMany({where: {ISBN}})
    if (foundBooks.length) {
      return res.json({message: "Books are Found!!", foundBooks})
    }

    res.json({message: "No book found with this ISBN Code!"})
  } catch (error) {
    res.status(500).json({message: "Internal Server Error!!"})
  }
}

export async function getBooksByTitle(req, res) {
  try {
    const {title} = req.body

    if (!title) {
      return res.json({message: "Please, provide a valid title!"})
    }

    const foundBooks = await prisma.book.findMany({where: {title}})
    if (foundBooks.length) {
      return res.json({message: "Books are Found!!", foundBooks})
    }

    res.json({message: "No book found with this title!"})
  } catch (error) {
    res.status(500).json({message: "Internal Server Error!!"})
  }
}

export async function getBooksByAuthor(req, res) {
  try {
    const {author} = req.body

    if (!author) {
      return res.json({message: "Please, provide a valid author name!"})
    }

    const foundBooks = await prisma.book.findMany({where: {author}})
    if (foundBooks.length) {
      return res.json({message: "Books are Found!!", foundBooks})
    }

    res.json({message: "No book found with this author name!"})
  } catch (error) {
    res.status(500).json({message: "Internal Server Error!!"})
  }
}
