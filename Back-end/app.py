from flask import Flask, jsonify, request
import requests
import os
from dotenv import load_dotenv
import logging
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)

API_KEY = os.getenv("GNEWS_API_KEY")
BASE_URL = "https://gnews.io/api/v4/"

logging.basicConfig(level=logging.DEBUG)


CORS(app)

@app.route('/news', methods=['GET'])
def get_news():
    query = request.args.get('query', 'technology')
    url = f"{BASE_URL}search?q={query}&apikey={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return jsonify({"articles": data.get("articles", [])}) 
    else:
        logging.error(f"Failed to fetch news: {response.status_code} - {response.text}")
        return jsonify({"error": "Failed to fetch news"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)