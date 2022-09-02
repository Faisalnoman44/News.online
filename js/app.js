const loadNewsCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    showNewsMenu(data.data.news_category)
}

const showNewsMenu = async (newsAll) => {
    const newsMenu = document.getElementById('news-menu');
    newsAll.forEach(news => {
        console.log(news)
        const li = document.createElement('li');
        li.innerHTML = `
        <a onclick="loadNews()">${news.category_name}</a>
        `;
        newsMenu.appendChild(li);
    })
}

const loadNews = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a');
    const data = await res.json();
    displayNews(data.data[0]);


}

const displayNews = async (news) => {
    console.log(news)
    const newsCard = document.getElementById('news-card');
    newsCard.innerHTML = `
    <div class="card card-side bg-base-100 shadow-xl">
  <figure><img class="h-full" src="${news.image_url}/100/180/arch" alt="Movie"></figure>
  <div class="card-body">
    <h2 class="card-title">New movie is released!</h2>
    <p>${news.details.slice(0,200)+"..."}</p>
    <div class="flex gap-10">
        <div>
            <p>${news.author.name}</p>
            <p>${news.author.published_date}</p>
        </div>
        <p>Views: ${news.total_view}</p>
        <div>
            <p>rating: ${news.rating.number}</p>
        </div>
    </div>
  </div>
</div>
    `

}

loadNews();
loadNewsCategory()