import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://oxerwhayfykmxylnkxzp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZXJ3aGF5ZnlrbXh5bG5reHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NjQ0ODgsImV4cCI6MjEwMzE0MDQ4OH0.iH6O7nViK6nsaUaB4-I5WiD_Pi7iKYpJFhTeiUO4d2A'
);

const form = document.getElementById('registerWindow');
const userInput = document.getElementById('registerUser');
const passInput = document.getElementById('registerPass');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = userInput.value.trim();
  const password = passInput.value.trim();

  if (!username || !password) return alert('Заполните все поля!');

  const { error } = await supabase.from('users').insert([{ username, password }]);

  if (error) {
    console.error(error);
    alert('Ошибка регистрации: пользователь уже существует или неверные данные');
  } else {
    alert('Регистрация успешна!');
    window.location.href = 'login.html';
  }
});