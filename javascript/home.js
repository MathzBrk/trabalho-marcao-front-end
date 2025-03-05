document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const menuText = link.querySelector('span').textContent.trim();
        const page = link.getAttribute('data-page');

        if (page) {
            await updateContent(page, menuText);
        }
    });
});

async function updateContent(page, menuItem) {
    const contentDiv = document.getElementById('content');

    try {
        const response = await fetch(`${page}.html`);
        if (!response.ok) throw new Error(`Erro ao carregar ${page}.html`);

        const html = await response.text();
        contentDiv.innerHTML = html;

        executeScripts(contentDiv);

    } catch (error) {
        contentDiv.innerHTML = `
            <h2>${menuItem}</h2>
            <div class="alert alert-danger mt-3">
                Erro ao carregar a seção ${menuItem}.
            </div>
        `;
    }
}

function executeScripts(container) {
    const scripts = container.querySelectorAll("script");

    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");

        if (oldScript.src) {
            newScript.src = oldScript.src;
            newScript.async = true;
        } else {
            newScript.textContent = oldScript.textContent;
        }

        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
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
