$(document).ready(function() {

    $(".popup").css("display", "none");
    $("button").click(function(event) {
        event.preventDefault();
        var email_input = $('input[name="email"]').val().trim();
        var password_input = $('input[name="password"]').val().trim();
        var password2_input = $('input[name="repassword"]').val().trim();
        var data = {
            email: email_input,
            password: password_input,
            password2: password2_input
        };
        const csrftoken = Cookies.get('csrftoken');
        const request = new Request(
            "http://127.0.0.1:8000/register/", {
                headers: {
                    'X-CSRFToken': csrftoken,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        );
        fetch(request, {
            method: 'post',
            body: JSON.stringify(data),
        }).then(result => {
            //Here body is not ready yet, throw promise
            if (result.ok) location.href = "/";
            if (!result.ok) throw result;
        }).catch(error => {
            //Here is still promise
            error.json().then((body) => {
                //Here is already the payload from API
                if (body.email) {
                    if (body.email[0] == "This field is required.") {
                        $(".content").text("Le champs email est nécessaire");
                    }
                    if (body.email[0] == "This field may not be blank.") {
                        $(".content").text("Le champs email doit être rempli");
                    }
                    if (body.email[0] == "user with this email already exists.") {
                        $(".content").text("Email déjà existants");
                    }
                    if (body.email[0] == "Enter a valid email address.") {
                        $(".content").text("Email non valide");
                    }

                } else {
                    if (body.password[0] == "This field may not be blank.") {
                        $(".content").text("Le mot de passe ne peut pas être vide");
                    }
                    if (body.password[0] == "Password fields didn't match.") {
                        $(".content").text("Mot de passe non identiques");

                    }
                    if (body.password[0] == "This password is too short. It must contain at least 8 characters.") {
                        $(".content").text("Mot de passe trop court, au moins 8 caractères");

                    }
                    if (body.password[0] == "This password is too common.") {
                        $(".content").text("Mot de passe trop commun");

                    }
                }
                $(".popup").css("display", "block");
                setTimeout(function() {
                    $(".popup").css('display', 'none')
                }, 2000);
            });
        });


    });

});