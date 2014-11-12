<img src="http://i.imgur.com/smI6f9P.png" width=100%>
A Mono application wrapper for Google Maps.

## Static maps

### Example

> http://maps.jillix.net/embed?options.zoom=11&options.type=ROAD&markers.0.icon.path=http://resources.jillix.net/res/jx/maps-marker.png&size=40&displayMarker=true&options.center.lng=8.660786799999983&options.center.lat=47.2374975&markers.0.position.lng=8.660786799999983&markers.0.position.lat=47.2374975&markers.0.icon.anchor.y=35&markers.0.icon.anchor.x=51

![](http://i.imgur.com/ApkKUv2.jpg)

### Querystring API (supports one marker only)

```js
{
  "name": {
      default: "No name"
  },
  "options.center.lat": { validator: validators.number },
  "options.center.lng": { validator: validators.number },
  "options.zoom": {
      validator: validators.number,
      default: 15
  },
  "options.type": {
      default: "ROADMAP"
  },
  "markers.0.label": {},
  "markers.0.title": {},
  "markers.0.position.lat": { validator: validators.number },
  "markers.0.position.lng": { validator: validators.number },
  "markers.0.icon.path": {},
  "markers.0.icon.label": {},
  "markers.0.icon.size.w": { default: 100, validator: validators.number },
  "markers.0.icon.size.h": { default: 100, validator: validators.number },
  "markers.0.icon.origin.x": { default: 0, validator: validators.number },
  "markers.0.icon.origin.y": { default: 0, validator: validators.number },
  "markers.0.icon.anchor.x": { default: 0, validator: validators.number },
  "markers.0.icon.anchor.y": { default: 0, validator: validators.number },
  "markers.0.infowin.content": {},
  "markers.0.visible": { default: true }
}
```

### Multiple marker maps

 1. Log in into [your account](http://maps.jillix.net/).
 2. Create your markers, icons, info windows
 3. Create the map and link the markers to it.
 4. After creating the map, use the generated link to embed it (e.g. `http://maps.jillix.net/embed?mapId=<generated id>`)

## Dynamic maps

Access map data from remote interface/file.

> `maps.jillix.net/embed?data=http://example.com/api/map/getData`

or

> `maps.jillix.net/embed?data=http://example.com/map_data.json`

The response should end with a `200` status code.

# Resource Types
The map must receive data as *Map data* resource type.

## Map data

```js
{
  "name": {"type": "string"},
  "options": {
    "center": {
      "lat": {"type": "number"},
      "lng": {"type": "number"},
    },
    "zoom": {"type": "number"},
    "type": {"type": "string"}
  },
  "markers": [{
    "type": "marker"
  }]
}
```

## Marker

```js
{
  "title": {"type": "string"},
  "position": {
    "lat": {"type": "number"},
    "lng": {"type": "number"},
  },
  "visible": {"type": "boolean", "default": true},
  "infowin": {"type": "infowindow"},
  "icon": {"type": "icon"}
}
```

## Info Window

```js
{
  "content": {"type": "string"}
}
```

## Icon

```js
{
    "path": {"type": "string"},
    "size": {
        "w": {"type": "number"},
        "h": {"type": "number"}
    },
    "origin": {
        "x": {"type": "number"},
        "y": {"type": "number"}
    },
    "anchor": {
        "x": {"type": "number"},
        "y": {"type": "number"}
    }
}
```

## License
See the LICENSE file.
