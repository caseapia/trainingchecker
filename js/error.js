function updateName() {
    const inputText = localStorage.getItem('inputValue');
    document.getElementById('nickname').textContent = `${inputText}`;
}
function goback() {
    window.history.back();
}

updateName();