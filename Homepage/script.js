const LATITUDE = 57.79;
const LONGITUDE = 13.41;

function updateTime() {
    const now = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Stockholm'
    };
    const formattedTime = now.toLocaleTimeString('sv-SE', options);
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = formattedTime;
    }
}
setInterval(updateTime, 1000);
updateTime();

function getInitialLanguage() {
    let lang = localStorage.getItem('PreferredLanguage');
    if (!lang) {
        const browserLangFull = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
        const browserLangBase = browserLangFull.split('-')[0];
        if (browserLangBase === 'de') lang = 'de';
        else if (browserLangBase === 'sv') lang = 'sv';
        else lang = 'en';
    }
    const supported = (typeof translations !== 'undefined' && translations) ? Object.keys(translations) : ['en', 'de', 'sv'];
    if (!supported.includes(lang)) {
        lang = 'en';
    }
    return lang;
}

async function fetchWeather() {
    const weatherUrl = `https://api.thevoidnexus.com/weather?lat=${LATITUDE}&lon=${LONGITUDE}&lang=${getInitialLanguage()}`;

    const errorMessageElement = document.getElementById('error-message');
    const weatherInfoElement = document.getElementById('weather-info');
    const weatherIconContainer = document.getElementById('weather-icon-container');

    const showError = (message) => {
      console.error("Failed to fetch weather data:", message);
      if (weatherInfoElement) {
          weatherInfoElement.textContent = translations[getInitialLanguage()]['weather_error'];
      }
      if (weatherIconContainer) {
          weatherIconContainer.innerHTML = `
              <dotlottie-player
                  id="error-lottie"
                  src="https://lottie.host/94f6a996-7400-4025-ae3e-6d2187712a16/0YpS4bRkMF.lottie"
                  background="transparent"
                  speed="0.7"
                  style="width: 100px; height: 100px"
                  autoplay
              ></dotlottie-player>
          `;
  
          const lottiePlayer = document.getElementById('error-lottie');
  
          lottiePlayer.addEventListener('complete', () => {
              lottiePlayer.pause();
              setTimeout(() => {
                  lottiePlayer.seek(0);
                  lottiePlayer.play();
              }, 5000);
          });
      }
  };   

    try {
        const response = await fetch(weatherUrl);

        if (!response.ok) {
            let errorMsg = `Request failed with status ${response.status}`;
            try {
                const errorData = await response.json();
                errorMsg = errorData.error || errorMsg;
            } catch (e) {
                console.warn("Could not parse JSON error response:", e);
            }
            throw new Error(errorMsg);
        }

        const data = await response.json();

        if (!data.main || !data.weather || !data.weather[0]) {
            throw new Error("Incomplete weather data received.");
        }

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        if (weatherInfoElement) {
            const capitalizedDesc = description.charAt(0).toUpperCase() + description.slice(1);
            weatherInfoElement.textContent = `${temperature}°C - ${capitalizedDesc}`;
        }

        if (weatherIconContainer) {
            weatherIconContainer.innerHTML = getAnimatedWeatherIconHTML(iconCode, description);
        }

        if (errorMessageElement) {
            errorMessageElement.classList.add('hidden');
            errorMessageElement.textContent = '';
        }

    } catch (error) {
        showError(error);
    }
}

function getAnimatedWeatherIconHTML(iconCode, altText = "Weather condition") {
    const iconFileMap = {
        '01d': 'clear-day.svg',
        '01n': 'starry-night.svg',
        '02d': 'partly-cloudy-day.svg',
        '02n': 'partly-cloudy-night.svg',
        '03d': 'cloudy.svg',
        '03n': 'cloudy.svg',
        '04d': 'overcast-day.svg',
        '04n': 'overcast-night.svg',
        '09d': 'partly-cloudy-day-drizzle.svg',
        '09n': 'partly-cloudy-night-drizzle.svg',
        '10d': 'rain.svg',
        '10n': 'partly-cloudy-night-rain.svg',
        '11d': 'thunderstorms-day-rain.svg',
        '11n': 'thunderstorms-night-rain.svg',
        '13d': 'snow.svg',
        '13n': 'partly-cloudy-night-snow.svg',
        '50d': 'fog-day.svg',
        '50n': 'fog-night.svg'
    };

    const filename = iconFileMap[iconCode] || 'not-available.svg';
    const iconPath = `https://basmilius.github.io/weather-icons/production/fill/all/${filename}`;

    return `<img src="${iconPath}" alt="${altText}" class="weather-animation" style="width: 25px; height: 25px;">`;
}

fetchWeather();

const fadeInElements = document.querySelectorAll('.fade-in-element');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observerRef) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
        }
    });
}, observerOptions);

fadeInElements.forEach(el => {
    observer.observe(el);
});

document.addEventListener('mousemove', function(e) {
  const dot = document.createElement('div');
  dot.classList.add('cursor-trail-dot');
  dot.style.left = `${e.pageX}px`;
  dot.style.top = `${e.pageY}px`;
  document.body.appendChild(dot);

  dot.animate([
    { transform: 'scale(1)', opacity: 1 },
    { transform: 'scale(1.5)', opacity: 0 }
  ], {
    duration: 500,
    easing: 'ease-out',
    fill: 'forwards'
  });

  setTimeout(() => {
    dot.remove();
  }, 500);
});

  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    let scrollTimeout;

    function updateHashOnScroll() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        let currentSectionId = '';
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const visibleThreshold = Math.min(100, sectionHeight * 0.25);

          if (scrollPosition >= sectionTop - visibleThreshold &&
              scrollPosition < sectionTop + sectionHeight - visibleThreshold) {
            currentSectionId = section.id;
          }
        });

        if (!currentSectionId && sections.length > 0 && scrollPosition < sections[0].offsetTop) {
          if (sections[0].id === 'hero' || scrollPosition < windowHeight / 3) {
            if (sections[0].id) {
              currentSectionId = sections[0].id;
            }
          }
        }

        if (currentSectionId && window.location.hash !== `#${currentSectionId}`) {
          history.replaceState(null, null, `#${currentSectionId}`);
        } else if (!currentSectionId && window.location.hash) {
          history.replaceState(null, null, window.location.pathname + window.location.search);
        }
      }, 100);
    }

    window.addEventListener('scroll', updateHashOnScroll);
    updateHashOnScroll();
  });