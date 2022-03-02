//constok

const mediaQuery = window.matchMedia('( max-width: 550px )');
const statArea  = document.getElementById('stat-area')
const statBox = document.getElementsByClassName('stat-box');
const btnArea = document.getElementById('stat-buttons');
const toggleBtn = document.getElementById('incr-decr-button');
const incrDecrBtns = document.getElementsByClassName('incr-decr-btn');
const calcBtn = document.getElementById('calc-btn');
const resetBtn = document.getElementById('reset-btn');


let numsEntered = document.getElementById('nums-entered');
let numStatsArray = new Array;
let numsStats = document.getElementById('nums-stats');

let staticPerc = [2.8, 5.6, 8.3, 11.1, 13.9, 16.7, 13.9, 11.1, 8.3, 5.6, 2.8]

/*console.log(statArea);

if (window.innerWidth < 550) {
    console.log('sjuhe')
}
function faszom() {
    console.log('basszameg')
}

window.innerWidth.onchange = faszom();
window.onresize = faszom();


if ( mediaQuery.onchange) {
    console.log('picsaba');
}*/

if (mediaQuery) {
    statArea.classList.add('small');
} else {
    statArea.classList.add('large');
   // statArea.classList.remove('small');
}    



if(window.attachEvent) {
    window.attachEvent('onresize', function() {
        alert('attachEvent - resize');
    });
}
else if(window.addEventListener) {
    window.addEventListener('resize', function() {
        //console.log('addEventListener - resize');
        if (window.innerWidth < 551) {
            statArea.classList.add('small');
            statArea.classList.remove('large');
        } else {
            statArea.classList.add('large');
            statArea.classList.remove('small');
        }    

        if (statArea.classList.contains('small')) {
            for (let i=2; i < 13; i++) {
                let filtered = numStatsArray.filter(item => item == i);
                let numClicks = filtered.length;
                let resizeBoxId = `b${[i]}x`;
                //let basicInfo = document.getElementById(resizeBoxId).getBoundingClientRect();
                //let boxHeigth = basicInfo.height;
                //let boxWidth = basicInfo.width;
                document.getElementById(resizeBoxId).style.width = `${((numClicks*20)+10)}px`;
                document.getElementById(resizeBoxId).style.height = '8%';
                //statArea.classList.remove('large');
                //statArea.classList.add('small');
            }
        } 
        else if (statArea.classList.contains('large')) {
            for (let i=2; i < 13; i++) {
                let filtered = numStatsArray.filter(item => item == i);
                let numClicks = filtered.length;
                let resizeBoxId = `b${[i]}x`;
                //let basicInfo = document.getElementById(resizeBoxId).getBoundingClientRect();
                //let boxHeigth = basicInfo.height;
                //let boxWidth = basicInfo.width;
                document.getElementById(resizeBoxId).style.height = `${((numClicks*20)+10)}px`;
                document.getElementById(resizeBoxId).style.width = '8%';
                //statArea.classList.remove('small');
                //statArea.classList.add('large');
            }
        }
    }, true);
}
//else {
    //The browser does not support Javascript event binding - alertbe ezt?
//}

//a novelo-csokkento gombok (area)
//atvaltana em v rem-be

