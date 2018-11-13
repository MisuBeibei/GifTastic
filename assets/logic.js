$(document).ready(function() {
    var animals = ["cat","Dog","Panda","Seal","Squirrel","Arctic Fox", "Koala","Ratel","Parrot","Alpaca","Penguin","Sea Otter"]
    gifs = "";
    
    function givenButtons() {
        $("#buttons").empty();
        for (var i = 0; i<animals.length; i++) {
            var a = $("<button>");
            a.addClass("btn btn-info");
            a.attr("data-name", animals[i]);
            a.text(animals[i]);
            $("#buttons").append(a);
        }
        s = $("#exampleInput").focus();
    }

    givenButtons();

    $("#submit").on("click", function() {
        event.preventDefault();
        var animal = $("#exampleInput").val().trim();
        animals.push(animal);
        givenButtons();
    });

    $(document).on("click", "button", function() {
        $("gifs").empty();
        
        var b = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/random?q=" + b + "&api_key=dc6zaTOxFJmzC&limit=10";
            
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(queryURL);
            console.log(response);

            var results = response.data;

            for (var i = 0; i<results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height.url);
                animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                animalImage.attr('data-animate', results[i].images.fixed_height.url);animalImage.attr('data-state', 'still');

                gifDiv.append(p);
                gifDiv.append(animalImage);

                $("#gifs").append(gifDiv);
            }
        });
    });

    $(document).on("click", "showImage", function() {
        var state = $(this).data("state");
        if(state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});

    //             $('.anImg').on('click', function() {
                
    //                 var state = $(this).attr('data-state'); 
    //                 console.log(this);

    //                 if (state == 'still') {
                    
    //                 $(this).attr('src', $(this).data('animate'));
                    
    //                 $(this).attr('data-state', 'animate');

    //                 } else {
                            
    //                 $(this).attr('src', $(this).data('still'));
                    
    //                 $(this).attr('data-state', 'still');
    //                 }      
    //             });
    //         });
    //     });
    // });
