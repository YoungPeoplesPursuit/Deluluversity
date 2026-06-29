function scrollGallery(buttonElement, direction) {
  // 1. Find the parent container holding this specific row
  const row = buttonElement.parentElement;
  
  // 2. Find the .gallery element inside THIS specific row
  const gallery = row.querySelector('.gallery');
  
  // 3. Scroll it!
  const scrollAmount = 300; 
  gallery.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}
