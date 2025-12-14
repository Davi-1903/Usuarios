from flask import Flask, send_from_directory
from controllers import user
from controllers import auth
import os, config


app = Flask(__name__, static_folder='../client/dist')
config.config_app(app)

app.register_blueprint(user.bp)
app.register_blueprint(auth.bp)


# Rota "Catch-All"
@app.route('/')
@app.route('/<path:path>')
def serve_react(path: str = ''):
    if app.static_folder is None:
        raise RuntimeError('A pasta estática não foi definida')
    if path and not path.startswith('/api') and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
