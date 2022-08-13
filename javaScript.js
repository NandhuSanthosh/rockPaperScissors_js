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

rules_content = `<div class="rules-tab">
<div class="rules-title">
  <p class="rules-title-text">RULES</p>
 </div>
</div>`

next_game_container = `<div class="result-printer">
<span id='result'>YOU LOSE</span>
<button id="play-again">PLAY AGAIN</button>
</div>`

your_score= 0
com_score = 0

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
rules_button = document.getElementById('rules-button')
rules_tab = document.getElementById('rules-tab')
triangle_section = document.getElementById('triangle-section')
result_printing_container = null
winner_address = null


container = document.createElement('div')
container.innerHTML = next_game_container
triangle_section.appendChild(container)
play_btn = document.getElementById('play-again')
play_btn.addEventListener('click', nxt_game)
result_printing_container = container

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
        selection_details_printer()
        winner = score_updater(computer_choice['id'], selection)
        animation_adder(winner)
        
}
function animation_adder(winner) {
    if (winner != -1){
        holders[winner]['position'].classList.add('winner_shadow')
    }
    dly(winner)
}
function animation_remover(winner) {
    if (winner != -1){
        holders[winner]['position'].classList.remove('winner_shadow')
    }
}

function score_updater(computer_choice, selection) {
    console.log(selection, computer_choice )
    if(computer_choice == 'rock' & selection == 'paper'){
        your_score+=1
        winner = 0
    }else if( computer_choice == 'paper' & selection == 'scissor'){
        your_score+=1
        winner = 0
    }else if( computer_choice == 'scissor' & selection == 'rock'){
        your_score+= 1
        winner = 0
    }else if( computer_choice != selection){
        winner = 1
        com_score += 1;
    }
    else {
        winner = -1
    }
    score_write()
    return winner
}

function score_write() {
    score_container.innerHTML = your_score 
    
}

async function dly(winner){
        await sleep(2000);  
        if (your_score == 10){
            result_printer('YOU WIN')
            winner_address= winner
        }
        else if(com_score == 10){
            result_printer('YOU LOSE')
            winner_address= winner
        }
        else{
            strater()
            animation_remover(winner)
        }
}

function result_printer(string){
    result_printing_container.style.display = 'flex'
    document.getElementById('result').innerHTML = string;

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

    
    result_printing_container.style.display='none'

}
function rules_display(){
    rules_tab.style.display='block'
    rules_tab.innerHTML = rules_content
}
function rules_hidder() {
    rules_tab.style.display='none'
}

function nxt_game(){
    your_score = 0;
    com_score = 0;
    score_write()
    strater()
    animation_remover(winner_address)
}

rules_button.addEventListener('click', rules_display)
rules_tab.addEventListener('click', rules_hidder)
strater()
onclick_adder()