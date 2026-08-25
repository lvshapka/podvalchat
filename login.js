import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://oxerwhayfykmxylnkxzp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZXJ3aGF5ZnlrbXh5bG5reHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NjQ0ODgsImV4cCI6MjEwMzE0MDQ4OH0.iH6O7nViK6nsaUaB4-I5WiD_Pi7iKYpJFhTeiUO4d2A'
);

const form = document.getElementById('loginWindow');
const userInput = document.getElementById('loginUser');
const passInput = document.getElementById('loginPass');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = userInput.value.trim();
  const password = passInput.value.trim();

  if (!username || !password) return alert('Заполните все поля!');

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (error || !data) {
    alert('Неверный логин или пароль');
  } else {
    alert('Добро пожаловать, ' + data.username + '!');
    localStorage.setItem('user', data.username);
    window.location.href = 'index.html';
  }
});