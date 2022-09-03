const loadNewsCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    showNewsMenu(data.data.news_category)
}

const showNewsMenu = async (newsAll) => {
    const newsMenu = document.getElementById('news-menu');
    newsAll.forEach(news => {
        // console.log(news);
        const li = document.createElement('li');
        li.innerHTML = `
        <a onclick="loadNews('${news.category_id}')" >${news.category_name}</a>
        `;
        newsMenu.appendChild(li);

    });
}

const loadNews = async (categoryId) => {
    // console.log(categoryId)
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = async (allNews) => {
    // console.log(allNews)
    const newsCard = document.getElementById('news-card');
    newsCard.innerText = '';

    const notFound = document.getElementById('not-found');
    notFound.innerHTML = '';

    if(allNews.length === 0){
        newsCard.innerHTML = `<h2 class="text-4xl text-center text-teal-500	">No Result Found</h2>`;
        return;
    }

    allNews.forEach(news => {
        console.log(news);
        newsCard.innerHTML = `
            <div class="card card-side bg-base-100 shadow-xl">
                 <figure class="w-9/12"><img class="h-full" src="${news.image_url}/100/180/arch" alt="Movie"></figure>
                 <div class="card-body">
                         <h2 class="card-title">${news.title}</h2>
                         <p class="mb-3">${news.details.slice(0,200)+'...'}</p>
                         <div class="flex gap-10 items-center">
                            <div>
                                <img class="w-10 h-10 rounded-full" src="${news.author.img}" alt="">
                                <p>${news.author.name}</p>
                                <p>${news.author.published_date}</p>
                            </div>
                            <p>Views: ${news.total_view}</p>
                            <div>
                            <label onclick="showDetails('${news.thumbnail_url}','${news.details}')" for="my-modal-6" class="btn btn-accent">Details</label>
                            </div>
                         </div>
                </div>
            </div>
    `});

}

const showDetails = async(picture,details)=>{
    console.log(details,picture);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = '';
    modalBody.innerHTML = `
    <div class="modal-box">
                <img class="w-full h-25" src="${picture}" alt="">
                <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for
                    free!</p>
                <div class="modal-action">
                    <label for="my-modal-6" class="btn">Yay!</label>
                </div>
    </div>
    `
}

loadNews();
loadNewsCategory()