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
                showModal('Error', 'Please enter your location.', true);
                return;
            }
            
            const messages = [
                "Analyzing clouds...",
                "Enabling quantum computers...",
                "Downloading weather data...",
                "Crunching numbers...",
                "Finalizing report..."
            ];
            
            function callback() {
                showModal('Weather', 'Just look outside.');
            }
            
            startProgress(messages, callback);
        }

        function runAge() {
            const name = document.getElementById('name-input').value.trim();
            const ageStr = document.getElementById('age-input').value;
            
            if (!name) {
                showModal('Error', 'Please enter your name.', true);
                return;
            }
            
            const age = parseInt(ageStr);
            if (isNaN(age) || age < 0) {
                showModal('Error', 'Please enter a valid age.', true);
                return;
            }
            
            const messages = [
                "Enabling quantum computers...",
                "Analyzing atoms...",
                "Calculating entropy...",
                "Time dilation corrections...",
                "Almost done..."
            ];
            
            function callback() {
                showModal('Result', `${name}, you are around ${age} years old.`);
            }
            
            startProgress(messages, callback);
        }

        function runName() {
            const name = document.getElementById('name-only-input').value.trim();
            if (!name) {
                showModal('Error', 'Please enter a name.', true);
                return;
            }
            
            const messages = [
                "Loading identity module...",
                "Accessing memory banks...",
                "Decrypting name...",
                "Authenticating user...",
                "Almost there..."
            ];
            
            function callback() {
                showModal('Hello', `Your name is ${name}!`);
            }
            
            startProgress(messages, callback);
        }

        function runFakeScan() {
            const messages = [
                "Initializing scan...",
                "Pinging localhost...",
                "Compiling diagnostics...",
                "Checking server uptime...",
                "Finalizing stats..."
            ];
            
            function callback() {
                showModal('Server Stats', 
                    '🖥 Server running at 172.0.0.1<br>' +
                    'Uptime: 17 days<br>' +
                    'CPU Usage: 97%<br>' +
                    'Status: All systems nominal!'
                );
            }
            
            startProgress(messages, callback);
        }

        function runCalculator() {
            const expr = document.getElementById('calc-input').value.trim();
            if (!expr) {
                showModal('Error', 'Please enter an expression.', true);
                return;
            }
            
            const messages = [
                "Parsing expression...",
                "Evaluating result...",
                "Generating answer...",
                "Almost there...",
                "Done..."
            ];
            
            function callback() {
                showModal('Calculator', 'Just ask ChatGPT');
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