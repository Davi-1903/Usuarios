from flask import Flask
from controllers import user
from controllers import auth
from config import config_app


app = Flask(__name__)
config_app(app)

app.register_blueprint(user.bp)
app.register_blueprint(auth.bp)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
