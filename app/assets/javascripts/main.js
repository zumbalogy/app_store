$('#form').on('submit', function(event){
    event.preventDefault();
    $.ajax({
        url: "https://itunes.apple.com/search?term=" + $('#input').val() + "&country=us&entity=software",
        type: 'get',
        dataType: 'jsonp',
        success: function(data){
            $('#results').html('<thead><th>Stars</th><th>Title</th><th>Creator</th><th>Rating Count</th><th>Price</th></thead> ')
            var results = data.results
            for (var i = 0; i < results.length; i++){
                tr = $('<tr>')
                tr.append("<td>" + results[i].averageUserRating + '</td>')
                tr.append("<td>" + results[i].trackName + '</td>')
                tr.append("<td>" + results[i].artistName + '</td>')
                tr.append("<td>" + results[i].userRatingCount + '</td>')
                tr.append("<td>" + results[i].price + '</td>')
                $('#results').append(tr)
            }
        }
    })
    $.ajax({
        url: "https://42matters.com/api/1/apps/search.json?q=" + $('#input').val() + "&limit=10 &access_token=df3b621f461a2f14b63f573c29575758c80d6d03",
        method: 'get',
        dataType: 'jsonp',
        success: function(data){
            $('#android-results').html('<thead><th>Stars</th><th>Title</th><th>Creator</th><th>Rating Count</th><th>Price</th><th>Downloads</th></thead> ')
            var results = data.results
            for (var i = 0; i < results.length; i++){
                var stars = Math.round(results[i].rating * 1000) / 1000
                tr = $('<tr>')
                tr.append("<td>" + stars + '</td>')
                tr.append("<td>" + results[i].title + '</td>')
                tr.append("<td>" + results[i].developer + '</td>')
                tr.append("<td>" + results[i].number_ratings + '</td>')
                tr.append("<td>" + results[i].price_numeric + '</td>')
                tr.append("<td>" + results[i].downloads + '</td>')
                $('#android-results').append(tr)
            }

        }
    })
})