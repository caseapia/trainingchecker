async function fetchAdmins() {
    const url = `https://training-server.com/api/admin`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('API Response:', result);

        if (Array.isArray(result)) {
            displayAdmins(result);
        } else {
            console.error('Unexpected data format:', result);
        }
    } catch (error) {
        console.error('Error fetching admin list:', error);
    }
}

function displayAdmins(data) {
    if (data.length === 0) {
        console.error('No admin data available');
        return;
    }

    const adminList = document.getElementById('adminList');

    data.forEach(admin => {
        const adminID = document.createElement('th');
        adminID.innerHTML = `${admin.id || '0'}}`;
        adminList.appendChild(adminID);
    });
    data.forEach(admin => {
        const adminNames = document.createElement('td');
        adminNames.innerHTML = `Никнейм: ${admin.login || 'Error'}`
        adminNames.appendChild(adminNames)
    })
}

document.addEventListener('DOMContentLoaded', fetchAdmins);