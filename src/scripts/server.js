
class Server {
    // Setup server connection 
    // instancy
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.dataBooks = [] ;  
    }
 

   getData() {
        // Print pesan ketika berhasil
        this.xhr.onload = function() {
           return this.responseText;  
        };
         // Ketika gagal print kesalahan
        this.xhr.onerror = function () {
            console.log('Maaf terjadi kesalahan') ; 
            return false ; 
        }
        // Setup header
        this.xhr.open('GET','https://books-api.dicoding.dev/list') ;
        // Kirim request
        this.xhr.send() ; 
    }
} ;

export default Server ; 



// Dummy data
// const books = {
//     id : 10, 
//     title : 'Edensor',
//     author : 'Andrea Hirata'
// };



// // Open request dan send message
// xhr.open('POST', 'https://books-api.dicoding.dev/add'); 

// // Menetapkan data header
// xhr.setRequestHeader('content-type', 'application/json'); 
// xhr.setRequestHeader('X-Auth-Token', '12345'); 

// // Menetapkan data ke body 
// xhr.send(JSON.stringify(books)); 


