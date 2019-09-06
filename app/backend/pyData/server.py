from flask import Flask
from flask_cors import CORS
#/  CLI INIT
#/*     export FLASK_APP=app.py
#/*     flask run
#/  Optional local run:   flask run --host=0.0.0.0


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return '{"msg":"Hello, World!"}'


