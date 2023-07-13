const API_KEY="9f57dd5e02f445d581fed550400b9d65";
const url="https://newsapi.org/v2/everything?q="

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query)
{
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    console.log(data);
}

function bindData(articles)
{
    const cardsContainer = document.getElementById("card_container");
    const newsCardTemplate = document.getElementById("template_news_card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);

    });
}

function fillDataInCard(cardClone, article)
{
    const newsImage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImage.src= article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML = article.description;
    
    const date= new Date(article.publishedAt).toLocaleString("en-Us", {
        timeZone : "Asia/Jakarta"
    });

    newsSource.innerHTML= `${article.source.name} . ${date}`;
    
    cardClone.firstElementChild.addEventListener('click' , () => {

        window.open(article.url, "_blank");
    })
}
let cursel=null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem = document.getElementById(id);
    cursel?.classList.remove("active");
    cursel = navItem;
    cursel.classList.add("active");
    
}

const searchButton = document.getElementById("search_button");
const searchText = document.getElementById("search_input");

searchButton.addEventListener("click", ()=>{
    const query= searchText.value;
    if(!query) return;

    fetchNews(query);
    cursel?.classList.remove("active");
    cursel=null;
})