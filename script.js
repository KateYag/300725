window.onload = () => {
    const firstLoader = document.querySelector('.first-loader');
    const secondLoader = document.querySelector('.second-loader');
    const content = document.querySelector('.content'); // Контейнер с основным контентом

    // Показ первого прелоадера
    firstLoader.style.display = 'flex';

    // После задержки показываем второй прелоадер
    setTimeout(() => {
        firstLoader.style.display = 'none';
        secondLoader.style.display = 'flex';
    }, 3000); // Показывать 3 секунды первый

    // После задержки скрываем оба прелоадера и показываем контент
    setTimeout(() => {
        secondLoader.style.display = 'none';
        content.classList.add('visible'); // Показываем контент
    }, 6000); // Показывать второй 3 секунды
};





const marquee = document.querySelector('.invite-title-content');
const text = marquee.innerHTML;
marquee.innerHTML += text + text; // Дублируем контент

let pos = 0;
const speed = 0.8;
function move() {
    pos -= speed;
    if (pos < -marquee.offsetWidth / 2) {
        pos = 0; // Сброс позиции
    }
    marquee.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(move);
}
move();


document.querySelector(".wedding-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Останавливаем стандартную отправку формы

    // 🔹 ЗАМЕНИТЬ НА СВОИ ДАННЫЕ!
    const TOKEN = "7644603205:AAHP68FDVDVowQhLnkeCxdqOR0565Pggtns";
    const CHAT_ID = "390335723";
    const API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const fieldNames = {

        fullname: "Имя и фамилия",
        attendance: "Присутствие",
        drink: "Предпочтение по напиткам",
    };
    // Собираем данные из формы
    const formData = new FormData(this);
    let message = "<b>Новая заявка на свадьбу 🎉</b>\n\n";
    let drinks = [];

    formData.forEach((value, key) => {
        if (key === "drink") {
            drinks.push(value); // Собираем выбранные напитки
        } else {
            message += `<b>${fieldNames[key] || key}:</b> ${value}\n`;
        }
    });
    if (drinks.length > 0) {
        message += `<b>${fieldNames.drink}:</b> ${drinks.join(", ")}\n`; // Выводим напитки списком
    }

    // Отправляем запрос в Telegram
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "HTML",
        }),
    });

    if (response.ok) {
        alert("Форма успешно отправлена!");
        this.reset(); // Очистка формы
    } else {
        alert("Ошибка при отправке. Попробуйте еще раз.");
    }
});

function startCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            document.getElementById("countdown").innerHTML = "Событие началось!";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}

// Устанавливаем дату окончания
const targetDate = new Date("July 30, 2025 12:00:00").getTime();
startCountdown(targetDate);



document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach(element => observer.observe(element));
});
