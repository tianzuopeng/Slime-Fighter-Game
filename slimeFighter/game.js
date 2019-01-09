//background canvas
var background1 = document.createElement("canvas");
var bg1 = background1.getContext("2d");
background1.width = 800;
background1.height = 500;
background1.style.position = "absolute";
background1.style.background="url(map/outside.png)";
background1.style.top = "8px";
background1.style.left = "8px";
background1.style.backgroundPosition="0px 0px";

document.body.appendChild(background1);

//hero canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
document.body.appendChild(canvas);
canvas.style.position = "absolute";


//monster canvas
var foreground = document.createElement("canvas");
var fg = foreground.getContext("2d");
foreground.width = 800;
foreground.height = 500;
foreground.style.position = "relative";
document.body.appendChild(foreground);

//foreground and UI
var foreground1 = document.createElement("canvas");
var fg1 = foreground1.getContext("2d");
foreground1.width = 800;
foreground1.height = 500;
foreground1.style.position = "absolute";
foreground1.style.top = "8px";
foreground1.style.left = "8px";

document.body.appendChild(foreground1);

//sound
var bgm1 = document.createElement('audio');
bgm1.src = 'sound/bgm1.mp3';

var bgm2 = document.createElement('audio');
bgm2.src = 'sound/bgm2.mp3';

var monsterDeathSound= document.createElement('audio');
monsterDeathSound.src = "sound/monsterdeath.mp3";

var swordSound= document.createElement('audio');
swordSound.src = "sound/sword.mp3";

var hitSound= document.createElement('audio');
hitSound.src = "sound/hit.mp3";

var herohitSound = document.createElement('audio');
herohitSound.src = "sound/block.mp3";

var runSound = document.createElement('audio');
runSound.src = "sound/run.mp3";

var bossswingSound = document.createElement('audio');
bossswingSound.src = "sound/swing.mp3";

var winSound = document.createElement('audio');
winSound.src = "sound/win.mp3";

var stoneSound = document.createElement('audio');
stoneSound.src = "sound/stonebreak.mp3";

var jumpSound = document.createElement('audio');
jumpSound.src = "sound/bossjump.mp3";

//map Image

var caveImage = new Image();
caveImage.src = "map/inside.png";

var bgImage = new Image();
bgImage.src = "map/outside.png";

//boss Image
var bossImage = new Image();
bossImage.src = "boss/bossstand.png";

var swingImage = new Image();
swingImage.src = "boss/bossswing.png";

var jumpImage = new Image();
jumpImage.src = "boss/bossjump.png";

//monster image
var monsterImage = new Image();
monsterImage.src = "monster/monster.png";

var leftMonsterStandImage = new Image();
leftMonsterStandImage.src = "monster/leftMonsterStand.png"

var monsterHitImage = new Image();
monsterHitImage.src = "hit/monsterhit.png";

var monsterAttackImage = new Image();
monsterAttackImage.src = "monster/monsterAttack.png";

var leftMonsterAttackImage = new Image();
leftMonsterAttackImage.src = "monster/leftMonsterAttack.png"

var monsterDeathImage = new Image();
monsterDeathImage.src = "monster/monsterdeath.png";

var leftMonsterDeathImage = new Image();
leftMonsterDeathImage.src = "monster/leftMonsterDeath.png";

//hero images
var attackImage=new Image();
attackImage.src = "A2/A2.png";

var standImage=new Image();
standImage.src = "stand/stand.png";

var runImage=new Image();
runImage.src = "run/run.png";

var leftRunImage= new Image();
leftRunImage.src = "run/leftrun.png";

var leftStandImage = new Image();
leftStandImage.src = "stand/leftstand.png";

var leftAttackImage = new Image();
leftAttackImage.src = "A2/leftA2.png";

var hitImage = new Image();
hitImage.src = "hit/hit.png";

var leftHitImage = new Image();
leftHitImage.src = "hit/lefthit.png";

var deathImage = new Image();
deathImage.src = "death/death.png";

var leftDeathImage = new Image();
leftDeathImage.src = "death/leftdeath.png";

//stone image

var stoneImage = new Image();
stoneImage.src ="stone/stone.png";

//sound object
sound={
    winsound:true
};

