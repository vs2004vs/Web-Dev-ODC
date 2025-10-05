// 1. Change Text Content
function changeText() {
  document.getElementById("text").textContent = "Hello, JavaScript!";
}

// 2. Style an Element
function styleBox() {
  let box = document.getElementById("box");
  box.style.backgroundColor = "blue";
  box.style.color = "white";
  box.style.padding = "10px";
}

// 3. Add a New Element
function addItem() {
  let newItem = document.createElement("li");
  newItem.textContent = "New Item";
  document.getElementById("myList").appendChild(newItem);
}

// 4. Remove an Element
function removeItem() {
  let list = document.getElementById("removeList");
  list.removeChild(list.lastElementChild);
}

// 5. Input & Output
function showInput() {
  let input = document.getElementById("userInput").value;
  document.getElementById("display").textContent = input;
}
