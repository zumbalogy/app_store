var apple_array;
var android_array;

var apple_table_head = '<thead><th>Stars</th><th>Current Version Stars</th><th>Title</th><th>Creator</th><th>Rating Count</th><th>Current Count</th><th>Price</th></thead>'
var android_table_head = '<thead><th>Stars</th><th>Title</th><th>Creator</th><th>Rating Count</th><th>Price</th><th>Downloads</th></thead>'

function init_apple(data){
    apple_array = data.results
    render_apple_array()
}

function init_android(data){
    android_array = data.results
    render_android_array()
}

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

function splice_android(){
    for (var x = 0; x < android_reviews.length; x++){
        for (var y = 0; y < android_array.length; y++){
            if (android_array[y].package_name == android_reviews[x]['name']){
                android_array[y]['reviews'] = android_reviews[x].reviews
            }
        }
    }
}

function apple_reviews_clean(){
    for (var i = 0; i < apple_array.length; i++){
        var app = apple_array[i]
        app.reviews = JSON.parse(app.reviews.responseText).feed.entry
    }
}

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


function render_apple_ul(){
    $('#apple-reviews').html('')
    for (var i = 0; i < apple_array.length; i++){
        var app = apple_array[i]
        var ul = $('<ul>')
        ul.append('<li><h4>' + app.trackName + '</h4></li>')
        ul.append('<li> By: ' + app.artistName + '</li>')
        ul.append('<li> Stars: ' + app.averageUserRating + '</li>')
        ul.append('<li> Current Version Stars: ' + app.averageUserRatingForCurrentVersion + '</li>')
        ul.append('<li> Rating Count: ' + app.userRatingCount + '</li>')
        ul.append('<li> Current Version Rating Count: ' + app.userRatingCountForCurrentVersion + '</li>')
        ul.append('<li> Price: ' + app.price + '</li>')

        var table = $('<table>')
        for (var x = 1; x < app.reviews.length; x++){
            var tr = $('<tr>')
            tr.append('<td>' + app.reviews[x]['im:version'].label + '</td>')
            tr.append('<td>' + app.reviews[x].content.label + '</td>')
            table.append(tr)
        }

        ul.append(table)
        $('#apple-reviews').append(ul)
        $('#apple-reviews').append('<hr/>')
    }
}

$('#form').on('submit', function(event){
    event.preventDefault()
    var input = $('#input').val()
    apple_ajax(input)
    android_ajax(input)
    setTimeout(function(){
        get_apple_reviews()
        get_android_reviews()
    }, 3500)
    setTimeout(function(){
        apple_reviews_clean()
        splice_android()
        render_apple_ul()
    }, 5500)
})