//hero object
var hero={
    state:"stand",
    direction:"right",
    speed:250,
    health:50,
    dmg:50,
    x:100,
    y:250,
    dmgSource:"",
    attackStart:0,
    runStart:0,
    hitStart:0,
    deathStart:0,
    back:false,
    hitbox:function(){
        if (hero.direction === "right"){
            if(hero.state === "attack"){
                return [hero.x+20,hero.y,80,100];
            }else{
                return [hero.x+40,hero.y+40,60,60];
            }
        }else{
            if(hero.state === "attack"){
                return [hero.x,hero.y,80,100];
            }else{
                return [hero.x,hero.y+40,60,60];
            }
        }
    },
    attackbox:function(){
        if (hero.direction === "right"){
            return [hero.x-20,hero.y,190,50];
        }else{
            return [hero.x-70,hero.y,190,50];
        }
    },
    attack:function(){
        if (hero.attackStart == 0){
            hero.attackStart = Date.now();
            swordSound.play();
        }else{
            var time = Date.now();
            if (hero.direction ==="right"){
                if (time - hero.attackStart <=146){
                    ctx.clearRect(hero.x-20,hero.y,192,100);
                    ctx.drawImage(attackImage,0,0, 93,100,hero.x,hero.y,93,100);
                }else if (time - hero.attackStart >146 && time - hero.attackStart <= 189){
                    ctx.clearRect(hero.x-20,hero.y,192,100);
                    ctx.drawImage(attackImage,100,0, 172,100,hero.x,hero.y,172,100);
                }else if (time - hero.attackStart >189 && time - hero.attackStart <=368){
                    ctx.clearRect(hero.x-20,hero.y,192,100);
                    ctx.drawImage(attackImage,300,0, 117,100,hero.x-20,hero.y,117,100);
                }else if (time - hero.attackStart > 368 && time - hero.attackStart <=480){
                    ctx.clearRect(hero.x-20,hero.y,192,100);
                    ctx.drawImage(attackImage,425,0, 148,100,hero.x-40,hero.y,148,100);
                }else if (time - hero.attackStart > 480){
                    ctx.clearRect(hero.x-40,hero.y,212,100);
                    hero.attackStart = 0;
                    hero.state = "stand";
                }
            }else{
                if (time - hero.attackStart <=146){
                    ctx.clearRect(hero.x-70,hero.y,242,100);
                    ctx.drawImage(leftAttackImage,0,0, 93,100,hero.x,hero.y,93,100);
                }else if (time - hero.attackStart >146 && time - hero.attackStart <= 189){
                    ctx.clearRect(hero.x-70,hero.y,242,100);
                    ctx.drawImage(leftAttackImage,100,0, 172,100,hero.x-70,hero.y,172,100);
                }else if (time - hero.attackStart > 189 && time - hero.attackStart <=368){
                    ctx.clearRect(hero.x-70,hero.y,242,100);
                    ctx.drawImage(leftAttackImage,300,0, 117,100,hero.x,hero.y,117,100);
                }else if (time - hero.attackStart > 368 && time - hero.attackStart <=480){
                    ctx.clearRect(hero.x-70,hero.y,242,100);
                    ctx.drawImage(leftAttackImage,425,0, 148,100,hero.x,hero.y,148,100);
                }else{
                    hero.attackStart = 0;
                    hero.state = "stand";
                }
            }
        }
        

    },
        
    run:function(){
        if (hero.runStart == 0){
            hero.runStart = Date.now();
            runSound.play();
        }else{
            var time = Date.now();
            if (hero.direction ==="right"){
                if (time - hero.runStart <=50){
                    ctx.clearRect(hero.x-40,hero.y-40,174,180);
                    ctx.drawImage(runImage,0,0, 85,100,hero.x,hero.y,85,100);
                }else if (time - hero.runStart >50 && time - hero.runStart <= 100){
                    ctx.clearRect(hero.x-40,hero.y-40,174,180);
                    ctx.drawImage(runImage,100,0, 86,100,hero.x,hero.y,86,100);
                }else if (time - hero.runStart >100 && time - hero.runStart <=150){
                    ctx.clearRect(hero.x-40,hero.y-40,174,180);
                    ctx.drawImage(runImage,200,0, 94,100,hero.x,hero.y,94,100);
                }else if (time - hero.runStart > 150 && time - hero.runStart <=200){
                    ctx.clearRect(hero.x-40,hero.y-40,174,180);
                    ctx.drawImage(runImage,300,0, 86,100,hero.x,hero.y,86,100);
                }else if (time - hero.runStart > 200){
                    hero.runStart = 0;
                }
            }else{
                if (time - hero.runStart <=50){
                    ctx.clearRect(hero.x-40,hero.y-40,174,180);
                    ctx.drawImage(leftRunImage,0,0, 85,100,hero.x,hero.y,85,100);
                }else if (time - hero.runStart >50 && time - hero.runStart <= 150){
                    ctx.clearRect(hero.x-40,hero.y-40,174,180);
                    ctx.drawImage(leftRunImage,100,0, 86,100,hero.x,hero.y,86,100);
                }else if (time - hero.runStart >100 && time - hero.runStart <=150){
                    ctx.clearRect(hero.x-40,hero.y-40,174,180);
                    ctx.drawImage(leftRunImage,200,0, 94,100,hero.x-7,hero.y,94,100);
                }else if (time - hero.runStart > 150 && time - hero.runStart <=200){
                    ctx.clearRect(hero.x-40,hero.y-40,174,180);
                    ctx.drawImage(leftRunImage,300,0, 86,100,hero.x,hero.y,86,100);
                }else if (time - hero.runStart > 200){
                    hero.runStart = 0;
                }
            }
    
        }

    },

    stand:function(){
        var number = Date.now()%1000;
        runSound.pause();
        if (number>500){
            if (hero.direction === "right"){
                ctx.clearRect(hero.x-80,hero.y,242,100);
                ctx.drawImage(standImage,0,0, 100,100,hero.x,hero.y,100,100);
            }else{
                ctx.clearRect(hero.x-70,hero.y,242,100);
                ctx.drawImage(leftStandImage,0,0, 100,100,hero.x,hero.y,100,100);
            }
        }else if(number<500) {
            if (hero.direction === "right"){
                ctx.clearRect(hero.x-70,hero.y,242,100);
                ctx.drawImage(standImage,100,0, 100,100,hero.x,hero.y,100,100);
            }else{
                ctx.clearRect(hero.x-70,hero.y,242,100);
                ctx.drawImage(leftStandImage,100,0, 100,100,hero.x,hero.y,100,100);
            }    
        }
    },

    hit:function(){
        if (hero.hitStart == 0){
            hero.hitStart = Date.now();
            herohitSound.play();
            if (hero.dmgSource == "monster"){
                hero.health -= monster.dmg;
                hero.dmgSource = "";
            }else if (hero.dmgSource == "bj"){
                hero.health -= boss.jdmg;
                hero.dmgSource = "";
            }else if (hero.dmgSource == "bs"){
                hero.back = true;
                hero.health -= boss.sdmg;
                hero.dmgSource = "";
            }else{
                    hero.health -= 7;
            }
        }else{
            var time = Date.now();
            if(time - hero.hitStart < 600){
                if(hero.back && hero.x > 0){hero.x -= 3;}
                if (hero.direction === "right"){
                    ctx.clearRect(hero.x-170,hero.y,350,150);
                    ctx.drawImage(hitImage,0,0, 73,99,hero.x+20,hero.y,73,99);
                }else{
                    ctx.clearRect(hero.x-170,hero.y,350,100);
                    ctx.drawImage(leftHitImage,0,0, 73,99,hero.x,hero.y,73,99);
                }
            }else{
                hero.back=false;
                ctx.clearRect(hero.x-170,hero.y,350,100);
                hero.hitStart = 0;
                hero.state="stand";
            }
        }
    },
    death:function(){
        if (hero.deathStart == 0){
            hero.deathStart = Date.now();
        }else{
            var time = Date.now();
            if (hero.direction ==="right"){
                if (time - hero.deathStart <=146){
                    ctx.clearRect(hero.x-20,hero.y,232,100);
                    ctx.drawImage(deathImage,0,0, 73,100,hero.x,hero.y,73,100);
                }else if (time - hero.deathStart >146 && time - hero.deathStart <= 189){
                    ctx.clearRect(hero.x-20,hero.y,232,100);
                    ctx.drawImage(deathImage,83,0, 75,100,hero.x,hero.y,75,100);
                }else if (time - hero.deathStart >189 && hero.deathStart <=368){
                    ctx.clearRect(hero.x-20,hero.y,232,100);
                    ctx.drawImage(deathImage,166,0, 92,100,hero.x,hero.y,92,100);
                }else if (time - hero.deathStart > 368 && time - hero.deathStart <=480){
                    ctx.clearRect(hero.x-20,hero.y,232,100);
                    ctx.drawImage(deathImage,268,0, 136,100,hero.x,hero.y,136,100);
                }else if (time - hero.deathStart > 480){
                    ctx.clearRect(hero.x-60,hero.y,232,100);
                    ctx.drawImage(deathImage,414,0, 185,100,hero.x,hero.y,185,100);
                }
            }else{
                if (time - hero.deathStart <=146){
                    ctx.clearRect(hero.x-70,hero.y,242,100);
                    ctx.drawImage(leftDeathImage,0,0, 73,100,hero.x,hero.y,73,100);
                }else if (time - hero.deathStart >146 && time - hero.deathStart <= 189){
                    ctx.clearRect(hero.x-70,hero.y,242,100);
                    ctx.drawImage(leftDeathImage,81,0, 75,100,hero.x,hero.y,75,100);
                }else if (time - hero.deathStart > 189 && time - hero.deathStart <=368){
                    ctx.clearRect(hero.x-70,hero.y,242,100);
                    ctx.drawImage(leftDeathImage,174,0, 92,100,hero.x-20,hero.y,92,100);
                }else if (time - hero.deathStart > 368 && time - hero.deathStart <=480){
                    ctx.clearRect(hero.x-80,hero.y,242,100);
                    ctx.drawImage(leftDeathImage,277,0, 136,100,hero.x-60,hero.y,136,100);
                }else if(time - hero.deathStart > 480){
                    ctx.clearRect(hero.x-80,hero.y,242,100);
                    ctx.drawImage(leftDeathImage,415,0, 185,100,hero.x-120,hero.y,185,100);
                }
            }
        }
    }
};

