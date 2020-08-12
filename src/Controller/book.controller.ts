import { Response, Request } from 'express';
import Book from '../model/book.model'

class BookController {

  GetBooks = (req: Request, res: Response): void => {
    Book.find((err, books) => {
      if (err) res.status(500).send(err);
      else res.send(books)
    })
  }

  /*with pagination /pbooks?page=1&size=5*/
  GetPaginatedBook = (req: Request, res: Response): void => {
    let p: number = parseInt(req.query.page || 1);
    let s: number = parseInt(req.query.size || 5);
    Book.paginate(
      {},
      { page: p, limit: s },
      (err, books) => {
        if (err) res.status(500).send(err);
        else res.send(books)
      })
  }

  PostBook = (req: Request, res: Response): void => {
    let book = new Book(req.body);
    book.save((err, books) => {
      if (err) res.status(500).send(err);
      else res.send(books)
    })
  }

  UpdateBook = (req: Request, res: Response): void => {
    Book.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
      if (err) res.status(500).send(err);
      else res.send("update done")
    })
  }

  GetBookById = (req: Request, res: Response): void => {
    Book.findById(req.params.id, (err, book) => {
      if (err) res.status(500).send(err);
      else res.send(book)
    })
  }

  DeleteBook = (req: Request, res: Response): void => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
      if (err) res.status(500).send(err);
      else res.send("Delete done")
    })
  }

  /*with pagination /search?kw=abc&page=1&size=5*/
  SearchBook = (req: Request, res: Response): void => {
    let p: number = parseInt(req.query.page || 1);
    let s: number = parseInt(req.query.size || 5);
    let kw: string = req.query.kw || "";
    Book.paginate(
      {
        title: {
          $regex: ".*(?i)" + kw + ".*"
        }
      },
      { page: p, limit: s },
      (err, books) => {
        if (err) res.status(500).send(err);
        else res.send(books)
      })
  }

}

const bookController = new BookController();

export default bookController;