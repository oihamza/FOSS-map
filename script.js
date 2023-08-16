mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtemEyM3Jmd3IiLCJhIjoiY2xsZTNlcm83MGVnNDN0cXZhYnQ3cDhsZCJ9.3FpH8YW_ZqmK58VotzLrsQ';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-73.87808835341879, 40.73936277892708], // Queens, NY coordinates
    zoom: 11
});

const landmarks = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-73.846231, 40.746922]
            },
            "properties": {
                "name": "Flushing Meadows-Corona Park",
                "description": "This park hosted both the 1939 and 1964 World's Fairs, making it home to iconic structures like the Unisphere and the New York State Pavilion."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-73.857546, 40.739591]
            },
            "properties": {
                "name": "Louis Armstrong House Museum",
                "description": "The former home of legendary jazz musician Louis Armstrong, now a museum dedicated to his life and legacy."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-73.846008, 40.745867]
            },
            "properties": {
                "name": "Queens Museum",
                "description": "Located in Flushing Meadows-Corona Park, the museum features the Panorama of the City of New York, a detailed scale model of the city."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-73.936598, 40.767869]
            },
            "properties": {
                "name": "Socrates Sculpture Park",
                "description": "An outdoor museum and public park in Long Island City, showcasing contemporary sculptures and hosting cultural events."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-73.825545, 40.763037]
            },
            "properties": {
                "name": "Bowne House",
                "description": "One of the oldest structures in Queens, the Bowne House is a historic house museum that offers insights into colonial history."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-73.802899, 40.704279]
            },
            "properties": {
                "name": "King Manor Museum",
                "description": "The preserved home of Rufus King, a Founding Father and early advocate against slavery, located in Jamaica."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-73.776688, 40.789492]
            },
            "properties": {
                "name": "Fort Totten",
                "description": "A former military base, Fort Totten played a role in the Civil War and has been preserved as a historic site with well-preserved buildings."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-73.827797, 40.760779]
            },
            "properties": {
                "name": "Flushing Freedom Mile",
                "description": "A walking trail highlighting historical sites related to the abolition of slavery in Flushing, including the Quaker Meeting House."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-73.89971952993675, 40.779334411398125]
            },
            "properties": {
                "name": "Steinway & Sons Factory",
                "description": "Although no longer in Queens, the historic Steinway piano factory once operated there and had a significant impact on the area's history."
            }
        }
    ]
};

map.on('load', function() {
    map.addSource("landmarks", {
        type: "geojson",
        data: landmarks,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });
    
    map.addLayer({
        id: "landmarks-points",
        type: "circle",
        source: "landmarks",
        paint: {
            "circle-color": "#FF0000",
            "circle-radius": 10
        }
    });

    map.on('click', 'landmarks-points', function(e) {
        let coordinates = e.features[0].geometry.coordinates.slice();
        let name = e.features[0].properties.name;
        let description = e.features[0].properties.description;
        
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
          map.easeTo({
            center: coordinates,
            zoom: 15,
            duration: 2000
        });

        let popup = new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML('<h3>' + name + '</h3><p>' + description + '</p>')
        .addTo(map);

    popup.on('close', function() {
        map.easeTo({
            center: [-73.87808835341879, 40.73936277892708],  // The center you want after zooming out, in this case, back to Queens, NY
            zoom: 11,
            duration: 1000
        });
    });

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML('<h3>' + name + '</h3><p>' + description + '</p>')
            .addTo(map);
    });
    
    map.on('mouseenter', 'landmarks-points', function() {
        map.getCanvas().style.cursor = 'pointer';
    });
    
    map.on('mouseleave', 'landmarks-points', function() {
        map.getCanvas().style.cursor = '';
    });
});