//background object
var bg={
    x:0,
    y:0,
    number:0
}

//monster object
var monster={
    x:500,
    y:250,
    speed:200,
    state:"stand",
    direction:"left",
    health:200,
    dmg:10,
    hitStart:0,
    runStart:0,
    attackStart: 0,
    standStart:0,
    angryStart:0,
    deathStart:0,
    hitbox:function(){
        if (monster.direction === "right"){
            if(monster.state === "attack"){
                return [monster.x,monster.y+20,150,60];
            }else{
                return [monster.x,monster.y+20,115,60];
            }
        }else{
            if(monster.state === "attack"){
                return [monster.x-40,monster.y+20,160,60];
            }else{
                return [monster.x,monster.y+20,115,60];
            }
        }
    },
    attackbox:function(){
        if (monster.direction === "right"){
            return [monster.x,monster.y+30,150,50];
        }else{
            return [monster.x-40,monster.y+30,150,50];
        }
    },
    stand:function(){
        var number = Date.now()%1000;
        if (number>0 && number<=100){
            fg.clearRect(monster.x-40,monster.y-40,200,140);
            if (monster.direction === "left"){
                fg.drawImage(leftMonsterStandImage,10,0, 110,100,monster.x,monster.y,110,100);
            }else{
                fg.drawImage(monsterImage,10,0, 110,100,monster.x,monster.y,110,100);
            }
        }else if(number>100 && number<=500) {
            fg.clearRect(monster.x-40,monster.y-40,200,140);
            if (monster.direction === "left"){
                fg.drawImage(leftMonsterStandImage,210,0, 130,100,monster.x,monster.y,130,100);
            }else{
                fg.drawImage(monsterImage,210,0, 130,100,monster.x,monster.y,130,100);
            }    
        }else if(number>500 && number<=900) {
            fg.clearRect(monster.x-40,monster.y-40,200,140);
            if (monster.direction === "left"){
                fg.drawImage(leftMonsterStandImage,10,100, 110,100,monster.x,monster.y,110,100);
            }else{
                fg.drawImage(monsterImage,10,100, 110,100,monster.x,monster.y,110,100);
            }    
        }else if(number>900) {
            fg.clearRect(monster.x-40,monster.y-40,200,140);
            if (monster.direction === "left"){
                fg.drawImage(leftMonsterStandImage,410,100, 110,100,monster.x,monster.y,110,100);
            }else{
                fg.drawImage(monsterImage,410,100, 110,100,monster.x,monster.y,110,100);
            }    
        }},
        
    run:function(){
        if (monster.runStart == 0){
            monster.runStart = Date.now();
        }else{
            var time = Date.now();
            if (monster.direction ==="right"){
                if (time - monster.runStart <=50){
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    fg.drawImage(monsterImage,10,0, 110,100,monster.x,monster.y,110,100);
                }else if (time - monster.runStart >50 && time - monster.runStart <= 100){
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    fg.drawImage(monsterImage,210,0, 130,100,monster.x,monster.y,130,100);
                }else if (time - monster.runStart >100 && time - monster.runStart <=150){
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    fg.drawImage(monsterImage,10,100, 110,100,monster.x,monster.y,110,100);
                }else if (time - monster.runStart > 150 && time - monster.runStart <=200){
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    fg.drawImage(monsterImage,410,100, 110,100,monster.x,monster.y,110,100);
                }else if (time - monster.runStart > 200){
                    monster.runStart = 0;
                }
            }else{
                if (time - monster.runStart <=50){
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    fg.drawImage(leftMonsterStandImage,10,0, 110,100,monster.x,monster.y,110,100);
                }else if (time - monster.runStart >50 && time - monster.runStart <= 100){
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    fg.drawImage(leftMonsterStandImage,210,0, 130,100,monster.x,monster.y,130,100);
                }else if (time - monster.runStart >100 && time - monster.runStart <=150){
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    fg.drawImage(leftMonsterStandImage,10,100, 110,100,monster.x,monster.y,110,100);
                }else if (time - monster.runStart > 150 && time - monster.runStart <=200){
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    fg.drawImage(leftMonsterStandImage,410,100, 110,100,monster.x,monster.y,110,100);
                }else if (time - monster.runStart > 200){
                    monster.runStart = 0;
                }
            }
    
        }
        
    },

    angry:function(){
        if (monster.angryStart == 0){
            monster.angryStart = Date.now();
        }else{
            var time = Date.now();
            if (monster.direction ==="right"){
                if (time - monster.angryStart <=400){
                    fg.clearRect(monster.x-200,monster.y-40,500,140);
                    fg.drawImage(monsterAttackImage,17,0, 101,100,monster.x,monster.y,101,100);
                }else if (time - monster.angryStart > 400 && time - monster.angryStart <=800){
                    fg.clearRect(monster.x-200,monster.y-40,500,140);
                    fg.drawImage(monsterAttackImage,213,0, 112,100,monster.x,monster.y,112,100);
                }else if (time - monster.angryStart > 800){
                    fg.clearRect(monster.x-200,monster.y-40,500,140);
                    monster.angryStart = 0;
                    monster.state = "attack";
                }
            }else{
                if (time - monster.angryStart <=400){
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    fg.drawImage(leftMonsterAttackImage,14,0, 101,100,monster.x,monster.y,101,100);
                }else if (time - monster.angryStart > 400 && time - monster.angryStart <=800){
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    fg.drawImage(leftMonsterAttackImage,212,0, 112,100,monster.x,monster.y,112,100);
                }else if (time - monster.angryStart > 800){
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    monster.angryStart = 0;
                    monster.state = "attack";
                }
            }
        }

    },

    attack:function(){
        if (monster.attackStart == 0){
            monster.attackStart = Date.now();
        }else{
            var time = Date.now();
            if (monster.direction ==="right"){
                if (time - monster.attackStart <=50){
                    fg.clearRect(monster.x-40,monster.y-40,300,140);
                    fg.drawImage(monsterAttackImage,397,0, 127,100,monster.x,monster.y,127,100);
                }else if (time - monster.attackStart >50 && time - monster.attackStart <= 100){
                    fg.clearRect(monster.x-40,monster.y-40,300,140);
                    fg.drawImage(monsterAttackImage,15,100, 112,100,monster.x,monster.y,112,100);
                }else if (time - monster.attackStart >100 && time - monster.attackStart <=150){
                    fg.clearRect(monster.x-40,monster.y-40,300,140);
                    fg.drawImage(monsterAttackImage,210,100, 108,100,monster.x,monster.y,108,100);
                }else if (time - monster.attackStart > 150 && time - monster.attackStart <=500){
                    monster.x +=3;
                    fg.clearRect(monster.x-60,monster.y-40,300,140);
                    fg.drawImage(monsterAttackImage,398,100, 151,100,monster.x,monster.y,151,100);
                }else if (time - monster.attackStart > 500){
                    fg.clearRect(monster.x-60,monster.y-40,300,140);
                    monster.attackStart = 0;
                    monster.state = "stand";
                }
            }else{
                if (time - monster.attackStart <=50){
                    fg.clearRect(monster.x-40,monster.y-40,300,140);
                    fg.drawImage(leftMonsterAttackImage,411,0, 127,100,monster.x,monster.y,127,100);
                }else if (time - monster.attackStart >50 && time - monster.attackStart <= 100){
                    fg.clearRect(monster.x-40,monster.y-40,300,140);
                    fg.drawImage(leftMonsterAttackImage,21,100, 112,100,monster.x,monster.y,112,100);
                }else if (time - monster.attackStart >100 && time - monster.attackStart <=150){
                    fg.clearRect(monster.x-40,monster.y-40,300,140);
                    fg.drawImage(leftMonsterAttackImage,222,100, 108,100,monster.x,monster.y,108,100);
                }else if (time - monster.attackStart > 150 && time - monster.attackStart <=500){
                    fg.clearRect(monster.x-60,monster.y-40,300,140);
                    monster.x -=3;
                    fg.drawImage(leftMonsterAttackImage,372,100, 151,100,monster.x-40,monster.y,151,100);
                }else if (time - monster.attackStart > 500){
                    fg.clearRect(monster.x-60,monster.y-40,300,140);
                    monster.attackStart = 0;
                    monster.state = "stand";
                }
            }
        }
    },
    hit:function(){
        if (monster.hitStart == 0){
            monster.hitStart = Date.now();
            hitSound.play();
            monster.health -= hero.dmg;    //take damage one time at the beginning of hit
            if (hero.x<monster.x){
                monster.direction = "left";
            }else{
                monster.direction = "right";
            }   
        }else{
            var time = Date.now();
            if(time - monster.hitStart < 600){
                if (monster.direction === "right"){
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    fg.drawImage(monsterHitImage,0,0, 106,100,monster.x,monster.y,106,100);
                }else{
                    fg.clearRect(monster.x-40,monster.y-40,200,140);
                    fg.drawImage(monsterHitImage,125,0,107,100,monster.x,monster.y,107,100);
                }
            }else{
                monster.hitStart = 0;
                monster.state="angry";
            }
        }
    },
    death:function(){
        if (monster.deathStart == 0){
            monster.deathStart = Date.now();
            monsterDeathSound.play();
        }else{
            var time = Date.now();
            if (monster.direction ==="right"){
                if (time - monster.deathStart <=300){
                    fg.clearRect(monster.x-40,monster.y-40,300,140);
                    bg1.drawImage(monsterDeathImage,15,17,100, 66,monster.x,monster.y+10,100,66);
                }else if (time - monster.deathStart > 300 && time - monster.deathStart <= 400){
                    bg1.clearRect(monster.x-40,monster.y-40,300,140);
                    bg1.drawImage(monsterDeathImage,204,29,129,67,monster.x,monster.y+20,129,67);
                }else if (time - monster.deathStart >400 && time - monster.deathStart <=500){
                    bg1.clearRect(monster.x-40,monster.y-40,300,140);
                    bg1.drawImage(monsterDeathImage,393,46, 151,52,monster.x,monster.y+40,151,52);
                }else if (time - monster.deathStart > 500){
                    bg1.clearRect(monster.x-40,monster.y-40,300,140);
                    bg1.drawImage(monsterDeathImage,14,132,170, 51,monster.x,monster.y+40,170,51);
                }
            }else{
                if (time - monster.deathStart <=300){
                    fg.clearRect(monster.x-40,monster.y-40,300,140);
                    bg1.drawImage(leftMonsterDeathImage,15,17,100, 66,monster.x,monster.y+10,100,66);
                }else if (time - monster.deathStart > 300 && time - monster.deathStart <= 400){
                    bg1.clearRect(monster.x-40,monster.y-40,300,140);
                    bg1.drawImage(leftMonsterDeathImage,204,29,129,67,monster.x,monster.y+20,129,67);
                }else if (time - monster.deathStart >400 && time - monster.deathStart<=500){
                    bg1.clearRect(monster.x-40,monster.y-40,300,140);
                    bg1.drawImage(leftMonsterDeathImage,393,46,151,52,monster.x,monster.y+40,151,52);
                }else if (time - monster.deathStart > 500){
                    bg1.clearRect(monster.x-40,monster.y-40,300,140);
                    bg1.drawImage(leftMonsterDeathImage,14,132,170, 51,monster.x,monster.y+40,170,51);
                }
    
            }
        }
    }
}

