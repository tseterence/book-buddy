let myLibrary = [
	{ title: 'The Hobbit', author: 'J. R. R. Tolkien', pages: 304, read: false },
	{ title: `Harry Potter and the Sorcerer's Stone`, author: 'J.K. Rowling', pages: 336, read: true },
];

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

function addBookToLibrary(book) {
    // do stuff here
    myLibrary.push(book)
}

function renderLibrary() {
    myLibrary.forEach((book, index) => {
        createBookCard(book, index);
    })
}

function createBookCard(book, index) {
    const bookCard = document.createElement('div');

    bookCard.setAttribute('data-id', index);
    bookCard.setAttribute('class', 'card shadow h-100 mb-2');
    bookCard.classList.add(book.read ? 'border-left-success' : 'border-left-warning');

    const bookCardBody = document.createElement('div');
    bookCardBody.setAttribute('class', 'card-body row no-gutters align-items-center');

    const bookCardDetails = document.createElement('div');
    bookCardDetails.setAttribute('class', 'col-sm-12 col-md-9 mr-2');

    const bookCardTitle = document.createElement('h2');
    bookCardTitle.textContent = book.title;
    const bookCardAuthor = document.createElement('h3');
    bookCardAuthor.textContent = 'by ' + book.author;
    const bookCardPages = document.createElement('h3');
    bookCardPages.textContent = book.pages + ' pages';

    bookCardDetails.appendChild(bookCardTitle);
    bookCardDetails.appendChild(bookCardAuthor);
    bookCardDetails.appendChild(bookCardPages);
    

    const bookCardActions = document.createElement('div');
    bookCardActions.setAttribute('class', 'col');

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
        console.log(myLibrary)
        // console.log(e.target.parentNode.parentNode)
        // if read
            // change to not read
                // update object within library array
                // button text -> 'not read' & icon
                // button color -> grey
                // parent parent -> class 'not read'
        // else (not read)
            // change to read
                // update object within library array
                // button text -> 'read' & icon
                // button color -> green
                // parent parent -> class 'read'
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


    bookCardActions.appendChild(bookCardReadBtn);
    bookCardActions.appendChild(bookCardDeleteBtn);

    bookCardBody.appendChild(bookCardDetails);
    bookCardBody.appendChild(bookCardActions);
    bookCard.appendChild(bookCardBody)

    document.getElementById('book-list').appendChild(bookCard)
}



// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false)
// addBookToLibrary(theHobbit)

// const harryPotter = new Book('Harry Potter', 'J.K. Rowling', 230, true)
// addBookToLibrary(harryPotter)

// console.log(myLibrary);
renderLibrary();


// function getFetch() {
//     const url = 'https://api2.isbndb.com/book/9781934759486'

//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
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

        const book = new Book(title, author, Number(pages), read)
        addBookToLibrary(book)

        clearForm();

        createBookCard({title, author, pages, read}, myLibrary.length - 1);
        console.log(myLibrary);
    }
})

function clearForm() {
    document.getElementById('title-input').value = '';
    document.getElementById('author-input').value = '';
    document.getElementById('pages-input').value = '';
    document.getElementById('read-input').checked = false;
}

// sort function (title & author A-Z and Z-A, page count up and down, read or not read first, date added = default)
function sortLibrary() {
}


// Change 'Read Status' button onclick
const readBtn = document.getElementById('read')
const readIcon = document.getElementById('read-icon')
const readText = document.getElementById('read-text')

readBtn.addEventListener('click', switchReadStatus)
function switchReadStatus() {
    if (readBtn.classList.contains('btn-success')) {
        readBtn.classList.remove('btn-success')
        readBtn.classList.add('btn-secondary')

        readIcon.classList.remove('bi-bookmark-check')
        readIcon.classList.add('bi-bookmark-x')
        readText.textContent = ' Not Read'
    } else {
        readBtn.classList.remove('btn-secondary')
        readBtn.classList.add('btn-success')

        readIcon.classList.remove('bi-bookmark-x')
        readIcon.classList.add('bi-bookmark-check')
        readText.textContent = ' Read'
    }
}