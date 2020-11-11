const searchContainer = document.querySelector('.search-container');
const searchBtn = document.querySelector('.search');
const closeBtn = document.querySelector('.close');
const form = document.querySelector('#form');
const input = document.querySelector('input');

//EVENT LISTENERS
searchBtn.addEventListener('click', () => {
    searchContainer.classList.add('show');
});
closeBtn.addEventListener('click', () => {
    searchContainer.classList.remove('show');
});
//EVENT LISTENER FOR FORM SUBMIT
form.addEventListener('submit', (e) => {
    window.open(`https://www.google.com/search?q=${input.value}`, '_blank')
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (searchContainer.classList.contains('show')) {
            searchContainer.classList.remove('show');
        }
    }
});