//boss object
var boss={
    x:400,
    y:20,
    state:"stand",
    health:1200,
    jdmg:20,
    sdmg:15,
    hit:false,
    dmgtaken:false,
    swingStart:0,
    jumpStart:0,
    standStart:0,
    deathStart:0,
    hitbox:function(){
        var now = Date.now();
            if(boss.state === "swing"&& now - boss.swingStart>1800){
                return [boss.x-100,boss.y+100,300,310];
            }else if(boss.state === "jump"){
                return [boss.x+50, boss.y,421,380];
            }else{
                return [boss.x+50,boss.y,421,380];
            }
        },
    attackbox:function(){
        var now = Date.now();
        if(boss.state === "swing"&& now - boss.swingStart>=1800){
            return [boss.x-80,boss.y+100,300,310];
        }else if(boss.state === "jump"&& now - boss.jumpStart>=1400){
            return [boss.x+40, boss.y+200,421,210];
        }
        else{
            return [boss.x+80, boss.y+300,421,110];
        }
    },
    stand:function(){
        var n = Date.now()%1000;
        if (n>0 && n<=500){
            fg.clearRect(boss.x-20,boss.y-20, 700,550);
            if(!boss.hit){
                fg.drawImage(bossImage,0,0, 454,322,boss.x-20,boss.y-20,501,380);
            }else{
                fg.drawImage(bossImage,477,0, 454,322,boss.x-20,boss.y-20,501,380);
            }
        }else if(n>500 && n<=1000) {
            fg.clearRect(boss.x-20,boss.y-20, 700,550);
            if(!boss.hit){
                fg.drawImage(bossImage,0, 322, 454,332,boss.x-20,boss.y-20, 501,380);
            }else{
                fg.drawImage(bossImage,477, 322, 454,332,boss.x-20,boss.y-20, 501,380);
            }
        }
        boss.hit = false;
    },
    swing:function(){
        if (boss.swingStart == 0){
             boss.swingStart = Date.now();
        }else{
            var now = Date.now();
            if ( now - boss.swingStart <= 500){
            fg.clearRect(boss.x-20,boss.y-20, 700,550);
            if(!boss.hit){
                fg.drawImage(swingImage,69,84,356, 310,boss.x+40,boss.y+20,430, 360);
            }else{
                fg.drawImage(swingImage,63,426,356, 310,boss.x+40,boss.y+20,430, 360);
            }
        }else if(now - boss.swingStart>500 && now - boss.swingStart <=1000) {
            fg.clearRect(boss.x-20,boss.y-20, 700,550);
            if(!boss.hit){
                fg.drawImage(swingImage,482, 84, 356, 311,boss.x+40,boss.y+20,430, 360);
            }else{
                fg.drawImage(swingImage,490,433,356, 311,boss.x+40,boss.y+20,430, 360);
            }
        }else if(now - boss.swingStart>1000 && now - boss.swingStart <=1800) {
            fg.clearRect(boss.x-20,boss.y-20, 700,550);
            if(!boss.hit){
                fg.drawImage(swingImage,903, 84 ,404,335,boss.x+40,boss.y+20,481,380);
            }else{
                fg.drawImage(swingImage,915,446,404,335,boss.x+40,boss.y+20,481,380);
            }
        }else if(now - boss.swingStart>1800 && now - boss.swingStart <=2000) {
            bossswingSound.play();
            fg.clearRect(boss.x-100,boss.y-20, 700,550);
            if(!boss.hit){
                fg.drawImage(swingImage,1366,89,352,346,boss.x,boss.y+20,430,380);
            }else{
                fg.drawImage(swingImage,1366,447,352,346,boss.x,boss.y+20,430,380);
            }
        }else if(now - boss.swingStart >2000 && now - boss.swingStart <=2200) {
            fg.clearRect(boss.x-100,boss.y-20, 700,550);
            if(!boss.hit){
                fg.drawImage(swingImage,1780,89,421,342,boss.x-80,boss.y+20,501,380);
            }else{
                fg.drawImage(swingImage,1781,447,421,342,boss.x-80,boss.y+20,501,380);
            }
        }else if (now - boss.swingStart >2200){
            fg.clearRect(boss.x-100,boss.y-20, 700,550);
            boss.swingStart = 0;
            boss.state = "stand";
        }
        boss.hit = false;
        }
    },
    jump:function(){
        if (boss.jumpStart == 0){
            boss.jumpStart = Date.now();
       }else{
            var now = Date.now();
            //charge
            if ( now - boss.jumpStart <= 700){
                fg.clearRect(boss.x-20,boss.y-20, 700,550);
                if(!boss.hit){
                    fg.drawImage(jumpImage,52,35,402,261,boss.x+40,boss.y+60,430, 300);
                }else{
                    fg.drawImage(jumpImage,507,36,402,261,boss.x+40,boss.y+60,430, 300);
                }
            //go up
            }else if(now - boss.jumpStart > 700 && now-boss.jumpStart <=900){
                fg.clearRect(boss.x-20,boss.y-20, 700,550);
                boss.y -=3;
                if (boss.health <=500){
                    boss.x -=2;
                }
                if(!boss.hit){
                    fg.drawImage(jumpImage,62,361,351,313,boss.x+40,boss.y+20,430, 340);
                }else{
                    fg.drawImage(jumpImage,517,362,351,313,boss.x+40,boss.y+20,430, 340);
                }
            //slow down
            }else if(now - boss.jumpStart > 900 && now-boss.jumpStart <=1200){
                fg.clearRect(boss.x-20,boss.y-20, 700,550);
                if (boss.health<=500){
                    boss.x -=1;
                }
                if(!boss.hit){
                    fg.drawImage(jumpImage,62,361,351,313,boss.x+40,boss.y+20,430, 340);
                }else{
                    fg.drawImage(jumpImage,517,362,351,313,boss.x+40,boss.y+20,430, 340);
                }
            //go down
            }else if(now - boss.jumpStart > 1200 && now-boss.jumpStart <=1400){
                fg.clearRect(boss.x-20,boss.y-20, 700,550);
                boss.y +=3;
                if (boss.health<=500){
                    boss.x -=2;
                }
                if(!boss.hit){
                    fg.drawImage(jumpImage,62,361,351,313,boss.x+40,boss.y+20,430, 340);
                }else{
                    fg.drawImage(jumpImage,517,362,351,313,boss.x+40,boss.y+20,430, 340);
                }
            }else if(now - boss.jumpStart > 1400 && now-boss.jumpStart <=1500){
                fg.clearRect(boss.x-20,boss.y-20, 700,550);
                jumpSound.play();
                if(!boss.hit){
                    fg.drawImage(jumpImage,52,35,402,261,boss.x+40,boss.y+60,430, 300);
                }else{
                    fg.drawImage(jumpImage,507,36,402,261,boss.x+40,boss.y+60,430, 300);
                }
            }else{
                boss.jumpStart = 0;
                stone.falling=true;
                stone.x = hero.x+50;
                stone.y = hero.y -240;
                stone.fallEnd = stone.y +320;
                boss.state = "swing";
            }
            boss.hit = false;
       }
    },
    death:function(){
        fg.clearRect(boss.x-20,boss.y-20, 700,550);
    }
};

