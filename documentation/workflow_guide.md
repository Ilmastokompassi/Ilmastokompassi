## Workflow guide


### Do this first
* Check Discord messages
* Check Sprint Backlog
* Pull changes from GitHub: `git pull origin main`
  
### Run
* Open two terminals
    * Move to /backend: `poetry install`, `poetry run invoke dev`
    * Move to /frontend: `npm install`, `npm run dev`,  ctrl + click to open site
  
### Completing a task
* Choose a task from the sprint backlog, assign yourself to the task and set task status to _In progress_
* Create a new branch `git switch -c <branch-name>`
* See [Run](#run)-section how to run application locally
* Write and debug the code
* Write tests
* Run backend tests: `poetry run invoke test`.
  * Check coverage: `poetry run invoke coverage`
  * Generate report: `poetry run invoke coverage-report`
* Run frontend tests: `npm test`
* Run end-to-end (e2e) cypress tests, open 3 terminals:
    - backend: `poetry run invoke dev`
    - frontend: `npm run dev`
    - frontend: `npm run cypress:open` or headless: `npm run cypress:headless`
* Run lint
    - backend: `invoke lint`
    - frontend: `npm run lint`
* Commiting: add and commit changed files.
  * Try to avoid big commits. Keep them focused and small, if possible.
* Push commits to your own branch: `git push -u origin <branch-name>`
* Create a pull request in GitHub.
  * Include a short description of added functionalities and/or bug fixes.
* After the pull request is approved mark the task status as 'Done' in the sprint backlog

### Reviewing a pull request
* Check Discord or GitHub for pull requests waiting for approval.
  * Note: code submitter can't approve their own pull requests.
* Open the Pull request on GitHub and review the added/modified files
  * On "Commits" tab you can see changes by individual commits
  * On "Files changed" you can see changes by individual files
* Check CI test results.
* Approve and merge, if there is no issues/conflicts. 

### When your workday is over
* Update sprint backlog if needed
* Add your daily hours to Clockify

*[Workflow guide](https://github.com/piryopt/pienryhmien-optimointi/blob/main/documentation/workflow_guide.md) was used for inspiration in creating this guide.*
