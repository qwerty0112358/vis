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
