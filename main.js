const apiKey = 'bca136a9';
const searchBox = document.querySelector('#searchBox');
const notfound = document.querySelector(".notfound");

let movies = {

    fetchMovies: async function(query){

        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apiKey=${apiKey}`)
        const data = await response.json()
        if (data.Response == "True"){
            document.querySelectorAll('.card').forEach((e)=>{
                e.remove()
            })
            this.displayData(data.Search)
        } else {
            this.notFound(data)
        }
    
    },

    displayData: function(data){

        document.querySelector('.notfound .text').style.display = "none";
        document.querySelector('.results').style.display = "flex";

        data.forEach((movie)=>{
            const card = document.createElement("div");
            card.classList.add('card');

            const title = document.createElement('h1');
            title.classList.add('title');
            title.innerHTML = movie.Title;

            card.appendChild(title);

            const year = document.createElement('p');
            year.classList.add('year');
            year.innerHTML = movie.Year;
            

            card.appendChild(year);

            const poster = document.createElement('img');
            poster.classList.add('poster');
            poster.src = (movie.Poster != 'N/A' ? movie.Poster : 'https://placehold.co/300x444'); 
            poster.style.width = '300px';
            poster.style.height = '444px';
            card.appendChild(poster);

            document.querySelector('.results').appendChild(card);
        })
    
    },

    notFound: function(response){

        document.querySelector('.notfound .text').style.display = "block";
        document.querySelector('.results').style.display = "none";
    
    }

}

searchBox.addEventListener('keypress', (event)=>{

    if(event.key == 'Enter'){
        if (searchBox.value != ''){
            movies.fetchMovies(searchBox.value)
            searchBox.value = '';
        } else {
            alert('Please enter a query!!')
        }
    }

})

movies.fetchMovies('Avengers');