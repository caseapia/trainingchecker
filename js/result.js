async function fetchUserData() {
    const inputText = localStorage.getItem('inputValue');
    const url = `https://training-server.com/api/user/${inputText}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('API Response:', result);
        const data = result.data; // Извлекаем данные из ключа 'data'
        console.log('Extracted Data:', data);
        displayUserData(data);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function displayUserData(data) {
    console.log('Data keys:', Object.keys(data));

    document.getElementById('userid').textContent = data.id || '0';
    document.getElementById('nickname').textContent = data.login || 'Error';
    document.getElementById('access').textContent = data.access || 'Нет';
    document.getElementById('admin').textContent = data.moder || 'Игрок';
    document.getElementById('verify').textContent = data.verify || 'Нет';
    document.getElementById('verifytext').textContent = data.verifyText || 'Нет';
    document.getElementById('mute').textContent = data.mute || '0';
    document.getElementById('online').textContent = data.online ? 'В сети' : 'Не в сети';
    document.getElementById('serverid').textContent = data.playerid || '0';
    document.getElementById('regdate').textContent = data.regdate || 'Error';
    document.getElementById('lastlogin').textContent = data.lastlogin || 'Error';
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    const alert = document.getElementById('copyalert');
    navigator.clipboard.writeText(text).then(() => {
        alert.classList.add('nothide')
    }).catch(err => {
        console.error('Failed to copy in clipboard:', err)
    });
}

function goback() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', fetchUserData);