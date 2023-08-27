const accessKey = "6YrpWChuYYTUOjW-i2ejXVDPQw-K8xSgy-mkJpeNVl4";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

function randomColor(){
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    return `rgb(${r},${g},${b})`
}

function colorAuto(){
    const button = document.querySelector("form button");
    const heading =document.querySelector("h1")
    const body = document.querySelector("body")
    const img = document.querySelectorAll("img")

    
    let randColor = randomColor();
    button.style.backgroundColor = randColor;
    button.style.transition = "1s";
    heading.style.color = randColor;
    heading.style.transition = "1s";
    body.style.border = `10px solid ${randColor}`;
    body.style.transition = "1s";
    showMoreBtn.style.backgroundColor = randColor;
    showMoreBtn.style.transition = "1s";
    img.forEach((item)=> {
        item.style.border = `5px solid ${randColor}`
        item.style.transition = "1s"})
    searchForm.style.border = `3px solid ${randColor}`


}

setInterval(colorAuto,3000)


async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML = "";
    }
    const results= data.results;
    results.map((results) => {
        const image = document.createElement("img");
        image.src = results.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = results.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMoreBtn.style.display = "block";
}


searchForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener("click", () =>{
    page++;
    searchImages();
})




