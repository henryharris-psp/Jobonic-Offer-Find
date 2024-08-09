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

# Load the CSV data
csv_file = 'services.csv'
if not os.path.exists(csv_file):
    raise FileNotFoundError(f"{csv_file} not found. Please ensure the file is in the correct location.")

df = pd.read_csv(csv_file)

# Convert CSV data to tensor and save as .pt file
def convert_csv_to_tensor(csv_file, pt_file):
    df = pd.read_csv(csv_file)
    service_descriptions = df[['title','description1', 'description2', 'description3']].fillna('').agg(' '.join, axis=1).tolist()
    service_embeddings = model.encode(service_descriptions, convert_to_tensor=True)
    torch.save(service_embeddings, pt_file)
    return service_embeddings

#service_data = convert_csv_to_tensor(csv_file, 'services.pt')

@app.route('/search', methods=['GET'])
def search():
    global service_data
    service_data = convert_csv_to_tensor(csv_file, 'services.pt')

    query = request.args.get('query', '')
    if not query:
        return jsonify({"results": df.to_dict(orient='records')})

    query_embedding = model.encode(query, convert_to_tensor=True)
    scores = util.pytorch_cos_sim(query_embedding, service_data)

    # Flatten scores tensor to 1D for sorting
    scores = scores.view(-1)
    
    # Get indices of scores sorted in descending order
    sorted_indices = torch.argsort(scores, descending=True).tolist()
    
    # Get sorted results based on the indices
    sorted_results = df.iloc[sorted_indices].to_dict(orient='records')
    
    # Prepare response
    response = make_response(jsonify({"results": sorted_results}))
    response.headers.add("Access-Control-Allow-Origin", "*")
    
    return response

if __name__ == '__main__':
    app.run(port=5000)
