const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');
let count = 5;
const apiKey = 'EfacMVhILCucRs758FhHeBMQi7R0dUvJzZWDadGG64o';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
let photoArray;
let loadedImage = 0;
let totalImages = 0;
let ready = false;


//HELPER FUNCTION TO SET ATTRIBUTES
function setItemAttribute(item, attributes) {
    for (let key in attributes) {
        item.setAttribute(key, attributes[key]);
    }
}
//FUNTION TO CHECK IF ALL THE IMAGES LOADED OR NOT
function imageLoaded() {
    loadedImage++;
    if (loadedImage === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
    else {
        loader.hidden = false;
    }
}
//DISPLAYS PHOTOS IN THE DOM
function displayPhotos() {
    totalImages = photoArray.length;
    photoArray.forEach((photo) => {
        const photoDesc = photo.alt_description === null ? "No description available" : photo.alt_description;
        const link = document.createElement('a');
        setItemAttribute(link, {
            href: photo.links.html,
            target: '_blank'
        });
        const img = document.createElement('img');
        setItemAttribute(img, {
            src: photo.urls.regular,
            alt: photoDesc,
            title: photoDesc
        });
        img.addEventListener('load', imageLoaded);
        link.appendChild(img);
        imageContainer.appendChild(link);
    });
}
/* GET PHOTOS FROM UNSPLASH API */
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        photoArray = data;
        displayPhotos();
    } catch (error) {
        throw new Error(error);
    }
}
//LOAD MORE IMAGES WHEN USER SCROLL TO THE BOTTOM OF THE PAGE
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false;
        loadedImage = 0;

    }
});
getPhotos();