/*
Реализуйте функционал генерации QR-кода с помощью следующего алгоритма:
    Определите URL API для создания QR-кодов.
    На странице найдите все необходимые HTML-элементы: форму, поле ввода и блок для отображения QR-кода.
    
    Добавьте обработчик события для кнопки, который:
        Остановит стандартное поведение формы при нажатии.
        Очистит блок для QR-кода перед генерацией нового кода.
        Соберет данные из поля ввода и сформирует запрос к API для получения изображения QR-кода.
        Создаст HTML-разметку для отображения QR-кода.
        Добавит полученное изображение на страницу и применит необходимые стили


Первая часть запроса https://api.qrserver.com/v1/create-qr-code/?size=160×160&data= */


card_qr = document.getElementById('card-qr');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    card_qr.className = card_qr.className.replace('open', '');
    card_qr.textContent = '';
    qr = input.value;
    qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${qr}`;
    image = document.createElement('img');
    image.src = qrApiUrl;
    card_qr.appendChild(image);
    card_qr.className = 'card-qr open';
});




