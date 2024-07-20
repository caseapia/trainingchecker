const username = '1dontkillme';
const repo = 'trainingchecker';
const apiUrl = `https://api.github.com/repos/${username}/${repo}/commits`;

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
        document.getElementById('icon').classList.add('visible');
        button.disabled = false;
    }
    if (inputText === '') {
        button.classList.remove('allg');
    } else {
        button.classList.add('allg');
    }
    if(inputText != '') {
        document.getElementById('icon').classList.add('visible');
    } else {
        document.getElementById('icon').classList.remove('visible');
        button.disabled = true;
    }
}

function HideButtonOnClick() {
    document.addEventListener('click', function() {
        const icon = document.getElementById('icon');
        icon.classList.toggle('visible');
    });
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

async function getLastCommitDate() {
     try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `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`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

         if (!response.ok) {
             throw new Error(`HTTP error! status: ${response.status}`);
         }

         const commits = await response.json();
         console.debug('Commits:', commits);

         if (Array.isArray(commits) && commits.length > 0) {
             const lastCommitDate = commits[0].commit.committer.date;
             console.debug('Last commit date:', lastCommitDate);
             const lastUpdate = new Date(lastCommitDate).toLocaleString();
             document.getElementById('lastUpdate').innerHTML = `${lastUpdate}`;
         } else {
             document.getElementById('lastUpdate').innerHTML = `<span style="color: var(--text-block)">Нет доступных обновлений</span>`;
         }
     } catch (error) {
         console.error('Error when parsing data:', error);
         document.getElementById('lastUpdate').innerHTML = `<a href="https://docs.github.com/ru/rest/using-the-rest-api/rate-limits-for-the-rest-api" target="_blank"><span style="color: var(--text-block)">Ошибка при получении данных о последнем обновлении. Возможно API токен был приостановлен из-за лимита запросов. Если вы считаете, что причина другая - свяжитесь с владельцем сайта.<br><br>Это не влияет на работу TRAINING API.</span></a>`;
         document.getElementById('lastUpdate').style.textDecoration = 'none';
         document.getElementById('pLastUpdate').remove();
     }
}

async function getLastCommit(username, repo) {
    const apiUrl = `https://api.github.com/repos/${username}/${repo}/commits`
    
    const response = await fetch(apiUrl, {
        headers: {
            'Authorization': `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`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const commits = await response.json();
    if (commits.length === 0) {
        throw new Error('Последние обновления не найдены');
    }

    const lastCommit = commits[0];
    const commitMessage = lastCommit.commit.message;

    return commitMessage;
}

getLastCommit(username, repo)
    .then(commitMessage => {
        document.getElementById('lastUpdate').title = `${commitMessage}`
    }) .catch (error => {
        console.error('Error:', error)
    })

// async function getAllCommits(username, repo) {
//      const apiUrl = `https://api.github.com/repos/${username}/${repo}/commits`;
//      let allCommits = [];
//      let page = 1;

//      while(true) {
//          const response = await fetch(`${apiUrl}?page=${page}`, {
//              headers: {
//                  'Authorization': `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`,
//                  'Accept': 'application/vnd.github.v3+json'
//              }
//          });

//          if (!response.ok) {
//              throw new Error(`Error: ${response.status}`)
//          }
//          const commits = await response.json();
//          if (commits.length === 0) {
//              break;
//          }
//          allCommits = allCommits.concat(commits.map(commit => commit.commit.message));
//          page++;
//      }


//      return allCommits
// }

// getAllCommits(username, repo)
//     .then(commitMessages => {
//         const element = document.getElementById('allupdatesp');
//         element.innerHTML = ''; // Очищаем элемент перед добавлением нового содержимого
//         commitMessages.forEach(message => {
//             const p = document.createElement('p');
//             p.innerText = message; // Используем innerText для безопасного добавления текста
//             element.appendChild(p);
//         });
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

async function getReadme(username, repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/README.md`, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching the README file: ${response.statusText}`);
        }

        const content = await response.text();
        document.getElementById("aboutSite").innerHTML = content;
    } catch (error) {
        console.error(error);
    }
}

getReadme(username, repo);
getLastCommitDate();