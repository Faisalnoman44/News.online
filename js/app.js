const loadNewsCategory = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    showNewsMenu(data.data.news_category)
}

const showNewsMenu = async(newsAll) =>{
    const newsMenu = document.getElementById('news-menu');
    newsAll.forEach(news =>{
        console.log(news)
        const li = document.createElement('li');
        li.innerHTML = `
        <a onclick="">${news.category_name}</a>
        `;
        newsMenu.appendChild(li);
    })
}

const loadNews = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/{news_id}');
    const data = await res.json();

}


loadNewsCategory()