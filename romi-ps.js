document.getElementById("toggle-password").addEventListener("click", function () {
    const passwordInput = document.getElementById("password-input");
    const toggleIcon = this;

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
});

document.getElementById("submit-password").addEventListener("click", function () {
    const enteredPassword = document.getElementById("password-input").value;
    if (enteredPassword === correctPassword) {
        document.getElementById("loading-animation").style.display = "block";
        document.getElementById("password-label").style.display = "none";
        document.getElementById("password-input").style.display = "none";
        document.getElementById("submit-password").style.display = "none";
        document.getElementById("new-user").style.display = "none";
        document.getElementById("lock-icon").style.display = "none";
        document.getElementById("toggle-password").style.display = "none";

        setTimeout(() => {
            document.getElementById("password-container").style.display = "none";
            document.getElementById("player").style.display = "block";
          
          
    

        initializePlayer();
          }, 3000);
    } else {
        alert("Incorrect password. Please try again.");
    }
});
