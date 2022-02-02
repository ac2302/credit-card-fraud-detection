from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from os import path
from random import randint
from os import remove
import threading
import predict
import utils
import json

print('imported packages')

app = Flask(__name__)
CORS(app)


@app.route("/predict-vectors", methods=['POST'])
def predict_from_vectors():
    vectors = json.loads(request.data)['vectors']
    return jsonify(predict.predict_from_vectors(vectors))


@app.route("/result/<filename>", methods=['GET'])
def get_result(filename):
    id = filename.split('.')[0]
    return send_file(path.join("predicted", f"result{id}.csv"))


@app.route("/result/frauds/<id>", methods=['GET'])
def get_frauds(id):
    return(jsonify(utils.get_frauds(id)))


@app.route('/predict', methods=['POST'])
def make_prediction():
    data = request.files['data']
    filename = path.join('uploads', str(randint(0, 4096)) + data.filename)

    if filename.split('.')[-1] not in ['csv']:
        return {'error': 'input must be of type csv'}

    # temporarily saving
    data.save(filename)

    # making predictions
    try:
        result = predict.predict_from_file(filename)

        # setting result to be deleted in 10 min
        threading.Thread(target=utils.schedule_delete,
                         args=(result[1], 10 * 60)).start()

        # deleting file
        remove(filename)
        # returning filename
        return {"predictions": result[0]}
    except:
        # deleting file
        remove(filename)
        return {"error": "invalid input"}


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
