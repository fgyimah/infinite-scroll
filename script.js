const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const count = 10;
const apiKey =
  'ab689f2a7986ac06dd53a55821d6d0ccb271bfc5ec48f85b2a88998da84fe367';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${10}`;
let photosArray = [];
let ready = false;
let loadCount = 0;
let totalImages = 0;

function loadImages() {
  loadCount++;
  if (loadCount === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function displayImages() {
  totalImages = photosArray.length;
  photosArray.map((photo) => {
    const a = document.createElement('a');
    a.setAttribute('href', photo.links.html);
    a.setAttribute('target', '_blank');
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);
    img.addEventListener('load', loadImages);
    a.append(img);
    imageContainer.append(a);
  });
}

const fetchImages = async function () {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    photosArray.push(...data);
    displayImages();
  } catch (error) {
    console.error(error);
  }
};

// scrolling event listener
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    fetchImages();
  }
});

// on load
fetchImages();
