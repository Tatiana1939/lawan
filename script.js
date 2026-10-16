// Ждем, пока весь HTML документ загрузится
document.addEventListener('DOMContentLoaded', () => {

    // 1. Находим все кнопки-переключатели (по классу feature-item)
    const tabButtons = document.querySelectorAll('.feature-item');

    // 2. Находим все контейнеры с чатами (по классу chat-view)
    const chatViews = document.querySelectorAll('.chat-view');

    // 3. Проходимся по каждой кнопке и вешаем на неё обработчик клика
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {

            // --- ШАГ А: Переключение активного состояния кнопок ---
            // Убираем класс 'active' у ВСЕХ кнопок (они становятся серыми)
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем класс 'active' ТОЛЬКО нажатой кнопке (она становится белой)
            button.classList.add('active');


            // --- ШАГ Б: Переключение видимости чатов ---
            // Получаем ID нужного чата из атрибута data-target нажатой кнопки
            const targetId = button.getAttribute('data-target');

            // Скрываем ВСЕ чаты
            chatViews.forEach(chat => chat.classList.remove('active'));

            // Находим нужный чат по ID и показываем его
            const targetChat = document.getElementById(targetId);
            if (targetChat) {
                targetChat.classList.add('active');
            } else {
                console.warn(`Чат с id="${targetId}" не найден на странице.`);
            }
        });
    });

});