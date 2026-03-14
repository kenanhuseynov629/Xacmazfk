// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update toggle button icon based on current theme
function updateThemeIcon() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    if (isDark) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// Initialize theme icon on page load
updateThemeIcon();

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Mobile Nav Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile nav on link click
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') &&
        !nav.contains(e.target) &&
        !hamburger.contains(e.target)) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile nav on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// MVP Voting Functionality
const mvpPlayers = [
    'Murad Səlimov',
    'Kənan Hüseynov',
    'Coşqun Məmmədov',
    'Yəhya Davidov',
    'Şakir Kərimxanov'
];

const matches = [
    { id: '2026-03-06', opponent: 'ADA-Everest', score: '4 - 5 (məğlubiyyət)', date: '06.03.2026', adaMVP: true },
    { id: '2026-02-21', opponent: 'Şirvan', score: '13 - 7 (qalibiyyət)', date: '21.02.2026' },
    { id: '2025-12-18', opponent: 'Lənkəran', score: '9 - 5 (qalibiyyət)', date: '18.12.2025' }
];

function computeTeamStats(matches) {
    let games = matches.length;
    let wins = 0;
    let losses = 0;
    let goalsFor = 0;
    let goalsAgainst = 0;

    matches.forEach(match => {
        // score format: "5 - 4 (qalibiyyət)"
        const [scorePart] = match.score.split('(');
        const [our, opp] = scorePart.split('-').map(n => parseInt(n.trim(), 10) || 0);

        goalsFor += our;
        goalsAgainst += opp;

        const lower = match.score.toLowerCase();
        if (lower.includes('qalibiyyət')) wins++;
        if (lower.includes('məğlubiyyət')) losses++;
    });

    const goalDiff = goalsFor - goalsAgainst;
    const avgGoalsFor = games ? (goalsFor / games).toFixed(1) : '0.0';
    const avgGoalsAgainst = games ? (goalsAgainst / games).toFixed(1) : '0.0';

    return {
        games,
        wins,
        losses,
        goalsFor,
        goalsAgainst,
        goalDiff,
        avgGoalsFor,
        avgGoalsAgainst
    };
}

