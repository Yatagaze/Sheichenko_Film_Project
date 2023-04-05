$(document).ready(function() {
  
  var url = 'https://imdb-api.com/en/API/Top250TVs/k_8rrcp03o';
  $.getJSON(url, function(data) {
    var html = '<div class="container">';
    for (var i = 0; i < data.items.length; i++) {
      var item = data.items[i];
      html += '<div class="item">';
      html += '<span class="item-number">' + (i + 1) + '</span>';
      html += '<img src="' + item.image + '">';
      html += '<h2>' + item.title + '</h2>';
      html += '<p>' + item.year + '</p>';
      html += '<p>Rating: ' + item.imDbRating + '</p>';
      html += '<p>Director: ' + item.crew + '</p>';
      html += '</div>';
    }
    html += '</div>';
    $('#list').html(html);
  })
  .fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ', ' + error;
    console.log('Request Failed: ' + err);
  });
  
  
  $('#search-input').after('<button id="search-button" style="display:none;"></button>');
  $('#search-input').keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      search();
    }
  });
  
  function search() {
    
    var expression = $('#search-input').val();
    if (expression.length > 0) {
      var url = 'https://imdb-api.com/en/API/SearchSeries/k_8rrcp03o/' + expression;
      $.getJSON(url, function(data) {
        var html = '<div class="container">';
        for (var i = 0; i < data.results.length; i++) {
          var result = data.results[i];
          html += '<div class="item">';
          html += '<img src="' + result.image + '">';
          html += '<h2>' + result.title + '</h2>';
          html += '<p>' + result.description + '</p>';
          html += '</div>';
        }
        html += '</div>';
        $('#list').html(html);
      })
      .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log('Request Failed: ' + err);
      });
    }
  }
});






