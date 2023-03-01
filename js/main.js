class Book {
    constructor(title, author, isbn13, pages, read, cover) {
        this.title = title;
        this.author = author;
        this.isbn13 = isbn13;
        this.pages = pages;
        this.read = read;
        this.cover = cover;
    }
}

function addBookToLibrary(book) {
    if (alreadyInLibrary(book)) {
        document.getElementById('isbn-input').classList.add('border-danger');
        document.getElementById('duplicate-isbn-title').textContent = book.title;
        duplicateIsbnErrorMessage.classList.remove('hidden');

        document.getElementById('title-input').classList.add('border-danger');
        document.getElementById('duplicate-manual-title').textContent = book.title;
        duplicateManualErrorMessage.classList.remove('hidden');

        return
    }
    
    // update log summary & chart
    book.read ? (totalRead++) : (totalUnread++);
    totalBooks++;
    updateLog(totalRead, totalUnread);

    // create book card and add to dom
    createBookCard(book);

    // update local storage
    const library = JSON.parse(localStorage.getItem('library'));
    library.push(book);
    localStorage.setItem('library', JSON.stringify(library));

    // clear form
    clearForm();
    // close modal
    addBookModal.hide();
}

function alreadyInLibrary(book) {
    // dont like how im calling localstorage twice: here and in addBookToLibrary
    const library = JSON.parse(localStorage.getItem('library'));
    return library.some((obj) => obj.title === book.title)
}

