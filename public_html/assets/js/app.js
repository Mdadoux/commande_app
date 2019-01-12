var userOrder = {};
if (localStorage.getItem('userCart') === null) {
	var userCart = [];
	localStorage.setItem('userCart', JSON.stringify(userCart));
} else {
	var userCart = JSON.parse(localStorage.getItem('userCart'));
	show_alert();
}

$(document).ready(function () {
	console.log(userCart.length);

	//$btnAnnulCommand.hide();
	check_is_commade();
	// Afficher les différents igredien 
	liste_food_items();
	//show_liste-cart();
	$("#liste-ingred li").on('click', function (evt) {
		//	console.log(evt.target);
		var choosedItem = $(this);
		var itemTitle = choosedItem.find('.item-title').text();
		var itemPrice = choosedItem.find('.item-price span').text();
		var itemImage = choosedItem.find('.item-img-wrapp img').attr('src');
		add_item_to_cart(itemTitle, itemPrice, itemImage);
		check_is_commade();
		update_total_price();
		get_number_cart_product();

	});


	//récuperer l'éllément à supprimer 
	$(document).on('click', '#liste-cart li .delete-item', function () {
		$(this).parent().remove();
		update_total_price();
		get_number_cart_product();
		check_is_commade();
	});

	//diminuer la quatité 
	$(document).on('click', '.less-btn', function (evt) {
		var quantity = $(this).parent().find('.item-quantity').text();
		quantity--;
		if (isNaN(quantity) || quantity <= 0) {
			$(this).parent().find('.item-quantity').text(1);
		} else {
			$(this).parent().find('.item-quantity').text(quantity);
		}
		//	update_quantity();		
		update_total_price();

	});

	//ajouter plus de quantité 
	$(document).on('click', '.more-btn', function (evt) {
		var quantity = $(this).parent().find('.item-quantity').text();
		quantity++;
		if (isNaN(quantity)) {
			$(this).parent().find('.item-quantity').text(1);
		} else {
			$(this).parent().find('.item-quantity').text(quantity);
		}
		update_total_price();
	});

	//annuler une commande 
	$(document).on('click', '#cart-infos .cancel-commande', function () {
		if (confirm('voulez vraiment anuler la commande ?')) {
			cancel_commande();
			setTimeout(window.location.reload(), 100);
		}
	});

	//confirmer la commande 
	$(document).on('click', '#cart-infos .confirm-commande', function () {
		if (confirm('voulez vraiment votre commande ?')) {
			cancel_commande();
			setTimeout(got_to_commande_liste(), 100);
		}
	})



});


function show_alert() {
	confirm("nous avons trouvé une commande en ttente")
}
function add_item_to_cart(itemTitle, itemPrice, itemImage) {
	var $listeMenu = $('#liste-cart');
	var quantityDefault = 1;
	var $cartItems = $($listeMenu).find('li');
	for (let i = 0; i < $cartItems.length; i++) {
		const element = $cartItems[i];
		if ($(element).find('.item-content').text() === itemTitle) {
			alert("Cet élément est déjà dans votre commande !")
			return;
		}

	}
	$listeMenu.append(`<li class="cartItem">
	<figure><img src="${itemImage}" class="img-responsive"></figure>
	<div class="item-content">${itemTitle}</div>
	<button class="less-btn">-</button><span class="item-quantity">${quantityDefault}</span><button class="more-btn">+</button>
	<div class="item-price"><span class="price">${itemPrice}</span><span> €</span></div>
	<button class="delete-item">x</button>
	</li>`);

}


function check_is_commade() {
	var $cart_wrapp = $('#cart-infos');
	if ($('#liste-cart li').length > 0) {
		$cart_wrapp.show();
	} else {
		$cart_wrapp.hide();
	}
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

/* liste le nombre de produits commendé */
function get_number_cart_product() {
	var totalItem = $('#liste-cart li').length;
	$('#number-item-incart').text(totalItem);
}

function confirm_order() {
	var totalItem = $('#liste-cart li');
	totalItem.each(function (index) {
		var itemName = $(this).find('.item-content').text();
		itemName = {};
		itemName.nom = $(this).find('.item-content').text();
		itemName.price = $(this).find('.item-price').text();
		itemName.image = $(this).find('img').attr('src');
		itemName.quantity = $(this).find('.item-quantity').text();
		userCart.push(itemName);
	});
	var userName = prompt("entrez votre nom pour confirmer votre commande !");
	var userEmail = prompt("Votre adresse emmail !");
	userOrder["commanditaire"] = {};
	userOrder.commanditaire.nom = userName;
	userOrder.commanditaire.email = userEmail;
	userCart.push(userOrder);
	localStorage.setItem('userCart', JSON.stringify(userCart));




}
//afficher le menu si au moioins un item
/*
function show_liste-cart() {
	var $listeMenu = $("#liste-cart");
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
			$listeMenu.append('<li id="' + element.nom + '" class="liste-cart-item">\n\
			<img src="'+ element.image + '"><div class="item-content">' + element.nom + '</div>\n\
			<div class="item-price">\n\
				<span class="price">'+ element.price + '</span>\n\
				<span> €</span></div>\n\
			<label>quantité :</label><input type="number" class="item-quantity" min="0" value="' + element.quantity + '">\n\
			<div class="priceWrapper"><span class="rowPrice"></span> €</div>\n\
			<button class="supp">x</button></li>');
		}
	} else {
		$listeMenu.empty();

	}



}
*/

function cancel_commande() {
	localStorage.removeItem('userCart');
}



function update_total_price() {
	var $totale_price = $('#total_price');
	var total_price_value = 0;
	$totale_price.text();
	var $prices = $('#liste-cart li');
	for (let index = 0; index < $prices.length; index++) {
		const element = $prices[index];
		var line_price = $(element).find('.item-price').text();
		var line_quantity = $(element).find('.item-quantity').text();
		total_price_value = total_price_value + (parseFloat(line_price) * (line_quantity));
	}

	$totale_price.text(total_price_value.toFixed(2));
}

