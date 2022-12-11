import { Entity, game } from 'melonjs';
import * as me from 'melonjs/dist/melonjs.module.js';

class PlayerEntity extends Entity {

    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y , settings);

        // set a "player object" type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        // player can exit the viewport (jumping, falling into a hole, etc.)
        this.alwaysUpdate = true;

        // max walking speed
        this.body.setMaxVelocity(3, 5);
        this.body.setFriction(0.4, 0);

        // enable keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.UP, "up");

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "avatar-back-walk-left.png", 
            "avatar-back-walk-right.png", 
            "avatar-back.png",
            "avatar-front-walk-left.png", 
            "avatar-front-walk-right.png", 
            "avatar-front.png",
            "avatar-left-walk-back.png", 
            "avatar-left-walk-front.png", 
            "avatar-left.png",
            "avatar-right-walk-back.png", 
            "avatar-right-walk-front.png", 
            "avatar-right.png",
        ]);

        // define standing animation
        this.renderable.addAnimation ("stand",  [
            { name: "avatar-front.png" }, 
        ]);

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation ("walk-front",  [
            { name: "avatar-front.png", delay: 100 }, 
            { name: "avatar-front-walk-left.png", delay: 100 }, 
            { name: "avatar-front-walk-right.png", delay: 100 }
        ]);

        this.renderable.addAnimation ("walk-left",  [
            { name: "avatar-left.png", delay: 100 }, 
            { name: "avatar-left-walk-left.png", delay: 100 }, 
            { name: "avatar-left-walk-right.png", delay: 100 }
        ]);

        this.renderable.addAnimation ("walk-right",  [
            { name: "avatar-right.png", delay: 100 }, 
            { name: "avatar-right-walk-left.png", delay: 100 }, 
            { name: "avatar-right-walk-right.png", delay: 100 }
        ]);

        this.renderable.addAnimation ("walk-back",  [
            { name: "avatar-back.png", delay: 100 }, 
            { name: "avatar-back-walk-left.png", delay: 100 }, 
            { name: "avatar-back-walk-right.png", delay: 100 }
        ]);

        // set as default
        this.renderable.setCurrentAnimation("stand");
    }

    /**
     * update the entity
     */
    update(dt) {

        if (me.input.isKeyPressed('left')) {
            this.body.force.x = -this.body.maxVel.x;
            if (!this.renderable.isCurrentAnimation("walk-left")) {
                this.renderable.setCurrentAnimation("walk-left");
            }
        } else if (me.input.isKeyPressed('right')) {
            this.body.force.x = this.body.maxVel.x;
            if (!this.renderable.isCurrentAnimation("walk-right")) {
                this.renderable.setCurrentAnimation("walk-right");
            }
        } else if (me.input.isKeyPressed('up')) {
            this.body.force.y = -this.body.maxVel.y;
            if (!this.renderable.isCurrentAnimation("walk-back")) {
                this.renderable.setCurrentAnimation("walk-back");
            }
        } else if (me.input.isKeyPressed('down')) {
            this.body.force.y = this.body.maxVel.y;
            if (!this.renderable.isCurrentAnimation("walk-front")) {
                this.renderable.setCurrentAnimation("walk-front");
            }
        } else {
            // change to the standing animation
            this.renderable.setCurrentAnimation("stand");
        }

        // check if we moved (an "idle" animation would definitely be cleaner)
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0 ||
            (this.renderable && this.renderable.isFlickering())
        ) {
            super.update(dt);
            return true;
        }
        return false;
    }

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        // Make all other objects solid
        return true;
    }
};

export default PlayerEntity;
