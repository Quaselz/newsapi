const apiKey = "eefb03909fca45f89526b51bb67702c7";
const btn = document.querySelector("#btn");
const btnHeadlines = document.querySelector("#btnHeadlines");
const outputSection = document.querySelector("#output");

window.addEventListener("load", (e) => {
	e.preventDefault();
	const url = `https://newsapi.org/v2/top-headlines?country=de&category=general&apiKey=${apiKey}`;
	fetchUrl(url);
});

btnHeadlines.addEventListener("click", (e) => {
	e.preventDefault();
	const languageHeadlines = document
		.querySelector("#languageHeadlines")
		.querySelector(".selected").dataset.value;
	const category = document
		.querySelector("#category")
		.querySelector(".selected").dataset.value;

	const url = `https://newsapi.org/v2/top-headlines?country=${languageHeadlines}&category=${category}&apiKey=${apiKey}`;

	fetchUrl(url);
});

btn.addEventListener("click", (e) => {
	e.preventDefault();
	const keywords = document.querySelector("#keyword").value;
	const dateFrom = document.querySelector("#dateFrom").value;
	const dateTo = document.querySelector("#dateTo").value;

	const language = document
		.querySelector("#language")
		.querySelector(".selected").dataset.value;

	const sortBy = document.querySelector("#sortBy").querySelector(".selected")
		.dataset.value;

	const apiUrl = `https://newsapi.org/v2/everything?q=${keywords}&from=${dateFrom}&to=${dateTo}&language=${language}&sortBy=${sortBy}&apiKey=${apiKey}`;

	fetchUrl(apiUrl);
});

function fetchUrl(url) {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			outputSection.innerHTML = "";
			data["articles"].forEach((articles) => {
				const article = document.createElement("article");
				if (
					articles["urlToImage"] !== null ||
					articles["urlToImage"] !== undefined
				) {
					article.setAttribute(
						"style",
						`background-image: url(${articles["urlToImage"]})`
					);
				}
				//console.log(articles);
				article.classList.add("articles");
				if (articles["content"] !== null) {
					articles["content"] = articles["content"].slice(0, 100) + "...";
				} else {
					articles["content"] = "";
				}

				let articleContent = `
            
            <h2>${articles["title"]}</h2>
            <div>
                <p>${articles["content"]}</p>
            </div>
            <div>
                <p>${articles["author"]}</p>
                <p>${articles["publishedAt"]}</p>
            </div>
            <a href=${articles["url"]} target="_blank">Read more
            </a>
            
            `;
				article.insertAdjacentHTML("beforeEnd", articleContent);
				outputSection.appendChild(article);
			});
		})
		.catch((error) => {
			console.error(error);
		});
}

//setting up dropboxs
for (const dropbox of document.querySelectorAll(".activity-wrapper")) {
	dropbox.addEventListener("click", function () {
		this.querySelector(".activity").classList.toggle("open");
	});
}

//setting up dropbox selections
for (const option of document.querySelectorAll(".select-option")) {
	option.addEventListener("click", function () {
		if (!this.classList.contains("selected")) {
			this.parentNode
				.querySelector(".select-option.selected")
				.classList.remove("selected");
			this.classList.add("selected");
			this.closest(".activity").querySelector(
				".select_trigger span"
			).textContent = this.textContent;
		}
	});
}
