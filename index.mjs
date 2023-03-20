async function searchAirbnb() {
    console.log("searching");
    const bedrooms = document.getElementById("bedrooms").value;
    const beds = document.getElementById("beds").value;
    const property_type = document.getElementById("property_type").value.charAt(0).toUpperCase() + document.getElementById("property_type").value.slice(1);
    const results = document.getElementById("results");
    console.log(bedrooms, beds, property_type);

    const url = `http://localhost:3000/findOneAirbnb?bedrooms=${bedrooms}&beds=${beds}&property_type=${property_type}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const airbnb = data.airbnb;

        console.log(airbnb);

        results.innerHTML = `
        <div class="result-item">
            <h2 class="result-title">${airbnb.name}</h2>
            <p class="result-summary">${airbnb.summary}</p>
            <p><strong>Property Type:</strong> ${airbnb.property_type}</p>
            <p><strong>Bedrooms:</strong> ${airbnb.bedrooms}</p>
            <p><strong>Beds:</strong> ${airbnb.beds}</p>
            <a href="${airbnb.listing_url}" class="result-url" target="_blank">View on Airbnb</a>
        </div>
    `;

    } catch (error) {
        console.error(error);
    }
}

async function searchRestaurant() {
    console.log("searching");
    const resName = document.getElementById("restaurant_name").value;
    const results = document.getElementById("results");
    console.log(resName);

    const url = `http://localhost:3000/findOneRestaurant?name=${resName}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const restaurant = data.restaurant;

        console.log(restaurant);

        results.innerHTML = `
            <div class="result-item">
                <h2 class="result-title">${restaurant.name}</h2>
                <p><strong>Restaurant ID:</strong> ${restaurant.restaurant_id}</p>
                <p><strong>Building:</strong> ${restaurant.address.building}</p>
                <p><strong>Street:</strong> ${restaurant.address.street}</p>
                <p><strong>Zipcode:</strong> ${restaurant.address.zipcode}</p>
                <p><strong>Borough:</strong> ${restaurant.address.borough}</p>
                <p><strong>Cuisine:</strong> ${restaurant.cuisine}</p>
            </div>
        `;


    } catch (error) {
        console.error(error);
    }
}

async function searchMovie() {
    console.log("searching");
    const movieName = document.getElementById("movie_title").value;
    const results = document.getElementById("results");
    const url = `http://localhost:3000/findOneMovie?title=${movieName}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const movie = data.movie;
        console.log(movieName);

        results.innerHTML = `
            <div class="result-item">
                <h2 class="result-title">${movie.title}</h2>
                <p><strong>Year:</strong> ${movie.year}</p>
                <p><strong>Rated:</strong> ${movie.rated}</p>
                <p><strong>Runtime:</strong> ${movie.runtime}</p>
                <p><strong>Genres:</strong> ${movie.genres.join(', ')}</p>
                <p><strong>Director:</strong> ${movie.director}</p>
            </div>
        `;

    } catch (error) {
        console.error(error);
    }
}
