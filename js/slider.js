	
		window.onload = function() {
			
			
			var default_value = 0;
			var count_value = 1;
			var rightPressed = false;
			var leftPressed = false;
			var mousePressed = false;
			var margin_slider = 0;
			var margin_slider_dx = 50;//default value 10
			var main_slider_width = parseInt($('#slider_1').css('width'));
			//var slider_width = parseInt($('.slider_class').css('width'));
			var slider_width = 100;
			var show_sl_width = parseInt($('.show_sl').css('width'));
			var width_slider_color;
			var areas_count = main_slider_width / margin_slider_dx;
			var segment_size = main_slider_width / areas_count; // segment's size
			var select_slider_labels = $('.container_slider_labels');
			var slider_current_position;
			var round_slider_current_position;
			var final_value_key;
			var final_value_mouse;
			var mouse_status = false;
			var key_status = false;
			var mouseClick = false;
			var arrowPressed_right = false;
			var arrowPressed_left = false;
			
			var newWidth = 0;
			var newWidth_dx = 1;
			
			
			document.addEventListener("keydown", keyDownHandler, false);
			document.addEventListener("keyup", keyUpHandler, false);
			//document.addEventListener("mousedown", mouseDownHandler, false);
			//document.addEventListener("mouseup", mouseUpHandler, false);
			$('#slider_1').mousedown(mouseDownHandler);
			$('#slider_1').mouseup(mouseUpHandler);
	
			$('.arrow-left-class').mousedown(arrowDownHandler_left);
			$('.arrow-left-class').mouseup(arrowUpHandler_left);
			$('.arrow-right-class').mousedown(arrowDownHandler_right);
			$('.arrow-right-class').mouseup(arrowUpHandler_right);			
			
			var data = JSON.stringify({
  "bulkId": "BULK-ID-123-xyz",
  "messages": [
    {
      "from": "InfoSMS",
      "destinations": [
        {
          "to": "41793026727",
          "messageId": "MESSAGE-ID-123-xyz"
        },
        {
          "to": "41793026731"
        }
      ],
      "text": "Artık Ulusal Dil Tanımlayıcısı ile Türkçe karakterli smslerinizi rahatlıkla iletebilirsiniz.",
      "flash": false,
      "language": {
        "languageCode": "TR"
      },
      "transliteration": "TURKISH",
      "intermediateReport": true,
      "notifyUrl": "https://www.example.com/sms/advanced",
      "notifyContentType": "application/json",
      "callbackData": "DLR callback data",
      "validityPeriod": 720
    },
    {
      "from": "41793026700",
      "destinations": [
        {
          "to": "41793026785"
        }
      ],
      "text": "A long time ago, in a galaxy far, far away... It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.",
      "sendAt": "2015-07-07T17:00:00.000+01:00",
      "deliveryTimeWindow": {
        "from": {
          "hour": 6,
          "minute": 0
        },
        "to": {
          "hour": 15,
          "minute": 30
        },
        "days": [
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY"
        ]
      }
    }
  ],
  "tracking": {
    "track": "SMS",
    "type": "MY_CAMPAIGN"
  }
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://2lvpl.api.infobip.com/sms/2/text/advanced");
xhr.setRequestHeader("authorization", "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==");
xhr.setRequestHeader("accept", "application/json");
xhr.setRequestHeader("content-type", "application/json");

xhr.send(data);
			
			function arrowDownHandler_left() {
				arrowPressed_left = true;
				slider_move(final_value_mouse);
			};
			
			function arrowUpHandler_left() {
				arrowPressed_left = false;
				slider_move(final_value_mouse);
			};

			function arrowDownHandler_right() {
				arrowPressed_right = true;
				slider_move(final_value_mouse);
			};
			
			function arrowUpHandler_right() {
				arrowPressed_right = false;
				slider_move(final_value_mouse);
			};
			
			function mouseDownHandler() {
				mousePressed = true;
				mouseClick = true;
				find_x_coord_slider(final_value_key);
			};
			
			function mouseUpHandler() {
				mousePressed = false;
				find_x_coord_slider(final_value_key);
			};

			function keyDownHandler(e){
				if(e.keyCode == 39) {
					rightPressed = true;
				}
				else if(e.keyCode == 37) {
					leftPressed = true;
				};
				slider_move(final_value_mouse);
			};
			
			function keyUpHandler(e){
				if(e.keyCode == 39) {
					rightPressed = false;
				}
				else if(e.keyCode == 37) {
					leftPressed = false;
				};
				slider_move(final_value_mouse);
			};
				
			function add_segments_labels() {
				if(areas_count > 0) {
					for(var i = 0; i <= areas_count; i++) {
						//select_slider_labels.append("<div class='slider_label' style='margin-left:" + margin_slider_dx * i + "px; position: absolute; margin-top: 20px;'>" + i + "</div>");	
					};
				}
				else {
					return;
				};
			};	
			
			//default settings for arrows
			$('.left').css({'border-color':'#ececec'});
			$('.left').css({'cursor':'default'});
			
			function check_arrow_color(count_marg) {
				if(count_marg == 100){
					$('.right').css({'border-color':'#ececec'});
					$('.right').css({'cursor':'default'});
				}
				else{
					$('.right').css({'border-color':'#49bfbc'});
					$('.right').css({'cursor':'pointer'});
				};
				if(count_marg <= 0){
					$('.left').css({'border-color':'#ececec'});
					$('.left').css({'cursor':'default'});
				}
				else{
					$('.left').css({'border-color':'#49bfbc'});
					$('.left').css({'cursor':'pointer'});
				};
			};
			
			function find_x_coord_slider(val) {
				if( val != null & key_status) {
					default_value = val;
				};
				key_status = false;
				var example = document.getElementById('slider_1'); 
				example.onmousemove = function(e) { 
					var x = (e.pageX - this.offsetLeft) / 5; 
					x = x - 10;
					if(x <= 100 & x > 0){
						slider_current_position = x;
						round_slider_current_position = Math.round(slider_current_position);
						if(mousePressed || mouseClick) {
							mouseClick = false;
							$('.show_sl').attr('value', round_slider_current_position);
							newWidth = round_slider_current_position * newWidth_dx;
							$('.slider_color').css({'width':'' + newWidth + '%'});
							final_value_mouse = parseInt($('.show_sl').attr('value'));
							mouse_status = true;
							check_arrow_color(newWidth);
							//$('.value_show').text(final_value_mouse + ' new width value: ' + newWidth + '; x =' + round_slider_current_position);
						};
					}
					else {
						return;
					};
				};
			};
							
			function slider_move(val){
				//if(val != null & mouse_status) {
				if(mouse_status) {
					default_value = val;
				};
				mouse_status = false;
				if(arrowPressed_right != true) {
					$('.show_sl').attr('value', default_value);
				};
				if((rightPressed | arrowPressed_right) & newWidth < 100) {
					newWidth += newWidth_dx;
					default_value += count_value;
					width_slider_color = newWidth;
					if(width_slider_color >= main_slider_width){
						$('.slider_color').css({'width':'100%'});
						$('.show_sl').attr('value', 100);
					}
					else{
						$('.slider_color').css({'width':'' + width_slider_color + '%'});
						$('.show_sl').attr('value', width_slider_color);
					};
					key_status = true;
				};
				if((leftPressed | arrowPressed_left) & newWidth > 0) {
					newWidth -= newWidth_dx;
					default_value -= count_value;
					$('.slider_color').css({'width':'' + newWidth + '%'});
					$('.show_sl').attr('value', newWidth);
					key_status = true;
				};
				final_value_key = parseInt($('.show_sl').attr('value'));
				//check_arrow_color(final_margin_key, main_slider_width);
				check_arrow_color(newWidth);
				//$('.value_show').text(final_value_key + ' new width value: ' + newWidth);
			};
			
			add_segments_labels();
			
			//alert('Hello! Script was loaded!');
		};
