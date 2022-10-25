$(() => {

    const input8Ball = $("#input-ask");
    const submit = $("#submit");
    
    const fetchedOutput = (data) => {
        input8Ball.val(data.my_response);
        input8Ball.select();
        };

        const somethingWentWrong = (data) => {
        input8Ball.val('something went wrong ' + data.response);    
    };

    $("#add").submit(() => {
        $.get('/8ball')
        .done(fetchedOutput)
        .fail(somethingWentWrong);

        return false;
    });
});