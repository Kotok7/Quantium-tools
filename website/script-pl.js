let progressValue = 0;
let maxValue = 100;
let progressStep = 1;
let interval = 50;
let statusMessages = [];
let finalCallback = null;
let progressInterval = null;

function toggleDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('optionsDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', function() {
    document.getElementById('optionsDropdown').style.display = 'none';
});

function showFrame(frameId) {
    const frames = document.querySelectorAll('.frame');
    frames.forEach(frame => frame.classList.remove('active'));
    
    document.getElementById(frameId + '-frame').classList.add('active');
    
    document.getElementById('optionsDropdown').style.display = 'none';
}

function showModal(title, message, isError = false) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = message;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function updateProgress() {
    progressValue += progressStep;
    const progressFill = document.getElementById('progress-fill');
    const statusLabel = document.getElementById('status-label');
    
    progressFill.style.width = (progressValue / maxValue * 100) + '%';
    
    const segment = Math.floor(maxValue / statusMessages.length);
    const idx = Math.min(Math.floor((progressValue - 1) / segment), statusMessages.length - 1);
    statusLabel.textContent = statusMessages[idx];
    
    if (progressValue < maxValue) {
        progressInterval = setTimeout(updateProgress, interval);
    } else {
        finalCallback();
        resetUI();
    }
}

function resetUI() {
    progressValue = 0;
    document.getElementById('progress-container').style.display = 'none';
    document.getElementById('progress-fill').style.width = '0%';
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = false);
}

function startProgress(messages, callback) {
    statusMessages = messages;
    finalCallback = callback;
    progressValue = 0;
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
    
    document.getElementById('progress-container').style.display = 'flex';
    document.getElementById('status-label').textContent = statusMessages[0];
    
    updateProgress();
}

function runWeather() {
    const location = document.getElementById('location-input').value.trim();
    if (!location) {
        showModal('Błąd', 'Proszę wprowadzić lokalizację.', true);
        return;
    }
    
    const messages = [
        "Analiza chmur...",
        "Włączanie komputerów kwantowych...",
        "Pobieranie danych pogodowych...",
        "Przetwarzanie liczb...",
        "Kończenie raportu..."
    ];
    
    function callback() {
        showModal('Pogoda', 'Po prostu spójrz przez okno.');
    }
    
    startProgress(messages, callback);
}

function runAge() {
    const name = document.getElementById('name-input').value.trim();
    const ageStr = document.getElementById('age-input').value;
    
    if (!name) {
        showModal('Błąd', 'Proszę wprowadzić imię.', true);
        return;
    }
    
    const age = parseInt(ageStr);
    if (isNaN(age) || age < 0) {
        showModal('Błąd', 'Proszę wprowadzić poprawny wiek.', true);
        return;
    }
    
    const messages = [
        "Włączanie komputerów kwantowych...",
        "Analiza atomów...",
        "Obliczanie entropii...",
        "Korekta dylatacji czasu...",
        "Prawie gotowe..."
    ];
    
    function callback() {
        showModal('Wynik', `${name}, masz około ${age} lat.`);
    }
    
    startProgress(messages, callback);
}

function runName() {
    const name = document.getElementById('name-only-input').value.trim();
    if (!name) {
        showModal('Błąd', 'Proszę wprowadzić imię.', true);
        return;
    }
    
    const messages = [
        "Ładowanie modułu tożsamości...",
        "Dostęp do banków pamięci...",
        "Odszyfrowywanie imienia...",
        "Uwierzytelnianie użytkownika...",
        "Prawie gotowe..."
    ];
    
    function callback() {
        showModal('Witaj', `Twoje imię to ${name}!`);
    }
    
    startProgress(messages, callback);
}

function runFakeScan() {
    const messages = [
        "Inicjalizacja skanu...",
        "Pingowanie localhost...",
        "Kompilowanie diagnostyki...",
        "Sprawdzanie czasu pracy serwera...",
        "Kończenie statystyk..."
    ];
    
    function callback() {
        showModal('Statystyki serwera', 
            '🖥 Serwer działa pod adresem 172.0.0.1<br>' +
            'Czas działania: 17 dni<br>' +
            'Wykorzystanie CPU: 97%<br>' +
            'Status: Wszystko dobrze!'
        );
    }
    
    startProgress(messages, callback);
}

function runCalculator() {
    const expr = document.getElementById('calc-input').value.trim();
    if (!expr) {
        showModal('Błąd', 'Proszę wprowadzić działanie.', true);
        return;
    }
    
    const messages = [
        "Analiza działania...",
        "Obliczanie wyniku...",
        "Generowanie odpowiedzi...",
        "Prawie gotowe...",
        "Gotowe..."
    ];
    
    function callback() {
        showModal('Kalkulator', 'Nwm spytaj ChatGPT.');
    }
    
    startProgress(messages, callback);
}

showFrame('weather');

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const activeFrame = document.querySelector('.frame.active');
        if (activeFrame) {
            const button = activeFrame.querySelector('button');
            if (button && !button.disabled) {
                button.click();
            }
        }
    }
});