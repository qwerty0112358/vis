const toHomePage = document.getElementById('tittle');

toHomePage.addEventListener('click', () => {
    localStorage.removeItem('loadfile');
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

let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
}

if (darkmode == 'active') enableDarkmode()

themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== 'active' ? enableDarkmode() : disableDarkmode();
});