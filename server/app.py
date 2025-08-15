from flask import Flask, send_from_directory
from auth.routes import auth_api_bp
import os, config


app = Flask(__name__, static_folder='../client/dist', static_url_path='/')
config.config_app(app, __file__)
app.register_blueprint(auth_api_bp)


# Rota para o React Router
@app.route('/')
@app.route('/<path:path>')
def serve_react(path=''):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
