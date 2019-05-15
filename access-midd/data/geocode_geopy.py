# Source: https://github.com/geopy/geopy

from geopy.geocoders import Nominatim
import pandas as pd

def geocode(addresses):
    """Given a list of street addresses, extract and return their geographic coordinates"""
    geolocator = Nominatim(user_agent="access_midd")
    lats = []
    longs = []
    for address in addresses:
        location = geolocator.geocode(address)
        if not not location:
            lats.append(location.latitude)
            longs.append(location.longitude)
        else:
            lats.append(None)
            longs.append(None)
    return lats, longs

def encode_file(list_name):
    """Add coordinates to csv file buildings_[list_name].csv"""
    input_file = "buildings_" + list_name + ".csv"
    output_file = "buildings_" + list_name + "_coord.csv"

    data = pd.read_csv(input_file, encoding='utf8')
    addresses = data["Address"].tolist()
    lats, longs = geocode(map(add_midd, addresses))
    data["latitude"] = lats
    data["longitude"] = longs

    data.to_csv(output_file)

def add_midd(string):
    return string + " Middlebury VT 05753"

if __name__ == "__main__":
    encode_file("academic")
    encode_file("residential")
