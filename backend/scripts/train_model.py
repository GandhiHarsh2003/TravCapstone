from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import pandas as pd
import pickle 
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


df = pd.read_csv('training_data.csv')
X = pd.get_dummies(df[['jobRole', 'location']])
y = df['salary']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("Model Eval")
print(f"MAE: {mean_absolute_error(y_test, y_pred)}")
print(f"MSE: {mean_squared_error(y_test, y_pred)}")
print(f"R-squared: {r2_score(y_test, y_pred)}")



with open('model.pkl', 'wb') as f:
    pickle.dump((model, X.columns.tolist()), f)

# custom test

sample_input = pd.DataFrame([{'jobRole': 'Manager', 'location': 'SF'}])
sample_X = pd.get_dummies(sample_input)
sample_X = sample_X.reindex(columns=X.columns, fill_value=0)
sample_salary = model.predict(sample_X)[0]
print("predicted salary: ", sample_salary)