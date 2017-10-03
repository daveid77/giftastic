// 
// jQuery RPG Game
//

$(document).ready(function() {

  var currentEmotion;
  var topics = ['happy', 'confused', 'silly', 'frustrated', 'angry'];

  // Creates initial button set from topics[] array 
  for (i = 0; i < topics.length; i++) {
    currentEmotion = topics[i];
    createButton(currentEmotion);
  }

  // Creates new buttons
  function createButton(currentEmotion) {
    var newButton = $('<button>').text(currentEmotion).attr({
        class: 'gif-button', 
        'data-emotion': currentEmotion,
        'data-state': 'still', 
        'data-still': '', 
        'data-animate': ''
    });
    $('#gif-buttons').append(newButton);
  }
  
  // Click for dynamic header buttons
  $('.gif-button').on('click', function() {
    // Gets emotion value from clicked button
    currentEmotion = $(this).attr('data-emotion');
      console.log('currentEmotion: ' + currentEmotion);
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
        console.log(topics);
      createButton(currentEmotion);
    }
    // Clears input
    $('#gif-input').val('');
  });

});