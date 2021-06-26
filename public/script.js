const links = document.getElementById('links');

fetch('http://localhost:3000/api/links')
    .then(res => res.json())
    .then(res => {
        res.forEach(element => {
           links.innerHTML += ` 
           <p class="link">URL: <a href="${element.originalLink}" target="_blank">${element.originalLink}</a>, shortened: <a href="${element.short}" target="_blank">${element.short}</a></p>
           `;
        });
    })