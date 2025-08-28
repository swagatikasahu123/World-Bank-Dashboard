from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import requests

WORLD_BANK_BASE_URL = "http://api.worldbank.org/v2/country/{country}/indicator/{indicator}?format=json&date={start}:{end}&per_page=1000"

POPULATION_INDICATOR = "SP.POP.TOTL"
GDP_INDICATOR = "NY.GDP.PCAP.CD"


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def population_data(request):
    countries = request.GET.get("countries", "")
    start_year = request.GET.get("start_year", "2000")
    end_year = request.GET.get("end_year", "2020")

    if not countries:
        return Response({"error": "No countries provided"}, status=400)

    result = {}
    for country in countries.split(","):
        url = WORLD_BANK_BASE_URL.format(
            country=country, indicator=POPULATION_INDICATOR, start=start_year, end=end_year
        )
        try:
            res = requests.get(url).json()
            if isinstance(res, list) and len(res) > 1:
                result[country] = [
                    {"year": entry["date"], "value": entry["value"] or 0} for entry in res[1]
                ][::-1]
            else:
                result[country] = []
        except:
            result[country] = []
    return Response(result)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def gdp_data(request):
    countries = request.GET.get("countries", "")
    start_year = request.GET.get("start_year", "2000")
    end_year = request.GET.get("end_year", "2020")

    if not countries:
        return Response({"error": "No countries provided"}, status=400)

    result = {}
    for country in countries.split(","):
        url = WORLD_BANK_BASE_URL.format(
            country=country, indicator=GDP_INDICATOR, start=start_year, end=end_year
        )
        try:
            res = requests.get(url).json()
            if isinstance(res, list) and len(res) > 1:
                result[country] = [
                    {"year": entry["date"], "value": entry["value"] or 0} for entry in res[1]
                ][::-1]
            else:
                result[country] = []
        except:
            result[country] = []
    return Response(result)


# ✅ New endpoint for fetching all countries dynamically
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def countries_list(request):
    """
    Returns a list of all available countries from World Bank API
    """
    url = "http://api.worldbank.org/v2/country?format=json&per_page=300"
    try:
        res = requests.get(url).json()
        countries = []
        if isinstance(res, list) and len(res) > 1:
            for c in res[1]:
                countries.append({"id": c["id"], "name": c["name"]})
        return Response(countries)
    except:
        return Response([])
