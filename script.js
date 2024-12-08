document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input, textarea");
    const successMessage = document.createElement("div");

    // Add success message element
    successMessage.className = "success-message";
    successMessage.textContent = "Form submitted successfully!";
    successMessage.style.cssText = `
        display: none;
        color: white;
        background-color: green;
        padding: 10px;
        margin-top: 10px;
        border-radius: 5px;
        text-align: center;
    `;
    
    // Insert success message above the form
    form.parentElement.insertBefore(successMessage, form);

    // Function to validate inputs
    const validateInput = (input) => {
        const value = input.value.trim();
        let isValid = true;

        const errorMessage = input.parentElement.querySelector(".error-message");

        if (input.type === "email") {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else if (input.type === "number") {
            isValid = /^\d+$/.test(value);
        } else {
            isValid = value !== "";
        }

        if (!isValid) {
            input.classList.add("error");

            if (!errorMessage) {
                const errorMessage = document.createElement("span");
                errorMessage.textContent = `Invalid ${input.placeholder.toLowerCase()}`;
                errorMessage.className = "error-message";
                errorMessage.style.cssText = `
                    color: #fff;
                    font-size: 14px;
                    margin-top: 5px;
                    display: block;
                    background-color: #e74c3c; /* Red background */
                    border: 2px solid #c0392b;  /* Darker red border */
                    padding: 10px;
                    border-radius: 5px;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);  /* Subtle shadow */
                    animation: shake 0.5s ease;  /* Shake animation */
                `;
                input.parentElement.appendChild(errorMessage);
            }
        } else {
            input.classList.remove("error");
            if (errorMessage) {
                errorMessage.remove();
            }
        }

        return isValid;
    };

    // Form submit handler
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let isFormValid = true;
        inputs.forEach((input) => {
            if (!validateInput(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            successMessage.style.display = "block";

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 5000);

            // Clear form
            form.reset();
        }
    });

    // Validate inputs on blur
    inputs.forEach((input) => {
        input.addEventListener("blur", () => validateInput(input));
    });

    // Add animation for shake effect to error message
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);
});
