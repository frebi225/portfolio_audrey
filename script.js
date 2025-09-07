// Message de bienvenue
window.onload = () => {
    alert("Bienvenue sur mon portfolio !");
  };
  
  // Validation du formulaire
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const message = document.getElementById("formMessage");
  
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const msg = document.getElementById("message").value.trim();
  
        if (name && email.includes("@") && msg) {
          message.textContent = "Message envoyé avec succès ✅";
          message.style.color = "green";
          form.reset();
        } else {
          message.textContent = "Veuillez remplir correctement tous les champs ❌";
          message.style.color = "red";
        }
      });
    }
  });
  