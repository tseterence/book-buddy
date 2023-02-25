class Book {
    constructor(title, author, isbn, pages, read, cover) {
        this.title = title
        this.author = author
        this.isbn = isbn
        this.pages = pages
        this.read = read
        this.cover = cover
    }
}

// class Library {
//     constructor() {
//         this.books = []
//     }
//     addBookToLibrary(book) {
//         // if (!this.books.some(b => b.title === book.title)) {
//         //     this.books.push(book)
//         // }
//         this.books.push(book);
//     }
//     removeBookFromLibrary(book) {
//         this.books = this.books.filter(b => b.title !== book.title)
//     }
// }

// class UI {
//     addBook() {

//     }
//     removeBook() {

//     }
//     updateBook() {

//     }
// }

// let myLibrary = new Library();
// let testbook = new Book('B1', 'Auth1', 100, true)
// myLibrary.addBookToLibrary(testbook)
// console.log(myLibrary)

// on page load
    // if local storage doesn't have item, initialize as empty array
    // else set library array as JSON.parse('local storage item')
// let myLibrary = [
// 	{ title: 'The Hobbit', author: 'J. R. R. Tolkien', pages: 304, read: false },
//     new Book(`Harry Potter and the Sorcerer's Stone`, 'J. K. Rowling', 336, true),
//     new Book(`Harry Potter and the Chamber of Secrets`, 'J. K. Rowling', 357, true),
// ];

function addBookToLibrary(book) {
    // check if book already exists in library. only proceed if not

    // update local storage
    const library = JSON.parse(localStorage.getItem('library'));    
    library.push(book)
    localStorage.setItem('library', JSON.stringify(library));

    // create book card and add to dom
    // createBookCard({title, author, pages, read}, myLibrary.length - 1);
}

function deleteBookFromLibrary(book) {
    // update local storage
    let library = JSON.parse(localStorage.getItem('library'));
    // library = library.filter(b => b.title !== book.title)
    for (let i = 0; i < library.length; i++) {
        if (library[i].title === book.title) {
            library.splice(i, 1)
            break
        }
    }
    localStorage.setItem('library', JSON.stringify(library));

    // delete book card from dom
}

function changeBookStatus(book) {
    // update local storage
    const library = JSON.parse(localStorage.getItem('library'));
    for (let i = 0; i < library.length; i++) {
        if (library[i].title === book.title) {
            library[i].read = !library[i].read
            break
        }
    }
    localStorage.setItem('library', JSON.stringify(library));
}

function renderLibrary() {
    myLibrary.forEach((book, index) => {
        createBookCard(book, index);
        // console.log(book.isbn)
        // console.log(`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`)
    })
}

