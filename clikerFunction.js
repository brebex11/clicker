'use strict';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var mouseX = null;
var mouseY = null;

document.addEventListener('mousemove', getMouseMove);

function getMouseMove(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
}

function createEnemy(enemyConf) {
        let enemyBad = document.createElement('div');
        enemyBad.classList.add(enemyConf.className);
        enemyBad.style.left = enemyConf.x + 'px';
        enemyBad.style.top = enemyConf.y + 'px';
        enemyBad.style.backgroundImage = "url("+enemyConf.imgUrl+")" ;
        enemyBad.style.height = enemyConf.height + 'px';
        enemyBad.style.width = enemyConf.width + 'px';
        document.body.append(enemyBad);

        let addEnemy = {
            div: enemyBad,
            x: enemyConf.x,
            y: enemyConf.y,
            direction: null,
            counter: 0,

            step: function () {
                this.y += 10;
                this.div.style.top =this.y + 'px';

                

                if (this.direction === null || this.counter === 20){
                    let rnd = getRandomInt(0,2);
                    this.direction = rnd === 0 ? 'left' : 'right';
                    this.counter = 0;
                }
                else if (this.direction === 'left'){
                    this.div.style.left = this.x - getRandomInt(100,250) + 'px';
                }
                else if(this.direction === 'right'){
                    this.div.style.left = this.x + getRandomInt(100,250) + 'px';
                }
                this.counter++;
            }
        }

    return addEnemy;
}


function createMainAir(mainAirConf) {
    let mainAir = document.createElement('div');
    mainAir.id = (mainAirConf.className);
    mainAir.style.top = mainAirConf.y + 'px';
    mainAir.style.left = mainAirConf.x + 'px';
    mainAir.style.backgroundImage = "url("+mainAirConf.imgUrl+")";
    mainAir.style.height = mainAirConf.height + 'px';
    mainAir.style.width = mainAirConf.width + 'px';
    document.body.append(mainAir);

    let addMainAir = {
        div: mainAir,
        x: mainAirConf.x,
        y: mainAirConf.y,


        step: function () {
            this.x = mouseX ;
            this.y = mouseY;
            // this.div.style.top = this.y + 'px';
            // this.div.style.left = this.x + 'px';
        }
    }

    return addMainAir;
}



function clickerFunction() {
    return {
        config: {},
        enemies: [],
        mainAir: null,
        timer: null,
        run: function(){
           this.timer = setInterval( () => {
                for (let i = 0; i < this.enemies.length; i++){
                    this.enemies[i].step();
                }

               this.mainAir.step();
            },100)


        },
        init: function(configuration) {

            this.config = configuration;
            this.mainAir = createMainAir(this.config.userConfig);

            console.log(this.config);
            for (let i = 0; i < this.config.enemiesConfig.length; i++){
                for (let j = 0; j < 1; j++){
                    let tmp = createEnemy(this.config.enemiesConfig[i]);
                    this.enemies.push(tmp);
                }
            }

                console.log(this)
        },




    };
}

let configuration = config;
let game = clickerFunction();

game.init(configuration);

game.run();

//
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }
//
// //Массив объектов
//
// const arrayBad = [
//
//
// ]
//
// var factoryConfig = {
//     type: 'enemy',
//     className: '',
//     imgUrl: '',
//     x: 0,
//     y: 0,
//
// }
//
//
//
// function createAllDiv(factoyConfi) {
//
//     switch (factoyConfi.type) {
//         case enemy1:
//             return createEnemy1(factoyConfi.x, factoyConfi.y);
//
//     }
// }
//
//
//
//
//
//
// function createEnemy1(x, y, image) {
//     let bad1 = document.createElement('div');
//     bad1.classList.add(enemy1.className);
//     document.append('bad1');
//     bad1.style.top = enemy1.position.y + 'px';
//     bad1.style.left = enemy1.position.x + 'px';
//     bad1.style.backgroundImage = enemy1.imgUrl;
//     return {
//         div: bad1,
//             position:{
//         y: y,
//             x: getRandomInt(200, 1300),
//     },
//         imgUrl: true,
//             className: 'allBadAir',
//     }
// }
//
//
//

