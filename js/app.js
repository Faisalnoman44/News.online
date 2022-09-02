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
        <a onclick="loadNews(${news.category_id})">${news.category_name}</a>
        `;
        newsMenu.appendChild(li)
    })
}

const loadNews = async (id) => {
    console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
    console.log(res)
    const data = await res.json();
    console.log(data);


}

// const displayNews = async (news) => {
//     console.log(news)
//     const newsCard = document.getElementById('news-card');
//     newsCard.innerHTML = `
//     <div class="card card-side bg-base-100 shadow-xl">
//   <figure><img class="h-full" src="${news.image_url}/100/180/arch" alt="Movie"></figure>
//   <div class="card-body">
//     <h2 class="card-title">New movie is released!</h2>
//     <p>${news.details}</p>
//     <div class="flex gap-10">
//         <div>
//             <p>${news.author.name}</p>
//             <p>${news.author.published_date}</p>
//         </div>
//         <p>Views: ${news.total_view}</p>
//         <div>
//             <p>rating: ${news.rating.number}</p>
//         </div>
//     </div>
//   </div>
// </div>
//     `

// }

// loadNews();
loadNewsCategory()