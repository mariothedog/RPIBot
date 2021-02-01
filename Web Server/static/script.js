jQuery.getJSON("static/gpio_pins.json", function (gpioPinNumbers) {
	gpioPinNumbers.forEach(pinNum => {
		const gpioPins = document.getElementById("gpio-pins");
		const list = document.createElement("li");
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.dataset.gpiopin = pinNum;
		checkbox.onclick = function () {
			makePostRequest(checkbox);
		};
		list.innerHTML = "GPIO " + pinNum;
		list.appendChild(checkbox);
		gpioPins.appendChild(list);
	});
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
		success: function () {
			console.log("Success at post request");
		},
		error: function () {
			console.log("Error at post request");
		},
	});
}