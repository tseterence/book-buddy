let myLibrary = [
	{ title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 295, read: false },
	{ title: 'Harry Potter', author: 'J.K. Rowling', pages: 230, read: true },
];

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }

	// showInfo() {
	// 	return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read': 'not read yet'}`;
	// };
}

// function addBookToLibrary(book) {
//     // do stuff here
//     myLibrary.push(book)

//     const bookCard = document.createElement('div')
//     bookCard.setAttribute('class', 'book');

//     bookCard.innerHTML = `
//         <div class="details">
//             <img src="https://via.placeholder.com/102x140">
//             <div>
//                 <h1>${book.title}</h1>
//                 <h2>by ${book.author}</h2>
//                 <h3>${book.pages} pages</h3>
//             </div>
//         </div>
//         <div class="actions">
//             <button type="button" class="btn btn-success"><i class="bibi-bookmark-check"id="read-icon"></i><span id="read-text">&nbsp;Read</span></button>
//             <br>
//             <br>
//             <button type="button" class="delete btn btn-danger"><i class="bi bi-trash"></i>&nbspDelete<button>
//         </div>
//     `;

//     document.getElementById('book-list').appendChild(bookCard)
// }

function renderLibrary() {
    myLibrary.forEach(book => {
        createBookCard(book);
    })
}

function createBookCard(book, index) {
    const bookCard = document.createElement('div');


    // bookCard.setAttribute('data-id', index);
    bookCard.setAttribute('class', 'book');

    const bookCardDetails = document.createElement('div');
    bookCardDetails.setAttribute('class', 'details');

    const bookCardTitle = document.createElement('h1');
    bookCardTitle.textContent = book.title;
    const bookCardAuthor = document.createElement('h2');
    bookCardAuthor.textContent = 'by ' + book.author;
    const bookCardPages = document.createElement('h3');
    bookCardPages.textContent = book.pages + ' pages';

    bookCardDetails.appendChild(bookCardTitle);
    bookCardDetails.appendChild(bookCardAuthor);
    bookCardDetails.appendChild(bookCardPages);


    const bookCardActions = document.createElement('div');
    bookCardActions.setAttribute('class', 'actions');

    const bookCardReadBtn = document.createElement('button');
    bookCardReadBtn.textContent = 'Read';
    bookCardReadBtn.setAttribute('class', 'btn btn-success');

    const bookCardDeleteBtn = document.createElement('button');
    bookCardDeleteBtn.setAttribute('class', 'btn btn-danger');
    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'bi bi-trash');
    bookCardDeleteBtn.appendChild(deleteIcon)

    const bookCardDeleteText = document.createElement('span');
    bookCardDeleteText.textContent = ' Delete';
    bookCardDeleteBtn.appendChild(bookCardDeleteText)


    bookCardActions.appendChild(bookCardReadBtn);
    bookCardActions.appendChild(bookCardDeleteBtn);

    bookCard.appendChild(bookCardDetails);
    bookCard.appendChild(bookCardActions);

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
addBook.addEventListener('submit', (e) => {
    // get form data
    const title = document.getElementById('title-input').value
    const author = document.getElementById('author-input').value
    const pages = document.getElementById('pages-input').value
    const read = document.getElementById('read-input').checked

    if (title && author && pages && Number(pages) >= 0) {
        e.preventDefault();

        const book = new Book(title, author, pages, read)
        addBookToLibrary(book)

        clearForm();
        console.log(myLibrary);
    }
})

function clearForm() {
    document.getElementById('title-input').value = '';
    document.getElementById('author-input').value = '';
    document.getElementById('pages-input').value = '';
    document.getElementById('read-input').checked = false;
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