btnArea.addEventListener('click', e => {
    let numInput = parseInt(e.target.value);
    let boxIdOnClick = `${e.target.id}x`;
    // keszíteni egy objektumot, amiben benne van az összes box és a rá történt kattintások száma, amit aztán átméretezésnél használnék majd

    let basicInfo = document.getElementById(boxIdOnClick).getBoundingClientRect();
    console.log(basicInfo);
    let oldHeigth = basicInfo.height;
    let oldWidth = basicInfo.width;
    //let ClickCounter = new Object;
    //let clickCountArray = [0,0,0,0,0,0,0,0,0,0,0];

    if (e.target.classList.contains('incr')){

        // noveles funkcio

       if ( window.innerWidth < 551 ) {
            let newWidth = oldWidth + 20;
            document.getElementById(boxIdOnClick).style.width = newWidth + 'px';
            console.log('faszom')
        } else {
        let newHeigth = oldHeigth + 20;
        document.getElementById(boxIdOnClick).style.height = newHeigth + 'px';
        console.log('poop');
            }
            //clickCountArray[numInput] += clickCountArray[numInput]+1;
            //console.log(clickCountArray);
        //hozzaadja az arrayhez
        
        numsEntered.innerHTML += `${numInput}, `;
        numStatsArray.unshift(numInput);
        //ezzel itt van gond lent
        numsStats.innerHTML = numStatsArray;
        console.log(numStatsArray);
    }

        // csokkentes funkcio

    else if (e.target.classList.contains('decr')){

        if ( window.innerWidth < 551 && oldWidth > 10) {
            let newWidth = oldWidth - 20;
            document.getElementById(boxIdOnClick).style.width = newWidth + 'px';
            console.log('faszom')
        } else {
            if (window.innerWidth > 550 && oldHeigth > 10){
            let newHeigth = oldHeigth - 20;
            document.getElementById(boxIdOnClick).style.height = newHeigth + 'px';
            }
        }

        //console.log('poop');
        numsEntered.innerHTML += `-${numInput}, `;
        let toBeDeld = numStatsArray.findIndex( e => e == numInput);
        if (toBeDeld != -1) {
            numStatsArray.splice(toBeDeld, 1);
            numsStats.innerText = numStatsArray;
        }
    }
});


// btn-toggle funkcio

toggleBtn.addEventListener ('click', e => {
    if(e.target.classList.contains('toggle-incr')) {
        //valts csokkre
        toggleBtn.classList.remove('toggle-incr');
        toggleBtn.classList.add('toggle-decr');
        toggleBtn.innerHTML = 'Növel';
        for (let i = 0; i < incrDecrBtns.length; i++) {
            incrDecrBtns[i].classList.remove('incr');
            incrDecrBtns[i].classList.add('decr');
        }

    } else {
        // valts incre
        toggleBtn.classList.remove('toggle-decr');
        toggleBtn.classList.add('toggle-incr');
        toggleBtn.innerHTML = 'Csökkent';
        for (let i = 0; i < incrDecrBtns.length; i++) {
            incrDecrBtns[i].classList.remove('decr');
            incrDecrBtns[i].classList.add('incr');
        }
    }
});

// reset funkcio

resetBtn.addEventListener ('click', e => {
// ez nem a legjobb
    if (window.confirm('Biztosan törölni kívánod a bevitt adatokat?')) {
        numsStats.innerHTML = '';
        numStatsArray = new Array;
        numsEntered.innerHTML = '';
        console.log(numsStats.innerHTML);
        console.log(numStatsArray);
        console.log(numsEntered.innerHTML);
        for (let i = 0; i < statBox.length; i++) {
            if (statArea.classList.contains('small')) {
                statBox[i].style.width = '10px';
            }
            else if (statArea.classList.contains('large')) {
                statBox[i].style.height = '10px';
            }
        }
        for (let i=2; i < 13; i++) {
            let numItems = document.getElementById(`num-items${i}`);
            numItems.innerHTML = ''; 
            let percItems = document.getElementById(`perc-items${i}`);
            percItems.innerHTML = '';
            let numsShouldBeen = document.getElementById(`num-items-shouldbe${i}`);
            numsShouldBeen.innerHTML = '';
        }
    }
});


// statisztika

calcBtn.addEventListener ('click', e => {

    for (let i=2; i < 13; i++) {
    let filtered = numStatsArray.filter(item => item == i);

    let numItems = document.getElementById(`num-items${i}`);
    numItems.innerHTML = filtered.length;

    let percItems = document.getElementById(`perc-items${i}`);
    let perc = filtered.length/numStatsArray.length*100;
    perc = perc.toFixed(1);
    percItems.innerHTML = `${perc}%`;

    let numsShouldBeen = document.getElementById(`num-items-shouldbe${i}`);
    let shuoldBe = (numStatsArray.length*staticPerc[i-2]) / 100;
    shuoldBe = shuoldBe.toFixed(1);
    numsShouldBeen.innerHTML = shuoldBe;
    }
});