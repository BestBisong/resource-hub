document.addEventListener('DOMContentLoaded', function() {
    // Theme Switcher
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeLink = document.getElementById('theme-link');

    // Check for saved theme in localStorage
    let currentTheme = localStorage.getItem('theme') || 'light';

    // Function to switch themes
    function switchTheme() {
        if (currentTheme === 'light') {
            themeLink.href = 'style-dark.css'; // Set to dark theme
            themeToggleBtn.textContent = 'Switch to Light Mode'; // Update button text
            currentTheme = 'dark';
        } else {
            themeLink.href = 'style.css'; // Set to light theme
            themeToggleBtn.textContent = 'Switch to Dark Mode'; // Update button text
            currentTheme = 'light';
        }
        // Save the theme preference in localStorage
        localStorage.setItem('theme', currentTheme);
    }

    // Apply the saved theme on page load
    if (currentTheme === 'dark') {
        themeLink.href = 'style-dark.css';
        if (themeToggleBtn) {
            themeToggleBtn.textContent = 'Switch to Light Mode';
        }
    }

    // Event listener for the theme toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', switchTheme);
    }
});
