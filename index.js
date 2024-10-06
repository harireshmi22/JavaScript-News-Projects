const apiKey = "7e6b4b323f5a4d7280851e4c6d20ccfc"
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button")

window.addEventListener("load", () => fetchRandomNews("India"));

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);  // Corrected the typo here
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error Fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlog(articles);
        } catch (error) {
            console.log("Error fetching news by query", error)
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=30&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);  // Corrected the typo here
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error Fetching random news", error);
        return [];
    }
}


function displayBlog(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {  // Changed articles to article (singular)

        if (!article.urlToImage) return;

        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || "default-image.jpg";  // Check if urlToImage exists
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");  // Changed to a paragraph
        const truncatedDes = article.description && article.description.length > 120
            ? article.description.slice(0, 120) + "..." : article.description || "No description available.";
        description.textContent = truncatedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        })
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlog(articles);
    } catch (error) {
        console.error("Error fetching random news...", error);
    }
})();
