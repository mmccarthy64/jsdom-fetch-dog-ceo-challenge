console.log('%c HI', 'color: firebrick')
let breeds = [];
document.addEventListener("DOMContentLoaded", () => {

    fetchDogs();
    fetchBreeds();
});

function fetchDogs() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then( resp => resp.json())
    .then( dogs => {
        dogs.message.forEach(image => renderDogs(image))
    });
}

function renderDogs(dogPicUrl) {
    const imageContainer = document.querySelector("#dog-image-container");

    const img = document.createElement("img");
    img.src = dogPicUrl;
    imageContainer.appendChild(img);
}

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => {
        breeds = Object.keys(breeds.message);
        updateBreeds(breeds);
        selectBreed();
    })
}

function renderBreeds(breed) {
    let ul = document.querySelector("#dog-breeds");

    let li = document.createElement("li");
    li.innerText = breed;
    ul.appendChild(li);
    li.addEventListener("click", changeColor);
}

function updateBreeds(breeds) {
    let ul = document.querySelector("#dog-breeds");
    removeChildren(ul);
    breeds.forEach(breed => renderBreeds(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child){
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function selectBreedsStartingWith(letter){
    updateBreeds(breeds.filter(breed => breed.startsWith(letter)));
}

function selectBreed() {
    let selectBreed = document.querySelector("#breed-dropdown");
    selectBreed.addEventListener("change", function(event) {
        selectBreedsStartingWith(event.target.value);
    });
}

function changeColor(event) {
    event.target.style.color = 'red';
}