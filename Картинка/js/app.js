function Rand() {
    url = 'https://random.dog/woof.json';

    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.url.endsWith('.mp4') || data.url.endsWith('.webm')) {
                reject('Видео недоступно');
        }
            resolve(data.url);
        })
        .catch(error => {
            reject(error.message);
        });
    });
}

btn = document.querySelector('.btn');
img = document.querySelector('.img');

btn.onclick = function() {
Rand()
    .then(url => {
        img.src = url;
    })
    .catch(error => {
        console.error(error);
    });
};
  