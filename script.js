const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


// Get quote from API
async function getQuote(){
    showLoadingSpinner();
    
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        const dataArr = await response.json();
        console.log(dataArr)
        
        const data=dataArr[Math.floor(Math.random()*dataArr.length)]

        data.author === "" ? authorText.innerText = "Unknow" :
                                 authorText.innerText = data.author;
            

        // Reduce font size for long quotes
        data.text.length>120 ? quoteText.classList.add('long-quote'):
                                    quoteText.classList.remove('long-quote');
        
        quoteText.innerText = data.text;

        //Stop loader,show quote
        removeLoadingSpinner();

    }catch(error){

        console.log('there is a error',error);
    }
}
// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On load
getQuote();
