from flask import Flask
import config


app = Flask(__name__)
config.config_app(app, __file__)


if __name__ == '__main__':
    app.run(debug=True)
