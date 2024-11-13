$(function () {
    // Smooth scrolling for internal links in navbar and footer
    $(".navbar a, footer a").on("click", function (event) {
        event.preventDefault();
        var hash = this.hash;

        if (hash) {
            $("html, body").animate(
                { scrollTop: $(hash).offset().top },
                500 // Durée de l'animation en millisecondes
            );
        }
    });

    // Form submission handling
    $("#contact-form").submit(function (e) {
        e.preventDefault();
        $(".comments").empty();
        var postdata = $("#contact-form").serialize();

        $.ajax({
            type: "POST",
            url: "php/contact.php", // Assurez-vous que l'URL du script PHP est correcte
            data: postdata,
            dataType: "json",
            success: function (result) {
                if (result.isSuccess) {
                    $("#contact-form").append(
                        "<p class='thank-you'>Votre message a bien été envoyé. Merci de m'avoir contacté :)</p>"
                    );
                    $("#contact-form")[0].reset();
                } else {
                    $("#firstname + .comments").html(result.firstnameError);
                    $("#name + .comments").html(result.nameError);
                    $("#email + .comments").html(result.emailError);
                    $("#phone + .comments").html(result.phoneError);
                    $("#message + .comments").html(result.messageError);
                }
            },
        });
    });
});
