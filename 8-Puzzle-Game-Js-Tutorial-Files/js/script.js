const letters = ["1", "2", "3", "4", "5", "6", "7", "8", ""];
const indexes = Object.assign(...letters.map((element, index) => ({ [element]: index })));
var empty = -1;

function setUp() {
    fillGrid(letters);
    setMovable();
}

const setMovable = () => {
    items = document.querySelectorAll("li");
    items.forEach((item, i) => {
        if (!item.innerText) {
            empty = i;
            item.setAttribute("class", "empty");
        }
        item.setAttribute("onclick", `try_move(${i});`);
    })
}

const try_move = (i) => {
    empty_node = document.querySelector("#li" + empty);
    target_node = document.querySelector("#li" + i);
    if (i + 3 == empty ||
        i - 3 == empty ||
        i + 1 == empty ||
        i - 1 == empty) {
        empty_node.classList.remove("empty")
        empty_node.innerText = target_node.innerText;
        target_node.innerText = "";
        target_node.setAttribute("class", "empty");
        empty = i;
        if (isCorrect()) {
            showModal();
        }
    }

}
const isSolvable = (arr) => {
    let number_of_inv = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            number_of_inv += indexes[arr[i]] > indexes[arr[j]];
        }
    }
    return number_of_inv % 2 == 0;
}

const isCorrect = () => {
    for (let i = 0; i < letters.length; i++) {
        if (document.querySelector("#li" + i).innerText != letters[i]) { return false; }
    }
    return true;
}

const fillGrid = (letters) => {
    let shuffled = shuffle(letters);
    // shuffle the letters arraay until there is a combination that is solvable
    while (!isSolvable(shuffled)) {
        shuffled = shuffle(letters);
    }
    items = document.querySelectorAll('li');
    items.forEach((item, i) => {
        item.innerText = shuffled[i];
    })
}

const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = 1; i < copy.length; i++) {
        let j = Math.floor(Math.random() * i);
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

const showModal = () => {
    document.getElementById('message').innerText = "You Won!";
    document.getElementById('modal').classList.remove("hide");
}

const hideModal = () => {
    document.getElementById('modal').classList.add("hide");
}

