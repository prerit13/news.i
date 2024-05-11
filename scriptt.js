const API_KEY = "bf72a99dad79455ca64caaf8cd7c4117";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const blogContainer = document.getElementById("blog-container");
    blogContainer.innerHTML = ""; // Clear previous content

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const articleCard = createArticleCard(article);
        blogContainer.appendChild(articleCard);
    });
}

function createArticleCard(article) {
    const articleCard = document.createElement("div");
    articleCard.classList.add("blog-cad");

    const newsImg = document.createElement("img");
    newsImg.src = article.urlToImage;
    newsImg.alt = "News Image";
    articleCard.appendChild(newsImg);

    const newsTitle = document.createElement("h2");
    newsTitle.textContent = article.title;
    articleCard.appendChild(newsTitle);

    const newsDesc = document.createElement("p");
    newsDesc.textContent = article.description;
    articleCard.appendChild(newsDesc);

    const newsSource = document.createElement("p");
    newsSource.textContent = `${article.source.name} · ${new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})}`;
    articleCard.appendChild(newsSource);

    articleCard.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });

    return articleCard;
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query !== "") {
        fetchNews(query);
    }
});
