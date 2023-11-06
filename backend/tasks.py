from invoke import task


@task
def start(ctx, pty=True):
    ctx.run("flask --app ./src/app.py run --host=0.0.0.0")


@task
def dev(ctx):
    ctx.run("flask --app ./src/app.py run --debug --host=0.0.0.0", pty=True)


@task
def test(ctx):
    ctx.run("pytest src", pty=True)


@task
def coverage(ctx):
    ctx.run("coverage run --branch -m pytest src", pty=True)


@task(coverage)
def coverage_report(ctx):
    ctx.run("coverage html", pty=True)


@task
def lint(ctx):
    ctx.run("pylint src")


@task
def format(ctx):
    ctx.run("autopep8 --in-place --recursive src")
