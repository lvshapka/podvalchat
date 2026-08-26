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

  try {
    // Получаем IP-адрес
    const ip = await getIP(); 
    console.log('IP получен:', ip); // Отладка

    const { error } = await supabase.from('posts').insert([{ 
      text: text,
      username: username,
      ip: ip
    }]);

    if (error) {
      console.error('Ошибка Supabase:', error);
      alert('Ошибка отправки: ' + error.message);
    } else {
      textarea.value = '';
      alert('Пост опубликован!');
      window.location.href = 'index.html';
    }
  } catch (err) {
    console.error('Ошибка:', err);
    alert('Произошла ошибка: ' + err.message);
  }
});