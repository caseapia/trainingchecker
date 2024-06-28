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
    if (data.id === 1) {
        document.getElementById('staffbadge').style.display = 'block';
        document.getElementById('trainingcreator').style.display = 'block';
    }
    if (data.id < 130000) {
        document.getElementById('staffbadge').style.display = 'block';
        document.getElementById('oldplayer').style.display = 'block';
    }
    document.getElementById('nickname').textContent = data.login || 'Error';
    if (data.id === 113145) {
        document.getElementById('staffbadge').style.display = 'block';
        document.getElementById('sitestaff').style.display = 'block';
    }
    if (data.id === 125043 || data.id === 459129) {
        document.getElementById('staffbadge').style.display = 'block';
        document.getElementById('devhelp').style.display = 'block';
    }
    if (data.moder === 0) {
        document.getElementById('admin').textContent = 'Игрок';
    }
    if (data.moder === 1) {
        document.getElementById('admin').textContent = 'Младший модератор';
    }
    if (data.moder === 2) {
        document.getElementById('admin').textContent = 'Модератор';
    }
    if (data.moder > 3 > 999) {
        document.getElementById('admin').textContent = 'Старший модератор'
    }
    if (data.moder > 998) {
        document.getElementById('admin').textContent = 'Администратор'
    }
    if (data.moder > 1) {
        document.getElementById('staffbadge').style.display = 'block';
        document.getElementById('trainingstaff').style.display = 'block';
    }
    if (data.moder > 998) {
        document.getElementById('staffbadge').style.display = 'block';
        document.getElementById('trainingdev').style.display = 'block';
    }
    if (data.verify === 0) {
        document.getElementById('verify').textContent = `Нет (ID: ${data.verify})`;
    }
    if (data.verify === 1) {
        document.getElementById('verify').textContent = `Ютубер (ID: ${data.verify})`;
    }
    if (data.verify === 2) {
        document.getElementById('verify').textContent = `Автор сообщества (Маппер) (ID: ${data.verify})`;
    }
    if (data.verify === 3) {
        document.getElementById('verify').textContent = `Разработчик (ID: ${data.verify})`;
    }
    if (data.verify === 4) {
        document.getElementById('verify').textContent = `Автор сообщества (Модели и прочее) (ID: ${data.verify})`;
    }
    if (data.verify === 5) {
        document.getElementById('verify').textContent = `Донатер (ID: ${data.verify})`;
    }
    if (data.verify === 6) {
        document.getElementById('verify').textContent = `Администратор в отставке (ID: ${data.verify})`;
    }
    if (data.verify > 6) {
        document.getElementById('verify').textContent = `Неизвестно (ID: ${data.verify})`;
    }
    document.getElementById('verifytext').textContent = data.verifyText || 'Нет';
    document.getElementById('mute').innerHTML = `<span style="color:var(--text-block);">Да</span> (${data.mute})`;
    if (data.mute === 0) {
        document.getElementById('mute').innerHTML = `<span style="color:var(--text-access);">Нет</span>`;
    }
    document.getElementById('online').innerHTML = data.online ? `<span style="color:var(--text-access)">В сети</span>` : `<span style="color:var(--text-block);">Не в сети</span>`;
    document.getElementById('serverid').textContent = data.playerid || '0';
    if (data.online === 0) {
        document.getElementById('getonl').style.display = 'none';
    }
    document.getElementById('regdate').textContent = data.regdate || 'Error';
    if (data.regdate.includes(1970)) {
        document.getElementById('regdate').textContent = 'Зарегистрирован до 2018 года'
    }
    document.getElementById('lastlogin').textContent = data.lastlogin || 'Error';
    // document.getElementById('warns').textContent = data.warn.map(warn => JSON.stringify(warn)).join(', ') || 'No warnings';
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    const alert = document.getElementById('copyalert');
    navigator.clipboard.writeText(text).then(() => {
        alert.innerHTML = `"${text}" добавлено в буфер обмена`
        alert.classList.add('nothide')
        setTimeout(() => {
            alert.classList.remove('nothide')
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy in clipboard:', err)
    });
}

function update() {
    const alert = document.getElementById('updatealert')
    const inputText = localStorage.getItem('inputValue');
    fetchUserData();
    alert.innerHTML = `Данные о ${inputText} были обновлены`
    alert.classList.add('nothide');
    setTimeout(() => {
        alert.classList.remove('nothide')
    }, 3000);
}

function goback() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', fetchUserData);