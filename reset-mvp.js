// Xaçmaz FK Per-Game MVP Reset
const matches = [
    { id: '2026-03-06' }, { id: '2026-02-21' }, { id: '2025-12-18' }
];

matches.forEach(match => {
    localStorage.removeItem(`xacmaz_fk_mvp_${match.id}`);
    localStorage.removeItem(`xacmaz_fk_user_voted_${match.id}`);
});

// Legacy
localStorage.removeItem('xacmaz_fk_mvp_votes');
localStorage.removeItem('xacmaz_fk_user_voted');

console.log('✅ Bütün MVP səsləri (per-game + legacy) silindi!');
alert('Bütün MVP səsləri sıfırlandı! Hər oyun üçün yenidən səs verə bilərsiniz.');
