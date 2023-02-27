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

function addBookToLibrary(book) {
    // check if book already exists in library, only proceed if no

    // create book card and add to dom
    createBookCard(book);

    // update local storage
    const library = JSON.parse(localStorage.getItem('library'));
    library.push(book)
    localStorage.setItem('library', JSON.stringify(library));    
}

function deleteBookFromLibrary(book) {
    // delete book card from dom
    deleteData.style.opacity = '0';
    deleteData.addEventListener('transitionend', () => {
        deleteData.remove()
    })

    // update local storage
    const library = JSON.parse(localStorage.getItem('library'));
    for (let i = 0; i < library.length; i++) {
        if (library[i].isbn13 === book.isbn13) {
            library.splice(i, 1)
            break
        }
    }
    localStorage.setItem('library', JSON.stringify(library));
}

function changeBookStatus(book) {
    // modify book card in dom
        // done thru event listener when creating book card

    // update local storage
    const library = JSON.parse(localStorage.getItem('library'));
    for (let i = 0; i < library.length; i++) {
        if (library[i].isbn13 === book.isbn13) {
            library[i].read = !library[i].read
            break
        }
    }
    localStorage.setItem('library', JSON.stringify(library));
}

function renderLibrary() {
    myLibrary.forEach((book, index) => {
        createBookCard(book, index);
    })
}

function createBookCard(book) {
    const bookCard = document.createElement('div');

    bookCard.setAttribute('class', 'card shadow h-100 mb-2');
    bookCard.classList.add(book.read ? 'border-left-success' : 'border-left-warning');

    const bookCardBody = document.createElement('div');
    bookCardBody.setAttribute('class', 'card-body row no-gutters justify-content-center align-items-center');

    const bookCardDetails = document.createElement('div');
    bookCardDetails.setAttribute('class', 'row col');

    const bookCardImgDiv = document.createElement('div');
    bookCardImgDiv.setAttribute('class', 'col-md-auto text-center py-2')
    const bookCardImg = document.createElement('img');
    bookCardImg.setAttribute('class', 'book-cover')
    bookCardImg.src = book.cover ? book.cover : 'default.jpg';
    bookCardImgDiv.appendChild(bookCardImg)
    bookCardDetails.appendChild(bookCardImgDiv);

    const bookCardTextDiv = document.createElement('div');
    bookCardTextDiv.setAttribute('class', 'col py-2')

    const bookCardTitle = document.createElement('h3');
    bookCardTitle.setAttribute('class', 'title')
    bookCardTitle.textContent = book.title;
    const bookCardAuthor = document.createElement('h4');
    bookCardAuthor.setAttribute('class', 'author')
    bookCardAuthor.textContent = 'by ' + book.author;
    const bookCardPages = document.createElement('h5');
    bookCardPages.setAttribute('class', 'page-count')
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

    bookCardReadBtn.addEventListener('click', () => {
        bookCardReadBtn.setAttribute('class', book.read ? 'btn btn-icon-split w-100 mb-1 btn-warning' : 'btn btn-icon-split w-100 mb-1 btn-success');
        readIcon.setAttribute('class', book.read ? 'bi bi-bookmark-fill' : 'bi bi-check-lg');
        readIconSpanText.textContent = book.read ? 'Want to Read' : 'Read';
        bookCard.setAttribute('class', book.read ? 'card shadow h-100 mb-2 border-left-warning' : 'card shadow h-100 mb-2 border-left-success');
        book.read = !book.read;

        changeBookStatus(book);
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
        // save book card to global variable
        deleteData = e.target.closest('.card')
        deleteBook = book

        // confirm delete modal
        document.getElementById('deleteModalTitle').textContent = `${book.title}`;
        deleteModal.show();
    })

    bookCardActions.appendChild(bookCardReadBtn);
    bookCardActions.appendChild(bookCardDeleteBtn);

    bookCardBody.appendChild(bookCardDetails);
    bookCardBody.appendChild(bookCardActions);
    bookCard.appendChild(bookCardBody)

    document.getElementById('book-list').append(bookCard)
}


// DELETE BOOK MODAL //
let deleteData
let deleteBook

const deleteModal = new bootstrap.Modal('#deleteModal')
document.getElementById('confirmDelete').addEventListener('click', () => {
    deleteBookFromLibrary(deleteBook);
})

// ADD BOOK MODAL //

// (https://github.com/twbs/bootstrap/issues/31266)
const addBookModal = new bootstrap.Modal('#addModal')
addBookModal._element.addEventListener('hidden.bs.modal', function (e) {
    clearForm();
    isbnErrorMessage.classList.add('hidden');
document.getElementById('isbn-input').classList.remove('border-danger');
});

// const addBookModal = document.getElementById("addModal");
// addBookModal.addEventListener('hidden.bs.modal', function() {
//     clearForm();
//     isbnErrorMessage.classList.add('hidden');
//     document.getElementById('isbn-input').classList.remove('border-danger');
// });

