var apple_array;
var android_array;

var apple_table_head = '<thead><th>Stars</th><th>Title</th><th>Creator</th><th>Rating Count</th><th>Price</th></thead>'
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
        tr.append("<td>" + app.trackName + '</td>')
        tr.append("<td>" + app.artistName + '</td>')
        tr.append("<td>" + app.userRatingCount + '</td>')
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

$('#form').on('submit', function(event){
    event.preventDefault()
    var input = $('#input').val()
    apple_ajax(input)
    android_ajax(input)
})