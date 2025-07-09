import random, json
from pymongo import MongoClient
roles = ['LDP Participant', 'Support', 'Admin', 'HR', 'Manager']
locations = ['NY', 'CA', 'MN', 'TX', "CT"]
client = MongoClient('mongodb://localhost:27017/') #change?
db = client['employees']
db.employees.delete_many({})

for i in range(1000):
    role = random.choice(roles)
    location = random.choice(locations)
    base_salary = 70000
    if role == 'Manager':
        salary = base_salary + 20000
    elif role == 'HR':
        salary = base_salary + 10000
    else: 
        salary = base_salary + random.randint(-5000, 5000)

    db.employees.insert_one({

        "name": f"Employee{i}", 
        "phone": f"612-010{i:03d}",
        "jobRole": role, 
        "location": location, 
        "salary": salary, 
        "managerId": f"{random.randint(0, 20)}", 
        "role": "HR" if i % 50 == 0 else ("manager" if i % 10 == 0 else "employee")
    })