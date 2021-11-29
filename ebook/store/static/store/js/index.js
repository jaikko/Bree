$(document).ready(function() {

    //Hide an show ul
    $('#category').on('click', function(e) {
        e.stopPropagation();
        console.log($('.category-list').css('display'));
        if ($('.category-list').css('display') == "block") {
            $('.category-list').hide();

        } else {
            $('.category-list').show();
        }
    });

    // Get Books by name or title 
    $(".searchButton").click(function() {
        var inputValue = $(".searchTerm").val().trim();
        const csrftoken = Cookies.get('csrftoken');
        const request = new Request(
            "http://127.0.0.1:8000/book/?title=" + inputValue, {
                headers: {
                    'X-CSRFToken': csrftoken,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        );
        var status;
        fetch(request, {
            method: 'get',
        }).then(response => {
            status = response.status;
            return response.json();
        }).then(data => {
            $(".cards").remove();
            console.log(data.length);
            const obj = JSON.stringify(data);
            console.log(obj);
            $.each(JSON.parse(obj), function(i, obj) {
                $(".grid").append('<div class="cards"><div class="card"><div class="card_img"><img src="test"><span>');
                $('.card_img').find('img').attr('src', '/static/store/img/' + obj.image + '.jpg');
                $('.card_img').find('span').text(obj.author + ' - ' + obj.title);


                console.log(obj.title);
            });
        });
    });
});