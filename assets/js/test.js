const form = document.querySelector('form');
const statusDiv = document.getElementById('status');

form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission
    
    const formData = new FormData(form); // Get form data
    
    const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
        statusDiv.innerHTML = 'Message Sent!'; // Show success message
        form.reset(); // Optionally, clear the form
        
        // Hide the status message after 3 seconds
        setTimeout(() => {
            statusDiv.innerHTML = ''; // Clear the message
        }, 3000); // 3000 milliseconds = 3 seconds
    } else {
        statusDiv.innerHTML = 'There was a problem submitting your form.'; // Show error message
    }
});