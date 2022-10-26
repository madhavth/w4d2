$(() => {
    const forms = $(".formAddProduct");
    const noOfItems = $('#no_of_items');

    const failedToAdd = () => {
        alert('something went wrong while trying to add data');
    };

    $("button.addToCart").click(function () {
        const name = $(this).siblings('[name=name]').val();
        const price = $(this).siblings('[name=price]').val();

        $.post(
            "/addToCart",
            {
                name, price
            },
        )
            .done((data) => {
                noOfItems.text(data.num_of_items);
            })
            .fail(failedToAdd);

        // console.log($(event.target).siblings('[name=name]').val());
        // console.log($(event.target).parent().find('[name=name]').val());
    });

    // forms.submit((event) => {

    //     // const name = $(this).find('[name="name"]');
    // $.post(
    //     "/addToCart",
    //     {
    //         name: "Apple",
    //     },
    // )
    // .done(addedToCart)
    // .fail(failedToAdd)

    //     return false;
    // })

});