$(document).ready(function() {



    $("button").click(function() {
        var firstname = $('input[name="first_name"]').val().trim();
        var lastname = $('input[name="last_name"]').val().trim();
        var email_input = $('input[name="email"]').val().trim();
        var password_input = $('input[name="password"]').val().trim();
        var password2_input = $('input[name="repassword"]').val().trim();
        var data = {
            first_name: firstname,
            last_name: lastname,
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
        var status;
        fetch(request, {
            method: 'post',
            body: JSON.stringify(data),
        }).then(function(response) {
            status = response.status;
            if (status == 201) {
                location.href = "/"
            }
        }).then(function(error) {
            console.log(error.message);
        });

    });

});