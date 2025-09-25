# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import CustomUser, Franchise

# @receiver(post_save, sender=CustomUser)
# def create_franchise_for_user(sender, instance, created, **kwargs):
#     if created and instance.role == "franchise":
#         Franchise.objects.create(user=instance)
