

async function showSuggestions() {
    const input = document.getElementById('movieSearch');
    const suggestionsDiv = document.getElementById('suggestions');
    const query = input.value.trim();

    suggestionsDiv.innerHTML = ''; // Clear previous suggestions

    if (query) {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=80d2f7f4&s=${encodeURIComponent(query)}`); // Use the search endpoint

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            const data = await response.json();

            if (data.Response === "True") {
                const movies = data.Search.slice(0, 5); // Limit to 5 suggestions

                movies.forEach(movie => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'suggestion-item';
                    suggestionItem.textContent = movie.Title; // Show movie title

                    suggestionItem.onclick = () => {
                        input.value = movie.Title; // Fill input with selected movie
                        suggestionsDiv.innerHTML = ''; // Clear suggestions
                    };

                    suggestionsDiv.appendChild(suggestionItem);
                });

                suggestionsDiv.style.display = movies.length ? 'block' : 'none'; // Show or hide suggestions
            } else {
                suggestionsDiv.style.display = 'none'; // Hide suggestions if no results
            }
        } catch (error) {
            console.error("Error:", error);
            suggestionsDiv.style.display = 'none'; // Hide suggestions on error
        }
    } else {
        suggestionsDiv.style.display = 'none'; // Hide suggestions if input is empty
    }
}

async function getData() {
    const query = document.getElementById('movieSearch').value.trim();

    if (!query) {
        alert("Please enter a movie title."); // Alert if no title is entered
        return;
    }

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=80d2f7f4&t=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const data = await response.json();
        console.log(data); // Log the entire data response
        displayMovieData(data); // Call function to display movie data
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching data. Please try again."); // Alert user on error
    }
}

async function showSuggestions() {
    const input = document.getElementById('movieSearch');
    const suggestionsDiv = document.getElementById('suggestions');
    const query = input.value.trim();

    suggestionsDiv.innerHTML = ''; // Clear previous suggestions

    if (query) {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=80d2f7f4&s=${encodeURIComponent(query)}`); // Use the search endpoint

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            const data = await response.json();

            if (data.Response === "True") {
                const movies = data.Search.slice(0, 5); // Limit to 5 suggestions

                movies.forEach(movie => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'suggestion-item';
                    suggestionItem.textContent = movie.Title; // Show movie title

                    suggestionItem.onclick = () => {
                        input.value = movie.Title; // Fill input with selected movie
                        suggestionsDiv.innerHTML = ''; // Clear suggestions
                    };

                    suggestionsDiv.appendChild(suggestionItem);
                });

                suggestionsDiv.style.display = movies.length ? 'block' : 'none'; // Show or hide suggestions
            } else {
                suggestionsDiv.style.display = 'none'; // Hide suggestions if no results
            }
        } catch (error) {
            console.error("Error:", error);
            suggestionsDiv.style.display = 'none'; // Hide suggestions on error
        }
    } else {
        suggestionsDiv.style.display = 'none'; // Hide suggestions if input is empty
    }
}

function displayMovieData(data) {
    const postersDiv = document.getElementById('posters');
    postersDiv.innerHTML = ''; // Clear previous posters

    if (data.Response === "True") {
        const card = document.createElement('div');
        card.className = 'poster-card';

        const img = document.createElement('img');
        img.src = data.Poster; // Use the Poster field from the response
        img.alt = data.Title; // Use the Title field from the response
        card.appendChild(img);
        const title = document.createElement('h2');
        title.textContent = data.Title; // Movie title
        card.appendChild(title);

        const year = document.createElement('p');
        year.textContent = `Year: ${data.Year}`; // Movie year
        year.style.fontWeight = 'bold'; // Add bold font weight
        year.style.marginBottom = '5px'; // Add bottom margin
        card.appendChild(year);

        const genre = document.createElement('p');
        genre.textContent = `Genre: ${data.Genre}`; // Movie genre
        genre.style.marginBottom = '5px'; // Add bottom margin
        card.appendChild(genre);

        const plot = document.createElement('p');
        plot.textContent = `Plot: ${data.Plot}`; // Movie plot
        plot.style.marginBottom = '5px'; // Add bottom margin
        card.appendChild(plot);

        postersDiv.appendChild(card);
    } else {
        postersDiv.innerHTML = `<p class="error-message">${data.Error}</p>`; // Show error message from the API
    }
}

// Event listeners
document.getElementById('movieSearch').addEventListener('input', showSuggestions);
document.getElementById('fetch-button').addEventListener('click', getData);