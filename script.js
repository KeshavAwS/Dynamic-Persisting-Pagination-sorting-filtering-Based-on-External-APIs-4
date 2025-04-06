const gallery = document.getElementById('gallery');
let limit = 10;
let page = 1;
let isLoading = false;

async function fetchImages() {
  try {
    isLoading = true;
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`);
    const data = await res.json();

    data.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.thumbnailUrl;
      img.alt = photo.title;
      gallery.appendChild(img);
    });

    isLoading = false;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function handleScroll() {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  if (scrollTop + viewportHeight >= fullHeight - 10 && !isLoading) {
    page++;
    fetchImages();
  }
}

// Initial fetch
fetchImages();

// Scroll listener
window.addEventListener('scroll', handleScroll);
