from django.urls import path
from .views import population_data, gdp_data, countries_list
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # JWT auth
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # API endpoints
    path("population/", population_data, name="population"),
    path("gdp/", gdp_data, name="gdp"),
    path("countries/", countries_list, name="countries_list"),  # ✅ new endpoint
]

