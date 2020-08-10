// Var
var list;
var currentPizza;
var oldLocations = [];
var vegetarianTypes = [];

// Icons var
var iconsTrue = [];
var iconsFalse = [];
var icons = [];

// Selection Var
var isVegSelected = false;
var isVeganSelected = false;
var isLactoVegSelected = false;
var isOvoVegSelected = false;
var isRoSelected = false;
var isEnSelected = true;
var isMicSelected = false;

// Render List
function renderList(data) {
    list = data == null ? [] : (data instanceof Array ? data : [data]);
    //sort icons
    var srcDown = constDown;
    var srcUp = constUp;
    var src = $('#sortIcon').attr('src');

    $('#pizzaList li').remove();
    if (src === srcDown) {
        list.sort(GetSortOrderAscendent('name'));
    } else if (src === srcUp) {
        list.sort(GetSortOrderDescendent('name'));
    }

    var allFiltersOff = !isVegSelected && !isVeganSelected && !isLactoVegSelected && !isOvoVegSelected;

    for (var item in list) {
        if (list[item].name != null && list[item].name != '') {
            if (allFiltersOff || (list[item].isVegetarian && isVegSelected || list[item].isVegan && isVeganSelected || list[item].isLactoVegetarian && isLactoVegSelected || list[item].isOvoVegetarian && isOvoVegSelected)) {
                var listElement = '<li data-identity="' + list[item].id + '">' + list[item].name;

                if (list[item].isLactoVegetarian) {
                    listElement += '<img class="icon" src="'+ constLactoVeg +'" alt="Lacto-Veg">';
                }

                if (list[item].isVegetarian) {
                    listElement += '<img class="icon" src="'+ constVeg +'" alt="Vegetarian">';
                }

                if (list[item].isVegan) {
                    listElement += '<img class="icon" src="'+ constVegan +'" alt="Vegan">';
                }

                if (list[item].isOvoVegetarian) {
                    listElement += '<img class="icon" src="'+ constOvoVeg +'" alt="isOvoVegetarian">';
                }

                listElement += '</li>';
                $('#pizzaList').append(listElement);
            }
        }
    }
}

// Render Details
function renderDetails(pizza) {
    icons = setIcons(pizza);
    iconsTrue = icons[1];
    iconsFalse = icons[2];
    $('#pizzaId').val(pizza.id);
    $('#description').val(pizza.description);
    $('#name').val(pizza.name);
    $('#spiceLevel').val(pizza.spiceLevel);
    pizza.picPath ? setPicture(pizza.picPath) : hidePicture();
    addIcons(pizza);
    $('#listContainer').append(iconsTrue);
    $('#iconClass').append(iconsFalse);

    removeAllMarkers();
    for (var i = 0; i < currentPizza.locations.length; i++) {
        if (currentPizza.locations.length > 0) {
            addMarker(map, currentPizza.locations[i].latitude, currentPizza.locations[i].longitude, currentPizza.locations[i].googleId);
            oldLocations = {
                address: currentPizza.locations[i].address,
                googleId: currentPizza.locations[i].googleId,
                latitude: currentPizza.locations[i].latitude,
                longitude: currentPizza.locations[i].longitude,
                placeName: currentPizza.locations[i].placeName,
                placePhone: currentPizza.locations[i].placePhone,
                placeWebsite: currentPizza.locations[i].placeWebsite,
                placeRating: currentPizza.locations[i].placeRating,
                placeType: currentPizza.locations[i].placeType
            };
            newLocations.push(oldLocations);
        }
    }
}

// Sort asc function
function GetSortOrderAscendent(pizzaname) {
    return function (a, b) {
        if (a[pizzaname].toLowerCase() > b[pizzaname].toLowerCase()) {
            return 1;
        } else if (a[pizzaname].toLowerCase() < b[pizzaname].toLowerCase()) {
            return -1;
        }
        return 0;
    }
}

// Sort desc function
function GetSortOrderDescendent(pizzaname) {
    return function (a, b) {
        if (a[pizzaname].toLowerCase() < b[pizzaname].toLowerCase()) {
            return 1;
        } else if (a[pizzaname].toLowerCase() > b[pizzaname].toLowerCase()) {
            return -1;
        }
        return 0;
    }
}

// Search: Populate list
function populatePizzas(data) {
    removeLi();
    renderList(data);
}

// Remove list
function removeLi() {
    $("ul#pizzaList #li").remove();
}

