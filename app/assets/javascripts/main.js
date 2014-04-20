var apple_array;
var android_array;

var apple_table_head = '<thead><th>Stars</th><th>Title</th><th>Creator</th><th>Rating Count</th><th>Price</th></thead>'
var android_table_head = '<thead><th>Stars</th><th>Title</th><th>Creator</th><th>Rating Count</th><th>Price</th><th>Downloads</th></thead>'

function init_apple(data){
    apple_array = data.results
    render_apple_array()
}

function render_apple_array(){
    $('#results').html(apple_table_head)
    for (var i = 0; i < apple_array.length; i++){
        tr = $('<tr>')
        tr.append("<td>" + apple_array[i].averageUserRating + '</td>')
        tr.append("<td>" + apple_array[i].trackName + '</td>')
        tr.append("<td>" + apple_array[i].artistName + '</td>')
        tr.append("<td>" + apple_array[i].userRatingCount + '</td>')
        tr.append("<td>" + apple_array[i].price + '</td>')
        $('#results').append(tr)
    }
}

function init_android(data){
    android_array = data.results
    render_android_array()
}

function render_android_array(){
    $('#android-results').html(android_table_head)
    for (var i = 0; i < android_array.length; i++){
        var stars = Math.round(android_array[i].rating * 1000) / 1000
        tr = $('<tr>')
        tr.append("<td>" + stars + '</td>')
        tr.append("<td>" + android_array[i].title + '</td>')
        tr.append("<td>" + android_array[i].developer + '</td>')
        tr.append("<td>" + android_array[i].number_ratings + '</td>')
        tr.append("<td>" + android_array[i].price_numeric + '</td>')
        tr.append("<td>" + android_array[i].downloads + '</td>')
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