const supabase = createClient(
  'https://oxerwhayfykmxylnkxzp.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZXJ3aGF5ZnlrbXh5bG5reHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NjQ0ODgsImV4cCI6MjEwMzE0MDQ4OH0.iH6O7nViK6nsaUaB4-I5WiD_Pi7iKYpJFhTeiUO4d2A' 
);

async function loadPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('timestamp', { ascending: false }); // Сортировка от новых к старым

  if (error) {
    console.error('Ошибка загрузки постов:', error);
    return;
  }

  const feedContainer = document.querySelector('.posts-feed');
  if (feedContainer) {
    feedContainer.innerHTML = data.map(post => `
      <div class="post">
        <p>${post.text}</p>
        <small>${new Date(post.timestamp).toLocaleString()}</small>
      </div>
    `).join('');
  }
}

loadPosts();