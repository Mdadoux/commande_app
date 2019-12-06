$(document).ready(function () {
    manage_products_from_the_dom();


    $(document).on('click', '.filter-item', function () {
        var category = $(this).find("span").text().toLowerCase();
        var $listeIngred = $('#liste-products');
        $listeIngred.empty();
        if (category === "tout") {
            liste_food_items();

        } else {
            show_products_by_category(category);
        }

    });

    $("#open-close").on('click', function () {
        $('body').toggleClass('opened');
    })


});


function manage_products_from_the_dom() {
    var productitem = $(".products-item");
    var numberProdcut = productitem.length;
    var numberItemToShow = 3;
    if (numberProdcut > numberItemToShow) {
        //affciher les qu'un certain nombre d'item
        productitem.slice(0, numberItemToShow).show();
        $(".products-item").slice(4, numberProdcut).addClass('hidden-product');
        // ajouter plus d'élément 
        $('#show-more-item').on('click', function () {
            $(".hidden-product").slice(0, 2).removeClass('hidden-product').fadeIn();

            if ($(".hidden-product").length === 0) {
                $('#show-more-item').fadeOut()

            }
            $('html,body').animate({
                scrollTop: $(this).offset().top
            }, 1600)

        });

    }


    //click sur le menu 
}