const MIN_PAGE = 1;
const MAX_PAGE = 186;

// populates the list of selectable pages, binds left and right
// arrow keys
function setupNav() {
    setupPageSelector();
    document.onkeydown = checkKey;
}

// setup page selector
function setupPageSelector() {
    var root = document.getElementById("page-select");
    for (var i = MIN_PAGE; i <= MAX_PAGE; i++) {
        var opt = new Option("Page " + i, i);
        root.appendChild(opt);
    }
}

// setup recipe selector
function setupRecipeSelector() {
    // RECIPES are stored in a normalized format in recipes.js; we want to
    // denormalize to make it easily manipulated.
    var recipes = [];

    for (var i = MIN_PAGE; i <= MAX_PAGE; i++) {
        var titles = RECIPES[i];
        if (Array.isArray(titles)) {
            for (const name of titles) {
                recipes.push([name, i]);
            }
        }
    }

    // Alphabetize 'em
    recipes.sort();
    
    // populate the recipe selector
    var root = document.getElementById("recipe-select");
    for (const r of recipes) {
        const opt = new Option(r[0], r[1]);
        root.appendChild(opt);
    }
}

function goToRecipe() {
    var index = document.getElementById("recipe-select").value;
    setPage(index);
}

// updates the image when the new page is selected
function goToPage() {
    var index = document.getElementById("page-select").value;
    setPage(index);
}

function setPage(index) {
    var pageSelector = document.getElementById("page-select");
    pageSelector.value = index;

    document.getElementById("page-view").src = "img/medium/page-" + index + ".jpg";
}

// moves to the next page
function nextPage() {
    var pageSelector = document.getElementById("page-select");
    if (pageSelector.value < MAX_PAGE) {
        pageSelector.value++;
        goToPage();
    }
}

// moves to the previous page
function previousPage() {
    var pageSelector = document.getElementById("page-select");
    if (pageSelector.value > MIN_PAGE) {
        pageSelector.value--;
        goToPage();
    }
}

// handles left/right arrow key presses
function checkKey() {
    var e = e || window.event;

    if (e.keyCode == '37') {
        previousPage();
    } else if (e.keyCode == '39') {
        nextPage();
    }
}


