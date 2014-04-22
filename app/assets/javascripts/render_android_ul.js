// this is called after a few second timeout by the render_uls funciton
// after button press
function render_android_ul(){
    var ul = $('#android-reviews')
    ul.html('')
    $.each(android_array, function(index, value){
        var ul2 = $('<ul>')
        ul2.append('<li><h4>' + value.title + '</h4></li>')
        ul2.append('<li>By: ' + value.developer + '</li>')
        ul2.append('<li>Version: ' + value.version + '</li>')
        ul2.append('<li>Downloads: ' + value.downloads + '</li>')
        ul2.append('<li>Rating: ' + value.rating + '</li>')
        ul2.append('<li>Ratings: ' + value.number_ratings + '</li>')
        ul2.append('<li>Price: ' + value.price_numeric + '</li>')

        var table_one = $('<table>')
        table_one.append("<th>Date</th><th>Review</th>")
        var table_two = $('<table>')
        table_two.append("<th>Review Count</th><th>Error</th><th>Bug</th><th>Crash</th><th>Broke</th><th>Break</th><th>Fix</th><th>Slow</th><th>Freeze</th><th>Froze</th><th>Uninstall</th><th>Terrible</th><th>Bad</th><th>Worst</th><th>Worse</th><th>Hate</th><th>Suck</th>")
        var word_count = {
            error: 0,
            bug: 0,
            crash: 0,
            broke: 0,
            break: 0,
            fix: 0,
            slow: 0,
            freeze: 0,
            froze: 0,
            uninstall: 0,
            terrible: 0,
            bad: 0,
            worst: 0,
            worse: 0,
            hate: 0,
            suck: 0
        }
        $.each(value.reviews, function(idx, val){
            for (var key in word_count){
                if (val.review.search(new RegExp(key, "i")) > -1) {
                    word_count[key] ++
                }
            }
            var tr = $('<tr>')
            tr.append('<td>' + val.time + '</td>')
            tr.append('<td>' + val.review + '</td>')
            table_one.append(tr)
        })
        var count_tr = $('<tr>')
        count_tr.append('<td>' + value.reviews.length + '</td>') 
        count_tr.append('<td>' + word_count.error + '</td>')
        count_tr.append('<td>' + word_count.bug + '</td>') 
        count_tr.append('<td>' + word_count.crash + '</td>') 
        count_tr.append('<td>' + word_count.broke + '</td>') 
        count_tr.append('<td>' + word_count.break + '</td>') 
        count_tr.append('<td>' + word_count.fix + '</td>') 
        count_tr.append('<td>' + word_count.slow + '</td>') 
        count_tr.append('<td>' + word_count.freeze + '</td>') 
        count_tr.append('<td>' + word_count.froze + '</td>') 
        count_tr.append('<td>' + word_count.uninstall + '</td>') 
        count_tr.append('<td>' + word_count.terrible + '</td>') 
        count_tr.append('<td>' + word_count.bad + '</td>') 
        count_tr.append('<td>' + word_count.worst + '</td>') 
        count_tr.append('<td>' + word_count.worse + '</td>') 
        count_tr.append('<td>' + word_count.hate + '</td>')
        count_tr.append('<td>' + word_count.suck + '</td>')
        table_two.append(count_tr)
        ul2.append(table_two)
        ul2.append(table_one)
        ul.append(ul2)
        var trs = table_two.children('tbody').children()
        for (var z = 0; z < trs.length; z++){
            $.each($(trs[z]).children(), function(index, value){
                $(value).attr('style', 'color: rgba(0,0,0,' + $(value).text() + ');')
            })
        }
    })
}
