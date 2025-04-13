

    // scripts for home page
  // Load header.html into the #header div
  fetch('../sections/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
    });
  fetch('../sections/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.classList.contains('nav-link')) {
        document.querySelectorAll('#nav-links .nav-link').forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
      }
    });

// scripts for sign in page 

    document.getElementById('signinForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Dummy check (you can add real validation or fetch request here)
      if (email && password) {
        alert(`Signed in as ${email}`);
        // Redirect: window.location.href = 'dashboard.html';
      } else {
        alert('Please fill in all fields.');
      }
    });


    // scripts for register page 
    document.getElementById('registerForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const fullName = document.getElementById('fullName').value;
      const photo = document.getElementById('photo').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      // Display basic success message (you can send data to server here)
      alert(`Welcome, ${fullName}! Your account has been created.`);
      
      // Redirect or clear form
      // window.location.href = "signin.html";
      // e.target.reset();
    });
