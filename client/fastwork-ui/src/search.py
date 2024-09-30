import pandas as pd
import torch
from sentence_transformers import SentenceTransformer, util
from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import spacy

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

def extract_keywords(query):
    """Extract keywords from the user query using spaCy."""
    doc = nlp(query)
    keywords = [token.lemma_ for token in doc if token.pos_ in ['NOUN', 'PROPN']]
    return keywords

app = Flask(__name__)
CORS(app)

# Load the SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Load the CSV file with job roles/services
csv_file = 'services.csv'
if not os.path.exists(csv_file):
    raise FileNotFoundError(f"{csv_file} not found. Please ensure the file is in the correct location.")

# Load and clean the CSV data
df = pd.read_csv(csv_file)
df.fillna('', inplace=True)

# Concatenate the 'title' and 'description' columns to form the search space
df['combined_description'] = df[['title', 'description1', 'description2', 'description3']].agg(' '.join, axis=1)

# Convert job descriptions to embeddings once (for efficiency)
service_descriptions = df['combined_description'].tolist()
service_embeddings = model.encode(service_descriptions, convert_to_tensor=True)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')
    
    if not query:
        return jsonify({"results": df.to_dict(orient='records')})

    # Extract keywords
    keywords = extract_keywords(query)

    # Convert the user query to an embedding
    query_embedding = model.encode(query, convert_to_tensor=True)

    # Compute cosine similarity scores
    scores = util.pytorch_cos_sim(query_embedding, service_embeddings)

    # Flatten and sort scores
    scores = scores.view(-1)
    sorted_indices = torch.argsort(scores, descending=True).tolist()

    keyword_boost = []
    for index in sorted_indices:
        score = scores[index].item()
        title = df.iloc[index]['title'].lower()
        # Boost score based on keyword matches
        if any(keyword in title for keyword in keywords):
            score += 0.5
        keyword_boost.append((index, score))

    # Sort by boosted scores
    keyword_boost.sort(key=lambda x: x[1], reverse=True)

    # Retrieve the top matches from the dataframe based on sorted indices
    sorted_results = df.iloc[[index for index, _ in keyword_boost]].to_dict(orient='records')

    # Prepare the JSON response
    response = {"results": sorted_results}
    
    # Log the response for debugging
    print("Response data:", response)
    return jsonify(response)

@app.route('/ai-search', methods=['GET'])
def ai_search():
    query = request.args.get('query', '')
    
    if not query:
        return jsonify({"error": "No query provided"}), 400

    # Call the existing search function
    search_results = search()  # You may want to pass the query to the search function
    return search_results

if __name__ == '__main__':
    app.run(port=5000)
