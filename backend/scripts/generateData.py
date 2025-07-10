import random
import csv

roles = ['LDP Participant', 'Support', 'Admin', 'HR', 'Manager']
locations = ['NY', 'CA', 'MN', 'TX', "CT"]


with open('training_data.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    
  
    writer.writerow(["name", "phone", "jobRole", "location", "salary", "managerId", "role"])
    
  
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

    
        writer.writerow([
            f"Employee{i}", 
            f"612-010{i:03d}",
            role, 
            location, 
            salary, 
            f"{random.randint(0, 20)}", 
            "HR" if i % 50 == 0 else ("manager" if i % 10 == 0 else "employee")
        ])