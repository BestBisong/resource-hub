        document.addEventListener("DOMContentLoaded", function () {
        // Handle Search Button Click
        if (searchForm) {
            searchForm.addEventListener("submit", function (event) {
                if (!isLoggedIn) {
                    event.preventDefault();
                    alert("Please sign up or log in to search for books.");
                    localStorage.setItem("lastPage", window.location.href);
                    window.location.href = userExists ? "login.html" : "login.html";
                }
            });
        }

        // Handle "View More" Click
        viewMoreButtons.forEach((button) => {
            button.addEventListener("click", function (event) {
                if (!isLoggedIn) {
                    event.preventDefault();
                    alert("Please sign up or log in to view more details.");
                    localStorage.setItem("lastPage", window.location.href);
                    window.location.href = userExists ? "login.html" : "login.html";
                }
            });
        });
        });

        document.addEventListener("DOMContentLoaded", function () {
            // Get DOM elements
            const searchForm = document.getElementById('search-form');
            const searchInput = document.getElementById('search-input');
            const genreSelect = document.getElementById('genre-select');
            const resourcesGrid = document.querySelector('.resources-grid');
        
            // Function to fetch books from OpenLibrary API
            function fetchBooksFromOpenLibrary(query, genre) {
                let apiUrl = `https://openlibrary.org/search.json?q=${query}`;
        
                if (genre && genre !== 'All') {
                    apiUrl += `&subject=${genre}`;
                }
        
                return fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => data.docs || []);
            }
        
            // Function to fetch books from Google Books API
            function fetchBooksFromGoogleBooks(query, genre) {
                let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
        
                if (genre && genre !== 'All') {
                    apiUrl += `+subject:${genre}`;
                }
        
                return fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => data.items || []);
            }
        
            // Function to fetch journals from CrossRef API (for research articles)
            function fetchJournalsFromCrossRef(query) {
                let apiUrl = `https://api.crossref.org/works?query=${query}`;
        
                return fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => data.message.items || []);
            }
        
            // Function to fetch articles from NewsAPI (for general articles)
            function fetchArticlesFromNewsAPI(query) {
                const apiKey = "ada37a4432b54bde91b78517c2848b21"; // Corrected API Key declaration
                let apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        
                return fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => data.articles || []);
            }
        
            // Function to combine results from all APIs and display them
            function fetchResources(query, genre) {
                Promise.all([
                    fetchBooksFromOpenLibrary(query, genre),
                    fetchBooksFromGoogleBooks(query, genre),
                    fetchJournalsFromCrossRef(query),
                    fetchArticlesFromNewsAPI(query) // Added function to fetch articles from NewsAPI
                ])
                    .then(([openLibraryBooks, googleBooks, crossRefJournals, newsArticles]) => {
                        const combinedResources = [
                            ...openLibraryBooks.map(book => ({
                                type: 'book',
                                title: book.title,
                                author: book.author_name ? book.author_name.join(', ') : 'Unknown',
                                cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'https://via.placeholder.com/150',
                                description: book.first_sentence ? book.first_sentence.join(' ') : 'No description available',
                                link: `https://openlibrary.org${book.key}`,
                                genre: book.subject ? book.subject[0] : 'Genre'
                            })),
                            ...googleBooks.map(book => ({
                                type: 'book',
                                title: book.volumeInfo.title,
                                author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown',
                                cover: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150',
                                description: book.volumeInfo.description || 'No description available',
                                link: book.volumeInfo.canonicalVolumeLink,
                                genre: book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'Genre'
                            })),
                            ...crossRefJournals.map(journal => ({
                                type: 'journal',
                                title: journal.title ? journal.title.join(', ') : 'Untitled Article',
                                author: journal.author ? journal.author.map(a => a.family).join(', ') : 'Unknown Author',
                                cover: 'https://via.placeholder.com/150', // CrossRef doesn't provide images
                                description: journal.abstract || 'No abstract available',
                                link: journal.URL,
                                genre: 'Journal'
                            })),
                            ...newsArticles.map(article => ({
                                type: 'article',
                                title: article.title,
                                author: article.author || 'Unknown Author',
                                cover: article.urlToImage || 'https://via.placeholder.com/150',
                                description: article.description || 'No description available',
                                link: article.url,
                                genre: 'Article'
                            }))
                        ];
        
                        displayResources(combinedResources);
                    })
                    .catch(error => {
                        console.error('Error fetching resources:', error);
                        resourcesGrid.innerHTML = "<p>There was an error fetching resources. Please try again later.</p>";
                    });
            }
            function displayResources(resources) {
                const resourcesGrid = document.querySelector('.resources-grid');
                resourcesGrid.innerHTML = ''; // Clear previous results
            
                resources.forEach(resource => {
                    const resourceCard = document.createElement('div');
                    resourceCard.classList.add('resource-card');
            
                    resourceCard.innerHTML = `
                        <img src="${resource.cover}" class="book-image" alt="${resource.title}">
                        <h3>${resource.title || 'Untitled'}</h3>
                        <p>by ${resource.author || 'Unknown Author'}</p>
                        <div class="book-info">
                            <span class="genre-pill">${resource.genre}</span>
                            <span class="resource-type">${resource.type}</span>
                        </div>
                        <div class="book-details">
                            <p><strong>Description:</strong> ${resource.description}</p>
                            <button class="view-more"><a href="${resource.link}" target="_blank">View more</a></button>
                            <button class="save-book" data-id="${resource.id}" data-title="${resource.title}" data-author="${resource.author}" data-cover="${resource.cover}">Save Book</button> <!-- Save Book button -->
                        </div>
                    `;
            
                    resourcesGrid.appendChild(resourceCard);
                });
                    // Add event listeners to the Save buttons
        const saveButtons = document.querySelectorAll('.save-book');
        saveButtons.forEach(button => {
            button.addEventListener('click', function() {
                const book = {
                    id: this.getAttribute('data-id'),
                    title: this.getAttribute('data-title'),
                    author: this.getAttribute('data-author'),
                    cover: this.getAttribute('data-cover')
                };
                saveBook(book);
            });
        });
    }

    // Function to save a book to localStorage
    function saveBook(book) {
        let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || []; // Get saved books or empty array
        // Check if the book is already saved to prevent duplicates
        if (!savedBooks.some(savedBook => savedBook.id === book.id)) {
            savedBooks.push(book); // Add the new book to the array
            localStorage.setItem('savedBooks', JSON.stringify(savedBooks)); // Save the updated array
            alert('Book saved successfully!');
        } else {
            alert('This book is already saved.');
        }
    }

    // Listen for form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        const genre = genreSelect.value;
        fetchResources(query, genre);
    });

    // Optional: Fetch resources on page load
    fetchResources('', 'All');
});
