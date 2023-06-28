var commands, regex, results;

// load the command list
window.addEventListener("load", (event) => {
    // needs to have "Access-Control-Allow-Origin: https://stand.gg/"
    // then you can have it get it directly from stand and delete commands.txt
    // fetch("https://stand.gg/components/command-list.txt")
    fetch("command-list.txt")
        .then((res) => res.text())
        .then((text) => {
            commands = text;
            document.getElementById("commands").textContent = text;
        })
        .catch((e) => console.error(e));
});

// check for search term update
window.addEventListener("load", (event) => {
    $(".search_term").on("input", function (e) {
        search();
    });
});

// search command list
function search() {
    regex = new RegExp(".*" + $(".search_term").val() + ".*\n?", "gi");
    $("#results").text("");
    $("#result_number").text("");

    if ($(".search_term").val() != "") {
        results = [...commands.matchAll(regex)];

        $("#result_number").text(
            "Results: " +
                results.length +
                " (*LINKS ARE CURRENTLY JUST PLACEHOLDERS)"
        );

        display_results();
    }
}

// display the results
function display_results() {
    // reduce lag a bit by only showing results when there is less than 500
    if (results.length < 500) {
        for (const element of results) {
            $("#results").append(
                '<a href="url">[Open In Stand]</a> ' + '<a href="url">[Copy Link]</a> ' + ltrim(element[0]) + "</br>"
            );
        }
    }
    else {
        $("#results").append("Over 500 Results");
    }
}

// trim whitespace
function ltrim(str) {
    if (!str) return str;
    return str.replace(/^\s+/g, "");
}
