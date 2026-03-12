from github import Github, Auth
import os
from datetime import datetime

#with open("/Users/isabellaking/Code_Blitz/temp/stage1_temp/output.txt", "r") as f:
#    lines = f.readlines()

#overall_score = lines[-2].replace("Passed ", "").replace(" / 12 tests", "").strip()

with open("/Users/isabellaking/Code_Blitz/temp/stage1_temp/output1.txt", "r") as f:
    output = f.read()

parts = output.split(" ")
overall_passed = parts[0]
overall_problems = parts[1]

print(overall_passed)
print(overall_problems)

auth = Auth.Token("___")
g = Github(auth=auth)
repo = g.get_repo("ctrl-codeblitz/stage1_temp")

start_time = repo.created_at
runs = repo.get_workflow_runs()
if runs.totalCount == 0:
    print("No workflow runs yet")
else:
    last_run = runs[0]
    end_time = last_run.created_at
    time_diff = end_time - start_time
    minutes = time_diff.total_seconds() / 60

score = 0
