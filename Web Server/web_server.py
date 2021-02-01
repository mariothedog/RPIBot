from flask import Flask, render_template, request
from http import HTTPStatus
import json
import RPi.GPIO as GPIO

with open("config.json", "r") as file:
    CONFIG = json.load(file)
server_host = CONFIG["server_host"]
server_port = CONFIG["server_port"]

with open("static/gpio_pins.json", "r") as file:
    GPIO_PINS = json.load(file)

app = Flask(__name__, template_folder="")
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        data = request.json
        gpio_pin = data["gpioPin"]
        write_value = data["writeValue"]
        GPIO.output(gpio_pin, write_value)
        return ("", HTTPStatus.NO_CONTENT)
    else:
        gpio_pin_values = [GPIO.input(pin) for pin in GPIO_PINS]
        return render_template("index.html", gpio_pin_values=gpio_pin_values)


if __name__ == "__main__":
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(GPIO_PINS, GPIO.OUT)

    try:
        app.run(host=server_host, port=server_port,
                debug=True, use_reloader=False)
    finally:
        GPIO.cleanup()