// Set current pizza to render details
function setPizza(data){
    currentPizza = data;
    renderDetails(currentPizza);
    $("#btnDelete").show();
}

// Add keys in vegetarianTypes-array when an element from pizzaList have vegTypes
function addIcons(pizza) {
    vegetarianTypes = [];

    if(pizza.isVegetarian){
       vegetarianTypes.push({"column":"isVegetarian"});
    }

    if(pizza.isVegan){
       vegetarianTypes.push({"column":"isVegan"});
    }

    if(pizza.isLactoVegetarian){
       vegetarianTypes.push({"column":"isLactoVegetarian"});
    }

    if(pizza.isOvoVegetarian){
       vegetarianTypes.push({"column":"isOvoVegetarian"});
    }
}

//Get all 4 icons
function getAllIcons()
    {

         var listAllIcons = '';
             listAllIcons +='<li class="vegetarian"><img class="icons" src="'+ constVeg +'" alt="Vegetarian"></li>' +
             '<li class="vegan"><img class="icons" src="'+ constVegan +'" alt="Vegan"></li>' +
             '<li class="ovo-veg"><li class="ovo-veg"><img class="icons" src="'+ constOvoVeg +'" alt="isOvoVegetarian"></li>' +
             '<li class="lacto-veg"><li class="lacto-veg"><img class="icons" src="'+ constLactoVeg +'" alt="Lacto-Veg"></li>';
         return listAllIcons;
    }

// Set icons
function setIcons(pizza) {
    list = pizza == null ? [] : (pizza instanceof Array ? pizza : [pizza]);
    var listElementTrue = '';
    var listElementFalse = '';
    for(var item in list) {
        if(list[item].isVegetarian){
            listElementTrue += '<li class="vegetarian"><img class="icons" src="'+ constVeg +'" alt="Vegetarian"></li>'
        }else {
            listElementFalse += '<li class="vegetarian"><img class="icons" src="'+ constVeg +'" alt="Vegetarian"></li>'
        }

        if(list[item].isVegan){
            listElementTrue += '<li class="vegan"><img class="icons" src="'+ constVegan +'" alt="Vegan"></li>'
        }else {
            listElementFalse += '<li class="vegan"><img class="icons" src="'+ constVegan +'" alt="Vegan"></li>'
        }

        if(list[item].isOvoVegetarian){
            listElementTrue += '<li class="ovo-veg"><li class="ovo-veg"><img class="icons" src="'+ constOvoVeg +'" alt="isOvoVegetarian"></li>'
        }else {
            listElementFalse += '<li class="ovo-veg"><li class="ovo-veg"><img class="icons" src="'+ constOvoVeg +'" alt="isOvoVegetarian"></li>'
        }

        if(list[item].isLactoVegetarian){
            listElementTrue += '<li class="lacto-veg"><li class="lacto-veg"><img class="icons" src="'+ constLactoVeg +'" alt="Lacto-Veg"></li>'
        }else {
            listElementFalse += '<li class="lacto-veg"><li class="lacto-veg"><img class="icons" src="'+ constLactoVeg +'" alt="Lacto-Veg"></li>'
        }
    }

    list.push(listElementTrue);
    list.push(listElementFalse);

    return list;
}

// Set Picture
function setPicture(path) {
    $("#pic").attr("src", 'pics/' + path);
    $("#pic").show();
}

// Hide Picture
function hidePicture() {
    $("#pic").attr("src", '');
    $("#pic").hide();
}

// Update pizza success
function updatePizzaSuccess(data) {
    var modified = false;
    $(".elem_list li").each(function () {
        var id = $(this).attr('data-identity');
        if (id == data.id) {
            $(this).text(data.name);
            if(data.isVegetarian)
                $(this).append('<img class="icon" src="'+ constVeg +'" alt="Vegetarian" title="Vegetarian">');
            if(data.isVegan)
                $(this).append('<img class="icon" src="'+ constVegan +'" alt="Vegan" title="Vegan">');
            if(data.isOvoVegetarian)
                $(this).append('<img class="icon" src="'+ constOvoVeg +'" alt="isOvoVegetarian" title="Ovo Vegetarian">');
            if(data.isLactoVegetarian)
                $(this).append('<img class="icon" src="'+ constLactoVeg +'" alt="Lacto-Veg" title="Lacto Vegetarian">');
            modified = true;
        }
    });
    if (!modified) {
        $('.elem_list').append('<li data-identity="' + data.id + '">' + data.name + '</li>');
        loadPizzas();
    }
}

