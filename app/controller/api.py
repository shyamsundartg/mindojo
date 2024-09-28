from app import app
from flask import jsonify, request, render_template
from app.helper.googlesheethelper import get_data_from_googlesheets
from app.helper.waterflow import find_flow


@app.route('/', methods = ['GET']) 
def index():
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def get_data_from_sheets():
    return jsonify(get_data_from_googlesheets())

@app.route('/api/findpath', methods=['POST'])
def calculate_flow_path():
    data = request.get_json()
    output = find_flow(data["data"])
    return jsonify({"data":output})


if __name__ == '__main__':
    app.run(debug=True)