from typing import List
from geopy.distance import geodesic

def sort_by_distance(items: List, latitude: float, longitude: float, radius: float = float('inf')):
    origin = (latitude, longitude)
    filtered_items = []

    for item in items:
        destination = (item.latitude, item.longitude)
        distance = geodesic(origin, destination).kilometers
        print(type(distance), type(radius))
        if distance <= radius:
            filtered_items.append((item, distance))

    # sort by distance
    sorted_items = sorted(filtered_items, key=lambda x: x[1])
    res_items = [item[0] for item in sorted_items]
    return res_items
