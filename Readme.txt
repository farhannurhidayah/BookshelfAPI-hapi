Kriteria 1 : Aplikasi menggunakan port 9000
Kriteria 2 : Aplikasi dijalankan dengan perintah npm run start.

{
  "name": "submission",
  ...
  "scripts": {
    "start": "node src/server.js",
  }
}

Hanya ketika deployment

{
  "name": "submission",
  ...
  "scripts": {
    "start": "node src/server.js",
    "start-dev": "nodemon src/server.js",
  }
}

Kriteria 3 : API dapat menyimpan buku

Method : POST
URL : /books
Body Request:

{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}

Objek buku yang disimpan pada server harus memiliki struktur seperti contoh di bawah ini:

{
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}