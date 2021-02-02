const Dinos = [
    {
        'species': 'Triceratops',
        'weight': 13000,
        'height': 114,
        'diet': 'herbavor',
        'where': 'North America',
        'when': 'Late Cretaceous',
        'fact': 'First discovered in 1889 by Othniel Charles Marsh'
    },
    {
        'species': 'Tyrannosaurus Rex',
        'weight': 11905,
        'height': 144,
        'diet': 'carnivor',
        'where': 'North America',
        'when': 'Late Cretaceous',
        'fact': 'The largest known skull measures in at 5 feet long.'
    },
    {
        'species': 'Anklyosaurus',
        'weight': 10500,
        'height': 55,
        'diet': 'herbavor',
        'where': 'North America',
        'when': 'Late Cretaceous',
        'fact': 'Anklyosaurus survived for approximately 135 million years.'
    },
    {
        'species': 'Brachiosaurus',
        'weight': 70000,
        'height': '372',
        'diet': 'herbavor',
        'where': 'North America',
        'when': 'Late Jurasic',
        'fact': 'An asteroid was named 9954 Brachiosaurus in 1991.'
    },
    {
        'species': 'Stegosaurus',
        'weight': 11600,
        'height': 79,
        'diet': 'herbavor',
        'where': 'North America, Europe, Asia',
        'when': 'Late Jurasic to Early Cretaceous',
        'fact': 'The Stegosaurus had between 17 and 22 seperate places and flat spines.'
    },
    {
        'species': 'Elasmosaurus',
        'weight': 16000,
        'height': 59,
        'diet': 'carnivor',
        'where': 'North America',
        'when': 'Late Cretaceous',
        'fact': 'Elasmosaurus was a marine reptile first discovered in Kansas.'
    },
    {
        'species': 'Pteranodon',
        'weight': 44,
        'height': 20,
        'diet': 'carnivor',
        'where': 'North America',
        'when': 'Late Cretaceous',
        'fact': 'Actually a flying reptile, the Pteranodon is not a dinosaur.'
    },
    {
        'species': 'Pigeon',
        'weight': 0.5,
        'height': 9,
        'diet': 'herbavor',
        'where': 'World Wide',
        'when': 'Holocene',
        'fact': 'All birds are living dinosaurs.'
    }
]

// Create Human Object
const human = { height: 0, weight: 0, diet: '', name: '' };

// Method to compare weight
function cmpWeight( weight )
{
    const pct = Math.floor( ( weight / human.weight ) * 100 );
    const str = pct + '% of your weight';
    return str;
}

// Method to compare height
function cmpHeight( height )
{
    const pct = Math.floor( ( height / human.height ) * 100 );
    const str = pct + '% of your height';
    return str;
}

// Method to compare diet
function cmpDiet( diet )
{
    if( diet == human.diet ) {
        return 'Same as your diet!';
    }
    else {
        return 'Different than your diet';
    }
}

// Method to get random fact
function getFact( element ) {
            
    let fact;
    
    if( element.species == 'Pigeon' ) {
        fact = element.fact;
    }
    else {
        const rand = Math.floor(Math.random() * Math.floor(6))    // 0 to 5
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

// Dino Constructor
function Dino( obj ) {
    this.species = obj.species;
    this.weight = obj.weight;
    this.height = obj.height;
    this.diet = obj.diet;
    this.where = obj.where;
    this.when = obj.when;
    this.fact = obj.fact;
}

// Method to generate tile for display
function genTile(name, image, fact, center) { 

    const tile = document.createElement('div');
    tile.className = 'grid-item';

    const h3 = document.createElement('h3');
    h3.innerHTML = name;
    tile.appendChild( h3 );

    const img = document.createElement('img');
    img.src = './images/' + image + '.png';
    tile.appendChild( img );

    if( fact != '' ) {
        const p = document.createElement('p');
        p.innerHTML = fact;
        tile.appendChild( p );
    }

    // Add tiles to DOM
    if(center) {
        const parent = document.getElementById('grid');
        parent.insertBefore(tile, parent.children[4]);
    }
    else {
        document.getElementById('grid').appendChild( tile );
    }
}

// Method to handle form submit
function dspInfo() {

    const dinos = [];
     
    // Create Dino Objects
    Dinos.forEach( element => dinos.push( new Dino( element ) ) );

    // Get human data from form
    (function() {
        human.weight = document.getElementById('weight').value;
        human.height = Number(document.getElementById('feet').value) * 12 + 
            Number(document.getElementById('inches').value);
        human.diet = document.getElementById('diet').value;
        human.name = document.getElementById('name').value;
    })();

    // Generate Tiles for each Dino in Array
    dinos.forEach(element => {
        genTile( element.species, element.species, getFact(element), false );
    })

    // Generate human tile
    genTile( human.name, 'human', '', true);

     // Remove form from screen
    document.getElementById('dino-compare').hidden = true;
}

// Setup button click handler
document.getElementById('btn').addEventListener('click', dspInfo );