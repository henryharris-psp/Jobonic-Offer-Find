import pandas as pd
from sentence_transformers import SentenceTransformer, util
import torch

# Load the model (only if needed for encoding query)
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Load data from PyTorch file
embeddings2 = torch.load('text_sample_data.pt')

# Function to perform search and retrieve top results
def search_jobs(query, embeddings2, df, title_weight=2.0):
    # Encode the query (if needed)
    query_embedding = model.encode(query)

    # Compute cosine similarities
    similarities = util.pytorch_cos_sim(query_embedding, embeddings2)

    # Weight title similarity more
    #title_similarities_weighted = similarities[:, 0] * title_weight
    #similarities[:, 0] = title_similarities_weighted

    # Get top 5 results indices
    top_results = torch.topk(similarities.squeeze(), k=5)
    top_indices = top_results.indices.tolist()

    # Retrieve corresponding data rows from DataFrame
    results = df.iloc[top_indices]

    return results

# Load your original DataFrame
df = pd.read_csv('updated_sample_data.csv')

# Example usage
query = "code a website"
results = search_jobs(query, embeddings2, df)

# Display top 5 results
print(results)
