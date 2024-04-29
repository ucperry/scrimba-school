import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://realtime-database-2b431-default-rtdb.firebaseio.com/"
}

const app = initializeApp (appSettings)
const database = getDatabase (app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
const familyMemberSection = document.getElementById("familyMemberSection")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
           
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No Items Needed... Yet"
    } 
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}` )

        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}

// Family Member Selector
let family = ['Nanna', 'Poppa', 'Perry', 'Rhiannon', 'Mady', 'Trey', 'Max', 'Chase']


for (let i = 0; i < family.length; i++) {
    let member = family[i];
    let el = document.createElement("option");
    el.textContent = member;
    el.value = member;
    familyMemberSection.appendChild(el);
}


familyMemberSection.onchange = function () {
    console.log (familyMemberSection.value)
}