//stone object
var stone = {
    x: 100,
    y: 100,
    falling: false,
    fallStart:0,
    fallEnd:0,
    attackbox:function(){
        var time = Date.now();
        if (time - this.fallStart >1800
            && time - this.fallStart <=2000){
            return [stone.x,stone.y+30,32,12];
        }else{
            return [0,0,0,0];
        }
    },
    fall:function(){
        if (stone.fallStart == 0){
            stone.fallStart = Date.now();
        }else{
            var time = Date.now();
            fg1.drawImage(stoneImage,164,0,31,12,stone.x, stone.fallEnd,31,12);
            if (time -stone.fallStart <=200){
                    fg1.drawImage(stoneImage,0,0,30,48,stone.x,stone.y,30,48);
            }else if (time -time -stone.fallStart>200 
                && time -stone.fallStart<= 400){
                    fg1.drawImage(stoneImage,40,0,30,48,stone.x,stone.y,30,48);
            }else if (time -stone.fallStart >400 
                && time -stone.fallStart <= 600){
                    
                    fg1.drawImage(stoneImage,82,0,30,48,stone.x,stone.y,30,48);
            }else if(time -stone.fallStart>600
                && time -stone.fallStart <=1600){
                    fg1.clearRect(stone.x,stone.y, 32,32)
                    stone.y +=5;
                    fg1.drawImage(stoneImage,82,0,30,48,stone.x,stone.y,30,48);
            }else if(time -stone.fallStart>1700
                &&time -stone.fallStart <=1800){
                    fg1.clearRect(stone.x,stone.y-20, 32,68)
                    fg1.drawImage(stoneImage,121,0,32,32,stone.x,stone.y+10,32,32);
            }else if(time -stone.fallStart>1800
                &&time -stone.fallStart <=2000){
                    stoneSound.play();
                    fg1.clearRect(stone.x,stone.y, 32,48)
                    fg1.drawImage(stoneImage,121,36,32,32,stone.x,stone.y+10,32,32);
            }else if(time - stone.fallStart >2000){
                fg1.clearRect(stone.x,stone.y, 32,100)
                stone.falling = false;
                stone.fallStart=0;
            }
        }
    }
}


