import csv
import json

# Input and output file paths
csv_file_path = 'data.csv'  # Replace with your CSV file name
json_file_path = 'data.json'

# Read the CSV and convert it to JSON
data = []
with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        data.append(row)

# Write the JSON data to a file
with open(json_file_path, mode='w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=4)

print(f"CSV file converted to JSON and saved as {json_file_path}")
