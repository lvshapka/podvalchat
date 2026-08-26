form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = textarea.value.trim();
  if (!text) return alert('Пост не может быть пустым');

  // Проверяем, авторизован ли пользователь
  const username = localStorage.getItem('user');
  if (!username) {
    alert('Вы не авторизованы!');
    window.location.href = 'login.html';
    return;
  }

  // Получаем IP-адрес
  const ip = await getIP(); 

  const { error } = await supabase.from('posts').insert([{ 
    text: text,
    username: username,
    ip: ip // <-- Добавлен IP
  }]);

  if (error) {
    console.error(error);
    alert('Ошибка отправки!');
  } else {
    textarea.value = '';
    alert('Пост опубликован!');
    window.location.href = 'index.html';
  }
});