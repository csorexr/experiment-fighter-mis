function fire (text: string) {
    if ("left" == text) {
        bolt = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . . c d c . . . . . . 
            . . . . . . . c 5 c . . . . . . 
            . . . . . . c d 5 d c . . . . . 
            . . . b c c d 5 5 5 d c c b . . 
            . . b d d 5 5 5 5 5 5 5 d d b . 
            . . . b c c d 5 5 5 d c c b . . 
            . . . . . . c d 5 d c . . . . . 
            . . . . . . . c 5 c . . . . . . 
            . . . . . . . c d c . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, fighter, -50, -50)
    } else if ("right" == text) {
        bolt = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . . c d c . . . . . . 
            . . . . . . . c 5 c . . . . . . 
            . . . . . . c d 5 d c . . . . . 
            . . . b c c d 5 5 5 d c c b . . 
            . . b d d 5 5 5 5 5 5 5 d d b . 
            . . . b c c d 5 5 5 d c c b . . 
            . . . . . . c d 5 d c . . . . . 
            . . . . . . . c 5 c . . . . . . 
            . . . . . . . c d c . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, fighter, 50, -50)
    }
    sprites.setDataSprite(bolt, "following", pickghost())
    bolt.follow(sprites.readDataSprite(bolt, "following"), 100)
    bolt.setFlag(SpriteFlag.AutoDestroy, true)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    fire("left")
    fire("right")
})
function pickghost () {
    return sprites.allOfKind(SpriteKind.Enemy)._pickRandom()
}
function logspeed () {
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        console.logValue("vx", value.vx)
        console.logValue("vy", value.vy)
    }
}
let newGhost: Sprite = null
let bolt: Sprite = null
let fighter: Sprite = null
effects.starField.startScreenEffect()
fighter = sprites.create(img`
    . . . . . . . 5 5 . . . . . . . 
    . . . . . f 5 5 5 5 f . . . . . 
    . . . . f 6 6 6 6 6 6 f . . . . 
    . . . f 6 1 1 1 6 1 6 6 f . . . 
    . . . f 6 6 6 6 6 6 6 6 f . . . 
    . . . f 6 6 6 6 6 6 6 6 f . . . 
    . . . f 6 6 6 6 6 6 6 6 f . . . 
    . . f f 6 6 6 6 6 6 6 6 f f . . 
    . f 6 6 6 f 6 6 6 6 f 6 6 6 f . 
    . . f f f 3 f f f f 3 f f f . . 
    . . . f d 5 3 3 3 3 5 d f . . . 
    . . f d d f 3 3 3 3 f d d f . . 
    . . . f f f 5 3 3 5 f f f . . . 
    . . . . f 3 3 5 5 3 3 f . . . . 
    . . . . f 3 3 3 3 3 3 f . . . . 
    . . . . . f f f f f f . . . . . 
    `, SpriteKind.Player)
fighter.setPosition(80, 92)
fighter.setStayInScreen(true)
controller.moveSprite(fighter)
game.onUpdateInterval(800, function () {
    newGhost = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    newGhost.setVelocity(randint(-30, 30), 50)
    newGhost.setPosition(randint(0, 160), 0)
    newGhost.setFlag(SpriteFlag.AutoDestroy, true)
})