function renderTeamStats() {
    const statsContainer = document.getElementById('team-stats');
    if (!statsContainer) return;

    const s = computeTeamStats(matches);

    statsContainer.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Oyun sayı</h3>
                <p class="stat-value">${s.games}</p>
            </div>
            <div class="stat-card">
                <h3>Qalibiyyət / Məğlubiyyət</h3>
                <p class="stat-value">${s.wins} - ${s.losses}</p>
                <p class="stat-note">qalibiyyət / məğlubiyyət</p>
            </div>
            <div class="stat-card">
                <h3>Ümumi Qollar</h3>
                <p class="stat-value">${s.goalsFor} : ${s.goalsAgainst}</p>
                <p class="stat-note">vurulan / buraxılan qollar</p>
            </div>
            <div class="stat-card">
                <h3>Qol Fərqi</h3>
                <p class="stat-value">${s.goalDiff >= 0 ? '+' : ''}${s.goalDiff}</p>
            </div>
            <div class="stat-card">
                <h3>Ortalama qollar (oyun başına)</h3>
                <p class="stat-value">${s.avgGoalsFor} : ${s.avgGoalsAgainst}</p>
                <p class="stat-note">hər oyuna vurulan / buraxılan</p>
            </div>
        </div>
    `;
}



function renderMatches() {
    const tbody = document.getElementById('matches-tbody');
    if (!tbody) return;

    tbody.innerHTML = matches.map(match => `
    <tr>
      <td>${match.opponent}</td>
      <td>${match.score}</td>
      <td>${match.date}</td>
      <td id="mvp-${match.id}" class="match-mvp">
        <!-- MVP content will be populated here -->
        Loading MVP...
      </td>
    </tr>
  `).join('');
}

const BASE_MVP_KEY = 'xacmaz_fk_mvp';
const BASE_USER_VOTED_KEY = 'xacmaz_fk_user_voted';

function getMatchMVPKey(matchId) {
    return `${BASE_MVP_KEY}_${matchId}`;
}

function getMatchUserVotedKey(matchId) {
    return `${BASE_USER_VOTED_KEY}_${matchId}`;
}

function getMVPVotes(matchId) {
    try {
        return JSON.parse(localStorage.getItem(getMatchMVPKey(matchId))) || {};
    } catch (e) {
        return {};
    }
}

function saveMVPVotes(matchId, votes) {
    localStorage.setItem(getMatchMVPKey(matchId), JSON.stringify(votes));
}

function hasUserVotedForMatch(matchId) {
    return localStorage.getItem(getMatchUserVotedKey(matchId)) === 'true';
}

function setUserVotedForMatch(matchId) {
    localStorage.setItem(getMatchUserVotedKey(matchId), 'true');
}

function renderMatches() {
    const tbody = document.getElementById('matches-tbody');
    if (!tbody) return;

    tbody.innerHTML = matches.map(match => `
    <tr>
      <td>${match.opponent}</td>
      <td>${match.score}</td>
      <td>${match.date}</td>
      <td id="mvp-${match.id}" class="match-mvp">
        MVP: Loading...
      </td>
    </tr>
  `).join('');

    // Init MVP for each match after render
    matches.forEach(match => initMatchMVP(match.id));
}

function updateMatchMVPResults(matchId) {
    const mvpCell = document.getElementById(`mvp-${matchId}`);
    if (!mvpCell) return;

    const votes = getMVPVotes(matchId);
    let totalVotes = 0;
    let leader = null;
    let maxVotes = 0;

    mvpPlayers.forEach(player => {
        const count = votes[player] || 0;
        totalVotes += count;
        if (count > maxVotes) {
            maxVotes = count;
            leader = player;
        }
    });

    if (totalVotes === 0) {
        mvpCell.innerHTML = 'Heç bir səs yoxdur';
        return;
    }

    mvpCell.innerHTML = `<strong>${leader}</strong> (${maxVotes} səs)`;
}

function voteMVP(matchId) {
    const select = document.getElementById(`mvp-select-${matchId}`);
    if (!select || hasUserVotedForMatch(matchId)) return;

    const selectedPlayer = select.value;
    if (!selectedPlayer) {
        alert('Oyunçu seçin!');
        return;
    }

    const votes = getMVPVotes(matchId);
    votes[selectedPlayer] = (votes[selectedPlayer] || 0) + 1;
    saveMVPVotes(matchId, votes);
    setUserVotedForMatch(matchId);

    initMatchMVP(matchId); // Re-init to show "voted"
    updateMatchMVPResults(matchId);
    alert(`${selectedPlayer} üçün səsiniz qeyd olundu!`);
}

function initMatchMVP(matchId) {
    const match = matches.find(m => m.id === matchId);
    const mvpCell = document.getElementById(`mvp-${matchId}`);
    if (!mvpCell) return;

    if (match.adaMVP) {
        // ADA matcı üçün cari MVP göstər
        updateMatchMVPResults(matchId);
        mvpCell.innerHTML = updateMatchMVPResults(matchId) || 'Məlumat yoxdur';
    } else {
        // Digər matçlar üçün "Məlumat yoxdur"
        mvpCell.innerHTML = 'Məlumat yoxdur';
    }
}

function updateMatchMVPResults(matchId) {
    const mvpCell = document.getElementById(`mvp-${matchId}`);
    if (!mvpCell) return 'Məlumat yoxdur';

    const votes = getMVPVotes(matchId);
    let totalVotes = 0;
    let leader = null;
    let maxVotes = 0;

    mvpPlayers.forEach(player => {
        const count = votes[player] || 0;
        totalVotes += count;
        if (count > maxVotes) {
            maxVotes = count;
            leader = player;
        }
    });

    if (totalVotes === 0) {
        return 'Məlumat yoxdur';
    }

    mvpCell.innerHTML = `<strong>${leader}</strong> (${maxVotes} səs)`;
    return `<strong>${leader}</strong> (${maxVotes} səs)`;
}

function initMVP() {
    const form = document.getElementById('mvp-form');
    const resultsDiv = document.getElementById('mvp-results');
    if (!form || !resultsDiv) return;

    // Disable form if user already voted
    if (hasUserVoted()) {
        form.innerHTML = '<p style=\"text-align: center; color: #fff; font-weight: 600;\">Siz artıq MVP səsi vermisiniz! Səslər yaddaşda saxlanılır.</p>';
        form.removeAttribute('id'); // Prevent submit
    } else {
        form.addEventListener('submit', handleMVPSubmit);
    }
    updateMVPResults();
}

// Legacy single MVP functions (for compatibility)
function getMVPVotes() {
    try {
        return JSON.parse(localStorage.getItem('xacmaz_fk_mvp_votes')) || {};
    } catch (e) {
        return {};
    }
}

function saveMVPVotes(votes) {
    localStorage.setItem('xacmaz_fk_mvp_votes', JSON.stringify(votes));
}

function hasUserVoted() {
    return localStorage.getItem('xacmaz_fk_user_voted') === 'true';
}

function setUserVoted() {
    localStorage.setItem('xacmaz_fk_user_voted', 'true');
}

function handleMVPSubmit(e) {
    e.preventDefault();
    if (hasUserVoted()) {
        alert('Siz artıq MVP səsi vermisiniz! Bir dəfə səs vermək qaydasını qarşıladın.');
        return;
    }

    const formData = new FormData(e.target);
    const selectedPlayer = formData.get('mvp-vote');

    if (!selectedPlayer) {
        alert('Zəhmət olmasa bir oyunçu seçin!');
        return;
    }

    const votes = getMVPVotes();
    votes[selectedPlayer] = (votes[selectedPlayer] || 0) + 1;
    saveMVPVotes(votes);
    setUserVoted();

    e.target.reset();
    updateMVPResults();
    alert(`${selectedPlayer} üçün səsiniz qeyd olundu! Təşəkkür edirik!`);
}

function updateMVPResults() {
    const resultsDiv = document.getElementById('mvp-results');
    if (!resultsDiv) return;

    const votes = getMVPVotes();
    let totalVotes = 0;
    let leader = null;
    let maxVotes = 0;

    let html = '<h5>Cari Səslər:</h5><ul>';
    mvpPlayers.forEach(player => {
        const count = votes[player] || 0;
        totalVotes += count;
        if (count > maxVotes) {
            maxVotes = count;
            leader = player;
        }
        const leaderClass = count === maxVotes ? 'leader' : '';
        html += `<li class="${leaderClass}">${player}: ${count} səs</li>`;
    });
    html += '</ul>';

    if (totalVotes > 0) {
        html += `<p><strong>Cari MVP: ${leader} (${maxVotes} səs)</strong></p>`;
    } else {
        html += '<p>Henüz səs yoxdur. İlk səsi verin!</p>';
    }

    resultsDiv.innerHTML = html;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    renderMatches();
    initMVP(); // Legacy single MVP if needed
    renderTeamStats();
});

// Simple i18n
const translations = {
    az: {
        nav_home: 'Ana Səhifə',
        nav_upcoming: 'Gələcək Oyun',
        nav_stats: 'Statistika',
        nav_about: 'Haqqımızda',
        nav_players: 'Oyunçular',
        nav_scorers: 'Bombardirlər',
        nav_assists: 'Ən çox asist',
        nav_news: 'Xəbərlər',
        nav_contact: 'Əlaqə',
        hero_title: 'Xaçmaz FK - Qalibiyyətin Simvolu!',
        hero_subtitle: 'Xaçmazın ən güclü kamandalarından biri ilə şansını sınamaq istəyən bizimlə əlaqə saxlasın',
        home_last_matches: 'Son Matçlar',
        table_opponent: 'Rəqib',
        table_score: 'Nəticə',
        table_date: 'Tarix',
        mvp_title: 'Son Oyun MVP Seç (ADA-Everest matçı - 06.03.2026)',
        mvp_vote_btn: 'Səs Ver!',
        stats_title: 'Komanda Statistikası',
        upcoming_title: 'Gələcək Oyun',
        upcoming_match: 'Xaçmaz FK - Kürdəmir',
        about_title: 'Haqqımızda',
        about_text: 'Xaçmaz FK gənc Xaçmazlı həvəskar gənc futbolçuların yaratdığı bir kamandadır.',
        players_title: 'Oyunçular',
        players_forwards: 'Forwardlar',
        players_defenders: 'Defenderlar',
        players_midfielders: 'Midfielderlər',
        players_goalkeepers: 'Goalkeeperlər',
        scorers_title: 'Bombardirlər',
        assists_title: 'Ən çox asist edənlər',
        news_title: 'Son Xəbərlər',
        news_1_title: 'Xaçmaz FK-nın məğlubiyyətsizlik seriyası bitdi',
        news_1_text: 'Son məğlubbiyyətə baxmayaraq Xaçmaz FK daha güclənəcək. Yeni mövsümə daha güclü qayıdırıq!',
        news_2_title: 'Yeni mövsümə hazırlıqlar başladı',
        news_2_text: 'Komanda yeni transferlərlə güclənir...',
        contact_title: 'Əlaqə',
        contact_phone: 'Telefon: +994 70 224 40 06',
        contact_note: 'Təklif və iradlarınızı bildirə bilərsiniz',
        contact_socials: 'Sosial şəbəkələr: Instagram',
        footer_text: '© 2024 Xaçmaz FK. Bütün hüquqlar qorunur.'
    },
    en: {
        nav_home: 'Home',
        nav_upcoming: 'Upcoming Match',
        nav_stats: 'Statistics',
        nav_about: 'About',
        nav_players: 'Players',
        nav_scorers: 'Top Scorers',
        nav_assists: 'Top Assists',
        nav_news: 'News',
        nav_contact: 'Contact',
        hero_title: 'Khachmaz FC - Symbol of Victory!',
        hero_subtitle: 'If you want to try your chance with one of the strongest teams of Khachmaz, get in touch with us.',
        home_last_matches: 'Last Matches',
        table_opponent: 'Opponent',
        table_score: 'Score',
        table_date: 'Date',
        mvp_title: 'Choose MVP of the Last Game (ADA-Everest match - 06.03.2026)',
        mvp_vote_btn: 'Vote!',
        stats_title: 'Team Statistics',
        upcoming_title: 'Upcoming Match',
        upcoming_match: 'Khachmaz FC - Kurdamir',
        about_title: 'About Us',
        about_text: 'Khachmaz FC is a team created by young amateur footballers from Khachmaz.',
        players_title: 'Players',
        players_forwards: 'Forwards',
        players_defenders: 'Defenders',
        players_midfielders: 'Midfielders',
        players_goalkeepers: 'Goalkeepers',
        scorers_title: 'Top Scorers',
        assists_title: 'Top Assist Providers',
        news_title: 'Latest News',
        news_1_title: 'Khachmaz FC unbeaten run is over',
        news_1_text: 'Despite the last defeat, Khachmaz FC will come back stronger for the new season!',
        news_2_title: 'Preparations for the new season have begun',
        news_2_text: 'The team is getting stronger with new transfers...',
        contact_title: 'Contact',
        contact_phone: 'Phone: +994 70 224 40 06',
        contact_note: 'You can share your suggestions and feedback.',
        contact_socials: 'Social networks: Instagram',
        footer_text: '© 2024 Khachmaz FC. All rights reserved.'
    },
    ru: {
        nav_home: 'Главная',
        nav_upcoming: 'Следующий матч',
        nav_stats: 'Статистика',
        nav_about: 'О нас',
        nav_players: 'Игроки',
        nav_scorers: 'Бомбардиры',
        nav_assists: 'Ассистенты',
        nav_news: 'Новости',
        nav_contact: 'Контакты',
        hero_title: 'Хачмаз ФК — символ победы!',
        hero_subtitle: 'Если вы хотите попробовать свои силы в одной из сильнейших команд Хачмаза, свяжитесь с нами.',
        home_last_matches: 'Последние матчи',
        table_opponent: 'Соперник',
        table_score: 'Счёт',
        table_date: 'Дата',
        mvp_title: 'Выберите MVP последнего матча (ADA-Everest — 06.03.2026)',
        mvp_vote_btn: 'Голосовать!',
        stats_title: 'Статистика команды',
        upcoming_title: 'Следующий матч',
        upcoming_match: 'Хачмаз ФК — Курдемир',
        about_title: 'О нас',
        about_text: 'Хачмаз ФК — команда, созданная молодыми любителями футбола из Хачмаза.',
        players_title: 'Игроки',
        players_forwards: 'Нападающие',
        players_defenders: 'Защитники',
        players_midfielders: 'Полузащитники',
        players_goalkeepers: 'Вратари',
        scorers_title: 'Бомбардиры',
        assists_title: 'Лучшие ассистенты',
        news_title: 'Последние новости',
        news_1_title: 'Серия без поражений Хачмаз ФК прервана',
        news_1_text: 'Несмотря на поражение, Хачмаз ФК вернётся ещё сильнее в новом сезоне!',
        news_2_title: 'Подготовка к новому сезону началась',
        news_2_text: 'Команда усиливается новыми трансферами...',
        contact_title: 'Контакты',
        contact_phone: 'Телефон: +994 70 224 40 06',
        contact_note: 'Вы можете отправить свои предложения и замечания.',
        contact_socials: 'Социальные сети: Instagram',
        footer_text: '© 2024 Хачмаз ФК. Все права защищены.'
    }
};

function applyTranslations(lang) {
    const dict = translations[lang] || translations.az;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            // For elements that contain a link (contact_socials), only replace text part
            if (key === 'contact_socials') {
                const link = el.querySelector('a');
                el.textContent = dict[key] + ' ';
                if (link) el.appendChild(link);
            } else {
                el.textContent = dict[key];
            }
        }
    });
}

function initLanguageSwitcher() {
    const saved = localStorage.getItem('xacmaz_fk_lang') || 'az';
    applyTranslations(saved);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === saved) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            localStorage.setItem('xacmaz_fk_lang', lang);
            applyTranslations(lang);

            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', initLanguageSwitcher);

