from flask import Flask
from controllers import user
from controllers import auth
from config import config_app


app = Flask(__name__)
config_app(app)

app.register_blueprint(user.bp)
app.register_blueprint(auth.bp)
