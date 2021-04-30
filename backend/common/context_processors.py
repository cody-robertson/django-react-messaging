from django.conf import settings


def commit_sha(request):
    return {"COMMIT_SHA": settings.COMMIT_SHA}
