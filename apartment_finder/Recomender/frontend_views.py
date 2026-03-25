# creted basic template for frontend views

from django.conf import settings
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.views import View


class IndexView(View):
    """Landing page with the recommendation form."""

    def get(self, request: HttpRequest) -> HttpResponse:
        context = {
            "city_config": settings.CITY_CONFIG,
            "default_city": settings.DEFAULT_CITY,
            "page_title": "PRLSS – Find Your Perfect Home",
            "meta_description": (
                "Personalized Relocation Suggestion System. "
                "Enter your workplace location and budget to get ML-powered apartment recommendations."
            ),
        }
        return render(request, "index.html", context)