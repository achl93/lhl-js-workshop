var socket = io();

function updateScroll() {
  var messageBody = document.querySelector('.main');
  messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}

$('form').submit(function () {
  var text = $('#message').val();
  var initials = $('#initials').val();
  var message = {
    initials: initials,
    text: text
  }
  socket.emit('message', message);
  $('#message').val('');
  return false;
});

socket.on('catchup', (msg) => {
  $('<li>').text((msg.initials === "" ? 'Unknown' : msg.initials) + ' says: ' + msg.text).appendTo('#history');
  updateScroll();
})

socket.on('message', (msg) => {
  $('<li>').text((msg.initials === "" ? 'Unknown' : msg.initials) + ' says: ' + msg.text).appendTo('#history');
  updateScroll();
});