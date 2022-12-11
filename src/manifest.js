// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [

    /* Bitmap Text */
    {
        name: "PressStart2P",
        type: "image",
        src:  "./data/fnt/PressStart2P.png"
    },
    {
        name: "PressStart2P",
        type: "binary",
        src: "./data/fnt/PressStart2P.fnt"
    },
    /* Tile Maps */
    {
        name: "homeTiles", 
        type: "tsx", 
        src: "./data/img/homeTiles.tsx"
    },
    {
        name: "home", 
        type: "tmx",	
        src: "./data/map/home.tmx"
    },
    {
        name: "grassTile",
        type: "image",
        src: "./data/img/background/grassTile.svg"
    },
    {
        name: "roadTile",
        type: "image",
        src: "./data/img/background/roadTile.svg"
    },
    {
        name: "roadCurbLeft",
        type: "image",
        src: "./data/img/background/roadCurbLeft.svg"
    },
    {
        name: "roadCurbRight",
        type: "image",
        src: "./data/img/background/roadCurbRight.svg"
    },
    {
        name: "roadCurbTop",
        type: "image",
        src: "./data/img/background/roadCurbTop.svg"
    },
    {
        name: "roadCurbBottom",
        type: "image",
        src: "./data/img/background/roadCurbBottom.svg"
    },
    /* Texture Map */
    {
        name: "texture",
        type: "json",
        src: "./data/img/texture.json"
    },
    {
        name: "texture",
        type: "image",
        src: "./data/img/texture.png"
    },
];

export default DataManifest;
