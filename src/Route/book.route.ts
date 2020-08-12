import { Router } from 'express';
import BookController from '../controller/book.controller';

class BookRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/getAll', BookController.GetBooks);
        this.router.get('/get/:id', BookController.GetBookById);
        this.router.get('/paginate', BookController.GetPaginatedBook);
        this.router.put('/put/:id', BookController.UpdateBook);
        this.router.post('/post', BookController.PostBook);
        this.router.delete('/delete/:id', BookController.DeleteBook);
    }
}

export default  new BookRouter().router;