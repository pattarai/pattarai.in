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