$(document).ready(function(){
    var user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        $("#loginItem").hide();
        $("#username").text(user.nome);
        $("#userItem").show();

        if (user.cargo !== "Administrador") {
            $("#card-usuario").hide();
        }
    } else {
        $("#loginItem").show();
        $("#userItem").hide();
    }

    $("#loginButton").click(function(){
        window.location.href = "/login.html";
    });

    $("#profileOption").click(function(){
        window.location.href = "/index.html";
    });

    $("#logoutOption").click(function(){
        localStorage.removeItem('user');
        location.reload();
    });
});
