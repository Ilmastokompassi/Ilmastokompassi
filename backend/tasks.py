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