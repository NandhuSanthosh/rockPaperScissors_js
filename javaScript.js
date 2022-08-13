Math.random();

paper_symbol = `<div data-id="paper" class="game-symbol-outline game-symbol-flex paper-out">
<div class="game-symbol-container game-symbol-flex">
<img src="images/icon-paper.svg" class="symbol-svg" alt="">
</div>
</div>`

rock_symbol = `<div data-id="rock" class="game-symbol-outline game-symbol-flex rock-out">
<div class="game-symbol-container game-symbol-flex ">
<img src="images/icon-rock.svg" class="symbol-svg" alt="">
</div>
</div>`

scissor_symbol=`<div data-id="scissor" class="game-symbol-outline game-symbol-flex scissor-out">
<div class="game-symbol-container game-symbol-flex">
<img src="images/icon-scissors.svg" class="symbol-svg" alt="">
</div>
</div>`

you_picked = `<div class="selection-details">
<span>YOU PICKED</span>
</div>`

house_picked = `<div class="selection-details">
<span>THE HOUSE PICKED</span>
</div>`

score = 0

symbols = [{
        'code': paper_symbol, 
        'id': "paper"
    },{
        'code': scissor_symbol, 
        'id': "scissor"
    },{
        'code': rock_symbol,
        'id': "rock"
    }]


score_container = document.getElementById('score-value')
one = document.getElementById('holder-one')
two = document.getElementById('holder-two')
three = document.getElementById('holder-three')
holders = [{
        'position': one, 
    },{
        'position': two,
    },{
        'position': three
    }
]


function onclick_adder(){
    holders.forEach((item)=>{
        item['position'].addEventListener('click', (Event)=>{
            ele = Event.path.reverse()[9]
            selection = ele.dataset.id
            console.log(selection)
            after_selected(selection)
        })
    })
}

function after_selected(selection){
        selected = symbols.filter((item)=>{
            if (item['id'] == selection){
                return item
            }
        }) 
        holders[0]['position'].innerHTML = selected[0]['code']
        computer_choice = symbols[rand()]
        holders[1]['position'].innerHTML = computer_choice['code']
        holders[2]['position'].style.display = 'none'
        console.log(holders)
        selection_details_printer()
        score_updater(computer_choice['id'], selection)
        dly()
}

function score_updater(computer_choice, selection) {
    console.log(selection, computer_choice )
    if(computer_choice == 'rock' & selection == 'paper'){
        score +=1
    }else if( computer_choice == 'paper' & selection == 'scissor'){
        score +=1
    }else if( computer_choice == 'scissor' & selection == 'rock'){
        score += 1
    }
    score_container.innerHTML = score
}

async function dly(){
        await sleep(2000);  
        strater()
}
function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
 }  

function selection_details_printer(){
    container = document.createElement('div')
    container.innerHTML = you_picked
    holders[0]['position'].appendChild(container)

    container = document.createElement('div')
    container.innerHTML = house_picked
    holders[1]['position'].appendChild(container)

}
function rand() {  
    Math.floor(Math.random())
    number = Math.floor(Math.random() * 3)
    return number
} 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




function strater(){
    holders[2]['position'].style.display = 'flex'
    holders.forEach((item, index) =>{
        item['position'].innerHTML = symbols[index]['code']
        item['content']= symbols[index]['id']
    })
}
strater()
onclick_adder()