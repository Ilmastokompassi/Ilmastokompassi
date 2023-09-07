from invoke import task


@task
def start(ctx, pty=True):
    ctx.run("flask --app ./app.py run")

@task
def dev(ctx, pty=True):
    ctx.run("flask --app ./app.py run --debug")