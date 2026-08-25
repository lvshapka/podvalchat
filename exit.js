function logout() {
  if (confirm('Вы уверены, что хотите выйти?')) {
    localStorage.removeItem('user'); // Удаляем только локальные данные
    alert('Вы вышли из системы');
    window.location.href = 'index.html';
  }
}