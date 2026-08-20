console.log("JS LOADED");

//Delulu button debugging
function feelingDelulu() {
    console.log("BUTTON WORKED");
    window.location.href = "everything.html?random=true";
}

// Handle search form submission
function handleSearch(event) {
    event.preventDefault();
    
    const query = document.getElementById('search-input').value.trim();
    
    if (!query) {
        return; 
    }
    
    // Redirect to everything.html 
    window.location.href = `everything.html?search=${encodeURIComponent(query)}`;
}
 
// On page load, check if we're on everything.html with a search query
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // check for tag filters and search filters
    const activeFilter = urlParams.get('filter');
    const searchQuery = urlParams.get('search');
    const randomMode = urlParams.get('random');
    
    // filter for tags
    if (activeFilter) {
        const capitalizedTagName = activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1);
        document.getElementById('page-heading').innerText = `Filtered by: ${capitalizedTagName}`;
        applyGlobalFilter(activeFilter);
    }
    
    // filter for search queries
    if (searchQuery) {
        document.getElementById('page-heading').innerText = `Search results for: "${searchQuery}"`;
        applySearchFilter(searchQuery);
    }
// I'm feeling delulu
    if (randomMode === 'true') {
        const cards = document.querySelectorAll('.mix-item');

        if (cards.length > 0) {
            const randomIndex = Math.floor(Math.random() * cards.length);
            const randomCard = cards[randomIndex];

            // hide all cards
            cards.forEach(card => {
                card.style.display = 'none';
            });

            // show the random card
            randomCard.style.display = '';

            // scroll to it
            randomCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
});
 
// searches title, description, tags... to filter for search query
function applySearchFilter(query) {
    const items = document.querySelectorAll('.mix-item');
    const lowerQuery = query.toLowerCase();
    
    items.forEach(item => {
        // get item content and see if the query matches
        const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = item.querySelector('p')?.textContent.toLowerCase() || '';
        const tagsString = item.getAttribute('data-tags') || '';

        const matchesTitle = title.includes(lowerQuery);
        const matchesDescription = description.includes(lowerQuery);
        const matchesTags = tagsString.toLowerCase().includes(lowerQuery);

        // Display if a match, else none
        if (matchesTitle || matchesDescription || matchesTags) {
            item.style.display = ''; 
        } else {
            item.style.display = 'none'; 
        }
    });
}

// general tag filter
    function applyGlobalFilter(category) {
  const items = document.querySelectorAll('.mix-item');
  
  items.forEach(item => {
    // gets and splits string of tags, then checks if the tag exists in the array
    const itemTags = item.getAttribute('data-tags') || "";
    const tagsArray = itemTags.split(" ");
    if (tagsArray.includes(category)) {
  item.style.display = ''; 
} else {
  item.style.display = 'none'; 
}
  });
}

