const comeback = document.getElementById('tittle');

comeback.addEventListener('click', () => {
    location.reload();
});

const mainContent = document.getElementById('main-content');

if (mainContent.children.length > 0) {
    mainContent.classList.remove('markdown');
    mainContent.classList.add('home-page');
} else {
    mainContent.classList.remove('home-page');
    mainContent.classList.add('markdown'); 
}