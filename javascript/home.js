document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const menuText = link.querySelector('span').textContent.trim();
        const page = link.getAttribute('data-page');

        updateContent(page, menuText);
    });
});

async function updateContent(page, menuItem) {
    const contentDiv = document.getElementById('content');

    try {
        const response = await fetch(`${page}.html`);
        const html = await response.text();
        
        contentDiv.innerHTML = html;
    } catch (error) {
        contentDiv.innerHTML = `
            <h2>${menuItem}</h2>
            <div class="alert alert-danger mt-3">
                Erro ao carregar a seção ${menuItem}.
            </div>
        `;
    }
}

// Dropdown Toggle
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
