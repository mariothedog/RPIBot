jQuery.getJSON("static/gpio_pins.json", function(gpioPinNumbers) {
	const gpioPins = document.getElementById("gpio-pins");
	
	for (let i = 0; i < gpioPinNumbers.length; i++) {
		const pinNum = gpioPinNumbers[i];
		const currentValue = gpioPinValues[i];
		
		const list = document.createElement("li");
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.dataset.gpiopin = pinNum;
		checkbox.checked = currentValue;
		checkbox.onclick = function() {
			makePostRequest(checkbox);
		};
		list.innerHTML = "GPIO " + pinNum;
		list.appendChild(checkbox);
		gpioPins.appendChild(list);
	}
});


function makePostRequest(checkbox) {
	const data = {
		gpioPin: parseInt(checkbox.dataset.gpiopin),
		writeValue: checkbox.checked ? 1 : 0,
	};

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "/",
		data: JSON.stringify(data),
		success: function() {
			console.log("Success at post request");
		},
		error: function() {
			console.log("Error at post request");
		},
	});
}
