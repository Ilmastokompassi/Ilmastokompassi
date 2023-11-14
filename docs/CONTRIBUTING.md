# Contributing

### Requirements
* Docker
  * Remember to follow post-install steps. https://docs.docker.com/engine/install/linux-postinstall/

### Configure
* Copy default configuration for local environment with:
  * ```sed 's/dev-db/localhost/g' backend/.env.dev > backend/.env```

### Run
* You can run the entire application locally with `bin/dev` script
  * You can shutdown the application with `CTRL+C`
* You can reset the database by running:
  * ```backend/bin/db-migrate.sh```
* To view logs, run ```docker compose logs -f```

### Completing a task
* Check Discord
* Check Sprint Backlog
* Pull changes from GitHub: `git pull origin main`
* Choose a task from the sprint backlog, assign yourself to the task and set task status to _In progress_
* Create a new branch `git switch -c <new-branch-name>`
* Run application locally with `bin/dev`
* Write and debug the code
* Write tests for the new logic
* Run backend tests: `(cd backend && poetry run invoke test)`.
  * Check coverage: `(cd backend && poetry run invoke coverage)`
  * Generate report: `(cd backend && poetry run invoke coverage-report)`
* Run frontend tests: `(cd frontend && npm test)`
* Run end-to-end (e2e) cypress tests:
    1. Run the application: `bin/dev`
    2. Run Cypress in headless-mode, run: `(cd frontend && npm run cypress:headless)`
      -  `(cd frontend && npm run cypress:open)` to run Cypress in the browser
* Run lint
    - backend: `(cd backend && poetry run invoke lint)`
    - frontend: `(cd frontend && npm run lint)`
* Commit changes.
  * Try to avoid big commits. Keep them focused and small if possible.
* Push commits to your own branch: `git push -u origin <new-branch-name>`
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
