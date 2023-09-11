from invoke import task


@task
def start(ctx, pty=True):
    ctx.run("flask --app ./src/app.py run")

@task
def dev(ctx, pty=True):
    ctx.run("flask --app ./src/app.py run --debug")

@task
def test(ctx):
    ctx.run("pytest src", pty=True)

@task
def coverage(ctx):
    ctx.run("coverage run --branch -m pytest src", pty=True)

@task(coverage)
def coverage_report(ctx):
    ctx.run("coverage html", pty=True)