//for player holding the key
var keysDown = {};

addEventListener("keydown", function (e) {
    e.preventDefault();
	keysDown[e.keyCode] = true;  //is keycode in keydown array?
}, false);

addEventListener("keyup", function (e) {
    //e.preventDefault();
	delete keysDown[e.keyCode];
}, false);

//function that test whether two hitboxes overlap
var hitHappen = function(r1x, r1y,r1w,r1h,r2x, r2y, r2w,r2h){
    if(r1x <= (r2x+r2w)
    && r2x <= (r1x+r1w)
    && r1y <= (r2y+r2h)
    && r2y<= (r1y+r1h)){
        return true;
    }else{
        return false;
    }
};

//function update all events in the game
var Update = function (modifier) {
    //boss state update
    if (bg.number === 1){
        bgm1.pause();
        bgm1.currentTime =0;
        if (hitHappen(hero.attackbox()[0],hero.attackbox()[1],
        hero.attackbox()[2],hero.attackbox()[3],
        boss.hitbox()[0], boss.hitbox()[1], 
        boss.hitbox()[2], boss.hitbox()[3])
        && hero.state === "attack"){
            boss.hit = true;
            if (boss.dmgtaken === false){
                hitSound.play();
                boss.health -= hero.dmg;
                boss.dmgtaken = true;
            }
        }
        if (hero.attackStart == 0 ){
            boss.dmgtaken = false;
        }

        if (boss.state === "stand"){
            boss.stand();
            if (boss.standStart == 0){
                boss.standStart = Date.now();
            }else{
                var time = Date.now();
                if (time - boss.standStart > 600){
                    if (hero.state !="death"){
                        boss.standStart = 0;
                            boss.state = "jump";
                        }
                    }
                }
            }

        if (boss.state === "jump"){
            boss.jump();
        }

        if (boss.state === "swing"){
            boss.swing();
        }
        if (boss.health<=0){
            boss.state = "death";
        }

        if (boss.state === "death"){
            boss.death();
        }
    }
    //stone state update
    if (stone.falling){
        stone.fall();
    }
    //monster state update
    if (bg.number == 0){
        if (monster.state === "attack"){
            monster.attack();
        }

        if (monster.state === "angry"){
            monster.angry();
        }

        if (monster.state === "run"){
            if (monster.hitbox()[0] > hero.hitbox()[0]){
                monster.direction = "left";
                monster.x -= monster.speed * modifier;
                monster.run();
            }else if(monster.hitbox()[0]<= hero.hitbox()[0]){
                monster.direction = "right";
                monster.x += monster.speed *modifier;
                monster.run();
            }
            if (monster.hitbox()[1] > hero.hitbox()[1]){
                monster.y-= monster.speed/2 * modifier;
                monster.run();
            }else if (monster.hitbox()[1] <hero.hitbox()[1]){
                monster.y += monster.speed/2* modifier;
                monster.run();
            }
            if (hitHappen(hero.hitbox()[0],hero.hitbox()[1],
                hero.hitbox()[2],hero.hitbox()[3],
                monster.attackbox()[0],monster.attackbox()[1],
                monster.attackbox()[2],monster.attackbox()[3])){
                monster.state="angry";
            }
            if (hitHappen(hero.attackbox()[0],hero.attackbox()[1],
            hero.attackbox()[2],hero.attackbox()[3],
            monster.hitbox()[0],monster.hitbox()[1],
            monster.hitbox()[2],monster.hitbox()[3])
            && hero.state === "attack"){
            monster.state="hit";
        }
        }

        if (monster.state === "stand"){
            monster.stand();
            if (monster.standStart == 0){
                monster.standStart = Date.now();
            }else{
                var time = Date.now();
                if (time - monster.standStart > 1000){
                    if (hero.state !="death"){
                        monster.standStart = 0;
                        monster.state = "run";
                    }
                }
            }
            if (hitHappen(hero.attackbox()[0],hero.attackbox()[1],
                hero.attackbox()[2],hero.attackbox()[3],
                monster.hitbox()[0],monster.hitbox()[1],
                monster.hitbox()[2],monster.hitbox()[3])
                && hero.state === "attack"){
                monster.state="hit";
            }
        }

        if (monster.state ==="hit"){
            monster.hit();
        }
        if (monster.health<=0){
            monster.state = "death";
        }
    
        if (monster.state ==="death"){
            if (bg.number ==0){
                monster.death();
            }
        }
    }
    //hero state update
    if (hero.state === "stand"){
        hero.stand();
         if (hitHappen(hero.hitbox()[0],hero.hitbox()[1],
                hero.hitbox()[2],hero.hitbox()[3],
                stone.attackbox()[0], stone.attackbox()[1], 
                stone.attackbox()[2], stone.attackbox()[3])
            && stone.falling == true){
                hero.state="hit";
        }
        //hit by monster?
        if (hitHappen(hero.hitbox()[0],hero.hitbox()[1],
                hero.hitbox()[2],hero.hitbox()[3],
                monster.attackbox()[0], monster.attackbox()[1], 
                monster.attackbox()[2], monster.attackbox()[3])
            && monster.state === "attack"){
                hero.dmgSource = "monster";
                hero.state="hit";
            }
        if (boss.state === "jump" && hitHappen(hero.hitbox()[0],hero.hitbox()[1],
            hero.hitbox()[2],hero.hitbox()[3],
            boss.attackbox()[0], boss.attackbox()[1], 
            boss.attackbox()[2], boss.attackbox()[3])
            ){
            hero.dmgSource = "bj"
            hero.state="hit";
        }
        if (boss.state === "swing" && 
            hitHappen(hero.hitbox()[0],hero.hitbox()[1],
            hero.hitbox()[2],hero.hitbox()[3],
            boss.attackbox()[0], boss.attackbox()[1], 
            boss.attackbox()[2], boss.attackbox()[3])
            ){
            hero.dmgSource = "bs"
            hero.state="hit";
        }
        if (hitHappen(hero.hitbox()[0],hero.hitbox()[1],
        hero.hitbox()[2],hero.hitbox()[3],
        stone.attackbox()[0], stone.attackbox()[1], 
        stone.attackbox()[2], stone.attackbox()[3])
        && stone.falling == true){
        hero.state="hit";
        }
        if (38 in keysDown) { // Player holding up 
            hero.state="run";
            hero.run();
	    }
        if (40 in keysDown) { // Player holding down
            hero.state = "run";
            hero.run();
            
	    }
        if (37 in keysDown) { // Player holding left
            
            hero.state="run";
            hero.direction="left";
            hero.run();
        }

        
        if (39 in keysDown) { // Player holding right
            hero.state="run"; 
            hero.direction="right"; 
            hero.run();      
        }

        if (88 in keysDown) {
            hero.state = "attack";
            hero.attack();
        }
    }

    if (hero.state === "run"){
        //hit by monster?
        if (hitHappen(hero.hitbox()[0],hero.hitbox()[1],
                hero.hitbox()[2],hero.hitbox()[3],
                monster.attackbox()[0], monster.attackbox()[1], 
                monster.attackbox()[2], monster.attackbox()[3])
                && monster.state === "attack"){
                hero.dmgSource = "monster";
                hero.state="hit";
        }

        if (bg.number ==1){
            //hit by boss?
            if (hitHappen(hero.hitbox()[0],hero.hitbox()[1],
                hero.hitbox()[2],hero.hitbox()[3],
                boss.attackbox()[0], boss.attackbox()[1], 
                boss.attackbox()[2], boss.attackbox()[3])
            && boss.state === "jump"){
                hero.dmgSource = "bj"
                hero.state="hit";
            }
            if (hitHappen(hero.hitbox()[0],hero.hitbox()[1],
                hero.hitbox()[2],hero.hitbox()[3],
                boss.attackbox()[0], boss.attackbox()[1], 
                boss.attackbox()[2], boss.attackbox()[3])
            && boss.state === "swing"){
                hero.dmgSource = "bs"
                hero.state="hit";
            }
            //hit by stone?
            if (hitHappen(hero.hitbox()[0],hero.hitbox()[1],
            hero.hitbox()[2],hero.hitbox()[3],
            stone.attackbox()[0], stone.attackbox()[1], 
            stone.attackbox()[2], stone.attackbox()[3])
        && stone.falling == true){
            hero.state="hit";
            }

            if (boss.state != "death" && hero.x >=358){
                hero.x = 358;
            }
        }
        

        if (38 in keysDown) { // Player holding up 
            hero.run();
            hero.y -= hero.speed/2 * modifier;
            if (hero.y <=100){
                hero.y = 100;
            }
	    }
	    else if (40 in keysDown) { // Player holding down
            hero.y += hero.speed/2 * modifier;
            hero.run();
            if (hero.y >=340){
                hero.y = 340;
            }
	    }
        else if (37 in keysDown) { // Player holding left
            hero.direction="left";
            hero.run();
            //move camera to left
            if (bg.x >= 0){ //if background touch left side of window, bg stops.
                bg.x =0;
                hero.x -= hero.speed * modifier;
            }else{ 
                if (hero.x > 333){ //if hero outside of this line, hero moves camera doesn't change.
                    hero.x -= hero.speed * modifier;
                }else{
                    hero.x = 333; //if hero touched this line hero stops, and pushes camera to left. 
                    bg.x += hero.speed * modifier;
                    monster.x +=hero.speed * modifier;
                    background1.style.backgroundPositionX=bg.x+"px";
                    foreground1.style.backgroundPositionX=bg.x+"px";
                    if (bg.number ==1){
                        boss.x += hero.speed * modifier;
                    }
                }
            }
            if (hero.x <=0){
                hero.x=0;
            }
        }

        
        else if (39 in keysDown) { // Player holding right
            hero.direction="right";
            hero.run();
            //move camera to right
            if (bg.x <= -224){ //if background touch right side of window bg stop.
                bg.x =-224;
                hero.x += hero.speed * modifier;
            }else{ 
                if (hero.x < 467){ //if hero outside of this line, hero moves camera doesn't change.
                    hero.x += hero.speed * modifier;
                    background1.style.backgroundPositionX=bg.x+"px";
                }else{
                    hero.x = 467; //if hero touched this line hero stops, and pushes camera to right. 
                    bg.x -= hero.speed * modifier;
                    monster.x -=hero.speed * modifier;
                    background1.style.backgroundPositionX=bg.x+"px";
                    foreground1.style.backgroundPositionX=bg.x+"px";
                    if (bg.number ==1){
                        boss.x -= hero.speed * modifier;
                    }
                }
            }
            if (hero.x >=700){
                hero.x=700;
            }
        }else{
            hero.state = "stand";
        }
    }

    if (hero.state === "hit"){
        hero.hit();
    }

    if (hero.state === "attack"){
        hero.attack();
        //hit by monster?
        if (hitHappen(hero.hitbox()[0],hero.hitbox()[1],
                hero.hitbox()[2],hero.hitbox()[3],
                monster.attackbox()[0], monster.attackbox()[1], 
                monster.attackbox()[2], monster.attackbox()[3])
            && monster.state === "attack"){
                hero.dmgSource = "monster";
                hero.state="hit";
                }
                if (hitHappen(hero.hitbox()[0],hero.hitbox()[1],
                hero.hitbox()[2],hero.hitbox()[3],
                boss.attackbox()[0], boss.attackbox()[1], 
                boss.attackbox()[2], boss.attackbox()[3])
            && boss.state === "jump"){
                hero.dmgSource = "bj"
                hero.state="hit";
        }
        if (hitHappen(hero.hitbox()[0],hero.hitbox()[1],
                hero.hitbox()[2],hero.hitbox()[3],
                boss.attackbox()[0], boss.attackbox()[1], 
                boss.attackbox()[2], boss.attackbox()[3])
            && boss.state === "swing"){
                hero.dmgSource = "bs"
                hero.state="hit";
        }
        if (hitHappen(hero.hitbox()[0],hero.hitbox()[1],
                hero.hitbox()[2],hero.hitbox()[3],
                stone.attackbox()[0], stone.attackbox()[1], 
                stone.attackbox()[2], stone.attackbox()[3])
            && stone.falling == true){
                hero.state="hit";
        }
    }
    
};


