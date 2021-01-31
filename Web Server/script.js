const pinNumbers = [
	2,
	3,
	4,
	17,
	27,
	22,
	10,
	9,
	11,
	5,
	6,
	13,
	19,
	26,
	14,
	15,
	18,
	23,
	24,
	25,
	8,
	7,
	12,
	16,
	20,
	21,
];

pinNumbers.forEach(pinNum => {
	const gpioPins = document.getElementById("gpio-pins");
	const list = document.createElement("li");
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.dataset.gpiopin = 3;
	checkbox.onclick = function() {
		makePostRequest(checkbox);
	};
	list.innerHTML = "GPIO " + pinNum;
	list.appendChild(checkbox);
	gpioPins.appendChild(list);
});


function makePostRequest(checkbox) {
	const data = {
		gpioPin: parseInt(checkbox.dataset.gpiopin),
		writeValue: checkbox.checked ? 1 : 0,
	};

	fetch("/", {
		method: "POST",
		body: JSON.stringify(data),
	}).catch(err => {
		console.error(err);
	});
}