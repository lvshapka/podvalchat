import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://oxerwhayfykmxylnkxzp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZXJ3aGF5ZnlrbXh5bG5reHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NjQ0ODgsImV4cCI6MjEwMzE0MDQ4OH0.iH6O7nViK6nsaUaB4-I5WiD_Pi7iKYpJFhTeiUO4d2A'
);

const form = document.getElementById('postSend');
const textarea = document.getElementById('postText');

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

  const { error } = await supabase.from('posts').insert([{ 
    text: text,
    username: username 
  }]);

  if (error) {
    console.error(error);
    alert('Ошибка отправки!');
  } else {
    textarea.value = '';
    alert('Пост опубликован!');
    window.location.href = 'index.html'; // Перенаправляем на главную
  }
});