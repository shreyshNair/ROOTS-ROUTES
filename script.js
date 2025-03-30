document.addEventListener("DOMContentLoaded", function () {
  const scrollRevealOptions = {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
  };

  ScrollReveal().reveal(".header_container h1", scrollRevealOptions);
  ScrollReveal().reveal(".header_container h4", {
      ...scrollRevealOptions,
      delay: 500,
  });
  ScrollReveal().reveal(".header_container .btn", {
      ...scrollRevealOptions,
      delay: 500,
  });
  ScrollReveal({ 
      reset: false, 
      distance: "50px", 
      duration: 1000, 
      delay: 200 
  });
});
ScrollReveal().reveal(".about_container", scrollRevealOptions);
ScrollReveal().reveal(".explore_image", { 
  origin: "bottom", 
  delay: 200 
});

// Reveal Content Next (Title & Text)
ScrollReveal().reveal(".explore_card_content h4, .explore_card_content p", { 
  origin: "right", 
  delay: 400, 
  interval: 200 
});

// Reveal 'See More' Button Last
ScrollReveal().reveal(".explore_card .btn", { 
  origin: "bottom", 
  delay: 600, 
  interval: 200 
});


//blogs container
ScrollReveal().reveal(".blogs__card",
  {
      duration: 1000,
      interval:400,
  }
);
document.addEventListener('DOMContentLoaded', function() {
  // Toggle preferences section
  const toggleButton = document.getElementById('togglePreferences');
  const preferencesSection = document.getElementById('preferencesSection');
  
  toggleButton.addEventListener('click', function() {
      if (preferencesSection.style.display === 'none') {
          preferencesSection.style.display = 'block';
          toggleButton.textContent = 'Hide Travel Preferences';
          toggleButton.classList.add('active');
          // Scroll to the preferences section
          preferencesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
          preferencesSection.style.display = 'none';
          toggleButton.textContent = 'Add Your Travel Preferences';
          toggleButton.classList.remove('active');
      }
  });
  
  // Make preference options selectable
  const preferenceOptions = document.querySelectorAll('.preference-option');
  
  preferenceOptions.forEach(option => {
      option.addEventListener('click', function() {
          const isExclusive = this.getAttribute('data-exclusive') === 'true';
          const optionsContainer = this.closest('.preference-options');
          
          // For exclusive options (like yes/no)
          if (isExclusive) {
              optionsContainer.querySelectorAll('.preference-option').forEach(opt => {
                  opt.classList.remove('selected');
              });
              this.classList.add('selected');
          } 
          // For non-exclusive options (multiple can be selected)
          else {
              // Check if there's a "None" option that's selected
              const noneOption = optionsContainer.querySelector('.preference-option[data-value="none"].selected');
              
              // If selecting "None", deselect all others
              if (this.getAttribute('data-value') === 'none') {
                  optionsContainer.querySelectorAll('.preference-option').forEach(opt => {
                      opt.classList.remove('selected');
                  });
                  this.classList.add('selected');
              } 
              // If selecting any other option and "None" is selected, deselect "None"
              else if (noneOption) {
                  noneOption.classList.remove('selected');
                  this.classList.add('selected');
              }
              // Otherwise just toggle the selection
              else {
                  this.classList.toggle('selected');
              }
          }
      });
  });
  
  // Number of travelers controls
  const decreaseBtn = document.querySelector('.decrease-travelers');
  const increaseBtn = document.querySelector('.increase-travelers');
  const travelersInput = document.getElementById('numTravelers');
  
  decreaseBtn.addEventListener('click', function() {
      let currentValue = parseInt(travelersInput.value);
      if (currentValue > parseInt(travelersInput.min)) {
          travelersInput.value = currentValue - 1;
      }
  });
  
  increaseBtn.addEventListener('click', function() {
      let currentValue = parseInt(travelersInput.value);
      if (currentValue < parseInt(travelersInput.max)) {
          travelersInput.value = currentValue + 1;
      }
  });
  
  // Form submission with validation and animation
  document.getElementById('journeyForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Collect form data
      const formData = new FormData(this);
      
      // Collect selected preferences
      const selectedPreferences = {};
      const preferenceGroups = document.querySelectorAll('.preference-group');
      
      preferenceGroups.forEach(group => {
          const groupName = group.querySelector('label').textContent;
          const selectedOptions = Array.from(group.querySelectorAll('.preference-option.selected'))
              .map(option => option.getAttribute('data-value'));
          
          if (selectedOptions.length > 0) {
              selectedPreferences[groupName] = selectedOptions;
          }
      });
      
      // Add preferences to form data
      formData.append('preferences', JSON.stringify(selectedPreferences));
      
      // Display success message (in a real application, you would send this data to the server)
      const formStatus = document.getElementById('formStatus');
      formStatus.className = 'form-status success';
      formStatus.textContent = '🎉 Thank you! Your journey is being planned with your preferences in mind. We will contact you shortly!';
      
      // Smooth scroll to the status message
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Reset form after 5 seconds
      setTimeout(() => {
          this.reset();
          formStatus.style.display = 'none';
          preferencesSection.style.display = 'none';
          toggleButton.textContent = 'Add Your Travel Preferences';
          toggleButton.classList.remove('active');
      }, 5000);
      
      // In a real application, you would submit the form data to your server here
      console.log('Form submitted with preferences:', selectedPreferences);
  });
  
  // Add scroll reveal animations
  ScrollReveal().reveal(".journey-form-container", {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
      delay: 200
  });
}); 
