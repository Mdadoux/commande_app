$(document).ready(function () {
	var $quantity = $('.qty');
	//$btnAnnulCommand.hide();
	check_is_commade();
	get_items_prices();

	// Afficher les différents igredien 
	liste_food_items();
	show_user_menu();
	$("#liste-ingred li").on('click', function () {
		var choosedItem = $(this).attr('class');
		select_item(choosedItem);
		get_items_prices();
		update_total_price();

	});
	//récuperer l'éllément à supprimer 
	$(document).on('click', '#user_menu li .supp', function () {
		var itemToSuppr = $(this).parent().find('.item-content').text();
		//console.log(itemToSuppr);
		remove_item_from_menu(itemToSuppr);
		get_items_prices();
		update_total_price();
	});

	//annuler une commande 
	$(document).on('click', '#annuler-com', function () {
		if (confirm('voulez vraiment anuler la commande ?')) {
			cancel_commande();
			setTimeout(window.location.reload(), 100);
		}
	})

	$quantity.on('change', function () {
		get_items_prices();

		if ($(this).val() <= 0) {
			console.log($(this).val());
			$(this).value = 0;
		}
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
	get_number_occurance();
	show_user_menu();
	check_is_commade();

}
/**
 * 
 * @param {le nom de l'element à supprimer } item 
 */
//suprimer un élement du menu 
/*
function remove_item_from_menu(item) {
	// var foo = ['a', 'b', 'c'];
	foo = get_number_occurance();
	console.log(foo);

	for (let index = 0; index < foo.length; index++) {
		const element = foo[index];
		console.log(element);

	}

	let index = 0;
	for (let i in foo) {
		if (foo[i].nom === item) {
			var lala = foo[i].nom;
			var toto = Object.keys(foo);
			console.log(foo.indexOf(toto['co-cacola']));

			index++;
			//localStorage.setItem('userMenu', JSON.stringify(userMenu));
		}
		show_user_menu();
		check_is_commade();
		update_total_price();
	}
	
	
}
*/


function remove_item_from_menu() {
	var $listeMenu = $("#user_menu li");
	$listeMenu.each(function (index) {
		const quant = $(this).find('.qty').val();

		if (quant >= 2) {
			console.log(quant);
			$(this).find('.qty').val(quant - 1);

		} else {
			$(this).remove();
		}

	})

	console.log($listeMenu);


}

//listeer les composants menu 
function liste_food_items() {
	for (var i = 0; i < foodItems.length; i++) {
		var item = foodItems[i];
		var $listeIngred = $('#liste-ingred');
		$listeIngred.append(`
		<li class="${item.nom}">
			<div class="item-img-wrapp">
				<img src="${item.image}" class="img-responsive">
			</div>
			<p class="item-title">${item.nom}</p>
			<div class="item-price"><span>${item.price}</span>€</div>
			<button>Choisir</button>		
		</li>
		`);
	}
}

/*
function select_item(item) {
	for (let i = 0; i < foodItems.length; i++) {
		if (foodItems[i].nom === item) {
			currentItem = foodItems[i];
			add_items_to_menu(currentItem);

		}

	}
}
*/
//afficher le menu si au moioins un item
/*
function show_user_menu() {
	var $listeMenu = $("#user_menu");
	var shopping_cart = get_number_occurance();
	var prop = JSON.parse(localStorage.getItem('userMenu'));
	//var prop = Object.values(shopping_cart);
	update_total_price();
	console.log(prop);
	if (prop.length > 0) {
		$listeMenu.show();
		$listeMenu.empty();
		for (var i in prop) {
			const element = prop[i];
			$listeMenu.append('<li id="' + element.nom + '" class="user_menu-item">\n\
			<img src="'+ element.image + '"><div class="item-content">' + element.nom + '</div>\n\
			<div class="item-price">\n\
				<span class="price">'+ element.price + '</span>\n\
				<span> €</span></div>\n\
			<label>quantité :</label><input type="number" class="qty" min="0" value="' + element.quantity + '">\n\
			<div class="priceWrapper"><span class="rowPrice"></span> €</div>\n\
			<button class="supp">x</button></li>');
		}
	} else {
		$listeMenu.empty();

	}



}
*/

function cancel_commande() {
	localStorage.removeItem('userMenu');
}



function get_number_occurance() {
	let donnes = JSON.parse(localStorage.getItem('userMenu'));

	// var datas = [];
	//console.log(liste_of_item);
	var datas = {};
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
	//console.log(datas);

	return datas;

	//console.log(occurances);

}

function get_items_prices() {
	var $listes = $('#user_menu li')
	$listes.each(function (index) {
		//	console.log($(this).find('.item-price .price').text());
		var rowPrice = $(this).find('.item-price .price').text();
		var rowQuantity = $(this).find('.qty').val();
		var rowTotalPrice = parseFloat(rowPrice) * parseFloat(rowQuantity);
		$(this).find('.rowPrice').text(rowTotalPrice);
		//console.log(rowTotalPrice);
	})

}

function update_total_price() {
	var $totale_price = $('#total_price');
	var total_price_value = 0;
	$totale_price.text();
	var $prices = $('#user_menu li');

	for (let index = 0; index < $prices.length; index++) {
		const element = $prices[index];
		var line_price = $(element).find('.rowPrice').text();
		total_price_value += parseFloat(line_price);
	}

	$totale_price.text(total_price_value);
}

