## Workflow guide


### Do this first
* Check Discord messages
* Check Sprint Backlog
* Pull changes from GitHub: `git pull origin main`, make poetry up to date: `poetry install`, switch to: `poetry shell`
  
### Completing a task
* Choose a task from the sprint backlog, assign yourself to the task and set task status to _In progress_
* Create a new branch `git switch -c <feature-YourBranch>`
* Write the code
* Writes tests
* Run tests and debug until 100 % approval rate
* Commiting: add and commit changed files and push always to your own branch: `git push -u origin <feature-YourBranch>`
* Create a pull request in GitHub
* Post a short message in Discord about new pull request requiring to be approved and merged. Include a short description of added functionalities and/or bug fixes and if the branch can be closed after approval.
* After the pull request is approved mark the task status as 'Done' in the sprint backlog

### Approving a pull request
* Check Discord or GitHub for pull requests waiting for approval. Note: code submitter can't handle their own pull requests.
* Go to Github and choose the pull request you want to handle
* Click "Files changed"
* Read the code and review changes/additions
* Check CI test results
* Handling the pull request:
   * Decline the request if there is any conflicts or others issues
   * Approve if no issues/conflicts

### When your workday is over
* Update sprint backlog if needed
* Add your daily hours to Clockify


*[Workflow guide](https://github.com/piryopt/pienryhmien-optimointi/blob/main/documentation/workflow_guide.md) was used for inspiration in creating this guide.*
