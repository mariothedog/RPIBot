import RPi.GPIO as GPIO
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

host_name = ""
host_port = 8000

gpio_pins = (
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
)

with open("index.html", "r") as file:
	html = file.read()


class Server(BaseHTTPRequestHandler):
	def do_HEAD(self):
		self.send_response(200)
		self.send_header('Content-type', 'text/html')
		self.end_headers()
	
	def _redirect(self, path):
		self.send_response(303)
		self.send_header('Content-type', 'text/html')
		self.send_header('Location', path)
		self.end_headers()
	
	def do_GET(self):
		self.do_HEAD()
		self.wfile.write(html.encode("utf-8"))
	
	def do_POST(self):
		content_length = int(self.headers['Content-Length'])
		post_data_raw = self.rfile.read(content_length).decode("utf-8")
		post_data = json.loads(post_data_raw)
		
		gpio_pin = post_data["gpioPin"]
		write_value = post_data["writeValue"]
		
		GPIO.output(gpio_pin, write_value)
		self._redirect("/")

if __name__ == "__main__":
	GPIO.setmode(GPIO.BCM)
	GPIO.setup(gpio_pins, GPIO.OUT)
	
	http_server = HTTPServer((host_name, host_port), Server)
	print("Server Ready")
	try:
		http_server.serve_forever()
	except KeyboardInterrupt:
		http_server.server_close()
	finally:
		GPIO.cleanup()
