web: gunicorn config.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: celery --workdir backend --app=config worker -B --loglevel=info
beat: celery --workdir backend --app=config beat -S redbeat.RedBeatScheduler --loglevel=info
