export interface IBooksDAO {
    createBook(book,file,user)
    getAllBooks()
    getBookByID(id)
    updateBookInfo(book,id)
    deleteBook(id)
}