//function for UI and sound in the game
function render(){
    //show hit boxes
    /*
    ctx.beginPath();
    ctx.rect(hero.hitbox()[0],hero.hitbox()[1],hero.hitbox()[2],hero.hitbox()[3]);
    ctx.strokeStyle = "black";
    ctx.stroke();

    fg.beginPath();
    fg.rect(monster.hitbox()[0], monster.hitbox()[1], monster.hitbox()[2], monster.hitbox()[3]);
    fg.strokeStyle = "red";
    fg.stroke();

    fg.beginPath();
    fg.rect(boss.attackbox()[0], boss.attackbox()[1], boss.attackbox()[2], boss.attackbox()[3]);
    fg.strokeStyle = "black";
    fg.stroke();

    fg.beginPath();
    fg.rect(stone.attackbox()[0], stone.attackbox()[1], stone.attackbox()[2], stone.attackbox()[3]);
    fg.strokeStyle = "black";
    fg.stroke();*/


    if (bg.number === 0){
        if (monster.health <= 0){
            fg.font = "30px Arial";
            fg.fillStyle = "yellow";
            fg.textAlign = "center";
            fg.fillText("GO -->", 600,150);     
        }
        if (monster.state !="death"){
            bgm1.play();
            fg1.clearRect(monster.x-50,monster.y-50,200,200);
            fg1.beginPath();
            fg1.rect(monster.x-2, monster.y-12, 104, 9);
            fg1.fillStyle = "black";
            fg1.fill();
    
            fg1.beginPath();
            fg1.rect(monster.x, monster.y-10, monster.health/2, 6);
            fg1.fillStyle = "pink";
            fg1.fill();
    
            fg1.font = "20px Arial";
            fg1.fillStyle = "black";
            fg1.textAlign = "center";
            fg1.fillText(monster.state+"", monster.x+20,monster.y-20); 
        }else{
           fg1.clearRect(monster.x-50,monster.y-50,200,200);
        }
    }
    if (boss.health<=0){
        bgm2.pause();
        if (sound.winsound){
            winSound.play();
            sound.winsound=false;
        };
        fg.font = "50px Arial";
        fg.fillStyle = "yellow";
        fg.textAlign = "center";
        fg.fillText("YOU WIN", 400,250); 
        fg.font = "30px Arial";
        fg.fillText("Press space to play again", 400,280); 
    }

    if (hero.health > 0){
        ctx.clearRect(hero.x-20, hero.y-40, 144, 40);
        ctx.beginPath();
        ctx.rect(hero.x-2, hero.y-22, 104, 9);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.beginPath();
        ctx.rect(hero.x, hero.y-20, hero.health*2, 6);
        ctx.fillStyle = "#f24318";
        ctx.fill();
    }else{
        ctx.clearRect(hero.x-20, hero.y-40, 144, 40);
    }

    if (bg.number == 1){
        if (boss.state !="death"){
            bgm2.play();
            fg1.beginPath();
            fg1.rect(200, 400, 404, 13);
            fg1.fillStyle = "black";
            fg1.fill();
    
            fg1.beginPath();
            fg1.rect(202, 402, boss.health/3, 10);
            fg1.fillStyle = "#4f4696";
            if (boss.health<=500){
                fg1.fillStyle = "red";
            }
            fg1.fill();
        }else{
           fg1.clearRect(200, 400, 604, 13);
        }
    }
    
    if (hero.health <=0){
        hero.state = "death";
        if (bg.number ==0){
            fg.font = "70px Arial";
            fg.fillStyle = "black";
            fg.textAlign = "center";
            fg.fillText("YOU DIED", 400,200); 
            fg.font = "30px Arial";
            fg.fillText("Press space to try again",400,230);
        }else{
            fg1.font = "70px Arial";
            fg1.fillStyle = "white";
            fg1.textAlign = "center";
            fg1.fillText("YOU DIED", 400,200); 
            fg1.font = "30px Arial";
            fg1.fillText("Press space to try again",400,230);
        }
    }
};

