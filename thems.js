function toggleDarkTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}
