function selectFolder() {
  const folderInput = document.getElementById('folderInput');
  folderInput.click();
}

function handleFolderSelection(event) {
  const folderInput = event.target;
  const folder = folderInput.files[0];
  const selectedFolderNameInput = document.getElementById('selectedFolderName');

  if (folder) {
    // Extract the folder name from the full path
    const folderPath = folder.webkitRelativePath;
    const folderName = folderPath.split('/')[0]; // Get the first part of the path which is the folder name
    selectedFolderNameInput.value = folderName;
  }
}

/*
function submitForm() {
  const selectedFolderName = document.getElementById('selectedFolderName').value;
  const selectedTime = document.getElementById('appt').value;

  const formData = {
      selectedFolderPath: selectedFolderName,
      selectedTime
  };

  console.log('Data submitted:', formData);
}
*/
document.getElementById('folderInput').addEventListener('change', handleFolderSelection);


function downloadData() {
  const selectedFolderName = document.getElementById('selectedFolderName').value;
  const selectedTime = document.getElementById('appt').value;

  const formData = {
      selectedFolderPath: selectedFolderName,
      selectedTime
  };

  const jsonData = JSON.stringify(formData, null, 2);

  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json';
  a.textContent = 'Download data.json';

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
}

function submitForm() {
  downloadData();
}

//activity log

var requestURL = 'assets/data.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var activityData = request.response;
  console.log(activityData);
  if (activityData) {
    $(document).ready(function(){
      $('#table-activity').bootstrapTable({
        data: activityData
    });
    })
  }
}
