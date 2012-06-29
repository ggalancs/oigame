// activity-realtime: como el What's happening now de getup.org.au, 
// muestra 10 elementos y va quitando uno de abajo y poniendo otro arriba

// TODO: request por ajax y continuar procesando hasta el final
// TODO: CSS bonito

var data = [
  {"id":33908182,"html":"<span class=\"name\">Wendy</span> signed to <a href=\"/campaigns/coal-seam-gas/csg-ad-petition/dont-risk-coal-seam-gas\">stop coal seam gas mining</a>.","timestamp":"Mon, 19 Sep 2011 14:30:55 GMT"},
  {"id":33908157,"html":"<span class=\"name\">Yvonne</span> asked the NSW Govt <a href=\"/campaigns/coal-seam-gas/hunter-valley/sign-the-petition\">to protect the Hunter Valley</a>.","timestamp":"Mon, 19 Sep 2011 14:23:21 GMT"},
  {"id":33908154,"html":"<span class=\"name\">Eric</span> signed to <a href=\"/campaigns/coal-seam-gas/add-your-voice/chip-in\">stop coal seam gas mining</a>.","timestamp":"Mon, 19 Sep 2011 14:22:54 GMT"},
  {"id":33908152,"html":"<span class=\"name\">John</span> signed to <a href=\"/campaigns/coal-seam-gas/add-your-voice/chip-in\">stop coal seam gas mining</a>.","timestamp":"Mon, 19 Sep 2011 14:22:34 GMT"},
  {"id":33908136,"html":"<span class=\"name\">Brendan</span> signed to <a href=\"/campaigns/coal-seam-gas/add-your-voice/chip-in\">stop coal seam gas mining</a>.","timestamp":"Mon, 19 Sep 2011 14:18:48 GMT"},
  {"id":33908077,"html":"<span class=\"name\">Paul</span> signed to <a href=\"/campaigns/coal-seam-gas/add-your-voice/chip-in\">stop coal seam gas mining</a>.","timestamp":"Mon, 19 Sep 2011 14:05:25 GMT"},
  {"id":33908053,"html":"<span class=\"name\">Nicholas</span> just joined GetUp!","timestamp":"Mon, 19 Sep 2011 14:01:55 GMT"},
  {"id":33908050,"html":"<span class=\"name\">Bernard</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:01:40 GMT"},
  {"id":33908049,"html":"<span class=\"name\">Susannah</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:01:35 GMT"},
  {"id":33908048,"html":"<span class=\"name\">Nicholas</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:01:31 GMT"},
  {"id":33908047,"html":"<span class=\"name\">Christine</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:01:28 GMT"},
  {"id":33908046,"html":"<span class=\"name\">Peter</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:01:25 GMT"},
  {"id":33908044,"html":"<span class=\"name\">Deborah</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:01:21 GMT"},
  {"id":33908042,"html":"<span class=\"name\">Brian</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:01:18 GMT"},
  {"id":33908040,"html":"<span class=\"name\">John</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:01:14 GMT"},
  {"id":33908039,"html":"<span class=\"name\">Michelle</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:01:10 GMT"},
  {"id":33908038,"html":"<span class=\"name\">Attracta</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:01:06 GMT"},
  {"id":33908037,"html":"<span class=\"name\">Andre</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:01:03 GMT"},
  {"id":33908036,"html":"<span class=\"name\">Judith</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:01:00 GMT"},
  {"id":33908034,"html":"<span class=\"name\">Patrick</span> donated to <a href=\"/campaigns/support/fund-hope-not-hate/fund-hope-not-hate\">fund hope not hate</a>.","timestamp":"Mon, 19 Sep 2011 14:00:56 GMT"}
];


function activity_init(){
  $.each(data, function(i, item) {
    // mostrar 10 elementos
    if (i < 5){
      activity_load(data[i].html);
    } else {
      // esto es por el puto sleep en el javascript, hay que estar haciendo movidas por los milisegundos
      // y para que no sea el mismo para todos :S
      var t = 2000 * i - 20000;
      setTimeout(function() { 
        activity_clean(); 
        activity_load_pretty(data[i].html);
      },t);
    }
  });
}

function activity_load(html){
  // agregar 1 -- iniciales
  $("#activity-realtime ul").prepend("<li>" + html + "</li>");
}

function activity_load_pretty(html){
  // agregar 1 -- con efecto de fadeIn
  $("#activity-realtime ul").prepend($("<li>" + html + "</li>").fadeIn('slow'));
}

function activity_clean(){
  // comprueba la actividad visible y si son mas que n va quitando los n+1
  var $activity_visible = $('#activity-realtime ul li:visible');
  if ($activity_visible.length > 7) { 
    $.each($activity_visible, function(i, item) {
      if ( i > 8 ){
        $(this).slideDown(400).delay(800).fadeOut(400);  
      } 
    });
  }
}


  // activity-realtime
  //activity_init();
