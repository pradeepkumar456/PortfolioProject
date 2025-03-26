        const passions = ["Software Engineer", "YouTuber", "Web Developer", "Tech Enthusiast", "Blogger"];
        let index = 0;

        function changePassion() {
            document.getElementById("passion").textContent = passions[index];
            index = (index + 1) % passions.length; // Loop back to the start
        }

        setInterval(changePassion,1500); // Change text every 2 seconds


        

    // Bootstrap form validation script
    (function () {
        'use strict'
        var forms = document.querySelectorAll('.needs-validation')

        Array.from(forms).forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
    })()


      