const form = document.getElementById('contact-form');
const loadingDiv = document.querySelector('.loading');
const successDiv = document.querySelector('.success-message');
const errorDiv = document.querySelector('.error-message');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    loadingDiv.style.display = 'block';  // Show loading message
    successDiv.style.display = 'none';   // Hide success message
    errorDiv.style.display = 'none';     // Hide error message

    const formData = new FormData(form);

    fetch('/', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            loadingDiv.style.display = 'none'; // Hide loading
            successDiv.style.display = 'block'; // Show success message

            form.reset(); // Optionally reset the form after successful submission
            
            setTimeout(() => {
                successDiv.style.display = 'none'; // Hide success message after 3 seconds
            }, 3000);
        } else {
            throw new Error('Form submission failed');
        }
    }).catch(error => {
        loadingDiv.style.display = 'none'; // Hide loading
        errorDiv.style.display = 'block';  // Show error message

        setTimeout(() => {
            errorDiv.style.display = 'none'; // Hide error message after 5 seconds
        }, 5000);
    });
});