function deleteBookFromLibrary(book) {
    // update log summary & chart
    book.read ? (totalRead--) : (totalUnread--);
    totalBooks--;
    updateLog(totalRead, totalUnread);

    // delete book card from dom
    deleteData.classList.remove('show');
    setTimeout(() => {
        deleteData.remove();
    }, 400);
    
    // update local storage
    const library = JSON.parse(localStorage.getItem('library'));
    for (let i = 0; i < library.length; i++) {
        if (library[i].isbn13 === book.isbn13) {
            library.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('library', JSON.stringify(library));
}

function changeBookStatus(book) {
    // update log summary & chart
    if (book.read) {
        totalRead++;
        totalUnread--;
    } else {
        totalUnread++;
        totalRead--;
    }
    updateLog(totalRead, totalUnread);

    // modify book card in dom done thru event listener

    // update local storage
    const library = JSON.parse(localStorage.getItem('library'));
    for (let i = 0; i < library.length; i++) {
        if (library[i].title === book.title) {
            library[i].read = !library[i].read;
            break;
        }
    }
    localStorage.setItem('library', JSON.stringify(library));
}

function renderLibrary(arr) {
    arr.forEach((book) => {
        createBookCard(book);
    })
}

function createBookCard(book) {
    // should i replace majority of this code with innerHTML?
    const bookCard = document.createElement('div');

    bookCard.setAttribute('class', 'card shadow h-100 mb-2');
    bookCard.classList.add(book.read ? 'border-left-success' : 'border-left-warning');

    const bookCardBody = document.createElement('div');
    bookCardBody.setAttribute('class', 'card-body row no-gutters justify-content-center align-items-center');

    const bookCardDetails = document.createElement('div');
    bookCardDetails.setAttribute('class', 'row col');

    const bookCardImgDiv = document.createElement('div');
    bookCardImgDiv.setAttribute('class', 'col-md-auto text-center py-2');
    const bookCardImg = document.createElement('img');
    bookCardImg.setAttribute('class', 'book-cover');
    bookCardImg.src = book.cover ? book.cover : '../img/default.jpg';
    bookCardImgDiv.appendChild(bookCardImg);
    bookCardDetails.appendChild(bookCardImgDiv);

    const bookCardTextDiv = document.createElement('div');
    bookCardTextDiv.setAttribute('class', 'col my-auto py-2')

    const bookCardTitle = document.createElement('h5');
    bookCardTitle.setAttribute('class', 'title text-dark fw-bold');
    bookCardTitle.textContent = book.title;
    const bookCardAuthor = document.createElement('h5');
    bookCardAuthor.setAttribute('class', 'author text-dark');
    bookCardAuthor.textContent = 'by ' + book.author;
    const bookCardPages = document.createElement('span');
    bookCardPages.setAttribute('class', 'page-count');
    bookCardPages.textContent = book.pages + ' pages';

    bookCardTextDiv.appendChild(bookCardTitle);
    bookCardTextDiv.appendChild(bookCardAuthor);
    bookCardTextDiv.appendChild(bookCardPages);

    bookCardDetails.appendChild(bookCardTextDiv);
    

    const bookCardActions = document.createElement('div');
    bookCardActions.setAttribute('class', 'col-md-3 py-2 ps-md-0 ml-md-2');

    const bookCardReadBtn = document.createElement('button');
    bookCardReadBtn.setAttribute('class', 'btn btn-icon-split w-100 mb-2');
    bookCardReadBtn.classList.add(book.read ? 'btn-success' : 'btn-warning');

    const readIconSpan = document.createElement('span');
    readIconSpan.setAttribute('class', 'icon text-white-50');
    const readIcon = document.createElement('i');
    readIcon.setAttribute('class', book.read ? 'bi bi-check-lg' : 'bi bi-bookmark-fill');

    const readIconSpanText = document.createElement('span');
    readIconSpanText.setAttribute('class', 'text');
    readIconSpanText.textContent = book.read ? 'Read' : 'Want to Read';
    
    readIconSpan.appendChild(readIcon);
    bookCardReadBtn.appendChild(readIconSpan);
    bookCardReadBtn.appendChild(readIconSpanText);

    bookCardReadBtn.addEventListener('click', () => {
        bookCardReadBtn.setAttribute('class', book.read ? 'btn btn-icon-split w-100 mb-1 btn-warning' : 'btn btn-icon-split w-100 mb-1 btn-success');
        readIcon.setAttribute('class', book.read ? 'bi bi-bookmark-fill' : 'bi bi-check-lg');
        readIconSpanText.textContent = book.read ? 'Want to Read' : 'Read';
        bookCard.setAttribute('class', book.read ? 'card shadow h-100 mb-2 book-card show border-left-warning' : 'card shadow h-100 mb-2 book-card show border-left-success');
        book.read = !book.read;

        changeBookStatus(book);
    })

    const bookCardDeleteBtn = document.createElement('button');
    bookCardDeleteBtn.setAttribute('class', 'btn btn-danger btn-icon-split w-100');

    const deleteIconSpan = document.createElement('span');
    deleteIconSpan.setAttribute('class', 'icon text-white-50');
    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'bi bi-trash3-fill');
    deleteIconSpan.appendChild(deleteIcon);
    bookCardDeleteBtn.appendChild(deleteIconSpan);

    const bookCardDeleteText = document.createElement('span');
    bookCardDeleteText.setAttribute('class', 'text');
    bookCardDeleteText.textContent = ' Delete';
    bookCardDeleteBtn.appendChild(bookCardDeleteText);

    bookCardDeleteBtn.addEventListener('click', (e) => {
        // save book card to global variable
        deleteData = e.target.closest('.card');
        deleteBook = book;

        // confirm delete modal
        document.getElementById('deleteModalTitle').textContent = `${book.title}`;
        deleteModal.show();
    })

    bookCardActions.appendChild(bookCardReadBtn);
    bookCardActions.appendChild(bookCardDeleteBtn);

    bookCardBody.appendChild(bookCardDetails);
    bookCardBody.appendChild(bookCardActions);
    bookCard.appendChild(bookCardBody);

    document.getElementById('book-list').prepend(bookCard);
    setTimeout(() => {
        bookCard.classList.add('book-card', 'show');
    }, 400);
}


// DELETE BOOK MODAL //
let deleteData;
let deleteBook;

const deleteModal = new bootstrap.Modal('#deleteModal');
document.getElementById('confirmDelete').addEventListener('click', () => {
    deleteBookFromLibrary(deleteBook);
})

// ADD BOOK MODAL //
const addBookModal = new bootstrap.Modal('#addModal');
addBookModal._element.addEventListener('hidden.bs.modal', () => {
    clearForm();
    isbnErrorMessage.classList.add('hidden');
    document.getElementById('isbn-input').classList.remove('border-danger');
    duplicateIsbnErrorMessage.classList.add('hidden');
    document.getElementById('title-input').classList.remove('border-danger');
    duplicateManualErrorMessage.classList.add('hidden');

});
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
    
    document.getElementById('addModalTitle').textContent = 'by ISBN';
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

    document.getElementById('addModalTitle').textContent = 'Manually';
})
const isbnErrorMessage = document.getElementById('isbn-error');
const duplicateIsbnErrorMessage = document.getElementById('duplicate-isbn-error');
const duplicateManualErrorMessage = document.getElementById('duplicate-manual-error');

