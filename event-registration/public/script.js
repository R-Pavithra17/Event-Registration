document.getElementById('regForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const messageDiv = document.getElementById('message');

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });
        const data = await response.json();
        if (response.ok) {
            messageDiv.style.color = 'green';
            messageDiv.textContent = data.message;
            document.getElementById('regForm').reset();
        } else {
            messageDiv.style.color = 'red';
            messageDiv.textContent = data.error || 'Registration failed.';
        }
    } catch (err) {
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Server error. Please try again later.';
    }
});