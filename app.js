const btns = document.querySelectorAll('button');
const winnerLayout = document.querySelector('.win-overlay');
const matchCount = document.querySelector('#matches');
const clicksOverlay = document.querySelector('#clicks');
let click = false;
let lastBtnId = null;
let lastBtnNum = null;
let nums = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]; // Assigning a num to an img
let matches = 0;
let clicks = 0;

function showOverlay () {
    winnerLayout.style.display = 'visible';
}

function newGame() {
    matches = 0;
    clicks = 0;
    lastBtnId = null;
    lastBtnNum = null;
    click = false;
    shuffle(nums);
    randomNumbersIntoDataset();

    if (btns){
        btns.forEach(function (el) {
            el.innerHTML = setImgToNumber('0');
            el.style.backgroundColor = 'white';
            winnerLayout.style.display = 'none';  
            matchCount.style.innerText = '0';
            clicksOverlay.style.innerText = '0';
        });
    }
}

function randomNumbersIntoDataset () {
    // btns.forEach(el => {
    //     el.dataset.number = nums[i];
    // });

    for(let i = 0; i < btns.length; i++){
        btns[i].dataset.number = nums[i];
        console.log(i); // goes to 16
    }
}

function setImgToNumber (number) {
    /**Was stuck on error, images not showing up, my numbers MUST be in string format
     * for datasets, since it's read as strings within the console
     */
    if (number === '1') {
        return '<img src="./images/BAKER.png">';
    } else if (number === '2') {
        return '<img src="./images/DEATHWISH.png">';
    } else if (number === '3') {
        return '<img src="./images/DGK.png">';
    } else if (number === '4') {
        return '<img src="./images/ELEMENT.png">'
    } else if (number === '5') {
        return '<img src="./images/ETNIES.png">'
    } else if (number === '6') {
        return '<img src="./images/SANTACRUZ.png">'
    } else if (number === '7') {
        return '<img src="./images/THRASHER.png">'
    } else if (number === '8') {
        return '<img src="./images/VANS.png">'
    } else {
        return '<img src="./images/ZEROback.png">'
    }
}


if (btns) {
    btns.forEach(function(el) {
        el.addEventListener('click', (e) => {

            let turnable = e.target.dataset.canturn; // Auto set to 'true', has to be lowercase?, not sure why, was stuck on undefined
            if (!click && lastBtnId === null && lastBtnNum === null && turnable === 'true'){
                /**After first click, set turnable back to false */
                turnable = 'false';

                console.log(e.target); // num

                e.target.innerHTML = setImgToNumber(event.target.dataset.number);
                e.target.style.backgroundColor = 'orange';

                lastBtnId = e.target.id;
                lastBtnNum = e.target.dataset.number;

            } else if (!click && lastBtnId !== null && lastBtnNum !== null && turnable === 'true' && e.target.id !== lastBtnId) { // Make sure we can't click on the ID just clicked
                /**Compare after second click */
                turnable = 'false';

                console.log(e.target); // num

                e.target.innerHTML = setImgToNumber(event.target.dataset.number);

                /**Match, compare both of the dataset numbers */
                if (e.target.dataset.number === lastBtnNum) {
                    e.target.style.backgroundColor = 'green';
                    document.getElementById(lastBtnId).style.backgroundColor = 'green';

                    lastBtnId = null;
                    lastBtnNum = null;
                    matchCount.innerText = matches += 1;
                    clicksOverlay.innerText = clicks += 1;
                    
                    if (matches == 8) {
                        showOverlay();
                    } 

                } else { // No match
                    // Both, the last btn pressed and the next btn turn red
                    document.getElementById(lastBtnId).style.backgroundColor = 'red'; // last btn
                    e.target.style.backgroundColor = 'red'; // curr btn
                    click = true;
                    
                    setTimeout(() => {
                        turnable = 'true';
                        e.target.style.backgroundColor = 'white';
                        e.target.innerHTML = setImgToNumber('0');

                        let temp = document.getElementById(lastBtnId);
                        temp.dataset.canturn = 'true';
                        temp.style.backgroundColor = 'white';
                        temp.innerHTML = setImgToNumber('0');

                        lastBtnId = null;
                        lastBtnNum = null;

                        click = false;
                        clicksOverlay.innerText = clicks += 1;
                    }, 1000);
                }
            }
        });
    });
}

/**An efficient array shuffle from stackOverflow */
function shuffle(array) {
    let j, x;
    for (let i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}



shuffle(nums);
randomNumbersIntoDataset();
