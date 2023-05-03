//https://rapidapi.com/principalapis/api/car-data

function onJson(json)
{
  json_data = json;

  let i = 0;
  let makes = [];
  let models = [];
  let types = [];
  let years = [];

  for(let car of json)
  {
    makes[i] = car.make;
    models[i] = car.model;
    types[i] = car.type;
    years[i] = car.year;
    i++;
  }

  //elimino i doppioni e ordino gli array
  makes_unique = Array.from(new Set(makes));
  makes_unique.sort();
  models_unique = Array.from(new Set(models));
  models_unique.sort();
  types_unique = Array.from(new Set(types));
  types_unique.sort();
  years_unique = Array.from(new Set(years));
  years_unique.sort();

  //creo le caselle per tipo
  for(let type of types_unique)
  {
  let option_type = document.createElement('option');
  option_type.text = type;   
  let select_type = document.querySelector('#type');
  select_type.appendChild(option_type);
  }

  //creo le caselle per marca
  for(let make of makes_unique)
  {
  let option_make = document.createElement('option');
  option_make.text = make;   
  let select_make = document.querySelector('#make');
  select_make.appendChild(option_make);
  }

  //creo le caselle per anno
  for(let year of years_unique)
  {
  let option_year = document.createElement('option');
  option_year.text = year;   
  let select_year = document.querySelector('#year');
  select_year.appendChild(option_year);
  }
}

function onResponse(response)
{
    return response.json();
}

function reset()
{
  window.location.reload()
}

//deve prendere i valori selezionati dall'utente e secondo questi filtrare il contenuto
function filter(event)
{ 
  event.preventDefault()
  
  const option_selected = event.target;
  const results = document.querySelector('#block');

  for (car of json_data)
  { 
    if (option_selected.value == car.type)
    {
      const marca = document.createElement('p');
      marca.textContent = 'Marca: ' + car.make;
      const modello = document.createElement('p');
      modello.textContent = 'Modello: ' + car.model;
      const anno = document.createElement('p');
      anno.textContent = 'Anno: ' + car.year;

      const div = document.createElement('div');
      div.appendChild(marca);
      div.appendChild(modello);
      div.appendChild(anno);
      div.classList.add('result')

      results.appendChild(div);
    }
    else if (option_selected.value == car.make)
    {
      const tipo = document.createElement('p');
      tipo.textContent = 'Tipo: ' + car.type;
      const modello = document.createElement('p');
      modello.textContent = 'Modello: ' + car.model;
      const anno = document.createElement('p');
      anno.textContent = 'Anno: ' + car.year;

      const div = document.createElement('div');
      div.appendChild(tipo);
      div.appendChild(modello);
      div.appendChild(anno);
      div.classList.add('result')

      results.appendChild(div);
    }
    else if (option_selected.value == car.year)
    {
      const marca = document.createElement('p');
      marca.textContent = 'Marca: ' + car.make;
      const modello = document.createElement('p');
      modello.textContent = 'Modello: ' + car.model;
      const tipo = document.createElement('p');
      tipo.textContent = 'Tipo: ' + car.type;

      const div = document.createElement('div');
      div.appendChild(marca);
      div.appendChild(modello);
      div.appendChild(tipo);
      div.classList.add('result')

      results.appendChild(div);
    }
    else if (option_selected.value == 'all')
    {
      const marca = document.createElement('p');
      marca.textContent = 'Marca: ' + car.make;
      const modello = document.createElement('p');
      modello.textContent = 'Modello: ' + car.model;
      const tipo = document.createElement('p');
      tipo.textContent = 'Tipo: ' + car.type;
      const anno = document.createElement('p');
      anno.textContent = 'Anno: ' + car.year;

      const div = document.createElement('div');
      div.appendChild(marca);
      div.appendChild(modello);
      div.appendChild(tipo);
      div.appendChild(anno);
      div.classList.add('result')

      results.appendChild(div);
    } 
  }
}


//qui memorizzo i dati che vengono estrapolati dal json
let json_data;
let makes_unique=[];
let models_unique=[];
let types_unique=[];
let years_unique=[];

//richiesta
const request_options = 
{
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '87aa4bdb14msh8ba5475520ed7f6p16b075jsn6aa6bfa6f6e2',
    'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
  }
};  
fetch('https://car-data.p.rapidapi.com/cars?limit=50&page=0', request_options).then(onResponse).then(onJson);

//assegno il listener a tutti gli elementi option
const select_type = document.querySelector('#type');
select_type.addEventListener('change', filter);
const select_make = document.querySelector('#make');
select_make.addEventListener('change', filter);
const select_year = document.querySelector('#year');
select_year.addEventListener('change', filter);


//assegno il listener al form
const button = document.querySelector('.submit');
button.addEventListener('click', reset)







