let values = [];
let sorted = [];
let container = document.getElementById("container");	
let index = [];	
let indexedPivot = [];

class Element{
    constructor(container, value, i) {
        this.value = value;
        
        const div = document.createElement("div");
        div.classList.add("element");
        container.appendChild(div);
        div.style.height = `${value}px`;
        div.style.left = `${30*i}px`;
        // div.style.top = `${120-value}px`;
        this.div = div;
    }
    move(i) {
        // Return promise that resolves when move is complete
        return new Promise(resolve => {
            this.div.addEventListener('transitionend', (e) => {
                this.div.classList.toggle('highlight', false);
                resolve();
            }, { once: true });
            this.div.classList.toggle('highlight', true);
            this.div.style.left = `${30*i}px`; // trigger transition effect
        });
   }
}
const generateRandomValue = () => Math.floor((Math.random() * 100) + 180);

function generateElements(container, length=30) {
    container.innerHTML = "";
    return Array.from({length}, (_, i) =>
        new Element(container, generateRandomValue(), i)
    );
}

async function quickSort(arr, start, end){
    if (start >= end) {
        return;
    }
    const index = await partition(arr, start, end);
    await quickSort(arr, start, index-1);
    await quickSort(arr, index + 1, end);
    return arr;
}

async function partition(arr, start, end) {
    let pivotIndex = start;
    const pivotValue = arr[end].value;
    for (let i = start; i < end ; i++) {
        if (arr[i].value < pivotValue) {
            await swap(arr, i, pivotIndex);
            pivotIndex++;
        }
    }
    await swap(arr,pivotIndex, end);
    return pivotIndex;
}

function swap(items, leftIndex, rightIndex) {
    if (leftIndex === rightIndex) return; // Nothing to do
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    return Promise.all([items[leftIndex].move(leftIndex),
                        items[rightIndex].move(rightIndex)]);
}

const elements = generateElements(document.querySelector("#container"));

function sort(){
	setTimeout(() => 
    quickSort(elements, 0, elements.length - 1), 
40*1);

}

function reload(){
	window.location.reload();
}
