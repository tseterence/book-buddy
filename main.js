class Book {
    constructor(title, author, isbn13, pages, read, cover) {
        this.title = title
        this.author = author
        this.isbn13 = isbn13
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
    const library = JSON.parse(localStorage.getItem('library'));
    for (let i = 0; i < library.length; i++) {
        if (library[i].isbn13 === book.isbn13) {
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
        if (library[i].isbn13 === book.isbn13) {
            library[i].read = !library[i].read
            break
        }
    }
    localStorage.setItem('library', JSON.stringify(library));

    // modify book card in dom
}

function renderLibrary() {
    myLibrary.forEach((book, index) => {
        createBookCard(book, index);
    })
}

function createBookCard(book, index) {
    const bookCard = document.createElement('div');

    // delete animation
    // bookCard.setAttribute('data-delete', 'zoom');

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
        changeBookStatus(book);
    })

    const bookCardDeleteBtn = document.createElement('button');
    bookCardDeleteBtn.setAttribute('class', 'btn btn-danger btn-icon-split w-100');

    bookCardDeleteBtn.setAttribute('data-bs-toggle', 'modal')
    bookCardDeleteBtn.setAttribute('data-bs-target', '#deleteModal')

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
        document.getElementById('deleteModalTitle').textContent = `${book.title}`

        document.getElementById('confirmDeleteButtonModal').addEventListener('click', () => {
            e.target.closest('.card').classList.add('fade-out');
            
            // delete from DOM
            setTimeout(() => {
                e.target.closest('.card').remove();
            }, 450);

            // delete book from local storage
            deleteBookFromLibrary(book);
        })

        // // fade out effect upon delete
        // e.target.closest('.card').classList.add('fade-out');

        // // delete from DOM
        // setTimeout(() => {
        //     e.target.closest('.card').remove();
        // }, 450);

        // // delete book from local storage
        // deleteBookFromLibrary(book);
    })

    bookCardActions.appendChild(bookCardReadBtn);
    bookCardActions.appendChild(bookCardDeleteBtn);

    bookCardBody.appendChild(bookCardDetails);
    bookCardBody.appendChild(bookCardActions);
    bookCard.appendChild(bookCardBody)

    // setTimeout(() => {
    //     bookCard.classList.add('fade-out');
    // }, 10)

    document.getElementById('book-list').append(bookCard)
}

// render library on page load
let myLibrary;

if (localStorage.getItem('library') === null || JSON.parse(localStorage.getItem('library')).length === 0) {
    myLibrary = [
        // new Book(`The Hobbit`, 'J. R. R. Tolkien', 304, false, 9780044403371),
        // new Book(`Harry Potter and the Sorcerer's Stone`, 'J. K. Rowling', 336, true),
        // new Book(`Harry Potter and the Chamber of Secrets`, 'J. K. Rowling', 357, true),
    ];
    // for testing purposes, local storage always contains filled array
    // set to empty array when done testing
} else {
    myLibrary = JSON.parse(localStorage.getItem('library'));
}
localStorage.setItem('library', JSON.stringify(myLibrary))
renderLibrary(myLibrary);

async function getBookDetails(isbn) {
    // const url = 'https://openlibrary.org/search.json?title=the+lord+of+the+rings&author=tolkein'
    // let isbn = 9780590353427
    // let isbn = 9780544003415
    // const url = `https://www.googleapis.com/books/v1/volumes?q=${isbn}`
    // const url = `https://www.googleapis.com/books/v1/volumes?q=the+lord+of+the+rings`
    // const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

    const url = `https://www.googleapis.com/books/v1/volumes?q=${isbn}`;
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

// Flow
    // 1a. look up ISBN
    // 1b. manually input book data, jump to 3.
    // 2a. bring to form, with fields completed as a result of google books api
    // 3. allow users to edit text fields
    // 4. save, update local storage, add to dom


// Form Submit (add new book)
const addBook = document.getElementById('new-book-submit')
addBook.addEventListener('click', async(e) => {
    // get form data
    const isbn = document.getElementById('isbn-input').value
    // const title = document.getElementById('title-input').value
    // const author = document.getElementById('author-input').value
    // const pages = document.getElementById('pages-input').value
    // const read = document.getElementById('read-input').checked

    if (isbn) {
        e.preventDefault();

        const info = await getBookDetails(isbn);
        // console.log(info)

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
    }
})

function clearForm() {
    // document.getElementById('title-input').value = '';
    // document.getElementById('author-input').value = '';
    // document.getElementById('pages-input').value = '';
    // document.getElementById('read-input').checked = false;

    document.getElementById('isbn-input').value = '';
}

// sort function (newest first (default) and oldest first, title or author A-Z and Z-A, read or not read first)
const select = document.getElementById('select-sort')
select.addEventListener('change', sortLibrary)
function sortLibrary() {
    const selectedVal = select.value;
    console.log(selectedVal)
    let copy = [...JSON.parse(localStorage.getItem('library'))]
    console.log(copy)
    if (selectedVal === 'newest') {
        console.table(copy)
    } else if (selectedVal === 'oldest') {
        copy = copy.reverse()
        console.table(copy)
    } else if (selectedVal === 'want') {
        copy = copy.sort((a, b) => a.read === b.read ? 0 : a.read ? 1 : -1)
        console.table(copy)
    } else if (selectedVal === 'already') {
        copy = copy.sort((a, b) => a.read === b.read ? 0 : a.read ? -1 : 1)
        console.table(copy)
    } else if (selectedVal === 'titleA') {
        copy = copy.sort((a, b) => a.title.localeCompare(b.title))
        console.table(copy)
    } else if (selectedVal === 'titleZ') {
        copy = copy.sort((a, b) => b.title.localeCompare(a.title))
        console.table(copy)
    }
}
// adding new book should also retoggle sort order to default?
// should toggling read/want to read button rerender DOM if sort selection is by book "read" status?

// do not add book if already in library