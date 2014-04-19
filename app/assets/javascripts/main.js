$('#form').on('submit', function(event){
    event.preventDefault();
    $.ajax({
        url: "https://itunes.apple.com/search?term=" + $('#input').val() + "&country=us&entity=software",
        type: 'get',
        dataType: 'jsonp',
        success: function(data){
            $('table').html('<thead><th>Stars</th><th>Title</th><th>Creator</th><th>Rating Count</th><th>Price</th></thead> ')
            results = data.results
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
})