// Verify if the icon is selected
function verifyIcon(vegetarianTypes, icon) {
    for (var i = 0; i < vegetarianTypes.length; i++) {
        if (vegetarianTypes[i].column == icon) {
            return true
        }
    }
    return false;
}

// Delete pizza success
function deletePizzaSuccess(id){
    $(".elem_list li").each(function () {
        var iid = $(this).attr('data-identity');
        if (iid == id) {
            $(this).remove();
        }
    });
}

// Get Spice Levels Success
function getSpiceLevelsSuccess(data){
    $.each(data, function (i, obj) {
        var div_data = "<option value=" + obj + ">" + obj + "</option>";
        $(div_data).appendTo('#spiceLevel');
    });
}

// Capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Populate modal with place details
function populateModal(location) {
    var web;
    $("#placeTitle").remove();
    $("#placePhone").remove();
    $("#placeAddress").remove();
    $("#placeWebsite").remove();
    $("#placeRating").remove();
    $("#placeType").remove();
    $('hr').remove();
    var placeTitle = '<h2 id="placeTitle">' + location.placeName + '</h2>';
    var placePhone = '<a href="tel:' + location.placePhone + '" id="phone"><p id="placePhone"><i class="fas fa-phone"></i>\t&nbsp;' + location.placePhone + '</p></a>';
    var placeAddress = '<p id="placeAddress"><i class="fas fa-map-marker-alt"></i>\t&nbsp;' + location.address + '</p>';
    if(location.placeWebsite == null){
        web = "This place doesn't have a website!";
    } else {
        web = '<a target="_blank" href=" '+ location.placeWebsite + ' ">' + location.placeWebsite + '</a>';
    }
    var placeWebsite = '<p id="placeWebsite"><i class="fas fa-globe"></i>\t&nbsp;' + web + '</p>';
    var placeRating = '<p id="placeRating"><i class="fas fa-star-half-alt"></i>\t&nbsp;' + location.placeRating + ' / 5</p>';
    var placeType = '<p id="placeType"><i class="fas fa-utensils"></i>\t&nbsp;' + capitalizeFirstLetter(location.placeType) + '</p>';
    $("#ex1").append(placeTitle);
    $("#ex1").append('<hr>')
    $("#ex1").append(placePhone);
    $("#ex1").append(placeAddress);
    $("#ex1").append(placeWebsite);
    $("#ex1").append(placeRating);
    $("#ex1").append(placeType);
}


// Starting converting your voice into strings with Web Speech Api
function startConverting() {
    if('webkitSpeechRecognition' in window){
        var speechRecognizer = new webkitSpeechRecognition();
        speechRecognizer.lang = 'en-US';
        speechRecognizer.start();
        var finalTranscripts = '';

        speechRecognizer.onresult = function(event){
            for(var i = 0; i < event.results.length; i++){
                if(event.results[i].isFinal){
                    finalTranscripts = event.results[i][0].transcript;
                    verifyWords(speechRecognizer, finalTranscripts);
                }
            }
        };
        speechRecognizer.onerror = function (event) {
            alert('You have an error!');
        }
        setTimeout(function(){
            speechRecognizer.stop();
            $("#spi").css("display", "none");
            $('#Mic').attr('src', constMicOff);
        }, 5000);
    }else{
        alert('Your browser is not supported. If google chrome, please upgrade!');
    }
}

// Verify the words in the finalTranscripts
function verifyWords(speechRecognizer, finalTranscripts) {
    if(finalTranscripts.includes("sorting")) {
        var srcDown = constDown;
        var srcUp = constUp;
        var src = $('#sortIcon').attr('src');
        if (src === srcDown) {
            $('#sortIcon').attr('src', srcUp);
            loadPizzas();
        }
        else {
            $('#sortIcon').attr('src', srcDown);
            loadPizzas();
        }
    }else {
        $("#input").val(finalTranscripts);
        loadPizzas();
    }
    speechRecognizer.stop();
    $("#spi").css("display", "none");
    $('#Mic').attr('src', constMicOff);
}

