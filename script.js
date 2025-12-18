// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {

    // ----- SMOOTH SCROLL FUNCTION -----
    window.scrollToForm = function() {
        const formSection = document.getElementById("enquiry");
        if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth" });
        } else {
            console.error("❌ Enquiry form section not found");
        }
    };

    // ----- FORM SUBMISSION -----
    const form = document.getElementById("enquiryForm");

    if (!form) {
        console.error("❌ enquiryForm not found");
        alert("Form ID mismatch: enquiryForm");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value
        };

        try {
            const response = await fetch("https://backend-schl.onrender.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            document.getElementById("responseMessage").innerText = result.message;
            form.reset();

        } catch (error) {
            console.error(error);
            document.getElementById("responseMessage").innerText =
                "❌ Backend not connected";
        }
    });

});
