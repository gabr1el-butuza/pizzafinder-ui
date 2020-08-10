// Find all
function findAll() {
    $.ajax({
        type: 'GET',
        url: rootURL + '/pizzas',
        dataType: "json",// data type of response
        contentType: 'application/json',
        success: renderList
    });
}

// Search: Load Pizzas
function loadPizzas() {
    var name = $("#input").val();

    if (name == "") {
        findAll();
    } else {
        $.ajax({
            type: 'GET',
            url: rootURL + '/pizza/search/' + name,
            dataType: "json",
            contentType: 'application/json',
            success: function (data) {
                populatePizzas(data);
            }
        });
    }
}

// Find Pizza By ID
function findById(id) {
    $.ajax({
        type: 'GET',
        url: rootURL + '/pizza/' + id,
        dataType: "json",
        contentType: 'application/json',

        success: function (data) {
            setPizza(data);
        }
    });
}

// Update/Save pizza function
function saveOrUpdatePizza(id) {
    $.ajax({
        type: id ? 'PUT' : 'POST',
        url: id ? rootURL + '/pizza/' + id : rootURL + '/pizza/',
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify({
            'id': id ? id : null,
            'name': $('#name').val(),
            'description': $('#description').val(),
            'spiceLevel': $('#spiceLevel option:selected').text(),
            'picPath': $('#file')[0].files[0] ? $('#file')[0].files[0].name : null,
            'locations': newLocations,
            'isVegetarian': verifyIcon(vegetarianTypes, 'isVegetarian'),
            'isVegan': verifyIcon(vegetarianTypes, 'isVegan'),
            'isLactoVegetarian': verifyIcon(vegetarianTypes, 'isLactoVegetarian'),
            'isOvoVegetarian': verifyIcon(vegetarianTypes, 'isOvoVegetarian')
        }),
        success: function (data) {
            updatePizzaSuccess(data);
        },
        error: () => {
            alert("Error in Operation");
        }
    });
}

// Delete pizza
$('#btnDelete').on('click', function (e) {
    var id = currentPizza.id;
    if (confirm("Are you sure you want to delete this pizza?")) {
        $.ajax({
            type: 'DELETE',
            url: rootURL + '/pizza-delete/' + id,
            dataType: "json",
            contentType: 'application/json',
            success: () => {
                deletePizzaSuccess(id)
            }

        });
        $("#pizzaForm").trigger("reset");
        $("#show_hide_location").trigger("reset");
        e.preventDefault();
    }
});

// Get Spice levels
function getSpiceLevels() {
    $.ajax({
        type: "GET",
        url: rootURL + '/allSpice/',
        dataType: "json",
        success: function (data) {
            getSpiceLevelsSuccess(data);
        }
    });
}

// Download Excel files
function downloadExcel() {
    $.ajax({
        type: "GET",
        url: rootURL + '/download',
        xhrFields: {
            responseType: "blob",
        },
        success: function (data) {
         var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = 'PizzaData.xls';
            a.click();
            window.URL.revokeObjectURL(url);
        },
        error: function(error){
             alert("error");
        }
    });
}

// Find Location By ID
function findLocationById(id) {
    $.ajax({
        type: 'GET',
        url: rootURL + '/location/' + id,
        dataType: "json",
        contentType: 'application/json',

        success: function (location) {
            populateModal(location);
        }
    });
}

