
    window.addEventListener('DOMContentLoaded', () => {
      // 1. Grab the filter value from the URL (e.g., ?filter=beaver)
      const urlParams = new URLSearchParams(window.location.search);
      const activeFilter = urlParams.get('filter');

      // 2. If a filter exists in the URL, update the heading and filter items
      if (activeFilter) {
        // Capitalizes the tag name safely (e.g., "beaver" -> "Beaver")
        const capitalizedTagName = activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1);
        
        // Change the page heading text dynamically
        document.getElementById('page-heading').innerText = `Filtered by: ${capitalizedTagName}s`;

        // Run the filtering process
        applyGlobalFilter(activeFilter);
      }
    });

    function applyGlobalFilter(category) {
      const items = document.querySelectorAll('.mix-item');
      
      items.forEach(item => {
        // If the item matches the tag, show it. Otherwise, hide it from view.
        if (item.getAttribute('data-category') === category) {
          item.style.display = 'block'; 
        } else {
          item.style.display = 'none';
        }
      });
    }

