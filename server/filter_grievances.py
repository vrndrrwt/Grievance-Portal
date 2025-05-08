# filter_grievances.py
import sys
import json
import joblib

# Load the pre-trained model (make sure the path to the model is correct)
model = joblib.load('model.pkl')

# Read the input grievances (passed from Node.js)
grievances = json.loads(sys.argv[1])

# Process grievances with the model (this can be customized as needed)
filtered_grievances = []
for grievance in grievances:
    prediction = model.predict([grievance['grievanceText']])
    if prediction == 'positive':  # Adjust based on your model's prediction logic
        filtered_grievances.append(grievance)

# Output the filtered grievances back to Node.js
print(json.dumps(filtered_grievances))
