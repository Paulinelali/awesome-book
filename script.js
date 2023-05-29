const addBookBtn = document.querySelector('.add-book');
const bookName = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');

let bookList = []

function addBook() {

    const bookObj = {
        title: bookName.value,
        author: bookAuthor.value,
    }

    bookList.push(bookObj);
    
}

addBookBtn.addEventListener('click', addBook)



