from flask import Flask
from api.geo import geo

app = Flask(__name__)
app.register_blueprint(geo)

if __name__ == '__main_':
    app.run()
