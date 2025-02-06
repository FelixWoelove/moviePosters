

async function showSuggestions() {
    const input = document.getElementById('movieSearch');
    const suggestionsDiv = document.getElementById('suggestions');
    const query = input.value.trim();

    suggestionsDiv.innerHTML = ''; 

    if (query) {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=80d2f7f4&s=${encodeURIComponent(query)}`); // Use the search endpoint

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            const data = await response.json();

            if (data.Response === "True") {
                const movies = data.Search.slice(0, 5); 

                movies.forEach(movie => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'suggestion-item';
                    suggestionItem.textContent = movie.Title; 

                    suggestionItem.onclick = () => {
                        input.value = movie.Title; 
                        suggestionsDiv.innerHTML = ''; 
                    };

                    suggestionsDiv.appendChild(suggestionItem);
                });

                suggestionsDiv.style.display = movies.length ? 'block' : 'none'; 
            } else {
                suggestionsDiv.style.display = 'none'; 
            }
        } catch (error) {
            console.error("Error:", error);
            suggestionsDiv.style.display = 'none'; 
        }
    } else {
        suggestionsDiv.style.display = 'none'; 
    }
}

async function getData() {
    const query = document.getElementById('movieSearch').value.trim();

    if (!query) {
        alert("Please enter a movie title."); 
        return;
    }

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=80d2f7f4&t=${(query)}`);

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const data = await response.json();
        console.log(data); 
        displayMovieData(data); 
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching data. Please try again."); 
    }
}

async function showSuggestions() {
    const input = document.getElementById('movieSearch');
    const suggestionsDiv = document.getElementById('suggestions');
    const query = input.value.trim();

    suggestionsDiv.innerHTML = ''; 

    if (query) {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=80d2f7f4&s=${encodeURIComponent(query)}`); // Use the search endpoint

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            const data = await response.json();

            if (data.Response === "True") {
                const movies = data.Search.slice(0, 5); 

                movies.forEach(movie => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'suggestion-item';
                    suggestionItem.textContent = movie.Title; 

                    suggestionItem.onclick = () => {
                        input.value = movie.Title; 
                        suggestionsDiv.innerHTML = ''; 
                    };

                    suggestionsDiv.appendChild(suggestionItem);
                });

                suggestionsDiv.style.display = movies.length ? 'block' : 'none';
            } else {
                suggestionsDiv.style.display = 'none';
            }
        } catch (error) {
            console.error("Error:", error);
            suggestionsDiv.style.display = 'none'; 
        }
    } else {
        suggestionsDiv.style.display = 'none'; 
    }
}

function displayMovieData(data) {
    const postersDiv = document.getElementById('posters');
    postersDiv.innerHTML = ''; 

    if (data.Response === "True") {
        const card = document.createElement('div');
        card.className = 'poster-card';

        const img = document.createElement('img');
        img.src = data.Poster; 
        img.alt = data.Title; 
        card.appendChild(img);
        const title = document.createElement('h2');
        title.textContent = data.Title; 
        card.appendChild(title);

        const year = document.createElement('p');
        year.textContent = `Year: ${data.Year}`; 
        year.style.fontWeight = 'bold';
        year.style.marginBottom = '5px'; 
        card.appendChild(year);

        const genre = document.createElement('p');
        genre.textContent = `Genre: ${data.Genre}`; 
        genre.style.marginBottom = '5px'; 
        card.appendChild(genre);

        const plot = document.createElement('p');
        plot.textContent = `Plot: ${data.Plot}`; 
        plot.style.marginBottom = '5px'; 
        card.appendChild(plot);

        postersDiv.appendChild(card);
    } else {
        postersDiv.innerHTML = `<p class="error-message">${data.Error}</p>`; 
    }
}

// Event listeners
document.getElementById('movieSearch').addEventListener('input', showSuggestions);
document.getElementById('fetch-button').addEventListener('click', getData);