//reset the game
function reset(){
    if (hero.state ==="death"){
        hero.death();
        if(32 in keysDown){   
            ctx.clearRect(0,0,800,500);
            fg.clearRect(0,0,800,500);
            fg1.clearRect(0,0,800,500);
            bg.x=0,
            background1.style.backgroundPosition="0px 0px";
            foreground1.style.backgroundPosition="0px 0px";
            hero.direction = "right";
            hero.state = "stand";
            hero.x = 100;
            hero.y = 250;
            hero.health = 50;
            hero.deathStart = 0;
            if(bg.number==0){
                monster.health = 200;
                monster.x = 500;
                monster.y = 250;
                monster.direction = "left";
            }else if (bg.number==1){
                boss.state = "stand"
                boss.health = 1200;
                boss.x = 400;
                boss.y = 20;
            }
        }
    }
    if (monster.state === "death"){
        if (hero.x >=650 && bg.number==0){
            fg.clearRect(0,0,800,600);
            bg1.clearRect(0,0,800,600);
            ctx.clearRect(hero.x-20, hero.y-40, 160, 150);
            background1.style.background="url(map/inside.png)";
            foreground1.style.background="url(map/insidefront.png)";
            background1.style.backgroundPosition="0px 0px";
            hero.direction = "right";
            hero.state = "stand";
            bg.x = 0;
            hero.health = 50;
            hero.x = 100;
            hero.y = 250;
            bg.number = 1;
        }
    }
    if (boss.state === "death"){
        hero.health = 50;
        if(32 in keysDown){
            sound.winsound = true;
            bgm2.pause();
            bgm2.currentTime = 0;
            bgm1.play();    
            ctx.clearRect(0,100,1024,800);
            fg.clearRect(0,100,1024,800);
            fg1.clearRect(0,100,1024,800);
            bg.number = 0;
            bg.x=0,
            background1.style.background="url(map/outside.png)";
            foreground1.style.background="none";
            background1.style.backgroundPosition="0px 0px";
            foreground1.style.backgroundPosition="0px 0px";
            monster.health = 200;
            monster.x = 500;
            monster.y = 250;
            monster.direction = "left";
            monster.state = "stand";
            monster.deathStart=0;
            boss.state = "stand"
            boss.health = 1200;
            boss.x = 400;
            boss.y = 20;
            hero.direction = "right";
            hero.state = "stand";
            hero.x = 100;
            hero.y = 250;
            hero.health = 50;
            hero.deathStart = 0;
        }
    }
}


//make sure requestAnimationFrame capable in different browswer
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//Game start function
var main = function(){
    var now = Date.now();
    var delta = now - then;
    Update(delta / 1000);
    render();
    then = now;
    reset();
    requestAnimationFrame(main);
}

//call game start
var then = Date.now();
main();


