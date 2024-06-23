async function fetchUserData() {
    const inputText = localStorage.getItem('inputValue');
    const url = `https://training-server.com/api/user/${inputText}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const data = result.data;
        displayUserData(data);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function displayUserData(data) {

    document.getElementById('userid').textContent = data.id || '0';
    document.getElementById('nickname').textContent = data.login || 'Error';
    document.getElementById('access').textContent = data.access || 'Нет';
    if (data.moder === 0) {
        document.getElementById('admin').textContent = 'Игрок';
    }
    if (data.moder === 1) {
        document.getElementById('admin').textContent = 'Мини-модератор';
    }
    if (data.moder === 2) {
        document.getElementById('admin').textContent = 'Модератор';
    }
    if (data.moder > 3 > 999) {
        document.getElementById('admin').textContent = 'Старший модератор'
    }
    if (data.moder === 999) {
        document.getElementById('admin').textContent = 'Разработчик'
    }
    document.getElementById('verify').textContent = data.verify || 'Нет';
    document.getElementById('verifytext').textContent = data.verifyText || 'Нет';
    document.getElementById('mute').textContent = data.mute || '0';
    document.getElementById('online').textContent = data.online ? 'В сети' : 'Не в сети';
    document.getElementById('serverid').textContent = data.playerid || '0';
    document.getElementById('regdate').textContent = data.regdate || 'Error';
    document.getElementById('lastlogin').textContent = data.lastlogin || 'Error';
    // document.getElementById('warns').textContent = data.warn.map(warn => JSON.stringify(warn)).join(', ') || 'No warnings';
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    const alert = document.getElementById('copyalert');
    navigator.clipboard.writeText(text).then(() => {
        alert.classList.add('nothide')
        alert.innerHTML = `Данные были добавлены в буфер обмена`
        setTimeout(() => {
            alert.classList.remove('nothide')
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy in clipboard:', err)
    });
}

function update() {
    const alert = document.getElementById('updatealert')
    fetchUserData();
    alert.classList.add('nothide');
    setTimeout(() => {
        alert.classList.remove('nothide')
    }, 3000);
}

function goback() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', fetchUserData);