$(document).ready(function () {
    //Download Excel files
    $("#btnExport").on("click", function () {
        downloadExcel();
    });

   // Starting Web sSpeech Api
   $('#Mic').on('click', function() {
        var src = $('#Mic').attr('src');
        if (src === constMicOff) {
            $('#Mic').attr('src', constMicOn)
            startConverting();
            $("#spi").css("display", "block");
        }
  });

   // set the locales
   var set_locale_to = function(locale) {
          if (locale) {
            $.i18n().locale = locale;
           }
          // translate all
          $('body').i18n();
          $("#input").attr("placeholder", $.i18n('placeholder'));
          $("#romanian").attr("title", $.i18n('roTitle'));
          $("#english").attr("title", $.i18n('enTitle'));
          $("#errExistName").text($.i18n('errExistName'));
          $("#errVidName").text($.i18n('errVidName'));
          $("#pressCall").attr("title",  $.i18n('pressCall'));
        };

    // load translation files
    $.i18n().load( {
            'en': 'js/i18n/en.json',
            'ro': 'js/i18n/ro.json'
           } ).done(function() {
                set_locale_to(url('?locale'));

                 History.Adapter.bind(window, 'statechange', function(){
                      set_locale_to(url('?locale'));
                    });

                 $('.languages').on('click', 'img', function() {
                      History.pushState(null, null, "?locale=" + $(this).data('locale'));
                    });
                  });


    // Retrieve pizza list when application starts
    findAll();

    // Retrieve spice levels
    getSpiceLevels();

    // Load map
    loadMap();

    // Hide delete button
    $("#btnDelete").hide();

    // Hide picture component
    $("#pic").hide();

    // Search for a pizza
    $("#search").click(function () {
        loadPizzas();
    });

    // Search for pizza when you press Enter
    $("#input").keyup(function (e) {
        if (e.keyCode === 13) {
            loadPizzas();
        }
    });


    $("#file").change(function (e) {
        var fileName = e.target.files[0].name;
        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
            var file = e.originalEvent.srcElement.files[i];

            var reader = new FileReader();
            reader.onloadend = function () {
                setPicture(fileName);
            };
            reader.readAsDataURL(file);
        }
    });

    $("#pizzaList").on("click", "li", function (e) {
        findById($(this).data("identity"));
        newLocations.length = 0;
        $("ul#iconClass li").remove();
        $("ul#listContainer li").remove();
        $("ul#iconClass li").css("display", "none");
        $("ul#listContainer li").css("display", "none");
        $("li").removeClass('highlightSelectedItem');
        $(this).addClass('highlightSelectedItem');
        hideLocation();
    });

    $("#en").prop('checked', true);

    // Drag and drop vegetarian types
    $(function () {
        $("#iconClass").sortable({
            connectWith: ".connectedSortable2",
            remove: function (event, ui) {
                var node = checkIcon(ui);
                vegetarianTypes.push(node);
            }
        }).disableSelection();

        $("#listContainer").sortable({
            connectWith: ".connectedSortable1",
            remove: function (event, ui) {
                var node = checkIcon(ui);
                for (var i = 0; i < vegetarianTypes.length; i++) {
                    if (vegetarianTypes[i].column == node.column) {
                        vegetarianTypes.splice(i, 1);
                    }
                }
            }
        }).disableSelection();
    });

    // check the class of the icon
    function checkIcon(ui) {
        var node = {};
        if (ui.item.hasClass("vegetarian")) {
            node.column = "isVegetarian";
        } else if (ui.item.hasClass("lacto-veg")) {
            node.column = "isLactoVegetarian";
        } else if (ui.item.hasClass("vegan")) {
            node.column = "isVegan";
        } else if (ui.item.hasClass("ovo-veg")) {
            node.column = "isOvoVegetarian";
        }
        return node;
    }

    // When add pizza button is clicked form resets and delete button hides
    $('#addPizzaButton').on('click', function (e) {
        $("#listContainer li").remove();
        $("ul#iconClass").empty();
        $("ul#iconClass").append('<li class="vegetarian"><img class="icons" src="'+ constVeg+'" alt="Vegetarian"></li>');
        $("ul#iconClass").append('<li class="vegan"><img class="icons" src="'+ constVegan +'" alt="Vegan"></li>');
        $("ul#iconClass").append('<li class="ovo-veg"><img class="icons" src="'+ constOvoVeg +'" alt="isOvoVegetarian"></li>');
        $("ul#iconClass").append('<li class="lacto-veg"><img class="icons" src="'+ constLactoVeg +'" alt="Lacto-Veg"></li>');
        hidePicture();
        $("#pizzaForm").trigger("reset");
        e.preventDefault();
        e.stopPropagation();
        $("#btnDelete").hide();
        currentPizza = {};
        $("li").removeClass('highlightSelectedItem');
        hideLocation();
        removeAllMarkers();
        $(".errorName").remove();
    });

    function verifName(newPizzaName){
        var isNewName = true;
        $(".elem_list li").each(function () {
            var name = $(this).text();
            if(newPizzaName == name){
                $('#name').before('<span class="errorName" id="errExistName" data-i18n="errExistName">This pizza name already exist</span>');
                isNewName = false;
                return false;
            }
        });
        return isNewName;
    }

    // Update pizza when save button is clicked
    $('#btnSave').on('click', function (e) {
        var newPizzaName = $('#name').val();
        var isValidName = true;
        e.preventDefault();
        e.stopPropagation();

        $(".errorName").remove();
        if(newPizzaName != ""){
            if($('#btnDelete').is(":hidden")){
                isValidName = verifName(newPizzaName);
            }
            else{
                if(newPizzaName != currentPizza.name){
                    isValidName = verifName(newPizzaName);
                }
            }
        }
        else{
            $('#name').before('<span class="errorName" id="errVidName" data-i18n="errVidName">This field is required</span>');
            isValidName = false;
        }
        if (isValidName) {
            saveOrUpdatePizza(currentPizza ? currentPizza.id : null);
            updatePizzaLocationsList();
        }
        hideLocation();
    });

    $('#btnDelete').on('click', function (e) {
        var id = currentPizza.id;
        var confirmText = $.i18n('confirmText');
        console.log(confirmText);
        if (confirm(confirmText)) {
            $.ajax({
                type: 'DELETE',
                url: rootURL + '/pizza-delete/' + id,
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                $(".elem_list li").each(function () {
                    var iid = $(this).attr('data-identity');
                    if (iid == id) {
                        $(this).remove();
                    }
                });
                }

            });
            $("#pizzaForm").trigger("reset");
            $("#show_hide_location").trigger("reset");
            e.preventDefault();
        }
    });

    // Verify if the icon is selected
    function verifyIcon(vegetarianTypes, icon) {
        for (var i = 0; i < vegetarianTypes.length; i++) {
            if (vegetarianTypes[i].column == icon) {
                return true
            }
        }
        return false;
    }

    function getSpiceLevels() {
        $.ajax({
            type: "GET",
            url: rootURL + '/allSpice/',
            dataType: "json",
            success: function (data) {
                $.each(data, function (i, obj) {
                    var div_data = "<option value=" + obj + ">" + obj + "</option>";
                    $(div_data).appendTo('#spiceLevel');
                });
            }
        });


    }

    // Change arrow icons alternatively on click and sort the list
    $('#sortIcon').on('click', () => {
        var srcDown = constDown;
        var srcUp = constUp;
        var src = $('#sortIcon').attr('src');
        if (src === srcDown) {
            $('#sortIcon').attr('src', srcUp);
            loadPizzas();
        }
        else {
            $('#sortIcon').attr('src', srcDown);
            loadPizzas();
        }
    });
    //Change icons style alternatively on click and sort list
    $('#isLactoVeg').on('click', () => {
        isLactoVegSelected = $('#isLactoVeg').is(":checked");

      var iconState = isLactoVegSelected ? constLactoVegSel : constLactoVeg;
      $('#lactoVeg').attr('src', iconState);

        renderList(list);
    });

    $('#isVegan').on('click', () => {
        isVeganSelected = $('#isVegan').is(":checked");

        var iconState = isVeganSelected ? constVeganSel : constVegan;
        $('#vegan').attr('src', iconState);

        renderList(list);
    });

    $('#isVeg').on('click', () => {
        isVegSelected = $('#isVeg').is(":checked");

        var iconState = isVegSelected ? constVegSel : constVeg;
         $('#veget').attr('src', iconState);

        renderList(list);
    });

    $('#isOvoVeg').on('click', () => {
        isOvoVegSelected = $('#isOvoVeg').is(":checked");

        var iconState = isOvoVegSelected ? constOvoVegSel : constOvoVeg;
        $('#ovoVeg').attr('src', iconState);

        renderList(list);
    });

   $("input:checkbox").click(function(){
       $("input:checkbox").not(this).attr("checked",false);
       $(this).attr("checked",true);
       if(this.id == "ro")
       {
              isRoSelected = true;
              isEnSelected = false;
              var flagState =  'assets/icons/ro-flag-selected.png';
              var flagState1 =  'assets/icons/en-flag.png';
              $('#romanian').attr('src', flagState);
              $('#english').attr('src', flagState1);
              console.log(this);
       }
       if(this.id == "en"){
              isRoSelected = false;
              isEnSelected = true;
              var flagState =  'assets/icons/en-flag-selected.png';
              var flagState1 =  'assets/icons/ro-flag.png';
              $('#english').attr('src', flagState);
              $('#romanian').attr('src', flagState1);
              console.log(this); }
})


    // Form: Location list
    $('#show_hide_location').on('click', () => {
     var srcDown = constDown;
     var srcUp = constUp;
     var src = $('#showLocations').attr('src');
     if (src === srcDown) {
        $('#showLocations').attr('src', srcUp);
        $('#show_hide').text($.i18n('show_hideH'));
        $('#listLocations').show();
        showPizzaLocations(currentPizza.locations);
     }
     else {
        hideLocation();
     }
    });

    // Form: Hide Locations
    function hideLocation() {
    var srcDown = constDown;
    $('#showLocations').attr('src', srcDown);
    $('#show_hide').text($.i18n('showLocationsLabel'));
    $('#listLocations li').hide();
    }

    function verifyOpenPlace(latlng, placeId, index){
        var service = new google.maps.places.PlacesService(map.map);
        var geocoder = new google.maps.Geocoder();
        //var open = true;
        var deferred = $.Deferred(),
        geocoder = new google.maps.Geocoder();

        geocoder.geocode({'location': latlng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        service.getDetails({
                            placeId: placeId
                        }, function (place, status) {
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                deferred.resolve(place.opening_hours.open_now, index);
                            } else {
                                 deferred.reject(status);
                            }
                            }
                        )
                    }});
        return deferred.promise();
    }

    // Form: Show Locations
    function showPizzaLocations(locations) {
     $('#listLocations li').remove();

     var latlng, placeId;

     for (var index = 0; index < locations.length; index++) {
        latlng = {lat: parseFloat(locations[index].latitude), lng: parseFloat(locations[index].longitude)};
        placeId = locations[index].googleId;
        var open;
        verifyOpenPlace(latlng, placeId, index).then(function(open, index){
            if(open){
                if(locations[index].phonePlace != null && locations[index].phonePlace != ""){
                    var listLi = '<a href="#ex1" rel="modal:open" class="locs" data-identity="' + locations[index].id + '"><li data-identity="' + locations[index].id + '"><img src="assets/icons/store-open-512.png">' + locations[index].placeName + '<br><i class="fa fa-phone"></i><a href="skype:' + locations[index].phonePlace + '?call" id="pressCall">' + " " +locations[index].phonePlace + '</a></li></a>';
                }else {
                  var listLi = '<a href="#ex1" rel="modal:open" class="locs" data-identity="' + locations[index].id + '"><li data-identity="' + locations[index].id + '"><img src="assets/icons/store-open-512.png">' + locations[index].placeName + '</li></a>';
                }
            }else if(locations[index].phonePlace != null && locations[index].phonePlace != ""){
                       var listLi = '<a href="#ex1" rel="modal:open" class="locs" data-identity="' + locations[index].id + '"><li data-identity="' + locations[index].id + '"><img src="assets/icons/store-closed-512.png">' + locations[index].placeName + '<br><i class="fa fa-phone"></i><a href="skype:' + locations[index].phonePlace + '?call" id="pressCall">' + " " +locations[index].phonePlace + '</a></li></a>';
                  }else {
                    var listLi = '<a href="#ex1" rel="modal:open" class="locs" data-identity="' + locations[index].id + '"><li data-identity="' + locations[index].id + '"><img src="assets/icons/store-closed-512.png">' + locations[index].placeName + '</li></a>';
                  }
            $('#listLocations').append(listLi);
        }, function(err){
            console.error("Nu ii bine", err);
        });
     }
    }

    // Form: Update Location List
    function updatePizzaLocationsList() {
        $('#listLocations li').remove();
        for (var item in newLocations) {
            var listLi = '<a href="#ex1" rel="modal:open" class="locs"><li data-identity="' + newLocations[item].id + '">' + newLocations[item].placeName + '</li></a>';
            $('#listLocations').append(listLi);
        }
    }

    // Form: Center selected location on map
    $("#listLocations").on("click", "li", function (e) {
        centeredLoc($(this).data("identity"), currentPizza.locations);
        findLocationById($(this).data("identity"));
    });
});


