import { Entity, game } from 'melonjs';
import * as me from 'melonjs/dist/melonjs.module.js';
import { throwStatement } from '../../../../../AppData/Local/Microsoft/TypeScript/4.9/node_modules/@babel/types/lib/index';

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

        // walking & jumping speed
        this.body.setMaxVelocity(3, 3);
        this.body.setFriction(0.4, 1);

        // enable keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,    "up");
        me.input.bindKey(me.input.KEY.DOWN,  "down");

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

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation ("walk_down",  [
            { name: "avatar-front.png", delay: 100 }, 
            { name: "avatar-front-walk-left.png", delay: 100 }, 
            { name: "avatar-front-walk-right.png", delay: 100 }
        ]);

        this.renderable.addAnimation ("walk_left",  [
            { name: "avatar-left.png", delay: 100 }, 
            { name: "avatar-left-walk-front.png", delay: 100 }, 
            { name: "avatar-left-walk-back.png", delay: 100 }
        ]);

        this.renderable.addAnimation ("walk_right",  [
            { name: "avatar-right.png", delay: 100 }, 
            { name: "avatar-right-walk-front.png", delay: 100 }, 
            { name: "avatar-right-walk-back.png", delay: 100 }
        ]);

        this.renderable.addAnimation ("walk_up",  [
            { name: "avatar-back.png", delay: 100 }, 
            { name: "avatar-back-walk-left.png", delay: 100 }, 
            { name: "avatar-back-walk-right.png", delay: 100 }
        ]);

        // define a standing animation
        this.renderable.addAnimation( "stand", [
            { name: "avatar-front.png"}
        ]);

        // set as default
        this.renderable.setCurrentAnimation("stand");
    }

    /**
     * update the entity
     */
    update(dt) {
        if (me.input.isKeyPressed("left")) {
            // update the entity velocity
            this.body.vel.y = 0;
            this.body.vel.x = -this.body.maxVel.x;
            if (!this.renderable.isCurrentAnimation("walk_left")) {
                this.renderable.setCurrentAnimation("walk_left");
            }
        } else if (me.input.isKeyPressed("right")) {
            // update the entity velocity
            this.body.vel.y = 0;
            this.body.force.x = this.body.maxVel.x;
            if (!this.renderable.isCurrentAnimation("walk_right")) {
                this.renderable.setCurrentAnimation("walk_right");
            }
        } else if (me.input.isKeyPressed("up")) {
            // update the entity velocity
            this.body.force.y = -this.body.maxVel.y;
            if (!this.renderable.isCurrentAnimation("walk_up")) {
                this.renderable.setCurrentAnimation("walk_up");
            }
        } else if (me.input.isKeyPressed("down")) {
            // update the entity velocity
            this.body.force.y = this.body.maxVel.y;
            if (!this.renderable.isCurrentAnimation("walk_down")) {
                this.renderable.setCurrentAnimation("walk_down");
            }
        } else {
            this.body.vel = { x: 0, y: 0 }
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
