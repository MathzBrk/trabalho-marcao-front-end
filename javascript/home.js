
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        link.classList.add('active');
        

        const menuText = link.querySelector('span').textContent;
        updateContent(menuText);
    });
});

function updateContent(menuItem) {
    const contentDiv = document.getElementById('content');
    
    contentDiv.innerHTML = `
        <h2>${menuItem}</h2>
        <div class="alert alert-info mt-3">
            Conteúdo da seção ${menuItem} será carregado aqui.
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    dropdownElementList.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('show');
        });
    });
});