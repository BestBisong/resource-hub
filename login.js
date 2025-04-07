document.addEventListener("DOMContentLoaded", function() {
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');
    const loginPage = document.getElementById('login-page');
    const signupPage = document.getElementById('signup-page');

    // Function to show login page and hide signup page
    function showLogin() {
        loginPage.classList.add('active');
        loginPage.classList.remove('hidden');
        signupPage.classList.add('hidden');
        signupPage.classList.remove('active');
        loginToggle.classList.add('active');
        signupToggle.classList.remove('active');
    }

    // Function to show signup page and hide login page
    function showSignup() {
        signupPage.classList.add('active');
        signupPage.classList.remove('hidden');
        loginPage.classList.add('hidden');
        loginPage.classList.remove('active');
        signupToggle.classList.add('active');
        loginToggle.classList.remove('active');
    }

    // Event listener for Login button
    loginToggle.addEventListener('click', function() {
        showLogin();
    });

    // Event listener for Sign Up button
    signupToggle.addEventListener('click', function() {
        showSignup();
    });
});