function createBookCard(book, index) {
    const bookCard = document.createElement('div');

    // bookCard.setAttribute('data-id', index);
    bookCard.setAttribute('class', 'card shadow h-100 mb-2');
    bookCard.classList.add(book.read ? 'border-left-success' : 'border-left-warning');

    const bookCardBody = document.createElement('div');
    bookCardBody.setAttribute('class', 'card-body row no-gutters justify-content-center align-items-center');

    const bookCardDetails = document.createElement('div');
    bookCardDetails.setAttribute('class', 'row col');

    const bookCardImgDiv = document.createElement('div');
    bookCardImgDiv.setAttribute('class', 'col-md-auto text-center py-2')
    const bookCardImg = document.createElement('img');
    bookCardImg.src = book.cover;
    bookCardImgDiv.appendChild(bookCardImg)
    bookCardDetails.appendChild(bookCardImgDiv);

    const bookCardTextDiv = document.createElement('div');
    bookCardTextDiv.setAttribute('class', 'col py-2')

    const bookCardTitle = document.createElement('h3');
    bookCardTitle.textContent = book.title;
    const bookCardAuthor = document.createElement('h4');
    bookCardAuthor.textContent = 'by ' + book.author;
    const bookCardPages = document.createElement('h5');
    bookCardPages.textContent = book.pages + ' pages';

    bookCardTextDiv.appendChild(bookCardTitle);
    bookCardTextDiv.appendChild(bookCardAuthor);
    bookCardTextDiv.appendChild(bookCardPages);

    bookCardDetails.appendChild(bookCardTextDiv);

    

    const bookCardActions = document.createElement('div');
    bookCardActions.setAttribute('class', 'col-md-3 py-2 ml-md-2');

    const bookCardReadBtn = document.createElement('button');
    bookCardReadBtn.setAttribute('class', 'btn btn-icon-split w-100 mb-1')
    bookCardReadBtn.classList.add(book.read ? 'btn-success' : 'btn-warning');

    const readIconSpan = document.createElement('span');
    readIconSpan.setAttribute('class', 'icon text-white-50')
    const readIcon = document.createElement('i');
    readIcon.setAttribute('class', book.read ? 'bi bi-check-lg' : 'bi bi-bookmark-fill');

    const readIconSpanText = document.createElement('span');
    readIconSpanText.setAttribute('class', 'text');
    readIconSpanText.textContent = book.read ? 'Read' : 'Want to Read'
    
    readIconSpan.appendChild(readIcon)
    bookCardReadBtn.appendChild(readIconSpan)
    bookCardReadBtn.appendChild(readIconSpanText)

    bookCardReadBtn.addEventListener('click', (e) => {
        if (book.read) {
            book.read = false;
            bookCardReadBtn.classList.remove('btn-success');
            bookCardReadBtn.classList.add('btn-warning');
            readIcon.setAttribute('class', 'bi bi-bookmark-fill')
            readIconSpanText.textContent = 'Want to Read';
            bookCard.classList.remove('border-left-success');
            bookCard.classList.add('border-left-warning');
        } else {
            book.read = true;
            bookCardReadBtn.classList.remove('class', 'btn-warning');
            bookCardReadBtn.classList.add('class', 'btn-success');
            readIcon.setAttribute('class', 'bi bi-check-lg')
            readIconSpanText.textContent = 'Read';
            bookCard.classList.remove('border-left-warning');
            bookCard.classList.add('border-left-success');
        }
        // update local storage
        changeBookStatus(book);
        // const library = JSON.parse(localStorage.getItem('library'));
        // library[index].read = !library[index].read
        // localStorage.setItem('library', JSON.stringify(library));
    })

    const bookCardDeleteBtn = document.createElement('button');
    bookCardDeleteBtn.setAttribute('class', 'btn btn-danger btn-icon-split w-100');

    const deleteIconSpan = document.createElement('span');
    deleteIconSpan.setAttribute('class', 'icon text-white-50')
    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'bi bi-trash3-fill');
    deleteIconSpan.appendChild(deleteIcon)
    bookCardDeleteBtn.appendChild(deleteIconSpan)

    const bookCardDeleteText = document.createElement('span');
    bookCardDeleteText.setAttribute('class', 'text')
    bookCardDeleteText.textContent = ' Delete';
    bookCardDeleteBtn.appendChild(bookCardDeleteText)

    bookCardDeleteBtn.addEventListener('click', (e) => {
        // user confirm delete?

        // delete from DOM
        e.target.closest('.card').remove();

        // delete book from local storage
        deleteBookFromLibrary(book);
    })

    bookCardActions.appendChild(bookCardReadBtn);
    bookCardActions.appendChild(bookCardDeleteBtn);

    bookCardBody.appendChild(bookCardDetails);
    bookCardBody.appendChild(bookCardActions);
    bookCard.appendChild(bookCardBody)

    document.getElementById('book-list').appendChild(bookCard)
}

// render library on page load
let myLibrary;

