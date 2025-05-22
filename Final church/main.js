/**
 * Minimal JavaScript for VPM International Website
 * Only essential functionality that cannot be achieved with CSS alone
 */

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
  // Handle header scroll effect
  initHeaderScroll();
  
  // Initialize Google Maps
  // This will be called by the API callback
  window.initMap = initMap;
  
  // Initialize form submissions
  initForms();
  
  // Initialize back to top button
  initBackToTop();
});

/**
 * Add scroll effect to header
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Initialize Google Maps
 */
function initMap() {
  // Simple map initialization with branch markers
  const mapContainer = document.getElementById('branches-map');
  
  if (!mapContainer) return;
  
  // Clear placeholder
  mapContainer.innerHTML = '';
  
  // Branch locations
  const branches = [
    {
      name: "Nairobi Headquarters",
      position: { lat: -1.286389, lng: 36.817223 },
      address: "123 Faith Avenue",
      phone: "+254 123 456 789",
      email: "nairobi@vpminternational.org"
    },
    {
      name: "Mombasa Branch",
      position: { lat: -4.043740, lng: 39.658871 },
      address: "45 Ocean Road",
      phone: "+254 987 654 321",
      email: "mombasa@vpminternational.org"
    },
    {
      name: "Kisumu Branch",
      position: { lat: -0.091702, lng: 34.767956 },
      address: "78 Lake Street",
      phone: "+254 654 321 987",
      email: "kisumu@vpminternational.org"
    }
  ];
  // Prophecies section
  // Simple tab switching logic
document.addEventListener("DOMContentLoaded", () => {
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons and panes
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabPanes.forEach(pane => pane.classList.remove("active"));

    // Add active to clicked button and matching pane
    button.classList.add("active");
    const tabId = button.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");
  });
});
});


  // Create map
  const map = new google.maps.Map(mapContainer, {
    center: { lat: -1.286389, lng: 36.817223 }, // Default to Nairobi
    zoom: 7
  });
  
  // Create bounds to contain all markers
  const bounds = new google.maps.LatLngBounds();
  
  // Add markers for each branch
  branches.forEach(branch => {
    const marker = new google.maps.Marker({
      position: branch.position,
      map: map,
      title: branch.name
    });
    
    // Create info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="map-info-window">
          <h3>${branch.name}</h3>
          <p>${branch.address}</p>
          <p>${branch.phone}</p>
          <p>${branch.email}</p>
        </div>
      `
    });
    
    // Add click listener to marker
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
    
    // Extend bounds to include this marker
    bounds.extend(branch.position);
  });
  
  // Fit map to bounds
  map.fitBounds(bounds);
}

/**
 * Initialize form submissions
 */
function initForms() {
  // Find all forms
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      // Use HTML5 validation
      if (!form.checkValidity()) {
        return; // Let the browser handle invalid forms
      }
      
      // If it's a form with an action attribute, let it submit normally
      if (form.getAttribute('action')) {
        // Add a success handler for API forms
        if (form.getAttribute('action').startsWith('/api/')) {
          event.preventDefault();
          
          // Show a simple success message
          form.innerHTML = `
            <div class="success-message">
              <i class="fas fa-check-circle"></i>
              <p>Thank you for your submission! We'll be in touch soon.</p>
            </div>
          `;
        }
        return;
      }
      
      // For forms without action (like newsletter)
      event.preventDefault();
      
      // Clear form and show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you for your submission!</p>
      `;
      
      form.innerHTML = '';
      form.appendChild(successMessage);
    });
  });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
  }
}

// main.js

const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // We are scrolling down
        header.classList.add('hide-header'); // Add a class to hide it
    } else {
        // We are scrolling up
        header.classList.remove('hide-header'); // Remove the class to show it
    }

    // Add the 'scrolled' class if scrolled past a certain point (e.g., 50px)
    // This is for your existing background/shadow change
    if (window.scrollY > 50) { // Adjust this value as needed
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollY = window.scrollY;
});