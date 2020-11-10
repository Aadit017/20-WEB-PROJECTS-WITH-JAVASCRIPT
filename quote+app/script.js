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
//FUNCTION TO FETCH DATA AND MANIPULATE DOM
async function getQuote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const randomNumber = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomNumber];
        const {text,author} = randomQuote;
        if (author === '') {
            quoteAuthor.innerText = 'Unknown';
        }
        else {
            quoteAuthor.innerText = author;
        }
        if (text.length > 120) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = text;
        complete();
    } catch (error) {
        getQuote();
        console.log('Error getting quotes', error);
    }
};

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
