const loadNewsCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    showNewsMenu(data.data.news_category);
}

const showNewsMenu = async (newsAll) => {
    const newsMenu = document.getElementById('news-menu');
    newsAll.forEach(news => {
        console.log(news);
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
    displayNews(data.data,categoryName);
}

const displayNews = async (allNews) => {
    // console.log(allNews)
    
    const newsCard = document.getElementById('news-card');
    newsCard.innerHTML = '';

    const notFound = document.getElementById('not-found');
    notFound.innerHTML = '';

    const itemsCount = document.getElementById('items-count');
    itemsCount.innerHTML = '';

    if(allNews.length === 0){
        newsCard.innerHTML = `<h2 class="text-4xl text-center text-teal-500	">No Result Found</h2>`;
        return;
    }
    const items= allNews.length;
    console.log(items);
    allNews.forEach(news => {

        itemsCount.innerHTML = `
        <h3 class="text-2xl py-4 border px-3 rounded">${items} items founds in  category</h3>
        `
        console.log(news);
        const div = document.createElement('div');
        div.classList.add("mb-6")
        div.innerHTML = `
            <div class="card md:h-80 h-full sm:card-side bg-base-100 shadow-xl">
                 <figure class="md:w-7/12 w-full"><img class="md:h-80 md:w-96 w-full" src="${news.image_url}/100/180/" alt=""></figure>
                 <div class="card-body">
                         <h2 class="card-title">${news.title ? news.title : 'No title found'}</h2>
                         <p class="mb-3">${news.details ? news.details.slice(0,150)+'...' : 'No title found'}</p>
                         <div class="flex justify-between items-center md:gap-3">
                            <div>
                                <img class="w-10 h-10 rounded-full" src="${news.author.img ? news.author.img:'No image found'}" alt="">
                                <p>${news.author.name ? news.author.name: 'No name found'}</p>
                                <p>${news.author.published_date ? news.author.published_date : 'No date found'}</p>
                            </div>
                            <div>
                            <p>Views: ${news.total_view ? news.total_view : 'No views found'}</p>
                            </div>
                            <div>
                                <label onclick="showDetails('${news.thumbnail_url}','${news.details}')" for="my-modal-6" class="btn btn-accent">Details</label>
                            </div>
                         </div>
                </div>
            </div>`
        newsCard.appendChild(div);
        });

}

const showDetails = async(picture,details)=>{
    console.log(details,picture);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = '';
    modalBody.innerHTML = `
    <div class="modal-box">
                <img class="w-full h-60 w-60 mx-auto" src="${picture ? picture : 'No picture found' }" alt="">
                <p class="py-4">${details ? details : 'No details found'}</p>
                <div class="modal-action">
                    <label for="my-modal-6" class="btn">Close</label>
                </div>
    </div>
    `
}

const allNews = async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/08`);
    const data = await res.json();
    displayNews(data.data);

}

const newsSection = document.getElementById('news-section').addEventListener('click',function(){
    allNews();
})
allNews();
// loadNews();
loadNewsCategory()