const form = document.getElementById('contact-form');
const loadingDiv = document.querySelector('.loading');
const errorDiv = document.querySelector('.error-message');
const sentDiv = document.querySelector('.sent-message');

form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Show loading indicator
    loadingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    sentDiv.style.display = 'none';

    try {
        const formData = new FormData(form); // Get form data

        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        // Check if the response is okay
        if (response.ok) {
            // Hide loading indicator
            loadingDiv.style.display = 'none';

            // Show success message
            sentDiv.style.display = 'block';

            form.reset(); // Optionally, clear the form

            // Hide the success message after 3 seconds
            setTimeout(() => {
                sentDiv.style.display = 'none'; // Clear the message
            }, 3000); // 3000 milliseconds = 3 seconds
        } else {
            throw new Error('Form submission failed.');
        }
    } catch (error) {
        // Hide loading indicator
        loadingDiv.style.display = 'none';

        // Show error message
        errorDiv.textContent = 'There was an issue submitting your form. Please try again.';
        errorDiv.style.display = 'block';

        // Optionally hide error message after some time
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000); // Hide error message after 5 seconds
    }
});
