
const Dinos = [
    {
        "species": "Triceratops",
        "weight": 13000,
        "height": 114,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "First discovered in 1889 by Othniel Charles Marsh"
    },
    {
        "species": "Tyrannosaurus Rex",
        "weight": 11905,
        "height": 144,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "The largest known skull measures in at 5 feet long."
    },
    {
        "species": "Anklyosaurus",
        "weight": 10500,
        "height": 55,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Anklyosaurus survived for approximately 135 million years."
    },
    {
        "species": "Brachiosaurus",
        "weight": 70000,
        "height": "372",
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Jurasic",
        "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
    },
    {
        "species": "Stegosaurus",
        "weight": 11600,
        "height": 79,
        "diet": "herbavor",
        "where": "North America, Europe, Asia",
        "when": "Late Jurasic to Early Cretaceous",
        "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
    },
    {
        "species": "Elasmosaurus",
        "weight": 16000,
        "height": 59,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
    },
    {
        "species": "Pteranodon",
        "weight": 44,
        "height": 20,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
    },
    {
        "species": "Pigeon",
        "weight": 0.5,
        "height": 9,
        "diet": "herbavor",
        "where": "World Wide",
        "when": "Holocene",
        "fact": "All birds are living dinosaurs."
    }
]

// Create Human Object
let human = { height: 0, weight: 0, diet: "", name: "" };

// Create Dino Compare Method 1
function cmpWeight( weight )
{
    let pct = Math.floor( ( weight / human.weight ) * 100 );
    let str = pct + '% of your weight';
    return str;
}

// Create Dino Compare Method 2
// NOTE: Height in JSON file is in inches.
function cmpHeight( height )
{
    let pct = Math.floor( ( height / human.height ) * 100 );
    let str = pct + '% of your height';
    return str;
}

// Create Dino Compare Method 3
function cmpDiet( diet )
{
    let str = "";

    if( diet == human.diet ) {
        str = 'Same as your diet!';
    }
    else {
        str = 'Different than your diet';
    }
    return str;
}

function getFact( element ) {
            
    let fact;
    if( element.species == 'Pigeon' ) {
        fact = element.fact;
    }
    else {
        let rand = Math.floor(Math.random() * Math.floor(6))    // 0 to 5
        switch( rand ) {
            case 0:
                fact = element.fact;
                break;
            case 1:
                fact = element.where;
                break;
            case 2:
                fact = element.when;
                break;
            case 3:
                fact = cmpWeight( element.weight );
                break;
            case 4:
                fact = cmpHeight( element.height );
                break;
            case 5:
                fact = cmpDiet( element.diet );
                break;
        }
    }
    return fact;
}

// Create Dino Constructor
function Dino( obj ) {
    this.species = obj.species;
    this.weight = obj.weight;
    this.height = obj.height;
    this.diet = obj.diet;
    this.where = obj.where;
    this.when = obj.when;
    this.fact = obj.fact;
}

function dspInfo() {

    let dinos = [];
     
    // Create Dino Objects
    Dinos.forEach( element => dinos.push( new Dino( element ) ) );

    // Use IIFE to get human data from form
    (function() {
        human.weight = document.getElementById('weight').value;
        human.height = Number(document.getElementById('feet').value) * 12 + 
            Number(document.getElementById('inches').value);
        human.diet = document.getElementById('diet').value;
        human.name = document.getElementById('name').value;
    })();

    // Generate Tiles for each Dino in Array
    dinos.forEach(element => {
        let tile = document.createElement('div');
        tile.className = 'grid-item';

        let h3 = document.createElement('h3');
        h3.innerHTML = element.species;
        tile.appendChild( h3 );

        let img = document.createElement('img');
        img.src = './images/' + element.species + '.png';
        tile.appendChild( img );

        // get fact
        let fact = getFact( element );
        let p = document.createElement('p');
        p.innerHTML = fact;
        tile.appendChild( p );

        // Add tiles to DOM
        document.getElementById("grid").appendChild( tile );
    })

    // Generate human tile
    let tile = document.createElement('div');
    tile.className = 'grid-item';

    let h3 = document.createElement('h3');
    h3.innerHTML = human.name;
    tile.appendChild( h3 );

    let img = document.createElement('img');
    img.src = './images/' + 'human' + '.png';
    tile.appendChild( img );

    // Add tile to DOM
    let parent = document.getElementById("grid");
    parent.insertBefore(tile, parent.children[4]);

    // Remove form from screen
    document.getElementById("dino-compare").hidden = true;
}

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', dspInfo );