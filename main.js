class Book {
    constructor(isbn, title, author, pages, read) {
        this.isbn = isbn
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

// on page load
    // if local storage doesn't have item, initialize as empty array
    // else set library array as JSON.parse('local storage item')
// let myLibrary = [
// 	{ title: 'The Hobbit', author: 'J. R. R. Tolkien', pages: 304, read: false },
//     new Book(`Harry Potter and the Sorcerer's Stone`, 'J. K. Rowling', 336, true),
//     new Book(`Harry Potter and the Chamber of Secrets`, 'J. K. Rowling', 357, true),
// ];

function addBookToLibrary(book) {
    // do stuff here
    myLibrary.push(book)
}

function deleteBookFromLibrary(book) {
    // update local storage
    // delete book card from dom
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
    bookCardImg.src = 'https://via.placeholder.com/175x240';
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
    bookCardActions.setAttribute('class', 'col-md-3 py-2');

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
        // update localstorage
        const myLibrary = JSON.parse(localStorage.getItem('library'));
        myLibrary[index].read = !myLibrary[index].read
        localStorage.setItem('library', JSON.stringify(myLibrary))

        // console.log(myLibrary)
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
        // confirm delete?

        // delete from DOM
        // e.target.closest('.card').remove();

        // delete from library array
        console.log(e.target.parentElement.parentElement)
        // myLibrary.splice(index, 1);

        // update local storage
        // localStorage.setItem('library', JSON.stringify(myLibrary))

        // test console log
        // console.log(e.target.parentElement.parentElement.parentElement.parentElement)
        // console.log(e.target.closest('.card'))
        // console.log(myLibrary)
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
} else {
    myLibrary = JSON.parse(localStorage.getItem('library'));
}
localStorage.setItem('library', JSON.stringify(myLibrary))
renderLibrary();


// function getFetch() {
//     // const url = 'https://openlibrary.org/search.json?title=the+lord+of+the+rings&author=tolkein'
//     // let isbn = 9780590353427
//     let isbn = 9780544003415
//     const url = `https://www.googleapis.com/books/v1/volumes?q=${isbn}`
//     // const url = `https://www.googleapis.com/books/v1/volumes?q=the+lord+of+the+rings`


//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data.items.length)
//             console.log(data.items[0].volumeInfo)
//             console.log(data.items[0].volumeInfo.title)
//             console.log(data.items[0].volumeInfo.authors[0])
//             console.log(data.items[0].volumeInfo.pageCount)
//             console.log(data.items[0].volumeInfo.imageLinks.thumbnail)
//             // console.log(data.items[1].volumeInfo.imageLinks.thumbnail)

//             // console.log(data.industryIdentifiers)
//         })
//         .catch(err => console.log(`error ${err}`));
// }

// getFetch();

// Form Submit (add new book)
const addBook = document.getElementById('new-book-submit')
addBook.addEventListener('click', (e) => {
    // get form data
    const title = document.getElementById('title-input').value
    const author = document.getElementById('author-input').value
    const pages = document.getElementById('pages-input').value
    const read = document.getElementById('read-input').checked

    if (title && author && pages && Number(pages) >= 0) {
        e.preventDefault();

        // create book object
        const book = new Book(title, author, Number(pages), read)
        // add book to library array
        addBookToLibrary(book)
        // add book to localstorage
        localStorage.setItem('library', JSON.stringify(myLibrary))
        // clear form
        clearForm();
        // add book card to DOM
        createBookCard({title, author, pages, read}, myLibrary.length - 1);
        
        // test console log
        // console.log(myLibrary);
    }
})

function clearForm() {
    document.getElementById('title-input').value = '';
    document.getElementById('author-input').value = '';
    document.getElementById('pages-input').value = '';
    document.getElementById('read-input').checked = false;
}

// sort function (title or author A-Z and Z-A, read or not read first, oldest to newest (date added) = default / newest to oldest)
function sortLibrary() {
}