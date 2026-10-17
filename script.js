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
    // --- Логика бургер-меню ---
    const burgerBtn = document.getElementById('burgerBtn');
    const navWrapper = document.getElementById('navWrapper');

    if (burgerBtn && navWrapper) {
        // Открытие/закрытие меню
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            navWrapper.classList.toggle('open');
        });

        // Закрытие меню при клике на любую ссылку внутри
        navWrapper.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('active');
                navWrapper.classList.remove('open');
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = navWrapper.contains(event.target);
            const isClickOnBurger = burgerBtn.contains(event.target);

            if (!isClickInsideMenu && !isClickOnBurger && navWrapper.classList.contains('open')) {
                burgerBtn.classList.remove('active');
                navWrapper.classList.remove('open');
            }
        });
    }
        // ============================================
    //     ПЕРЕКЛЮЧЕНИЕ: главная / календарь
    // ============================================
    const navCalendar = document.getElementById('nav-calendar');
    const navHome = document.getElementById('nav-home');
    const mainView = document.getElementById('main-view');
    const calendarView = document.getElementById('calendar-view');

    function switchView(targetId) {
        const views = ['main-view', 'calendar-view'];
        views.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = (id === targetId) ? 'block' : 'none';
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Закрываем бургер-меню, если открыто
        const navWrapper = document.getElementById('navWrapper');
        const burgerBtn = document.getElementById('burgerBtn');
        if (navWrapper) navWrapper.classList.remove('open');
        if (burgerBtn) burgerBtn.classList.remove('active');
    }

    if (navCalendar) {
        navCalendar.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('calendar-view');
        });
    }
    if (navHome) {
        navHome.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('main-view');
        });
    }

    // ============================================
    //           ГЕНЕРАЦИЯ КАЛЕНДАРЯ
    // ============================================
    let currentDate = new Date();

    function renderCalendar(date) {
        const grid = document.getElementById('calendarGrid');
        const monthTitle = document.getElementById('currentMonth');
        if (!grid || !monthTitle) return;

        const year = date.getFullYear();
        const month = date.getMonth();

        const monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];

        monthTitle.textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        // День недели первого дня (0=Вс, 1=Пн, ..., 6=Сб)
        let startDayOfWeek = firstDay.getDay();
        // Сдвигаем: делаем Пн первым днём недели
        startDayOfWeek = (startDayOfWeek === 0) ? 6 : startDayOfWeek - 1;

        grid.innerHTML = '';

        // Пустые ячейки в начале
        for (let i = 0; i < startDayOfWeek; i++) {
            const empty = document.createElement('div');
            empty.className = 'cal-day empty';
            grid.appendChild(empty);
        }

        // Дни месяца
        const today = new Date();
        const isCurrentMonth = (today.getFullYear() === year && today.getMonth() === month);

        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement('div');
            cell.className = 'cal-day';
            cell.textContent = day;

            // Выходные (Сб = 5, Вс = 6 в сдвинутой нумерации)
            const dayOfWeek = (startDayOfWeek + day - 1) % 7;
            if (dayOfWeek === 5 || dayOfWeek === 6) {
                cell.classList.add('weekend');
            }

            // Сегодня
            if (isCurrentMonth && today.getDate() === day) {
                cell.classList.add('today');
            }

            grid.appendChild(cell);
        }
    }

    // Кнопки навигации
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        });
    }

    // Первый рендер
    renderCalendar(currentDate);

});