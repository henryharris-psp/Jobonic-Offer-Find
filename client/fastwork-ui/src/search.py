import pandas as pd
import torch
from sentence_transformers import SentenceTransformer, util
from flask import Flask, request, jsonify, make_response
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the precomputed tensors and model
model = SentenceTransformer('all-MiniLM-L6-v2')
service_data = torch.load('updated_sample_data.pt')

# Load the CSV data
csv_file = 'updated_sample_data.csv'
if not os.path.exists(csv_file):
    raise FileNotFoundError(f"{csv_file} not found. Please ensure the file is in the correct location.")

df = pd.read_csv(csv_file)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')
    if not query:
        return jsonify({"results": df.to_dict(orient='records')})

    query_embedding = model.encode(query, convert_to_tensor=True)
    scores = util.pytorch_cos_sim(query_embedding, service_data)

    top_results = torch.topk(scores, k=5)  # get top 5 results
    top_results_indices = top_results.indices[0].tolist()

    results = df.iloc[top_results_indices].to_dict(orient='records')
    response = make_response(jsonify({"results": results}))
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    app.run(port=5000)
