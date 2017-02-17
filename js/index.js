"use strict";
var channel_names = ["brunofin", "nanoaquila", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "fccokc", "idevelopthings", "SYNTAG"];
var endpoint_stream = "https://wind-bow.gomix.me/twitch-api/streams/";
var endpoint_channel = "https://wind-bow.gomix.me/twitch-api/channels/";
var display = $('#display_results');
var searchinput = $('#search');
searchinput.change(function () {
    var filter = $(this).val().toLowerCase();
    if (filter) {
        display.find("h5:not(:contains(" + filter + "))").parent().parent().slideUp();
        display.find("h5:contains(" + filter + ")").parent().parent().slideDown();
    }
    else {
        display.find("li").slideDown();
    }
    return false;
}).keyup(function () {
    $(this).change();
});
$.expr[":"].contains = $.expr.createPseudo(function (arg) {
    return function (elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
var _loop_1 = function (i) {
    $.getJSON(endpoint_stream + channel_names[i], function (stream) {
        var display_name = channel_names[i];
        var is_live = stream.stream !== null ? true : false;
        $.getJSON(endpoint_channel + channel_names[i], function (channel) {
            if (is_live) {
                display.prepend("<li class=\"media islive\"><img class=\"rounded-circle d-flex mr-3\" src=\"" + channel.logo + "\" width=\"64px\" alt=\"" + display_name + " twitch avatar\"><div class=\"media-body\"><h5 class=\"mt-0 mb-1\">" + display_name + "</h5><p><em>" + channel.status + " </em><a href=\"https://www.twitch.tv/" + display_name + "\" class=\"btn btn-primary float-right\" target=\"_blank\">View channel</a></p></div></li>");
                console.log(display_name, channel.status, channel.logo);
            }
            else if (channel.status === 404) {
                display.prepend("<li class=\"media closed\"><img class=\"rounded-circle d-flex mr-3\" src=\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f8/f8de58eb18a0cad87270ef1d1250c574498577fc_full.jpg\" width=\"64px\" alt=\"No avatar\"><div class=\"media-body\"><h5 class=\"mt-0 mb-1\">" + display_name + "</h5><p><em></em><strong>Account closed or does not exist.</strong></p></div></li>");
                console.log("Not Found!");
            }
            else {
                display.prepend("<li class=\"media\"><img class=\"rounded-circle d-flex mr-3\" src=\"" + channel.logo + "\" width=\"64px\" alt=\"" + display_name + " twitch avatar\"><div class=\"media-body\"><h5 class=\"mt-0 mb-1\">" + display_name + "</h5><p><em></em><a href=\"https://www.twitch.tv/" + display_name + "\" class=\"btn btn-primary float-right\" target=\"_blank\">View channel</a></p></div></li>");
                console.log(display_name, channel.logo);
            }
        });
        $('#display_all').on('click', function () {
            $('#display_offline').removeClass('active');
            $('#display_online').removeClass('active');
            $(this).addClass('active');
            display.find("li").slideDown();
        });
        $('#display_online').on('click', function () {
            $('#display_all').removeClass('active');
            $('#display_offline').removeClass('active');
            $(this).addClass('active');
            if (is_live) {
                display.find("li:not(.islive)").slideUp();
            }
            else {
                display.find("li:not(.islive)").slideUp();
                display.find("li.islive").slideDown();
            }
        });
        $('#display_offline').on('click', function () {
            $('#display_all').removeClass('active');
            $('#display_online').removeClass('active');
            $(this).addClass('active');
            if (!is_live) {
                display.find("li.islive").slideUp();
            }
            else {
                display.find("li:not(.islive)").slideDown();
                display.find("li.islive").slideUp();
            }
        });
    });
};
for (var i = 0; i < channel_names.length; i++) {
    _loop_1(i);
}