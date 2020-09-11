# https://www.python-boilerplate.com/py3+flask+argparse+logging+unittest+tox/
import sys
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import query_on_whoosh
import pdb



def create_app():
    app = Flask(__name__)

    # See http://flask.pocoo.org/docs/latest/config/
    app.config.update(dict(DEBUG=True))
    # app.config.update(config or {})

    # Setup cors headers to allow all domains
    # https://flask-cors.readthedocs.io/en/latest/
    CORS(app)

    # Definition of the routes. Put them into their own file. See also
    # Flask Blueprints: http://flask.pocoo.org/docs/latest/blueprints


    @app.route("/query/", methods=['POST'], strict_slashes=False)
    def foo_url_arg():
        if request.method == 'POST':
            requestDict = request.get_json()
            queryword = requestDict['query'].strip()
            print(queryword)
            docs_result= query_on_whoosh.query(queryword)
            return jsonify({"echo": queryword, "docs": docs_result})

    return app


port = 4201
app = create_app()
app.run(host="0.0.0.0", port=port)

