import argparse
import requests

API_KEY = "057472xxxxxxxxxxxxxxxxxxxxxxxxxxxx51109" 
BASE_URL = "http://api.weatherapi.com/v1/current.json"

def get_weather(city):
    params = {
        "key": API_KEY,
        "q": city,
        "aqi": "no"
    }

    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        data = response.json()

        location = data["location"]["name"]
        country = data["location"]["country"]
        temp = data["current"]["temp_c"]
        condition = data["current"]["condition"]["text"]
        wind = data["current"]["wind_kph"]

        print(f"🌍 {location}, {country}")
        print(f"🌡️ Temperature: {temp}°C")
        print(f"🌤️ Weather: {condition}")
        print(f"💨 Wind Speed: {wind} kph")

    except requests.exceptions.HTTPError as err:
        if response.status_code == 400:
            print("❌ Invalid city or bad request.")
        else:
            print(f"❌ HTTP Error: {err}")
    except Exception as e:
        print(f"❌ An error occurred: {e}")

def main():
    parser = argparse.ArgumentParser(description="Simple Weather CLI Tool (WeatherAPI.com)")
    parser.add_argument("--city", required=True, help="City name to get the weather for")
    args = parser.parse_args()

    get_weather(args.city)

if __name__ == "__main__":
    main()
