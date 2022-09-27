// Book Class Repersent a Book..
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author  = author;
        this.isbn = isbn;
    }
}
// UI CLass Handle ui Class...
class UI{
    static displayBooks(){
       
    const books = Store.getBooks();
    books.forEach((book)=> UI.addBookToList(book));
    }
    static  addBookToList(book){
        const list = document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
                          <td>${book.author}</td>
                          <td>${book.isbn}</td>
                    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`; 
 

        list.appendChild(row);   
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }

    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        
        container.insertBefore(div,form);

        //vanish in  3 Seconds
        setTimeout(() =>document.querySelector('.alert').remove(),2000 );

    }
    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value ='';
        document.querySelector('#isbn').value = ' ';
    }
}
//Store class: Handles Storage.... it doesn;t Go
// Display Books..
  class Store{
   static getBooks(){
     let books;
     if(localStorage.getItem('books')===null){
        books =[];
     }else{
        books = JSON.parse(localStorage.getItem('books'));
     }

     return books;
    }
   static addBooks(book){
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));
  
    }
   static removeBooks(isbn){
     const books = Store.getBooks();
     books.forEach((book,index)=>{
        if(book.isbn===isbn){
            books.splice(index,1);
        }
     });
     localStorage.setItem('books',JSON.stringify(books));
    }
  }
document.addEventListener('DOMContentLoaded',UI.displayBooks)
// Event add a book and Remove abook..
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    //Prevent
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    //Validate
    if(title===''|| author===''||isbn===''){
       
         UI.showAlert('Please fill in all Fields','danger');
    }else{
        const booky = new Book(title,author,isbn);
    
        UI.addBookToList(booky);
        //Add book to Store
        Store.addBooks(booky);
        UI.showAlert('Book Added','success');
        UI.clearFields();


    }
    //Instatiate book
    //Show Success Message
   

})

document.querySelector('#book-list').addEventListener('click',(e)=>{
    
    UI.deleteBook(e.target);
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Book removed','success')
})
//Working with Storage Class....


