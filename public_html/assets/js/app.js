$(document).ready(function () {

	//$btnAnnulCommand.hide();
	check_is_commade();

	//console.log(userMenu);
	liste_food_items();
	show_user_menu();
	$("#liste-ingred li").on('click', function () {
		var aliment = $(this).attr('class');
		select_item(aliment);

	});
	//récuperer l'éllément à supprimer 
	$(document).on('click', '#user_menu li .supp', function () {
		var itemToSuppr = $(this).parent().find('.item-content').text();
		//console.log(itemToSuppr);
		remove_item_from_menu(itemToSuppr);
	})




});

function check_is_commade() {
	var $btnAnnulCommand = $('#annuler-com');
	if ($('#user_menu li').length > 0) {
		$btnAnnulCommand.show();
	} else {
		$btnAnnulCommand.hide();
	}
}

// ajouter un composant dans le menu 
function add_items_to_menu(item) {
	userMenu.push(item);
	localStorage.setItem('userMenu', JSON.stringify(userMenu));
	show_user_menu();
	check_is_commade();

}
/**
 * 
 * @param {le nom de l'element à supprimer } item 
 */
//suprimer un élement du menu 
function remove_item_from_menu(item) {
	for (let i = 0; i < userMenu.length; i++) {
		if (userMenu[i].nom == item) {
			userMenu.splice(userMenu[i], 1);
			localStorage.setItem('userMenu', JSON.stringify(userMenu));
		}
		show_user_menu();
		check_is_commade();
	}


}

//listeer les composants menu 
function liste_food_items() {
	for (var i = 0; i < foodItems.length; i++) {
		var children = foodItems[i];
		var $listeIngred = $('#liste-ingred');
		$listeIngred.append('<li class="' + children.nom + '">' + children.nom + '<div>' + children.price + '</div></li>');
	}
}

function select_item(item) {
	for (let i = 0; i < foodItems.length; i++) {
		if (foodItems[i].nom === item) {
			currentItem = foodItems[i];
			add_items_to_menu(currentItem);

		}

	}
}

//afficher le menu si au moioins un item

function show_user_menu() {
	var $listeMenu = $("#user_menu");

	var shopping_cart = get_number_occurance();
	//var propName = JSON.parse(localStorage.getItem('000'));
	var prop = Object.values(shopping_cart);
	//console.log(prop);

	if (userMenu.length > 0) {
		$listeMenu.show();

		$listeMenu.empty();
		for (var i in prop) {
			const element = prop[i];
			$listeMenu.append('<li id="' + element.nom + '" class="user_menu-item">\n\
			<img src="'+ element.image + '"><div class="item-content">' + element.nom + '</div>\n\
			<div class="item-price">'+ element.price + '<span> €</span></div>\n\
			<label>quantité :</label><input type="number" class="qty" value="' + element.quantity + '">\n\
			<button class="supp">x</button></li>');
		}
	} else {
		$listeMenu.empty();

	}



}


function cancel_commande() {
	localStorage.removeItem('userMenu');
}



function get_number_occurance() {
	let donnes = JSON.parse(localStorage.getItem('userMenu'));
	var cart = {};
	var datas = [];
	//console.log(liste_of_item);
	var occurances = {};
	var counter = 1;
	for (let i = 0; i < donnes.length; i++) {
		var element = donnes[i];

		if (datas[element.nom] === undefined) {
			datas[element.nom] = element;
			datas[element.nom]['quantity'] = counter;
		} else {
			datas[element.nom]['quantity']++;
		}

		//liste_of_item.push(datas[element.nom]);
	}
	return datas;

	//console.log(occurances);

}

function get_items_prices() {
	var listes = get_number_occurance();
	for (let i = 0; i < userMenu.length; i++) {
		var theprice = userMenu[i];
	}
	for (const key in listes) {
		var tot = key;
		var noob =
			console.log(tot);


	}

}