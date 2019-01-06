var foodItems =

	[
		{
			nom: "steak",
			type: "viande",
			price: 2.5,
			image: "https://d301r8r2i6eqlt.cloudfront.net/wp-content/uploads/2017/04/beef.png"
		},
		{
			nom: "cheese burger",
			type: "burger",
			price: 4,
			image: "https://www.dairyqueen.com/Global/Food/Burger_Original-Cheeseburger_470x500.jpg"
		},
		{
			nom: "co-cacola",
			type: "boisson",
			price: 1.3,
			image: "https://www.latestfreestuff.co.uk/wp-content/uploads/2018/01/free-mcdonalds-coca-cola-drink-e1515750985951.png"
		},
		{
			nom: "frites",
			type: "accompagnement",
			price: 2,
			image: "http://www.mcdonalds.ma/sites/default/files/frites_mcdonalds.jpg"
		},
		{
			nom: "nuggets",
			type: "viande",
			price: 3,
			image: "https://www.freeiconspng.com/uploads/mine-food-png-transparent-28.png"
		},
		{
			nom: "double cheese",
			type: "burger",
			price: 4.5,
			image: "http://www.fastandfood.fr/wp-content/uploads/2016/05/Double-Cheeseburger-McDoNALDS.png"
		},
		{
			nom: "potatoes",
			type: "accompagnement",
			price: 2,
			image: "http://pilipizza.com/91-large_atch/potatoes-tapas-restaurant-aigues-mortes.jpg"
		},
		{
			nom: "winggs",
			type: "viande",
			price: 4,
			image: "https://m.mcdonalds.be/_webdata/produits/03_chickenwings_1.png"
		}

	]



if (localStorage.getItem('userMenu') === null) {
	var userMenu = [];
	localStorage.setItem('userMenu', JSON.stringify(userMenu));

} else {
	var userMenu = JSON.parse(localStorage.getItem('userMenu'));

}
