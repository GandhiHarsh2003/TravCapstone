import sys, json, pickle
import pandas as pd

data = json.loads(sys.stdin.read())
job_role = data['jobRole']
location = data['location']

with open('model.pkl', 'rb') as f:
    model, feature_columns = pickle.load(f)

input_df = pd.DataFrame([{'jobRole': job_role, 'location': location}])
input_X = pd.get_dummies(input_df)
input_X = input_X.reindex(columns=feature_columns, fill_value=0)

prediction = model.predict(input_X)[0]
print(prediction)

