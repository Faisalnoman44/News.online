const loadNewsCategory = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        showNewsMenu(data.data.news_category);

    } catch (error) {
        console.log(`The error: ${error}`)
    }

}

const showNewsMenu = async (newsAll) => {
    try {
        const newsMenu = document.getElementById('news-menu');
        newsAll.forEach(news => {
            // console.log(news);
            const li = document.createElement('li');
            li.classList.add("mx-5")
            li.innerHTML = `
            <a onclick="loadNews('${news.category_id}')" >${news.category_name}</a>
            `;
            newsMenu.appendChild(li);
        });
    } catch (error) {
        console.log(`The error: ${error}`);
    }

}

const spinner = document.getElementById('spinner');
const loadNews = async (categoryId) => {
    try {
        spinner.classList.remove('hidden');
        // console.log(categoryId)
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
        const data = await res.json();
        displayNews(data.data);
    } catch (error) {
        console.log(`The error: ${error}`);
    }

}

const displayNews = async (allNews) => {
    try {
        const items = allNews.length;

        const newsCard = document.getElementById('news-card');
        newsCard.innerHTML = '';

        const notFound = document.getElementById('not-found');
        notFound.innerHTML = '';

        const itemsCount = document.getElementById('items-count');
        itemsCount.innerHTML = '';

        if (allNews.length === 0){
            itemsCount.innerHTML = `
                    <h3 class="md:text-2xl text-xl py-4 border px-3 rounded" > 0 items founds in this category</h3 > `
            newsCard.innerHTML = `<h2 class="text-4xl text-center text-teal-500	" > No Result Found</h2 > `;
            spinner.classList.add('hidden')
            return;
        }
        allNews.sort((a, b) => {
            return b.total_view - a.total_view;
        })

        
        // console.log(items);
        allNews.forEach(news => {
           
            console.log(news)
            itemsCount.innerHTML = `
                    <h3 class="md:text-2xl text-xl py-4 border px-3 rounded" > ${items} items founds in this category</h3 > `
            const div = document.createElement('div');
            div.classList.add("mb-6")
            div.innerHTML = `
                        <div div class="card md:h-80 h-full sm:card-side bg-base-100 shadow-xl" >
                     <figure class="md:w-4/6 w-full"><img class="md:h-72 md:w-80  w-full" src="${news.image_url}/100/180/" alt=""></figure>
                     <div class="card-body">
                             <h2 class="card-title">${news.title ? news.title : 'No title found'}</h2>
                             <p class="mb-3">${news.details ? news.details.slice(0, 250) + '...' : 'No title found'}</p>
                             <div class="flex justify-between items-center md:gap-3">
                                <div>
                                    <img class="w-10 h-10 rounded-full" src="${news.author.img ? news.author.img : 'No image found'}" alt="">
                                    <p>${news.author.name ? news.author.name : 'No name found'}</p>
                                    <p>${news.author.published_date ? news.author.published_date : 'No date found'}</p>
                                </div>
                                <div>
                                <p>Views: ${news.total_view ? news.total_view : 'No views found'}</p>
                                </div>
                                <div>
                                    <label onclick ="showDetails('${news.thumbnail_url}','${news.title}','${news.rating.number}','${news.author.name}','${news.rating.badge}')" for="my-modal" class="btn btn-accent">Details</label>
                                </div>
                             </div>
                    </div>
                </div > `
            newsCard.appendChild(div);
            // console.log(news.rating);
            // console.log(news.thumbnail_url, news.details);
        });
        spinner.classList.add('hidden')
    } catch (error) {
        console.log(`The error: ${error} `);
    }
    // console.log(allNews)

}

const showDetails = (picture, title, rating,name,badge) => {
    // console.log(data);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div  class="modal-box md:w-full w-64" >
                <h3 class="font-bold text-lg mb-2">${title ? title : 'No title found'}</h3>
                <img class="w-full md:h-96 h-56" src="${picture ? picture : 'No picture found'}" alt="">
                <p class="mt-4">Author Name: ${name ? name : 'No name found'}</p>
                <h4 class="text-lg mt-2" class="py-4">Rating: ${rating ? rating : 'No rating found'}</h4>
                <h4 class="text-lg mt-2" class="py-4">Bagde: ${badge ? badge : 'No badge found'}</h4>
                <div class="modal-action">
                    <label for="my-modal" class="btn">Close</label>
                </div>
            </div>`;
    modalBody.appendChild(div);



}

const allNews = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/08`);
        const data = await res.json();
        displayNews(data.data);

    } catch (error) {
        console.log(`The error: ${error}`);
    }

}

const newsSection = document.getElementById('news-section').addEventListener('click', function () {
    const newsSection = document.getElementById('news-menu-container');
    newsSection.classList.remove('hidden');
    const blogsContainer = document.getElementById('blogs-container');
    blogsContainer.classList.add('hidden');
    const itemsCount = document.getElementById('items-count');
    itemsCount.classList.remove('hidden');
    allNews();
})

const blogs = document.getElementById('blogs').addEventListener('click', function (){
    const blogsContainer = document.getElementById('blogs-container');
    blogsContainer.classList.remove('hidden');

    const newsSection = document.getElementById('news-menu-container');
    newsSection.classList.add('hidden');

    const cardSection = document.getElementById('news-card');
    cardSection.innerHTML = '';
    
    const itemsCount = document.getElementById('items-count');
    itemsCount.classList.add('hidden');
})

allNews();
loadNewsCategory()