jQuery.getJSON("static/gpio_pins.json", function(gpioPinNumbers) {
	const gpioPins = document.getElementById("gpio-pins");

	for (let i = 0; i < gpioPinNumbers.length; i++) {
		const pinNum = gpioPinNumbers[i];
		const currentValue = gpioPinValues[i];

		const gpioPin = document.createElement("li");
		gpioPin.id = "gpio-pin";
		
		const label = document.createElement("label");
		
		const text = document.createElement("span");
		text.id = "gpio-text";
		text.innerHTML = "GPIO " + pinNum
		label.appendChild(text);
		
		const checkbox = document.createElement("input");
		checkbox.id = "gpio-checkbox";
		checkbox.type = "checkbox";
		checkbox.dataset.gpiopin = pinNum;
		checkbox.checked = currentValue;
		checkbox.onclick = function() {
			makePostRequest(checkbox);
		}
		label.appendChild(checkbox);
		
		gpioPin.appendChild(label);
		gpioPins.append(gpioPin);
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