// FORM SUBMIT //
const submitBook = document.getElementById('newBookSubmit');
submitBook.addEventListener('click', async(e) => {
    // get form data
    const isbn = document.getElementById('isbn-input').value;
    const title = document.getElementById('title-input').value;
    const author = document.getElementById('author-input').value;
    const pages = document.getElementById('pages-input').value;
    const read = document.getElementById('read-input').checked;

    document.getElementById('isbn-input').classList.remove('border-danger');
    isbnErrorMessage.classList.add('hidden');
    duplicateIsbnErrorMessage.classList.add('hidden');
    document.getElementById('title-input').classList.remove('border-danger');
    duplicateManualErrorMessage.classList.add('hidden');

    if (isbn) {
        e.preventDefault();
        const info = await getBookDetails(isbn);
        if (!info) {
            // isbn not recognized
            document.getElementById('isbn-input').classList.add('border-danger');
            isbnErrorMessage.classList.remove('hidden');
        } else {
            const book = new Book(info.btitle, info.bauthor, info.bisbn13, info.bpageCount, read, info.bcover);
            addBookToLibrary(book);
        }        
    } else if (title && author && Number(pages) >= 0) {
        e.preventDefault();
        const book = new Book(title, author, '', pages, read, '');
        addBookToLibrary(book);
    }
})
// call google books api
async function getBookDetails(isbn) {
    const parsedisbn = isbn.replace(/[^0-9]/g, '');
    if (parsedisbn === '') return

    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${parsedisbn}`;
    // BUG: not sure if i should add isbn to query param and whether to parse isbn, combo of the 2
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.totalItems === 0) return false;

        const bookInfo = data.items[0].volumeInfo;
        const titleInfo = bookInfo.title;
        const authorInfo = bookInfo.authors[0] || 'N.A.';
        const pagesInfo = bookInfo.pageCount || 'N.A.';
        const coverInfo = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'default.jpg';
        const isbnInfo = bookInfo.industryIdentifiers.find(obj => obj.type === 'ISBN_13').identifier || '';
        return {
            'btitle': titleInfo, 
            'bauthor': authorInfo, 
            'bisbn13': isbnInfo, 
            'bpageCount': pagesInfo,
            'bcover': coverInfo,
        }
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


// SORT BOOKS FEATURE //
const select = document.getElementById('select-sort');
select.addEventListener('change', sortLibrary);
function sortLibrary() {
    const selectedVal = select.value;
    let copy = [...JSON.parse(localStorage.getItem('library'))]
    if (selectedVal === 'newest') {
        copy = copy;
    } else if (selectedVal === 'oldest') {
        copy = copy.reverse();
    } else if (selectedVal === 'want') {
        copy = copy.sort((a, b) => a.read === b.read ? 0 : a.read ? -1 : 1)
    } else if (selectedVal === 'already') {
        copy = copy.sort((a, b) => a.read === b.read ? 0 : a.read ? 1 : -1)
    } else if (selectedVal === 'titleA') {
        copy = copy.sort((a, b) => b.title.localeCompare(a.title))
    } else if (selectedVal === 'titleZ') {
        copy = copy.sort((a, b) => a.title.localeCompare(b.title))
    }
    document.getElementById('book-list').textContent = '';
    renderLibrary(copy);
}


// SCROLL TO TOP FEATURE //
const mybutton = document.getElementById("btn-back-to-top");
window.onscroll = () => {
  scrollFunction();
};
function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        mybutton.style.display = 'block';
    } else {
        mybutton.style.cssText = 'display: none !important';
  }
}
mybutton.addEventListener("click", backToTop);
function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// DOUGHNUT CHART //
let ctx = document.getElementById("myPieChart");
let myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Read Books", "Unread Books"],
        datasets: [{
            data: [75, 25],
            backgroundColor: ['#1cc88a', '#f6c23e'],
            hoverBackgroundColor: ['#17a673', '#f4b619'],
        }],
    },
    options: {
        cutout: 70,
        aspectRatio: 1,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                reverse: true,
                labels: {
                    font: {
                        family: "Nunito, Arial, Helvetica, sans-serif",
                        color: '#858796',
                    },
                    usePointStyle: true,
                }
            },
            tooltip: {
                bodyAlign: 'center',
                displayColors: false,
                padding: 10,
            },
        },
    },
});

const readCount = document.getElementById('readCount');
const unreadCount = document.getElementById('unreadCount');
const totalCount = document.getElementById('totalCount');

function updateLog(read, unread) {
    myPieChart.data.datasets[0].data = [read, unread];
    myPieChart.update();
    // update html spans within log summary
    readCount.textContent = totalRead;
    unreadCount.textContent = totalUnread;
    totalCount.textContent = totalBooks;
}

// on page load: get library from local storage and render library, update log
let myLibrary;
let totalBooks = 0;
let totalRead = 0;
let totalUnread = 0;

if (localStorage.getItem('library') === null || JSON.parse(localStorage.getItem('library')).length === 0) {
    // default local storage if empty or null
    myLibrary = [
        new Book('Catch-22', 'Joseph Heller', '9781606869673', 523, true, 'http://books.google.com/books/content?id=3gSTtgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
        new Book('Shoe Dog', 'Phil Knight', '9781501135910', 384, true, 'http://books.google.com/books/content?id=UmyfjgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
        new Book('Becoming', 'Michelle Obama', '9781524763138', 463, false, 'http://books.google.com/books/content?id=hi17DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
        new Book('Atomic Habits', 'James Clear', '9780735211292', 322, true, 'http://books.google.com/books/content?id=XfFvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
        new Book('The Lord of the Rings', 'J. R. R. Tolkien', '9780544003415', 1178, false, 'http://books.google.com/books/content?id=AVVoPwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
    ];
    // readCount, undreadCount, totalCount = 0
} else {
    myLibrary = JSON.parse(localStorage.getItem('library'));
}
totalBooks = myLibrary.length;
totalRead = myLibrary.filter(obj => obj.read === true).length;
totalUnread = totalBooks - totalRead;
localStorage.setItem('library', JSON.stringify(myLibrary));
renderLibrary(myLibrary);
updateLog(totalRead, totalUnread);


// let isbn = 9780544003415 (lotr)

// IDEAS:
// should title check be case-insensitive?
// function to get read books, unread books, total books from local storage instead of global variable
// ellipses for really long titles on book card
// edit button within each card that brings up form (filled with data) for editing/saving
// rate book property (out of 5 stars)
// instead of default image for manual input, what if gray rectangle, with title (...) & author?
// encapsulate UI, and Library like i am doing with Books? (OOP)