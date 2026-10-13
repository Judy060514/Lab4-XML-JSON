fetch('book.xml')
    .then(response => {
        if (!response.ok) throw new Error('Fetch error: ' + response.status);
        return response.text();
    })
    .then(xmlText => {
        // 按 PDF 要求，用 DOMParser 解析 XML 字符串
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        const books = xmlDoc.getElementsByTagName('book');
        const tbody = document.getElementById('bookBody');

        for (let i = 0; i < books.length; i++) {
            const id = books[i].getAttribute('id');
            const title = books[i].getElementsByTagName('title')[0].textContent;
            const author = books[i].getElementsByTagName('author')[0].textContent;
            const price = books[i].getElementsByTagName('price')[0].textContent;

            const row = document.createElement('tr');
            row.innerHTML =
                '<td>' + id + '</td>' +
                '<td>' + title + '</td>' +
                '<td>' + author + '</td>' +
                '<td>$' + price + '</td>';
            tbody.appendChild(row);
        }
    })
    .catch(err => console.error('Fetch error: ' + err.message));