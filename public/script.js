const links = document.getElementById('links');

fetch('/api/links')
    .then(res => res.json())
    .then(res => {
        res.forEach(element => {
           links.innerHTML += ` 
           <p class="link">original link: <a href="${element.originalLink}" target="_blank">${element.originalLink.length > 20 ? element.originalLink.substring(0, 20) + "..." : element.originalLink}</a>, shortened link: <a href="${element.short}" target="_blank">${element.short}</a></p>
           `;
        });
    })