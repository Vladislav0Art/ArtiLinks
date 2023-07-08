<img src="./assets/img/readme-header.png" alt="ArtiLinks Logo" />


# **ArtiLinks** - Bookmark Manager

Читать это на других языках: [English](./README.md), [Русский](./README.ru.md).


## Идея проекта:

---

Приложение решает проблему хранения и категоризации ссылок на полезные онлайн-сервисы.

**Deployment** [здесь](https://artilinks.vercel.app/).


## Реализованная функциональность:

---

1. Регистрация с подтверждением по электронной почте и авторизация
1. Восстановление пароля по электронной почте
1. Категоризация ссылок (группы и коллекции):
    - **Группа** - это контейнер, в котором хранится набор коллекций
    - **Коллекция** - это контейнер, в котором хранятся ссылки
    - Например: _Programming_ - это группа, _Javascript_ - это коллекция
1. Полноценный **CRUD** API для групп и коллекций
1. Возможность изменить группу созданной коллекции
1. Автоматическое получение данных с ресурсов:
    - Извлечение фавиконов, заголовков, описаний и доменных имен
1. Функциональность поиска ссылок в рассматриваемой коллекции:
    - Поиск осуществляется по названию ссылки и домену ресурса
1. Уведомления об ошибках


## Использованные технологии:

---

| Технология             | Описание |
|------------------------|----------|
| NextJS                 | React-фреймворк для рендеринга на стороне сервера |
| jsonwebtoken           | Регистрация и аутентификация пользователей |
| nodemailer             | Подтверждение электронной почты и восстановление пароля |
| MongoDB/Mongoose       | Облачная база данных |
| axios                  | API-запросы клиентской и серверной сторон |
| open-graph-scraper     | Получение данных о ресурсах |
| react-transition-group | Анимация отрисованных компонентов |

## Увлекательная задача в проекте и возникшие сложности:

---

Наиболее трудоемкая и интересная часть была разработка **JWT аутентификации/регистрации**. Данный подход был для меня новым, поэтому мне пришлось уделить много времени на поиск информации о том, как нужно правильно писать такой функционал. В итоге я реализовал отдельный класс-сервис по работе с **refresh/access-токенами**. Основной проблемой было **обновление access-токена** в случае, когда пользователь отправил запрос на защищенный API путь, будучи аутентифицированным, но имея уже **инвалидированный access-токен**. Я узнал, что библиотека axios поддерживает **функционал интерсепторов**, которые как раз могли решить мою проблему. При инвалидированном access-токене мой сервер возвращает ошибку авторизации 401, в интерсепторе ответа с сервера я отлавливаю данный тип ошибки, отправляю запрос на обновление токенов, а после пытаюсь повторить исходный запрос.

## Скриншоты и видео:

---

### **Youtube** видео с демонстрацией функциональности:

<div style="display: flex; justify-content: center;">
    <a href="https://youtu.be/69W3Q3u83dg">
        <img style="max-width: 500px; width: 100%;" src="./assets/img/youtube-thumbnail.png" alt="Video Thumbnail" />
    </a>
</div>

### Экран главной страницы:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 800px; width: 100%;" src="./assets/img/main.png" alt="Landing Page Main Screen" />
</div>

<div style="display: flex; justify-content: center; margin-top: 20px">
    <img style="max-width: 800px; width: 100%;" src="./assets/videos/landing-page-scrolling.gif" alt="Landing Page Scrolling" />
</div>


### Регистрация и Логин:

<div style="display: flex; justify-content: space-around;">
    <img style="max-width: 550px; width: 100%;" src="./assets/img/registration.png" alt="Registration Screen" />
    <img style="max-width: 550px; width: 100%;" src="./assets/img/login.png" alt="Login Screen" />
</div>


### Восстановление пароля:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 800px; width: 100%;" src="./assets/img/password-recover.png" alt="Password Recovering Screen" />
</div>


### Уведомления об ошибках:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 800px; width: 100%;" src="./assets/img/error-notification.png" alt="Error Notification Screen" />
</div>


### Вид главной панели:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 900px; width: 100%;" src="./assets/img/dashboard-1.png" alt="Dashboard Screen" />
</div>

<div style="display: flex; justify-content: center; margin-top: 20px">
    <img style="max-width: 900px; width: 100%;" src="./assets/videos/functionality-demonstration.gif" alt="Functionality Demonstration" />
</div>


### Редактирование закладок:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 900px; width: 100%;" src="./assets/img/bookmark-editing.png" alt="Bookmark Editing Screen" />
</div>


### Создание коллекции:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 900px; width: 100%;" src="./assets/img/collection-creation.png" alt="Collection Creation Screen" />
</div>


### Доступные диалоговые окна:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 900px; width: 100%;" src="./assets/img/dialogs.png" alt="Available Dialogs" />
</div>
