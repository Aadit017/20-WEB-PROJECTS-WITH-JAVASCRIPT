const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const newQuoteBtn = document.querySelector('#new-quote');
const tweetBtn = document.querySelector('#twitter');
const loader = document.querySelector('#loader');

//LOADING ANIMATION
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;

};
//LOADING COMPLETE ANIMATION
function complete(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            quoteAuthor.innerText = 'Unknown';
        }
        else {
            quoteAuthor.innerText = data.quoteAuthor;
        }
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        complete();
    } catch (error) {
        getQuote();
        console.log('Error getting quotes', error);
    }
};
//LOADING FUNCTION

//FUNCTION TO TWEET QUOTE 
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const tweetURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetURL, '_blank');
};
//EVENT LISTENERS
newQuoteBtn.addEventListener('click', getQuote);
tweetBtn.addEventListener('click', tweetQuote);
getQuote();
