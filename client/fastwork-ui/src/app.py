from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import torch
from sentence_transformers import SentenceTransformer, util

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load your model and data
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
embeddings2 = torch.load('text_sample_data.pt')
df = pd.read_csv('updated_sample_data.csv')

@app.route('/api/search', methods=['POST'])
def search():
    data = request.json
    query = data.get('query', '')
    if not query:
        return jsonify({"error": "Query is required"}), 400
    # Encode the query and perform the search
    query_embedding = model.encode(query)
    similarities = util.pytorch_cos_sim(query_embedding, embeddings2)
    top_results = torch.topk(similarities.squeeze(), k=5)
    top_indices = top_results.indices.tolist()
    results = df.iloc[top_indices].to_dict(orient='records')

    return jsonify({"results": results})

if __name__ == '__main__':
    port = 3000
    app.run(debug=True, port = port)