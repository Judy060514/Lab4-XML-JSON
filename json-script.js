// Step 1: grab the JSON file
fetch('userProfiles.json')
    .then(response => {
        // Always check response.ok before parsing
        if (!response.ok) throw new Error('Fetch error: ' + response.status);
        // .json() automatically parses the response body
        return response.json();
    })
    .then(json => {
        const container = document.getElementById('profileContainer');

        // forEach is cleaner than a for loop for arrays
        json.userProfiles.forEach(user => {
            const card = document.createElement('div');
            card.className = 'profile-card';

            // Nested objects: use dot notation to reach preferences/address
            card.innerHTML =
                '<h2>' + user.firstName + ' ' + user.lastName + '</h2>' +
                '<p><span class="label">Email:</span> ' + user.email + '</p>' +
                '<p><span class="label">Date of Birth:</span> ' + user.dateOfBirth + '</p>' +
                '<p><span class="label">Theme:</span> ' + user.preferences.theme + '</p>' +
                '<p><span class="label">Language:</span> ' + user.preferences.language + '</p>' +
                '<p><span class="label">Notifications:</span> ' + user.preferences.notifications + '</p>' +
                '<p><span class="label">Subscription:</span> ' + user.preferences.subscription + '</p>' +
                '<p><span class="label">Address:</span> ' +
                    user.address.street + ', ' +
                    user.address.city + ', ' +
                    user.address.state + ' ' +
                    user.address.zipCode +
                '</p>';

            container.appendChild(card);
        });
    })
    .catch(err => console.error('Fetch error: ' + err.message));