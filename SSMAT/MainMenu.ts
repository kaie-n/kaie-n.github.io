﻿
module SSMAT {
    export class MainMenu extends Phaser.State {
        background: Phaser.Sprite;
        logo: Phaser.Sprite;
        click: Phaser.Sprite;
        painter: SSMAT.Painter;
        tiler: Phaser.TileSprite;
        wheel: Phaser.Sprite;
        wheelGroup: Phaser.Group;
        tons: Array<SSMAT.Tons>;
        tons2: Array<SSMAT.Tons>;
        graphics: Phaser.Graphics;
        button: Phaser.Button;
        image: Phaser.Image;

        sumFx: number;
        sumFy: number;
        sumR: number;

        gravity: number;
        acceleration: number;
        dt: number;
        t: number;
        equil: boolean;
        started: boolean;
        sprite: Array<Array<Phaser.Sprite>>;
        spriteGroup: Phaser.Group;
        create() {

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            //this.game.physics.arcade.gravity.y = 9.8; 
            this.gravity = 9.8;
            this.dt = 0.0833333333333333;
            this.t = 0;
            this.equil = false;
            this.started = false;
            // background
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;

            // ground tiles
            this.tiler = this.game.add.tileSprite(0, this.world.height - 11, 800, 600, 'tile');
            this.tiler.alpha = 0;
            this.game.physics.arcade.enable(this.tiler);
            this.tiler.body.immovable = true;
            this.tiler.body.allowGravity = false;
          

            // the image painting itself;
            this.image = this.game.add.image(0, 0, 'pic');
            this.image.position.x = (this.game.width / 2) - (this.image.width / 2);
            this.image.position.y = (this.game.height / 2) - (this.image.height / 2) - 100;
            this.image.alpha = 0;
            // create a new bitmap data object
            // var bmd = this.game.add.bitmapData(150, 126.5);
            var bmd = new Phaser.Graphics(this.game, 0, 0);
            bmd.beginFill(0x904820);
            bmd.lineStyle(1, 0x682401, 1);
            bmd.drawRect(0, 0, 150, 127);
            bmd.endFill();
            bmd.boundsPadding = 0
            var texture = bmd.generateTexture();
            
            // use the bitmap data as the texture for the sprite
            // generate the grid lines
            var distributeWidth = this.image.position.x;
            var distributeHeight = this.image.position.y;
            this.sprite = [];

            this.spriteGroup = this.game.add.group();
            for (var i = 0; i < 2; i++) {
                this.sprite[i] = [];
                distributeWidth = this.image.position.x;
                for (var j = 0; j < 3; j++) {
                    this.sprite[i][j] = this.game.add.sprite(0, 0, texture);
                    this.sprite[i][j].x = distributeWidth;
                    this.sprite[i][j].y = distributeHeight;
                    this.sprite[i][j].alpha = 1;
                    distributeWidth += this.sprite[i][j].width - 1;
                    this.sprite[i][j].inputEnabled = true;

                    this.spriteGroup.addChild(this.sprite[i][j]);
                }
                distributeHeight += 126.5;
            }
            this.spriteGroup.alpha = 0;
            // this is to initialize the main painter
            this.painter = new Painter(this.game, this.world.centerX, this.game.height, 90, this.gravity);
            this.painter.y -= this.painter.height + 11
            this.painter.anchor.setTo(0.5, 0);
            this.painter.alpha = 0;
            this.game.physics.arcade.enable(this.painter);

            // adding the wheels for the pulley
            this.wheelGroup = this.game.add.group();
            this.wheel = this.add.sprite(0, 0, 'wheel', 0);
            this.wheelGroup.addChild(this.wheel);
            this.wheel = this.add.sprite(0, 0, 'wheel', 0);
            this.wheelGroup.addChild(this.wheel);

            this.wheelGroup.getChildAt(0).x = 109;
            this.wheelGroup.getChildAt(1).x = 655;
            this.wheelGroup.alpha = 0;

            // adding the tons for the pulley (0 for left, 1 for right)
            // tons2 is the weights that we are going to add from the button
            this.tons = [];
            this.tons2 = [];
            this.tons[0] = new Tons(this.game, this.wheelGroup.getChildAt(0).x, 51, 97.3, this.gravity);
            this.tons[1] = new Tons(this.game, this.wheelGroup.getChildAt(1).x + this.wheel.width, 51, 97.3, this.gravity);
            this.tons[0].main = this;
            this.tons[1].main = this;
            this.tons[0].name = "left";
            this.tons[1].name = "right";
            this.game.physics.arcade.enable([this.tons[0], this.tons[1]])
            this.tons[0].body.allowGravity = false;
            this.tons[1].body.allowGravity = false;

            this.tons[1].y = this.tons[1].x - this.painter.x;
            this.tons[0].y = this.tons[1].y;

            // the pulley "strings"
            this.graphics = this.add.graphics(0, 0);
            this.graphics.lineStyle(1, 0x111111);
            this.graphics.moveTo(this.tons[0].x - 1, this.tons[0].y);
            this.graphics.lineTo(this.tons[0].x - 1, this.wheelGroup.getChildAt(0).y + this.wheel.height / 2);
            this.graphics.lineStyle(1, 0x111111);
            this.graphics.moveTo((this.tons[0].x - 1) + this.wheel.width, this.wheelGroup.getChildAt(0).y + this.wheel.height / 2);
            this.graphics.lineTo(this.painter.x, this.painter.y);
            this.graphics.lineStyle(1, 0x111111);
            this.graphics.moveTo(this.painter.x, this.painter.y);
            this.graphics.lineTo((this.tons[1].x - 1) - this.wheel.width, this.wheelGroup.getChildAt(1).y + this.wheel.height / 2);
            this.graphics.lineStyle(1, 0x111111);
            this.graphics.moveTo(this.tons[1].x - 1, this.wheelGroup.getChildAt(1).y + this.wheel.height / 2);
            this.graphics.lineTo(this.tons[1].x - 1, this.tons[1].y);
            

            // main screen stuffs
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.click = this.add.sprite(this.world.centerX, 220, 'click');
            this.click.alpha = 0;
            this.click.anchor.setTo(0.5, 0.5);

            // tweening the main intro screen
            this.add.tween(this.wheelGroup).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.painter).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.tiler).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.image).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true, 2000);
            this.add.tween(this.spriteGroup).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.logo["start"] = this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            this.click["start"] = this.add.tween(this.click).to({ alpha: 1 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);

            this.input.onDown.addOnce(this.fadeOut, this);
            this.button = this.add.button(this.game.world.width - 62, this.game.world.height - 11 - 44, 'button', this.addWeight, this, 0, 0, 1);
            this.button.anchor.setTo(0.5, 0);
            this.button.visible = false;
            this.button.alpha = 0;

            this.tons[1].angleA = Phaser.Math.angleBetween(this.painter.x, this.wheelGroup.getChildAt(1).y + this.wheel.height / 2, (this.tons[1].x - 1) - this.wheel.width, this.painter.y)
            this.tons[0].angleA = Phaser.Math.angleBetween((this.tons[0].x + 1) + this.wheel.width, this.wheelGroup.getChildAt(0).y + this.wheel.height / 2, this.painter.x, this.painter.y)
            this.tons[1].angleA = Math.round(this.tons[1].angleA * 100) / 100
            this.tons[0].angleA = Math.round(this.tons[0].angleA * 100) / 100
            var temp = Math.round((Math.sin(this.tons[0].angleA) + Math.sin(this.tons[0].angleA)) * 1000) / 1000
            this.tons[0].force = Phaser.Math.roundTo(this.painter.force / temp, -2)
            this.tons[1].force = Phaser.Math.roundTo(this.tons[0].force, -2)
            this.tons[0].mass = Phaser.Math.roundTo(this.tons[0].force / this.gravity, -2)
            this.tons[1].mass = Phaser.Math.roundTo(this.tons[1].force / this.gravity, -2)
            this.sumFx = this.tons[1].calcFx() - this.tons[0].calcFx(); // formula to find Sum of X components
            this.sumFy = (this.tons[1].calcFy() + this.tons[0].calcFy()) - this.painter.force  // formula to find Sum of Y components

        }
        update() {

            this.game.physics.arcade.collide(this.tiler, [this.tons[0], this.tons[1], this.painter]);
        }
        render() {


        }
        fadeOut() {
            if (this.logo["start"].isRunning) {
                this.logo["start"].stop();
                this.click["start"].stop();
            }
            //this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            this.add.tween(this.click).to({ alpha: 0 }, 500, Phaser.Easing.Elastic.Out, true);
            tween.onComplete.add(this.startGame, this);

        }

        startGame() {

            this.started = true;
            this.painter.started = true;
            this.tons[0].started = true;
            this.tons[1].started = true;
            this.button.visible = true;
            var tween = this.add.tween(this.button).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
            this.game.debug.text("Add weight", this.button.x - this.button.width / 2 - 20, this.button.y - 5);
        }


        paintTheLines(p1, t) {
            this.graphics.clear();
            this.graphics.lineStyle(1, 0x111111);
            this.graphics.moveTo(this.tons[0].x - 1, this.tons[0].y);
            this.graphics.lineTo(this.tons[0].x - 1, this.wheelGroup.getChildAt(0).y + this.wheel.height / 2);
            this.graphics.lineStyle(1, 0x111111);
            this.graphics.moveTo((this.tons[0].x - 1) + this.wheel.width, this.wheelGroup.getChildAt(0).y + this.wheel.height / 2);
            this.graphics.lineTo(this.painter.x, this.painter.y);
            this.graphics.lineStyle(1, 0x111111);
            this.graphics.moveTo(this.painter.x, this.painter.y);
            this.graphics.lineTo((this.tons[1].x - 1) - this.wheel.width, this.wheelGroup.getChildAt(1).y + this.wheel.height / 2);
            this.graphics.lineStyle(1, 0x111111);
            this.graphics.moveTo(this.tons[1].x - 1, this.wheelGroup.getChildAt(1).y + this.wheel.height / 2);
            this.graphics.lineTo(this.tons[1].x - 1, this.tons[1].y);
            for (var i = 0; i < p1.ton.length; i++) {

                p1.ton[i].x = p1.x;
                p1.ton[i].inputEnabled = false;
                if (i == 0) {
                    p1.ton[i].y = p1.y + p1.height;
                }
                else {
                    p1.ton[i].y = p1.y + (p1.height * (i + 1));
                }

            }
            if (p1.ton.length != 0) {
                p1.ton[p1.ton.length - 1].inputEnabled = true;
                p1.ton[p1.ton.length - 1].events.onDragStop.add(this.removeWeight, this);
                p1.ton[p1.ton.length - 1].nT = t;
            }
        }
        addWeight() {
            var mass = prompt("Please enter the weight/mass:", "0");

            if (Number(mass) > 0) { // Canceled
                var l = this.tons2.length;
                if (l < 5 && l >= 0) {
                    this.tons2[l] = new Tons(this.game, this.button.x - this.button.width, this.game.world.height - 11 - this.tons[0].height, Number(mass), this.gravity);
                    this.game.physics.arcade.enable(this.tons2[l]);
                    this.tons2[l].body.allowGravity = false;
                    this.tons2[l].inputEnabled = true;
                    this.tons2[l].input.enableDrag();
                    this.tons2[l].events.onDragStop.add(this.stopDrag, this);
                    this.tons2[l]._dx = this.tons2[0].position.clone()
                    this.tons2[l].anchor.setTo(0.5, 0);
                    if (l != 0) {
                        this.tons2[l].x = this.tons2[l - 1].x - this.tons2[l - 1].width;
                        this.tons2[l - 1].inputEnabled = false;
                        this.tons2[l - 1].events.onDragStop.remove(this.stopDrag, this);
                        this.tons2[l - 1].input.disableDrag();
                    }
                }
            }

        }
        removeWeight(p1) {


            if (this.tons[p1.nT].ton.length != 0) {
                this.tons[p1.nT].ton[this.tons[p1.nT].ton.length - 1].inputEnabled = true;
                this.tons[p1.nT].ton[this.tons[p1.nT].ton.length - 1].events.onDragStop.add(this.removeWeight, this);
            }
            this.tons[p1.nT].mass -= p1.mass;
            this.tons[p1.nT].calcForce();
            this.movePainter(p1.nT, false, p1.mass);
            this.tons[p1.nT].ton.pop();
            p1.destroy();
        }
        stopDrag(p1) {
            for (var i = 0; i < 2; i++) {
                if (!this.game.physics.arcade.overlap(p1, this.tons[i])) {
                    p1.position.copyFrom(p1._dx);
                }
                if (this.game.physics.arcade.overlap(p1, this.tons[i])) {
                    p1.position.x = this.tons[i].x;
                    p1.position.y = this.tons[i].y + this.tons[i].height;
                    this.tons[i].mass += p1.mass;
                    this.tons[i].ton.push(p1);

                    p1.events.onDragStop.remove(this.stopDrag, this);
                    //p1.destroy();
                    this.movePainter(i, true, p1.mass);
                    //the pop() method removes the last element of an array
                    this.tons2.pop();
                    if (this.tons2.length != 0) {
                        this.tons2[this.tons2.length - 1].inputEnabled = true;
                        this.tons2[this.tons2.length - 1].input.enableDrag();
                        this.tons2[this.tons2.length - 1].events.onDragStop.add(this.stopDrag, this);
                    }
                    break;
                }
            }
        }
        movePainter(t, dir, mass) {
            var point1 = new Phaser.Point((this.tons[1].x - 1) - this.wheel.width, this.wheelGroup.getChildAt(1).y + this.wheel.height / 2);
            var point2 = new Phaser.Point((this.tons[0].x + 1) + this.wheel.width, this.wheelGroup.getChildAt(0).y + this.wheel.height / 2);

            var m1 = (point1.y - this.painter.y) / (this.painter.x - point1.x);
            var m2 = (this.painter.y - point2.y) / (this.painter.x - point2.x);
           

            
            this.tons[1].angleA = Phaser.Math.angleBetween(this.painter.x, this.wheelGroup.getChildAt(1).y + this.wheel.height / 2, (this.tons[1].x - 1) - this.wheel.width, this.painter.y)
            this.tons[0].angleA = Phaser.Math.angleBetween((this.tons[0].x + 1) + this.wheel.width, this.wheelGroup.getChildAt(0).y + this.wheel.height / 2, this.painter.x, this.painter.y)
            this.tons[1].angleA = Math.round(this.tons[1].angleA * 100) / 100
            this.tons[0].angleA = Math.round(this.tons[0].angleA * 100) / 100
            this.sumFx = this.tons[1].calcFx() - this.tons[0].calcFx(); // formula to find Sum of X components
            this.sumFy = (this.tons[1].calcFy() + this.tons[0].calcFy()) - this.painter.force  // formula to find Sum of Y components
            this.sumR = (this.sumFx * 2) + (this.sumFy * 2);
            this.sumR = Math.sqrt(this.sumR);
            this.sumR = Math.round(this.sumR * 10) / 10;

            this.acceleration = (this.tons[1].force - this.painter.force) / (this.painter.mass);
            console.log(this.tons[1].calcFy(), this.tons[0].calcFy())
            console.log(Math.round(this.sumFx) * 10 / 10, "SUM FX");
            console.log(Math.round(this.sumFy) * 10 / 10, "SUM FY");
            console.log(this.acceleration);
            console.log(this.tons[1].angleA, this.tons[0].angleA)

            var velo = this.painter.position.clone();
            var tonY = this.tons[t].body.y;
            var tonX = 0;
            if (dir) {
                tonY += mass;
                velo.y -= mass;
                if (t == 1) {
                    velo.x += Math.round((mass / m1) * 10) / 10;
                    tonX = this.tons[0].body.y
                    tonX -= Math.round((mass / m1) * 10) / 10;
                    this.tons[0].tween = this.add.tween(this.tons[0]).to({ y: tonX }, 2000, Phaser.Easing.Exponential.Out, true);
                    
                }
                if (t == 0) {
                    velo.x -= Math.round((mass / m2) * 10) / 10;
                    tonX = this.tons[1].body.y
                    tonX -= Math.round((mass / m2) * 10) / 10;
                    this.tons[1].tween = this.add.tween(this.tons[1]).to({ y: tonX }, 2000, Phaser.Easing.Exponential.Out, true);
                }
            }
            if (!dir) {
                tonY -= mass;
                velo.y += mass;
                if (t == 1) {
                    velo.x -= Math.round((mass / m1) * 10) / 10;
                    tonX = this.tons[0].body.y
                    tonX += Math.round((mass / m1) * 10) / 10;
                    this.tons[0].tween = this.add.tween(this.tons[0]).to({ y: tonX }, 2000, Phaser.Easing.Exponential.Out, true);
                    
                }
                if (t == 0) {
                    velo.x += Math.round((mass / m2) * 10) / 10;
                    tonX = this.tons[1].body.y
                    tonX += Math.round((mass / m2) * 10) / 10;
                    this.tons[1].tween = this.add.tween(this.tons[1]).to({ y: tonX }, 2000, Phaser.Easing.Exponential.Out, true);
                    
                }
            }
            
            console.log(mass / m1);

            this.painter.tween = this.add.tween(this.painter).to({ x: velo.x, y: velo.y }, 2000, Phaser.Easing.Exponential.Out, true);

            this.tons[t].tween = this.add.tween(this.tons[t]).to({ y: tonY }, 2000, Phaser.Easing.Exponential.Out, true);

            this.tons[t].tween.onUpdateCallback(function () {
                this.paintTheLines(this.tons[t], t);
                this.calcAll();
            }, this);
            this.tons[t].tween.onComplete.add(function () {
                this.paintTheLines(this.tons[t], t);
                this.calcAll();
            }, this);
        }
        calcAll() {
            var point1 = new Phaser.Point((this.tons[1].x - 1) - this.wheel.width, this.wheelGroup.getChildAt(1).y + this.wheel.height / 2);
            var point2 = new Phaser.Point((this.tons[0].x + 1) + this.wheel.width, this.wheelGroup.getChildAt(0).y + this.wheel.height / 2);

            var m1 = (point1.y - this.painter.y) / (this.painter.x - point1.x);
            var m2 = (this.painter.y - point2.y) / (this.painter.x - point2.x);



            this.tons[1].angleA = Phaser.Math.angleBetween(this.painter.x, this.wheelGroup.getChildAt(1).y + this.wheel.height / 2, (this.tons[1].x - 1) - this.wheel.width, this.painter.y)
            this.tons[0].angleA = Phaser.Math.angleBetween((this.tons[0].x + 1) + this.wheel.width, this.wheelGroup.getChildAt(0).y + this.wheel.height / 2, this.painter.x, this.painter.y)
            this.tons[1].angleA = Math.round(this.tons[1].angleA * 100) / 100
            this.tons[0].angleA = Math.round(this.tons[0].angleA * 100) / 100
            this.sumFx = this.tons[1].calcFx() - this.tons[0].calcFx(); // formula to find Sum of X components
            this.sumFy = (this.tons[1].calcFy() + this.tons[0].calcFy()) - this.painter.force  // formula to find Sum of Y components
            this.sumR = (this.sumFx * 2) + (this.sumFy * 2);
            this.sumR = Math.sqrt(this.sumR);
            this.sumR = Math.round(this.sumR * 10) / 10;

            this.acceleration = (this.tons[1].force - this.painter.force) / (this.painter.mass);
            console.log(this.tons[1].calcFy(), this.tons[0].calcFy())
            console.log(Math.round(this.sumFx) * 10 / 10, "SUM FX");
            console.log(Math.round(this.sumFy) * 10 / 10, "SUM FY");
            console.log(this.acceleration);
            console.log(this.tons[1].angleA, this.tons[0].angleA)
        }
    }

}