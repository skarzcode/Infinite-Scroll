const imageContainer = document.getElementById('image-container');
const Loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// check if all images are loaded
function imgLoad() {
imagesLoaded ++;
if (imagesLoaded === totalImages){
    ready = true;
    Loader.hidden = true;
}

}




// create elements for links and photos and append to image-container
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach( (photo) => {
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);
    item.appendChild(img);
     img.addEventListener('load', imgLoad);
    imageContainer.appendChild(item)
    });
}


// Unsplah API
let count = 30;
const apiKey = "5Jw2_Dj9jSVoB3h0kbFkucCmwcjCnWKKMbnMYT0sYyY";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get photos from unsplash

async function getPhotos (){
try{
const response = await fetch(apiURL);
photosArray = [];
photosArray = await response.json();
displayPhotos();
}
 catch(error){

}
};

// check to see if near the bottom of page, load more photos
window.addEventListener('scroll', () =>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getPhotos()
  }
} )




getPhotos();