function main() {
  // Variabel Global 
  // Menjalankan fungsi ketika windows diload
  document.addEventListener('DOMContentLoaded', async () => {
    // Mendefinisikan element DOM  
    const idBookInput = document.getElementById('inputBookId') ;  
    const judulBookInput = document.getElementById('inputBookTitle') ;  
    const authorBookInput = document.getElementById('inputBookAuthor') ;  
    const buttonSave = document.querySelector('#buttonSave');
    const buttonUpdate = document.querySelector('#buttonUpdate');
    
    // Memuat data buku langsung saat DOM memuat
    try {
      // Cara Promise 
      const getBooksPromise= await getBookPromise() ; 
      // console.log(getBooksPromise) ; 
      // Cara fetch 
      const getBookFetchResult = await getBookFetch() ;
      // console.log(getBookFetchResult.books) ; 

      const dataBooks = getBookFetchResult.books; 
      // render 
      renderBooksData(dataBooks) ; 
    }
    catch(error) {
      console.log('terjadi kesalahan', error) ; 
    }

    // Menambahkan event listener ketika insert data
    buttonSave.addEventListener('click', () => {
      const id = idBookInput.value ; 
      const title = judulBookInput.value ; 
      const author = authorBookInput.value ; 

      const bookObject = makeObject(id,title,author);

      console.log(bookObject) ; 
      insertBook(bookObject) ;
    })

  
  });

  // test panggila data server dengan fetch
  async function getBookFetch () {
    try {
      let response = await fetch('https://books-api.dicoding.dev/list') ;
      let responseJSON = await response.json(); 
      if (responseJSON.error) {
        throw new Error('Terjadi kesalahan saat mengambil data') ; 
      }
      else {
        return responseJSON ;
      }

    }
    catch(error) {
      console.log('Terjadi kesalahan', error) ; 
      throw new Error(error) ; 
    }
  }

  // test panggil data server dengan promise 
  const getBookPromise = () => {
     return new Promise((resolve,reject) => {
       const xhr = new XMLHttpRequest() ; 
       xhr.onload = function () {
        const responseJSON = JSON.parse(this.responseText) ; 
        // resolve or reject base response JSON
        if(responseJSON.error) {
          reject('Terjadi kesalahan saat pengambilan data') ; 
        }
        else {
          resolve(responseJSON.books) ; 
        }
      } ; 

      xhr.onerror = function () {
        reject(new Error('Gagal mendapatkan data')) ; 
      }
      // Membuat open get request
      xhr.open('GET', 'https://books-api.dicoding.dev/list') ; 
      xhr.send() ;  
     });
    };

    const renderBooksData = books => {
      const listBookfield = document.getElementById('listBook'); 
      
      // clearing inner html 
      listBookfield.innerHTML = '';
      // Looping data hasil fetch
      books.forEach(book => {
        listBookfield.innerHTML += `
          <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-danger button-delete w-100" id="${book.id}">Hapus</button>
            </div>
          </div>
          </div>
        `;
      });
    };

    const makeObject = (id,title,author) => {
      return {
        "id" : id,  
        "title" : title, 
        "author": author 
      }
    }



  const insertBook = (book) => {
    fetch('https://books-api.dicoding.dev/add', {
      method : 'POST', 
      headers: {
        'Content-Type': 'application/json', 
        'X-Auth-Token': '12345'
      }, 
      body: JSON.stringify({
        id : 10, 
        title: 'Edensor', 
        author: 'Andrea Hirata', 
      }),
    })
      .then (response => {
        return response.json() ; 
      })
      .then(responseJSON => {
        console.log(responseJSON);
      })
      .catch(error => {
        console.log(error); 
      })

  };

  const updateBook = (book) => {
    // tuliskan kode di sini!
  };

  const removeBook = (bookId) => {
    // tuliskan kode di sini!
  };


  
  
  
  
  /*
      jangan ubah kode di bawah ini ya!
  */
  /*
  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector('#listBook');
    listBookElement.innerHTML = '';

    books.forEach(book => {
      listBookElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
            </div>
          </div>
        </div>
      `;
    });

    const buttons = document.querySelectorAll('.button-delete');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const bookId = event.target.id;
        
        removeBook(bookId);
      });
    });
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  document.addEventListener('DOMContentLoaded', () => {

    const inputBookId = document.querySelector('#inputBookId');
    const inputBookTitle = document.querySelector('#inputBookTitle');
    const inputBookAuthor = document.querySelector('#inputBookAuthor');
    const buttonSave = document.querySelector('#buttonSave');
    const buttonUpdate = document.querySelector('#buttonUpdate');

    buttonSave.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };
      
      insertBook(book);
    });

    buttonUpdate.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };

      updateBook(book);
    });
    getBook();
  });
*/

}


export default main;