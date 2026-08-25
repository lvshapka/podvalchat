const username = localStorage.getItem('user');
const userDisplay = document.getElementById('userDisplay');

if (username) {
  userDisplay.textContent = username;
}
