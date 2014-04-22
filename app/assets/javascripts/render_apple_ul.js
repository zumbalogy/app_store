// this is called after a few second timeout by the render_uls funciton
// after button press
function render_apple_ul(){
    $('#apple-reviews').html('')
    for (var i = 0; i < apple_array.length; i++){
        var app = apple_array[i]
        var ul = $('<ul>')
        ul.append('<li><h4>' + app.trackName + '</h4></li>')
        ul.append('<li> By: ' + app.artistName + '</li>')
        ul.append('<li> Current Version: ' + app.version + '</li>')
        ul.append('<li> Stars: ' + app.averageUserRating + '</li>')
        ul.append('<li> Current Version Stars: ' + app.averageUserRatingForCurrentVersion + '</li>')
        ul.append('<li> Rating Count: ' + app.userRatingCount + '</li>')
        ul.append('<li> Current Version Rating Count: ' + app.userRatingCountForCurrentVersion + '</li>')
        ul.append('<li> Price: ' + app.price + '</li>')

        var table = $('<table>')
        table.append('<th>Version</th>')
        table.append('<th>Stars</th>')
        table.append('<th>Review</th>')

        var word_count = {}

        for (var x = 1; x < app.reviews.length; x++){

            var version = app.reviews[x]['im:version'].label
            var content = app.reviews[x].content.label
            var rating = parseInt(app.reviews[x]['im:rating'].label)
            if (word_count[version]){
                word_count[version]['count'] ++
            } else {
                word_count[version] = {'count': 1}
            }
            this_count = word_count[version]
            word_count[version] = {
                count: word_count[version]['count'],
                stars: (this_count.stars || 0) + rating,
                one_star: (this_count.one_star || 0) + (rating === 1 ? 1 : 0),
                two_star: (this_count.two_star || 0) + (rating === 2 ? 1 : 0),
                three_star: (this_count.three_star || 0) + (rating === 3 ? 1 : 0),
                four_star: (this_count.four_star || 0) + (rating === 4 ? 1 : 0),
                five_star: (this_count.five_star || 0) + (rating === 5 ? 1 : 0),
                error: (this_count.error || 0) + (content.search(/error/i) > -1 ? 1 : 0),
                bug: (this_count.bug || 0) + (content.search(/bug/i) > -1 ? 1 : 0),
                crash: (this_count.crash || 0) + (content.search(/crash/i) > -1 ? 1 : 0),
                broke: (this_count.broke || 0) + (content.search(/broke/i) > -1 ? 1 : 0),
                break: (this_count.break || 0) + (content.search(/break/i) > -1 ? 1 : 0),
                fix: (this_count.fix || 0) + (content.search(/fix/i) > -1 ? 1 : 0),
                slow: (this_count.slow || 0) + (content.search(/slow/i) > -1 ? 1 : 0),
                freeze: (this_count.freeze || 0) + (content.search(/freeze/i) > -1 ? 1 : 0),
                froze: (this_count.froze || 0) + (content.search(/froze/i) > -1 ? 1 : 0),
                uninstall: (this_count.uninstall || 0) + (content.search(/uninstall/i) > -1 ? 1 : 0),
                terrible: (this_count.terrible || 0) + (content.search(/terrible/i) > -1 ? 1 : 0),
                bad: (this_count.bad || 0) + (content.search(/bad/i) > -1 ? 1 : 0),
                worst: (this_count.worst || 0) + (content.search(/worst/i) > -1 ? 1 : 0),
                worse: (this_count.worse || 0) + (content.search(/worse/i) > -1 ? 1 : 0),
                hate: (this_count.hate || 0) + (content.search(/hate/i) > -1 ? 1 : 0),
                suck: (this_count.suck || 0) + (content.search(/suck/i) > -1 ? 1 : 0)
            }

            var tr = $('<tr>')
            tr.append('<td>' + app.reviews[x]['im:version'].label + '</td>')
            tr.append($('<td>' + app.reviews[x]['im:rating'].label + '</td>').attr('style', 'color: rgba(' + ((5 - app.reviews[x]['im:rating'].label) * 50) + ',0,0,1);'))
            tr.append('<td>' + content + '</td>')
            table.append(tr)
        }

        var word_table = $('<table>')
        word_table.append('<th>Version</th><th>Review Count</th><th>Avg Stars</th><th>1 star</th><th>2 star</th><th>3 star</th><th>4 star</th><th>5 star</th><th>Error</th><th>Bug</th><th>Crash</th><th>Broke</th><th>Break</th><th>Fix</th><th>Slow</th><th>Freeze</th><th>Froze</th><th>Uninstall</th><th>Terrible</th><th>Bad</th><th>Worst</th><th>Worse</th><th>Hate</th><th>Suck</th>')

        for (var key in word_count){
            var obj = word_count[key]
            var avg_star = Math.round((obj.stars / obj.count) * 1000) / 1000
            var tr = $('<tr>')
            tr.append('<td>' + key            + '</td>')
            tr.append('<td>' + obj.count      + '</td>')
            tr.append('<td>' + avg_star       + '</td>')
            tr.append('<td>' + obj.one_star   + '</td>')
            tr.append('<td>' + obj.two_star   + '</td>')
            tr.append('<td>' + obj.three_star + '</td>')
            tr.append('<td>' + obj.four_star  + '</td>')
            tr.append('<td>' + obj.five_star  + '</td>')
            tr.append('<td>' + obj.error      + '</td>')
            tr.append('<td>' + obj.bug        + '</td>')
            tr.append('<td>' + obj.crash      + '</td>')
            tr.append('<td>' + obj.broke      + '</td>')
            tr.append('<td>' + obj.break      + '</td>')
            tr.append('<td>' + obj.fix        + '</td>')
            tr.append('<td>' + obj.slow       + '</td>')
            tr.append('<td>' + obj.freeze     + '</td>')
            tr.append('<td>' + obj.froze      + '</td>')
            tr.append('<td>' + obj.uninstall  + '</td>')
            tr.append('<td>' + obj.terrible   + '</td>')
            tr.append('<td>' + obj.bad        + '</td>')
            tr.append('<td>' + obj.worst      + '</td>')
            tr.append('<td>' + obj.worse      + '</td>')
            tr.append('<td>' + obj.hate       + '</td>')
            tr.append('<td>' + obj.suck       + '</td>')
            word_table.append(tr)
        }

        ul.append(word_table)
        ul.append(table)
        $('#apple-reviews').append(ul)
        var trs = word_table.children('tbody').children()
        for (var z = 0; z < trs.length; z++){
            $.each($(trs[z]).children(), function(index, value){
                $(value).attr('style', 'color: rgba(0,0,0,' + $(value).text() + ');')
            })
        }
        $('#apple-reviews').append('<hr/>')
    }
}
