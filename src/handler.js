 
const { nanoid } = require('nanoid');
const bookshelf = require('./bookshelf'); 

const addBookShelf = (request, h) => {
   //Client
 const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
 } = request.payload;
 const id = nanoid(16);
 const insertedAt = new Date().toISOString();
 const updatedAt = insertedAt;
 const finished = pageCount === readPage;

//  object in server
 bookshelf.push({ id,name,year, author,summary, publisher,pageCount,readPage,finished,reading,insertedAt,
    updatedAt,
 })
  
 
 const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;
 if (!name) {
    const response = h.response({
        status:'fail',
        message:'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
 }
 if (readPage > pageCount) {
    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
 } if (isSuccess) {
   const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
          "bookId": id,
      },
  });
  response.code(201);
  return response;
};
}

const getAllBookshelfAPI = (request, h) => {
  const response = h.response({
    status: "success",
    data: {
      books: bookshelf.map((book) => ({
        id: book.id,
       name: book.name,
       publisher: book.publisher,
      })),
    }
  });
  response.code(200);
  return response;

  
}


 
// const getAllBookshelfAPI = (request, h) => {
//   const {id, name, publisher}

  //  let booksResponse = [];
  //  // Jika tidak ada buku, kembalikan array kosong
  //  if (bookshelf.length === 0) {
  //    booksResponse = [];
  //  } else  {
  //    // Jika ada buku, format respons dengan data buku
  //    booksResponse = bookshelf.map(book => ({
  //      id: book.id,
  //      name: book.name,
  //      publisher: book.publisher,
  //    }));
  //  }

  //  const response = h.response({
  //    status: 'success',
  //    data: {
  //      books: booksResponse,
  //    }
  //  });
  //  response.code(200);
  //  return response;

// Pengujian respons dengan array dua item


 const getBookByIdHandler = (request, h) => {
   const { bookId } = request.params;
  //  const book = bookshelf.find((b) => b.id === bookId);
   const book = bookshelf.filter((b) => b.id === bookId)[0];
   if (!book) {
      const response = h.response({
         status: 'fail',
         message: 'Buku tidak ditemukan',
       });
       response.code(404);
       return response;
     }
   const response = h.response({
     status: 'success',
     data :{
      book,
     }
   });
   response.code(200);
   return response;
 };

 const editBookshelfAPI = (request, h) => {
    const { bookId } = request.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
    } = request.payload;
    const idName = bookshelf.findIndex((book) => book.id === bookId);
    // Validasi properti yang diberikan dalam payload
    if (!name) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      }).code(400);
    }
    
    if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      }).code(400);
    }
    if (idName === -1 ) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
      }).code(404);
    }
  
  
  
    // Perbarui buku dengan data yang diberikan dalam payload
    bookshelf[idName] = {
      ...bookshelf[idName],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
    };
  
    // Kembalikan respons sukses dengan kode status 200
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    }).code(200);
  };

  const deleteBookshelfAPI = (request, h) => {
   const { bookId } = request.params;
   const index = bookshelf.findIndex((b) => b.id === bookId);
   if (index === -1) {
      const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
      });
      response.code(404);
      return response;
    }
  
    // Hapus buku dari array bookshelf
    bookshelf.splice(index, 1);
  
    // Kembalikan respons sukses dengan kode status 200
    const response =  h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });
    response.code(200);
    return response;
  };


 

module.exports = { addBookShelf, getAllBookshelfAPI , getBookByIdHandler, editBookshelfAPI, deleteBookshelfAPI };