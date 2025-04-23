function togglePopup() {
    document.querySelector('.floating-button').classList.toggle('open');
    const popup = document.getElementById('popupOptions');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

function isOpenNow() {
    const now = new Date();
    const day = now.getDay(); // 0 = dimanche, 1 = lundi...
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const time = hour + minutes / 60;

    // Ouvert lundi à vendredi 09h-19h, fermé samedi-dimanche
    const openDays = [1, 2, 3, 4, 5]; // lun à ven
    return openDays.includes(day) && time >= 9 && time < 19;
}

window.addEventListener('DOMContentLoaded', () => {
    const circle = document.getElementById('statusCircle');
    if (isOpenNow()) {
        circle.classList.add('open');
        circle.title = "Nous sommes ouverts";
    } else {
        circle.classList.add('closed');
        circle.title = "Nous sommes fermés";
    }
});