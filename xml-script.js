// Step 1: grab the XML file
fetch('book.xml')
    .then(response => {
        // Check the status first; a 404 would still "succeed" without this
        if (!response.ok) throw new Error('Fetch error: ' + response.status);
        // Read it as plain text, then parse manually with DOMParser
        return response.text();
    })
    .then(xmlText => {
        // DOMParser turns the raw string into an XML DOM we can query
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        // getElementsByTagName returns a live collection, like an array
        const books = xmlDoc.getElementsByTagName('book');
        const tbody = document.getElementById('bookBody');

        // Loop through each <book> and build a table row
        for (let i = 0; i < books.length; i++) {
            // getAttribute is for attributes, textContent for inner text
            const id = books[i].getAttribute('id');
            const title = books[i].getElementsByTagName('title')[0].textContent;
            const author = books[i].getElementsByTagName('author')[0].textContent;
            const price = books[i].getElementsByTagName('price')[0].textContent;

            // Build the row with innerHTML for brevity
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