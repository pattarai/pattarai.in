var scroll = new SmoothScroll('a[href*="#"]');

$(document).ready(function () {

    // Call Instagram API
    $.ajax({
        type: "POST",
        url: "https://pattarai.azurewebsites.net",
        datatype: "html",
        success: function (response) {
            var parsedResponse = JSON.parse(response);

            for(var i = 0; i < 4; i++) {
                // console.log(parsedResponse.graphql.user.edge_owner_to_timeline_media.edges[i].node);
                var date = timeConverter(parsedResponse.graphql.user.edge_owner_to_timeline_media.edges[i].node.taken_at_timestamp);
                var fullCaption = parsedResponse.graphql.user.edge_owner_to_timeline_media.edges[i].node.edge_media_to_caption.edges[0].node.text;
                var caption = fullCaption.split(" ").splice(0,13).join(" ") + "...";
                document.getElementById("caption" + i).innerHTML = caption;
                document.getElementById("date" + i).innerHTML = date;

                //  Setting thumbnail
                var thumbnail = parsedResponse.graphql.user.edge_owner_to_timeline_media.edges[i].node.thumbnail_src;
                document.getElementById("post" + i).setAttribute("style", "background-image: url('" + thumbnail + "');");

                // Setting href
                var href = "https://instagram.com/p/" + parsedResponse.graphql.user.edge_owner_to_timeline_media.edges[i].node.shortcode;
                document.getElementById("post" + i).setAttribute("href", href);
            }
        },
        error: function (error) { }
    });

    // Listen for newsletter subscription
    $("#submitNewsletter").click(function() {
        var email = document.getElementById("newsletter-email").value;
        if (email === "") {
            
        }
        else {
            console.log(email);
            document.getElementById("submitNewsletter").innerHTML = "Submitting...";

            // AJAX Request to get data
            $.ajax({
                type: "POST",
                url: "https://mx-out-mixspace.thedanielmark.com/try-mixspace.php",
                datatype: "html",
                data: {
                    email: email,
                },
                success: function (response) {
                    console.log(response);
                    var parsedResponse = JSON.parse(response);
                    if (parsedResponse === "success") {
                        document.getElementById("newsletter-success").classList.remove("d-none");
                        document.getElementById("newsletter-fail").classList.add("d-none");

                        document.getElementById("submitNewsletter").innerHTML = "Submit";

                        document.getElementById("newsletter-email").value = "";
                    }
                    else {
                        document.getElementById("newsletter-success").classList.add("d-none");
                        document.getElementById("newsletter-fail").classList.remove("d-none");

                        document.getElementById("submitNewsletter").innerHTML = "Submit";
                    }
                },
                error: function (error) { }
            });
        }
    });

    // Listen for contact form submission
    $("#w-node-7dfda0f53e4c-2c0354a7").click(function() {
        var full_name = document.getElementById("full_name").value;
        var email = document.getElementById("email-contact").value;
        var phone = document.getElementById("phone").value;
        var subject = document.getElementById("subject").value;
        var description = document.getElementById("description").value;

        if (full_name == "" || email === "" || phone == "" || subject == "" || description == "") {
            
        }
        else {
            console.log(email);
            document.getElementById("w-node-7dfda0f53e4c-2c0354a7").innerHTML = "Submitting...";

            // AJAX Request to get data
            $.ajax({
                type: "POST",
                url: "https://mx-out-mixspace.thedanielmark.com/pattarai-contact.php",
                datatype: "html",
                data: {
                    full_name: full_name,
                    email: email,
                    phone: phone,
                    subject: subject,
                    description: description
                },
                success: function (response) {
                    console.log(response);
                    var parsedResponse = JSON.parse(response);
                    if (parsedResponse === "success") {
                        document.getElementById("contact-success").classList.remove("d-none");
                        document.getElementById("contact-fail").classList.add("d-none");

                        document.getElementById("submitNw-node-7dfda0f53e4c-2c0354a7ewsletter").innerHTML = "Submit";
                    }
                    else {
                        document.getElementById("contact-success").classList.add("d-none");
                        document.getElementById("contact-fail").classList.remove("d-none");

                        document.getElementById("w-node-7dfda0f53e4c-2c0354a7").innerHTML = "Submit";
                    }
                },
                error: function (error) { }
            });
        }
    });

});

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + ' ' + date + ', ' + year;
    return time;
}