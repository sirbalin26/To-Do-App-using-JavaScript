const todosList = [];
let currentHistory = localStorage.getItem("history-todo");

function createTodoElement(element, index) {
	const $li = document.createElement("li");
	const $checkbox = document.createElement("input");
	const $text = document.createElement("span");

	$checkbox.type = "checkbox";
	$checkbox.check = false;

	$checkbox.addEventListener("change", function() {
		if (this.checked === true) {
			element.isCompleted = true;
			todosList.splice(index, 1);
			displayTodoItems();
		} else {
			element.isCompleted = false;
			$text.style.textDecoration = "none";
			$text.style.fontStyle = "normal";
			$text.style.color = "#000";
		}
		console.log(element);
	});
	
	$text.innerHTML = `[${element.importance}] ${element.name}`;

	$li.appendChild($checkbox);
	$li.appendChild($text);

	return $li;	
}

function displayTodoItems(itemsArr) {
	const $todos = document.getElementById("todos");
	$todos.innerHTML = "";
	itemsArr.forEach((element, index)=> {
		const $el = createTodoElement(element);
		$todos.appendChild($el);
	});

	checkAllTodoItems(itemsArr);
}

function onAddItem() {
	const $inputItemName = document.getElementById("todo-item-name");
	const $importance = document.getElementById("todo-item-important");

	const itemName = $inputItemName.value;
	const importance = $importance.options[$importance.selectedIndex].value;
	
	const todoItem = {
		name: itemName,
		importance: importance,
		isCompleted: false,
		dataAdded: new Date()
	};

	todosList.push(todoItem);
	
	$inputItemName.value = "";
	$importance.selectedIndex = 0;
	displayTodoItems(todosList);
}

function filterByImportance(event) {
	const filterValue = event.target.value;

	if (!filterValue) {
		displayTodoItems(todosList);
		return;
	}

	const filteredTodoList = todosList.filter((el, index) => {
		return el.importance === filterValue;
	});

	displayTodoItems(filteredTodoList);
}

function checkAllTodoItems(itemsArr) {
	const areAllItemsLow = itemsArr.every((currentValue, index)=> {
		return currentValue.importance === "Scazut";
	});

	const someItemsAreMedium = itemsArr.some((currentValue, index)=> {
		return currentValue.importance === "Medium";
	});

	const $allLow = document.querySelector("#todo-all-low > span");
	$allLow.innerHTML = `${areAllItemsLow}`.toUpperCase();
	const $someMedium = document.querySelector("#todo-some-medium > span");
	$someMedium.innerHTML = `${someItemsAreMedium}`.toUpperCase();
}

const $btnAddItem = document.getElementById("todo-add-item");
const $selectFilterImportance = document.getElementById("todo-filter-importance");

$btnAddItem.addEventListener("click", onAddItem);
$selectFilterImportance.addEventListener("change", filterByImportance);

const array1 = [1,2,3,4,5];

const array1Double = array1.map((currentValue, index)=>{
	return currentValue * 2;
});

console.log(array1Double);

console.log(array1.includes(4));

console.log(array1.indexOf(4));

console.log(array1.find((currentValue, index)=>{
	return currentValue === 5;
}));

console.log(array1.findIndex((currentValue,index)=>{
	return currentValue % 2 === 0;
}));

function saveToLocalStorage(status) {
	const date = new Date().toDateString();
	if (currentHistory !== null && Array.isArray(currentHistory)) {
		currentHistory.push({
			date: date,
			status: status
		});
		localStorage.setItem("history-todo", JSON.stringify(currentHistory));
		return;
	}

	currentHistory = [{
		date: date,
		status: status
	}];

	localStorage.setItem("history-todo", JSON.stringify(cuurentHistory));
}