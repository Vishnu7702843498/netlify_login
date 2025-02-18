const button = document.querySelector('button');
let isWrongUsername = true;

document.getElementById('username').addEventListener('input', function(e) {
    isWrongUsername = e.target.value !== 'vishnu';
    if (isWrongUsername) {
        button.classList.add('movable');
    } else {
        button.classList.remove('movable');
        button.style.setProperty('--escape-x', '0');
        button.style.setProperty('--escape-y', '0');
    }
});

// Track mouse position relative to button container
document.querySelector('.login-container').addEventListener('mousemove', function(e) {
    if (!isWrongUsername) return;

    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    // Calculate distance between mouse and button center
    const deltaX = e.clientX - buttonCenterX;
    const deltaY = e.clientY - buttonCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // If mouse is within 100px of button, move it away
    if (distance < 100) {
        const angle = Math.atan2(deltaY, deltaX);
        const escapeX = -Math.cos(angle) * 200;
        const escapeY = -Math.sin(angle) * 200;
        
        button.style.setProperty('--escape-x', escapeX);
        button.style.setProperty('--escape-y', escapeY);
    }
});

// Reset position when mouse leaves container
document.querySelector('.login-container').addEventListener('mouseleave', function() {
    if (isWrongUsername) {
        button.style.setProperty('--escape-x', '0');
        button.style.setProperty('--escape-y', '0');
    }
});

function validateForm(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username !== 'vishnu') {
        errorMessage.textContent = 'Username must be "vishnu"';
        return false;
    }

    if (password !== 'vishnu') {
        errorMessage.textContent = 'Incorrect password';
        return false;
    }

    errorMessage.textContent = '';
    // Redirect to welcome page with username
    window.location.href = `welcome.html?username=${encodeURIComponent(username)}`;
    return true;
}
