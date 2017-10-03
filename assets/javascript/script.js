// 
// GifTastic
//

$(document).ready(function() {

  var currentEmotion;
  var topics = ['happy', 'confused', 'silly', 'frustrated', 'smelly'];

  // Creates initial button set from default topics[] array 
  for (i = 0; i < topics.length; i++) {
    currentEmotion = topics[i];
    createButton(currentEmotion);
  }

  // Creates and appends new buttons
  function createButton(currentEmotion) {
    var newButton = $('<button>').text(currentEmotion).attr({
        class: 'gif-button', 
        'data-emotion': currentEmotion
    });
    $('#gif-buttons').append(newButton);
  }
  

  // Click for dynamic header buttons
  $(document).on('click', '.gif-button', function() {
    // Empties any previous gifs
    $('#gif-holder').empty();

    // Gets emotion value from clicked button
    currentEmotion = $(this).attr('data-emotion');
    $('#gif-label').text(currentEmotion + ' gifs');
    $('#content-wrapper p').show();

    // Sets current emotion as API query search term
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        currentEmotion + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      var results = response.data;
      for (i = 0; i < results.length; i++) {
        // Gathering values for API object
        var rating = results[i].rating;
        var stillImage = results[i].images.fixed_height_still.url;
        var animateImage = results[i].images.fixed_height.url;
        // Creating and appending elements that reflect values
        var newGifDiv = $('<div>');
        var newGifImage = $('<img>').attr({
            class: 'gif-image', 
            'data-state': 'still', 
            'data-still': stillImage, 
            'data-animate': animateImage,
            src: stillImage
        });
        var newGifPara = $('<p>').text('Rating: ' + rating);
        newGifDiv.append(newGifImage, newGifPara);
        $('#gif-holder').append(newGifDiv);
      }
    })

  });
  

  // Click for form "add emotion" button
  $('input[type="submit"]').on('click', function(event) {
    event.preventDefault();

    // Clears error message
    $('#error-message').text('');

    // Pulls entered input text/new emotion
    currentEmotion = $("#gif-input").val().trim();

    // Checks if emotion already exists in topics[] array
    if (topics.indexOf(currentEmotion) !== -1) {
      $('#error-message').text('Already a button for that.');
    } else {
      topics.push(currentEmotion);
      createButton(currentEmotion);
    }

    // Clears input
    $('#gif-input').val('');

  });

  // Click image
  $(document).on('click', '.gif-image', function() {
      // Get current "state" of image
      var gifState = $(this).attr('data-state');
      // Image state/src toggle 
      if (gifState === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
    });

});