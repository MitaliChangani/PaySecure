from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from paysecure.models import WithdrawalRequest
from paysecure.views import assign_to_random_franchise

class Command(BaseCommand):
    help = "Reassign unaccepted withdrawal requests after 5 minutes"

    def handle(self, *args, **kwargs):
        cutoff = timezone.now() - timedelta(minutes=5)
        requests = WithdrawalRequest.objects.filter(
            status="assigned",
            accepted_by_franchise=False,
            assigned_at__lt=cutoff
        )

        for req in requests:
            self.stdout.write(f"Reassigning withdrawal {req.id}")
            franchise = assign_to_random_franchise(req)
            if franchise:
                self.stdout.write(f"Withdrawal {req.id} reassigned to {franchise.username}")
            else:
                self.stdout.write(f"No franchise available to reassign withdrawal {req.id}")