if (localStorage.getItem('library') === null || JSON.parse(localStorage.getItem('library')).length === 0) {
    myLibrary = [
        new Book(`The Hobbit`, 'J. R. R. Tolkien', 304, false, 9780044403371),
        new Book(`Harry Potter and the Sorcerer's Stone`, 'J. K. Rowling', 336, true),
        new Book(`Harry Potter and the Chamber of Secrets`, 'J. K. Rowling', 357, true),
    ];
    // for testing purposes, local storage always contains filled array
    // set to empty array when done testing
} else {
    myLibrary = JSON.parse(localStorage.getItem('library'));
}
localStorage.setItem('library', JSON.stringify(myLibrary))
renderLibrary();

async function getBookDetails(isbn) {
    // const url = 'https://openlibrary.org/search.json?title=the+lord+of+the+rings&author=tolkein'
    // let isbn = 9780590353427
    // let isbn = 9780544003415
    // const url = `https://www.googleapis.com/books/v1/volumes?q=${isbn}`
    // const url = `https://www.googleapis.com/books/v1/volumes?q=the+lord+of+the+rings`
    // const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            console.log(data.description);
            return;
        }
        return data.items[0].volumeInfo
    } catch (error) {
        console.log(error)
    }
}

// function getBookDetails(isbn) {
//     // const url = 'https://openlibrary.org/search.json?title=the+lord+of+the+rings&author=tolkein'
//     // let isbn = 9780590353427
//     let isbn = 9780544003415
//     // const url = `https://www.googleapis.com/books/v1/volumes?q=${isbn}`
//     // const url = `https://www.googleapis.com/books/v1/volumes?q=the+lord+of+the+rings`
//     const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             return data.items
//         })
//         .catch(err => console.log(`error ${err}`));
// }


// Form Submit (add new book)
const addBook = document.getElementById('new-book-submit')
addBook.addEventListener('click', async(e) => {
    // get form data
    const isbn = document.getElementById('isbn-input').value
    const title = document.getElementById('title-input').value
    const author = document.getElementById('author-input').value
    const pages = document.getElementById('pages-input').value
    const read = document.getElementById('read-input').checked

    if (isbn || (title && author && pages && Number(pages) >= 0)) {
        e.preventDefault();

        const info = await getBookDetails(isbn);
        console.log(info)

        // create book object
        // const book = new Book(title, author, Number(pages), read)

        const book = new Book(info.title, info.authors[0], info.industryIdentifiers[0].identifier, info.pageCount, true, info.imageLinks.thumbnail)
        addBookToLibrary(book)
        createBookCard(book, myLibrary.length - 1);

        // add book to library array and local storage
        // addBookToLibrary(book.items[0])
        // clear form
        clearForm();
        // add book card to DOM
        // createBookCard({title, author, pages, read}, myLibrary.length - 1);

        // fetch book info/cover
        // const url = `https://www.googleapis.com/books/v1/volumes?q=${title.split(' ').join('+')}`
        // console.log(url)

        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data.items)
        //         // console.log(data.items[0].volumeInfo)
        //         // console.log(data.items[0].volumeInfo.title)
        //         // console.log(data.items[0].volumeInfo.authors[0])
        //         // console.log(data.items[0].volumeInfo.pageCount)
        //         console.log(data.items[0].volumeInfo.imageLinks.thumbnail)
        //         // console.log(data.items[1].volumeInfo.imageLinks.thumbnail)

        //         // console.log(data.industryIdentifiers)
        //     })
        //     .catch(err => console.log(`error ${err}`));
        
        // test console log
        // console.log(myLibrary);
    }
})

function clearForm() {
    document.getElementById('title-input').value = '';
    document.getElementById('author-input').value = '';
    document.getElementById('pages-input').value = '';
    document.getElementById('read-input').checked = false;

    document.getElementById('isbn-input').value = '';
}

// sort function (oldest first (date added) = default / newest first, title or author A-Z and Z-A, read or not read first)
function sortLibrary() {
}