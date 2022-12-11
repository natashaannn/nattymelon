import { Stage, game, BitmapText  } from 'melonjs';
import * as me from 'melonjs/dist/melonjs.module.js';

class PlayScreen extends Stage {
    onResetEvent() {
        me.level.load("home");

        // add a font text display object
        game.world.addChild(new BitmapText(game.viewport.width / 4, game.viewport.height / 4,  {
            font : "PressStart2P",
            size : 2.0,
            textBaseline : "middle",
            textAlign : "center",
            text : "Hey I'm Nat!"
        }));
    }
};

export default PlayScreen;
