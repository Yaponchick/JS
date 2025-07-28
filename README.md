<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Конструктор анкет</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Конструктор анкет</h1>
        <div class="tabs">
            <button class="tab-button active" data-tab="email">ПО ПОЧТЕ</button>
            <button class="tab-button" data-tab="login">ПО ЛОГИНУ</button>
            <button class="tab-button" data-tab="qr">QR-КОД</button>
        </div>
        <div class="tab-content active" id="email-tab">
            <form id="login-form">
                <label for="email">Электронная почта</label>
                <input type="email" id="email" placeholder="username@mail.ru" required>

                <label for="password">Пароль</label>
                <input type="password" id="password" placeholder="******" required>

                <div class="remember-me">
                    <input type="checkbox" id="remember-me-checkbox">
                    <label for="remember-me-checkbox">Запомнить меня</label>
                </div>

                <button type="submit" class="login-btn">ВОЙТИ</button>
            </form>
        </div>
        <div class="tab-content" id="login-tab">
            <!-- Здесь можно добавить форму для входа по логину -->
            <p>Вход по логину</p>
        </div>
        <div class="tab-content" id="qr-tab">
            <!-- Здесь можно добавить форму для входа по QR-коду -->
            <p>Вход по QR-коду</p>
        </div>
        <a href="#" class="forgot-password">Забыли пароль?</a>
    </div>

    <script src="script.js"></script>
</body>
</html>


/* styles.css */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fff;
    color: #333;
}

.container {
    text-align: center;
    max-width: 400px;
    width: 100%;
    padding: 20px;
}

h1 {
    margin-bottom: 20px;
}

.tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.tab-button {
    padding: 10px 20px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #333;
    transition: all 0.3s ease;
}

.tab-button.active {
    border-bottom: 2px solid #005955;
}

.tab-content {
    display: none;
    padding: 20px;
}

.tab-content.active {
    display: block;
}

#login-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

label {
    font-size: 14px;
    color: #777;
}

input[type="email"],
input[type="password"] {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
}

.remember-me {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.login-btn {
    padding: 10px 20px;
    background-color: #005955;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.login-btn:hover {
    background-color: #004441;
}

.forgot-password {
    display: block;
    margin-top: 10px;
    color: #ff6b6b;
    text-decoration: none;
    font-size: 14px;
}

.forgot-password:hover {
    text-decoration: underline;
}





// script.js
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Функция для активации вкладки
    function activateTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        tabContents.forEach(content => {
            if (content.id === `${tabId}-tab`) {
                content.classList.add('active');
            }
        });
    }

    // Обработчик клика на кнопки вкладок
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const tabId = button.getAttribute('data-tab');
            activateTab(tabId);
        });
    });

    // По умолчанию активируем первую вкладку
    activateTab('email');
});
