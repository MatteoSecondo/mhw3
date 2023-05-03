//https://rapidapi.com/tipsters/api/booking-com/

function onJson(json)
{
    const section = document.querySelector('.results');

    for(let hotel of json.results)
    {
        let result = document.createElement('div');
        result.classList.add('result');
        let text = document.createElement('p');
        text.textContent = 'Nome: ' + hotel.name;
        let photo = document.createElement('img');
        photo.src = hotel.photoMainUrl;
        let review_score = document.createElement('p');
        review_score.textContent = 'Punteggio recensione: ' + hotel.reviewScore;
        
        result.appendChild(photo);
        result.appendChild(text);
        result.appendChild(review_score);

        section.appendChild(result);

    }
}
function onResponse(response)
{
    return response.json();
}

const url = 'https://booking-com.p.rapidapi.com/v2/hotels/search?order_by=popularity&adults_number=2&checkin_date=2023-09-27&filter_by_currency=AED&dest_id=-553173&locale=en-gb&checkout_date=2023-09-28&units=metric&room_number=1&dest_type=city&include_adjacency=true&children_number=2&page_number=0&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '87aa4bdb14msh8ba5475520ed7f6p16b075jsn6aa6bfa6f6e2',
		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
	}
};

const button = document.querySelector('#search_hotels');
button.addEventListener('click', (event) => 
    {
        event.preventDefault();
        fetch(url, options).then(onResponse).then(onJson);
    }
);

