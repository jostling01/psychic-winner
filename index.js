const fruitForm = document.querySelector('#inputSection form');
const fruitList = document.querySelector('#fruitSection ul');
const fruitNutrition = document.querySelector('#nutritionSection p')

fruitForm.addEventListener('submit', extractFruit);

function extractFruit(e) {
    e.preventDefault();
    fetchFruitData(e.target.fruitInput.value)
    e.target.fruitInput.value = '';
};

// function fetchFruitData(fruit) {
//     fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
//         .then((resp) => resp.json())
//         .then(data => addFruits(data))
//         .catch((e) => console.log(e))
// }

async function fetchFruitData(fruit) {
    try {
        const resp = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        const resp1 = await fetch(`https://pixabay.com/api/?key=53335773-7e4d7e41908436274daa3bce1&q=${fruit}`)
        if(resp.ok && resp1.ok) {
            const data = await resp.json()
            const picurl = await resp1.json()
            addFruits(data, picurl.hits[0].largeImageURL)
        } else {
            throw 'Error: http status code = ' + resp.status
        }
    } catch (error) {
        console.log(error)
    }
}



let cal = 0

function addFruits(fruit, img) {
    const li = document.createElement('li');
    li.textContent = fruit.name;
    li.addEventListener('click', (e) => li.remove());
    fruitList.appendChild(li);
    calorieUpdate(fruit, 1);
    const fruitPic = document.createElement('img');
    fruitPic.setAttribute('src', img);
    document.body.appendChild(fruitPic);
    
    
    li.addEventListener('click', () => calorieUpdate(fruit, -1));
    
};
function calorieUpdate (fruit, x) {
    cal += x * fruit.nutritions.calories;
    fruitNutrition.textContent = cal;
}

// updated first-branch
