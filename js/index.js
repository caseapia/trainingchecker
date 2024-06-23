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

const username = '1dontkillme';
const repo = 'trainingchecker';
const token = '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'
const apiUrl = `https://api.github.com/repos/${username}/${repo}/commits`;

async function getLastCommitDate() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const commits = await response.json();
        console.log('Commits:', commits);

        if (Array.isArray(commits) && commits.length > 0) {
            const lastCommitDate = commits[0].commit.committer.date;
            console.log('Last commit date:', lastCommitDate);
            const lastUpdate = new Date(lastCommitDate).toLocaleString();
            document.getElementById('lastUpdate').innerHTML = `${lastUpdate}`;
        } else {
            document.getElementById('lastUpdate').innerHTML = `<span style="color: var(--text-block)">Нет доступных обновлений</span>`;
        }
    } catch (error) {
        console.error('Error when parsing data:', error);
        document.getElementById('lastUpdate').innerHTML = `<span style="color: var(--text-block)">Ошибка при получении данных о последнем обновлении.</span>`;
    }
}

getLastCommitDate();