$(document).ready(function() {

    $(".popup").css("display", "none");

    $("button").click(function() {

        var email_input = $('input[name="email"]').val().trim();
        var password_input = $('input[name="password"]').val().trim();
        var data = {
            email: email_input,
            password: password_input,
        };
        const csrftoken = Cookies.get('csrftoken');
        const request = new Request(
            "http://127.0.0.1:8000/login/", {
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
        }).then(response => {
            status = response.status;
            return response.json();
        }).then(data => {
            const obj = JSON.stringify(data);
            const json = JSON.parse(obj);
            var access = json.access;
            var refresh = json.refresh;

            if (status == 200) {
                Cookies.set('acces', access);
                Cookies.set('refresh', refresh);
                Cookies.set('email', email_input);
                location.href = "/index"
            } else {
                $(".content").text("Identifiants incorrects");
                $(".popup").css("display", "block");
                setTimeout(function() {
                    $(".popup").css('display', 'none')
                }, 2000);
            }

        });

    });

});