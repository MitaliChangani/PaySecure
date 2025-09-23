from django.apps import AppConfig

class PaysecureConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'paysecure'

    def ready(self):
        import paysecure.signals  # this ensures signals are loaded
