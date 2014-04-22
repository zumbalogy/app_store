// these arrays will store the app objects, which have some data,
// and later, the review data gets attached to its respective app object
var apple_array;
var android_array;

var apple_table_head = '<thead><th>Stars</th><th>Current Version Stars</th><th>Title</th><th>Creator</th><th>Rating Count</th><th>Current Count</th><th>Price</th></thead>'
var android_table_head = '<thead><th>Stars</th><th>Title</th><th>Creator</th><th>Rating Count</th><th>Price</th><th>Downloads</th></thead>'

// these init functions are called on form submit
function init_apple(data){
    apple_array = data.results
    render_apple_array()
}

function init_android(data){
    android_array = data.results
    render_android_array()
}

// these just render the top tables
function render_apple_array(){
    $('#results').html(apple_table_head)
    for (var i = 0; i < apple_array.length; i++){
        var app = apple_array[i]
        tr = $('<tr>')
        tr.attr('id', "" + app.trackId)
        tr.append("<td>" + app.averageUserRating + '</td>')
        tr.append("<td>" + app.averageUserRatingForCurrentVersion + '</td>')
        tr.append("<td>" + app.trackName + '</td>')
        tr.append("<td>" + app.artistName + '</td>')
        tr.append("<td>" + app.userRatingCount + '</td>')
        tr.append("<td>" + app.userRatingCountForCurrentVersion + '</td>')
        tr.append("<td>" + app.price + '</td>')
        tr.append('<button onclick=delete_apple(' + app.trackId + ')>Delete</button>')
        $('#results').append(tr)
    }
}

function render_android_array(){
    $('#android-results').html(android_table_head)
    for (var i = 0; i < android_array.length; i++){
        var app = android_array[i]
        var stars = Math.round(app.rating * 1000) / 1000
        tr = $('<tr>')
        tr.attr('id', app.package_name)
        tr.append("<td>" + stars + '</td>')
        tr.append("<td>" + app.title + '</td>')
        tr.append("<td>" + app.developer + '</td>')
        tr.append("<td>" + app.number_ratings + '</td>')
        tr.append("<td>" + app.price_numeric + '</td>')
        tr.append("<td>" + app.downloads + '</td>')
        tr.append('<button onclick=delete_android("' + app.package_name.replace(/\./g, '') + '")>Delete</button>')
        $('#android-results').append(tr)
    }
}

function get_apple_reviews(){
    for (var i = 0; i < apple_array.length; i++){
        app = apple_array[i]
        apple_array[i].reviews = $.ajax({
            url: "https://itunes.apple.com/rss/customerreviews/id=" + app.trackId + "/json"
        })
    }
}

//send android app to rails, where an API is called
//and HTML gets parsed
var android_reviews = []

function get_android_reviews(){
    android_reviews = []
    for (var i = 0; i < android_array.length; i++){
        var app = android_array[i]
        $.ajax({
            url: "/android_review/" + app.package_name,
            success: function(data){
                android_reviews.push(data)
            }
        })
    }
}

// tie app objects in android array with respective review arrays
function splice_android(){
    for (var x = 0; x < android_reviews.length; x++){
        for (var y = 0; y < android_array.length; y++){
            if (android_array[y].package_name == android_reviews[x]['name']){
                android_array[y]['reviews'] = android_reviews[x].reviews
            }
        }
    }
}

// gets rid of some misc data in the apple reviews
function apple_reviews_clean(){
    for (var i = 0; i < apple_array.length; i++){
        app = apple_array[i]
        app.reviews = JSON.parse(app.reviews.responseText).feed.entry
    }
}

// these are the initial ajax calls to get the apps for a query
function apple_ajax(input){
    $.ajax({
        url: "https://itunes.apple.com/search?term=" + input + "&country=us&entity=software",
        method: 'get',
        dataType: 'jsonp',
        success: function(data){
            init_apple(data)
        }
    })
}

function android_ajax(input){
    $.ajax({
        url: "https://42matters.com/api/1/apps/search.json?q=" + input + "&limit=10 &access_token=df3b621f461a2f14b63f573c29575758c80d6d03",
        method: 'get',
        dataType: 'jsonp',
        success: function(data){
            init_android(data)
        }
    })
}

// these render the reviews and all. functions found in 
// respective files, after getting and cleaning reviews
function render_uls(){
    get_apple_reviews()
    get_android_reviews()
    setTimeout(function(){
        apple_reviews_clean()
        splice_android()
        render_apple_ul()
        render_android_ul()
    }, 5000)
}

// these functions allow user to remove an app before 
// rendering it's reviews
function delete_apple(input){
    for (var i = 0; i < apple_array.length; i++){
        if (apple_array[i].trackId === input){
            apple_array.splice(i, i+1)
        }
    }
    render_apple_array()
}

function delete_android(input){
    for (var i = 0; i < android_array.length; i++){
        if (android_array[i].package_name.replace(/\./g, '') === input){
            android_array.splice(i, i+1)
        }
    }
    render_android_array()
}

function save_apple(input){
    
}

// this is the main mission command, and it all starts once user
// submits query
$('#form').on('submit', function(event){
    event.preventDefault()
    var input = $('#input').val()
    apple_ajax(input)
    android_ajax(input)
    setTimeout(function(){
        $('#render_button').append('<button onclick="render_uls()">Render Reviews</button>')
    }, 4000)
   
})