// add book by ISBN
document.getElementById('addISBN').addEventListener('click', () => {
    document.getElementById('manually').classList.add('hidden');
    document.getElementById('isbn').classList.remove('hidden');


    document.querySelectorAll('#manually input').forEach((el) => {
        el.required = false;
    });
    document.querySelectorAll('#isbn input').forEach((el) => {
        el.required = true;
    });
    
    document.getElementById('addModalTitle').textContent = 'by ISBN'
    // addBookModal.show();
})
// add book manually
document.getElementById('addManually').addEventListener('click', () => {
    document.getElementById('isbn').classList.add('hidden');
    document.getElementById('manually').classList.remove('hidden');

    document.querySelectorAll('#isbn input').forEach((el) => {
        el.required = false;
    });
    document.querySelectorAll('#manually input').forEach((el) => {
        el.required = true;
    });

    document.getElementById('addModalTitle').textContent = 'Manually'
    addBookModal.show();
})
const isbnErrorMessage = document.getElementById('isbn-error')

// FORM SUBMIT (ADD NEW BOOK) //
const submitBook = document.getElementById('newBookSubmit')
submitBook.addEventListener('click', async(e) => {
    // get form data
    const isbn = document.getElementById('isbn-input').value
    const title = document.getElementById('title-input').value
    const author = document.getElementById('author-input').value
    const pages = document.getElementById('pages-input').value
    const read = document.getElementById('read-input').checked

    if (isbn) {
        e.preventDefault();
        const info = await getBookDetails(isbn);
        if (!info) {
            // display error below ISBN input field
            document.getElementById('isbn-input').classList.add('border-danger')
            isbnErrorMessage.classList.remove('hidden');

            console.log(`Error - We don't recognize this ISBN. Try entering the ISBN again, or add the book manually. According to our records, a book with the same title already exists in your library!`)
        } else {
            console.log(info)
            const book = new Book(info.title, info.authors[0], info.industryIdentifiers[0].identifier, info.pageCount, read, info.imageLinks.thumbnail);
            addBookToLibrary(book);

            // clear form
            clearForm();

            // close modal
            addBookModal.hide();
        }        
    } else if (title && author && Number(pages) >= 0) {
        e.preventDefault();
        const book = new Book(title, author, '', pages, read, '');
        addBookToLibrary(book);

        // clear form
        clearForm();

        // close modal
        addBookModal.hide();
    }
})
// Google Books API call
async function getBookDetails(isbn) {
    // let isbn = 9780439708180 (hp)
    // let isbn = 9780544003415 (lotr)

    const parsedisbn = isbn.replace(/[^0-9]/g, '');
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${parsedisbn}`;
    // BUG: not sure if i should add isbn to query param and whether to parse isbn, combo of the 2
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.totalItems === 0) return false
        return data.items[0].volumeInfo;

        // what if we checked if checked all return values here (default.jpg if no image, N.A. if no author, etc using || statements) and returned an object in Class order so receiving it within submit function was easier?
    } catch (error) {
        console.log(error);
    }
}

// CLEAR FORM FUNCTION //
function clearForm() {
    document.getElementById('isbn-input').value = '';
    document.getElementById('title-input').value = '';
    document.getElementById('author-input').value = '';
    document.getElementById('pages-input').value = '';
    document.getElementById('read-input').checked = false;
}

// on page load: get library from local storage and render library
let myLibrary;

if (localStorage.getItem('library') === null || JSON.parse(localStorage.getItem('library')).length === 0) {
    myLibrary = [];
} else {
    myLibrary = JSON.parse(localStorage.getItem('library'));
}
localStorage.setItem('library', JSON.stringify(myLibrary));
renderLibrary();

// Flow
    // 1a. look up ISBN
    // 1b. manually input book data, jump to 3.
    // 2a. bring to form, with fields completed as a result of google books api
    // 3. allow users to edit text fields
    // 4. save, update local storage, add to dom


// SORT BOOKS FEATURE //
const select = document.getElementById('select-sort')
select.addEventListener('change', sortLibrary)
function sortLibrary() {
    const selectedVal = select.value;
    console.log(selectedVal)
    let copy = [...JSON.parse(localStorage.getItem('library'))]
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
    // renderLibrary();
}

// IDEAS:
// when adding a new book
    // unshift book obj to local storage array
    // rerender library
    // reset sort order to default (newest to oldest)
// should toggling read/want to read button rerender DOM if sort selection is by book "read" status?
// add/delete card animations
// check referenced bootstrap template CSS file, only take what you need
// do not add book if already in library
// edit button within each card that brings up form (filled with data) for editing/saving
// summary of total books, books read, books unread
// rating property (out of 5 stars)
// instead of default image for manual input, what if gray rectangle, with title (...) & author?


// SCROLL TO TOP FEATURE //
const mybutton = document.getElementById("btn-back-to-top");

// show button when user scrolls down 80px from top
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        mybutton.style.display = 'block';
    } else {
        mybutton.style.cssText = 'display: none !important';
  }
}

// scroll to top
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}