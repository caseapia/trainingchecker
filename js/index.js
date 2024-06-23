function cyrillicSymbols(event) {
    const inputText = event.target.value;
    const cyrillicsymbols = document.getElementById('cyrillic-symbols');
    const input = document.getElementById('playername');
    const button = document.getElementById('searchsubmit');

    if (containsCyrillic(inputText)) {
        cyrillicsymbols.classList.add('visible');
        input.classList.add('error')
        button.classList.remove('allg');
    } else {
        cyrillicsymbols.classList.remove('visible');
        input.classList.remove('error')
        button.classList.add('allg');
    }
    if (inputText === '') {
        button.classList.remove('allg');
    } else {
        button.classList.add('allg');
    }
}

function containsCyrillic(text) {
    return /[а-яё]/i.test(text);
}

function redirect() {
    document.getElementById('input-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const inputText = document.getElementById('playername').value;
        localStorage.setItem('inputValue', inputText);
        window.location.href = './result.html';
    });
}