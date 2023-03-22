window.addEventListener("load", () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = 1000;
    canvas.height = 700;
    
    class Player {
        constructor(game, posX, posY, width, height) {
            this.game = game;
            this.posX = posX;
            this.posY = posY;
            this.width = width;
            this.height = height;
            this.velocityX = 0;
            this.velocityY = 0;
            this.maxSpeed = 5;
        }
    
        draw(context) {
            context.beginPath();
            context.fillRect(this.posX, this.posY, this.width, this.height);
            context.closePath();
        }
    
        update() {
            if (this.game.keys.includes("ArrowUp") || this.game.keys.includes("w")) {
                this.velocityY = -this.maxSpeed;
            } else if (this.game.keys.includes("ArrowDown") || this.game.keys.includes("s")) {
                this.velocityY = this.maxSpeed;
            } else {
                this.velocityY = 0;
            }

            if (this.game.keys.includes("ArrowLeft") || this.game.keys.includes("a")) {
                this.velocityX = -this.maxSpeed;
            } else if (this.game.keys.includes("ArrowRight") || this.game.keys.includes("d")) {
                this.velocityX = this.maxSpeed;
            } else {
                this.velocityX = 0;
            }

            this.posX += this.velocityX;
            this.posY += this.velocityY;
        }
    }
    
    class PlayerController {
        constructor(game) {
            this.game = game;
            
            window.addEventListener("keydown", e => {
                if ((
                        (e.key === "ArrowUp" || e.key === "w") ||
                        (e.key === "ArrowDown" || e.key === "s") ||
                        (e.key === "ArrowLeft" || e.key === "a") ||
                        (e.key === "ArrowRight" || e.key === "d")
                    ) && this.game.keys.indexOf(e.key) === -1) {
                    this.game.keys.push(e.key);
                }
            });
    
            window.addEventListener("keyup", e => {
                if (this.game.keys.indexOf(e.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
            });
        }
    }
    
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this, 100, 100, 50, 50);
            this.input = new PlayerController(this);
            this.keys = [];
        }
    
        draw(context) {
            this.player.draw(context);
        }
    
        update() {
            this.player.update();
        }
    }
    
    const game = new Game(canvas.width, canvas.height);
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    
    animate();
});