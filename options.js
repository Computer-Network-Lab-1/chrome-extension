function save_color() {
  var color = document.getElementById('input-color');
  chrome.storage.sync.set({
    color : color.value,
  }, function() {
    var status = document.getElementById('saving-status');
    status.textContent = 'Color option saved';
    setTimeout(function() {
        status.textContent = '';
      }, 750);
  })
}

function save_source() {
  var photoSelected = document.getElementById('500px');
  chrome.storage.sync.set({
    source : [
      {
        name : "photo",
        selected: photoSelected,
      }
    ]
  }, function() {
  })
}

var colorChoose = document.getElementById("color-button")
colorChoose.addEventListener("click", save_color)
var checkPhoto = document.getElementById("500px")
checkPhoto.addEventListener("CheckboxStateChange", save_source)
