const sidebar = document.getElementById('sidebar');
const resizeBar = document.getElementById('resize-bar');
let currentPointerId = null;

resizeBar.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    
    currentPointerId = e.pointerId;
    resizeBar.setPointerCapture(e.pointerId);
    
    window.addEventListener("pointermove", resize);
    window.addEventListener("pointerup", stopResize);
    document.body.style.cursor = 'ew-resize';
});

function resize(e) {
    if (currentPointerId === null) return;
    
    const newWidth = e.clientX; 
    if (newWidth > 5 && newWidth < window.innerWidth - 5) {
        document.documentElement.style.setProperty("--resizing-sidebar-width", newWidth + "px");
    }
}

function stopResize(e) {
    currentPointerId = null;
    window.removeEventListener("pointermove", resize);
    window.removeEventListener("pointerup", stopResize);
    document.body.style.cursor = 'default';
}

const article = document.querySelectorAll('.leaf');
article.forEach(leaf => {
    leaf.addEventListener('click', () => {
        loadMarkdownFromClick(leaf.dataset.file);
    })
});

async function loadMarkdownFromClick(fileName) {
    if (!fileName || fileName === 'null') return;
    let last = fileName.slice(-7);
    fileName = fileName.replace(last, "") + ".md";
    const response = await fetch(`./articles/${fileName}`); 
    const markdown = await response.text();
    document.getElementById('main-content').innerHTML = marked.parse(markdown);
    last = last.replace("-", "");
    const targetId = last.replace(".md", "");
    const element = document.getElementById(targetId);
    element.scrollIntoView(true);
    localStorage.setItem('loadfile', fileName);
    MathJax.typesetPromise();
}

async function loadMarkdownRefresh(fileName) {
    if (!fileName || fileName === 'null') return;
    const response = await fetch(`./articles/${fileName}`); 
    const markdown = await response.text();
    document.getElementById('main-content').innerHTML = marked.parse(markdown);
    localStorage.setItem('loadfile', fileName);
    MathJax.typesetPromise();    
}

window.addEventListener('beforeunload', () => {
    localStorage.setItem('scrollPos', window.scrollY);
});

window.addEventListener('load', () => {
    const fileName = localStorage.getItem('loadfile');
    const savedY = localStorage.getItem('scrollPos');
    const mainContent = document.getElementById('main-content');

    if (fileName && fileName !== 'null' && fileName !== 'undefined' && fileName !== 'None' && fileName.trim() !== "") {
        loadMarkdownRefresh(fileName)
        mainContent.classList.add('markdown');
        mainContent.classList.remove('home-page');
        if (savedY) {
            window.scrollTo(0, parseInt(savedY));
            localStorage.removeItem('scrollPos');
        }
    } else {
        mainContent.classList.add('home-page');
        mainContent.classList.remove('markdown');
        localStorage.removeItem('loadfile');
    }
});

