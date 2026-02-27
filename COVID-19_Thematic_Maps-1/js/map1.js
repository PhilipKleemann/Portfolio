// initialize basemmap
        mapboxgl.accessToken =
            'pk.eyJ1IjoicGhpbGlwa2xlZW1hbm4yIiwiYSI6ImNtaWp5c2p2MDE2a3IzZXBtYnBjeDliNGoifQ.o5jwuQrTIuQ983mQAx4BwQ';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/dark-v10', // style URL
            zoom: 3.3, // starting zoom
            center: [-100, 40] // starting center
        });

        // load data and add as layer
        async function geojsonFetch() {
            let response = await fetch('assets/covid_rates.json');
            let covid_rates = await response.json();

            map.on('load', function loadingData() {
                map.addSource('covid_rates', {
                    type: 'geojson',
                    data: covid_rates
                });

                map.addLayer({
                    'id': 'covid_rates_layer',
                    'type': 'fill',
                    'source': 'covid_rates',
                    'paint': {
                        'fill-color': [
                            'step',
                            ['get', 'rates'],
                            '#FED976',   // stop_output_1
                            10,          // stop_input_1
                            '#FEB24C',   // stop_output_2
                            25,          // stop_input_2
                            '#FD8D3C',   // stop_output_3
                            50,         // stop_input_3
                            '#FC4E2A',   // stop_output_4
                            100,         // stop_input_4
                            '#E31A1C',   // stop_output_5
                            150,         // stop_input_5
                            '#BD0026',   // stop_output_6
                            200,        // stop_input_6
                            "#800026"    // stop_output_7
                        ],
                        'fill-outline-color': '#BBBBBB',
                        'fill-opacity': 0.7,
                    }
                });

                const layers = [
                    '0-9',
                    '10-24',
                    '25-49',
                    '50-99',
                    '100-149',
                    '150-199',
                    '200+'
                ];
                const colors = [
                    '#FED97670',
                    '#FEB24C70',
                    '#FD8D3C70',
                    '#FC4E2A70',
                    '#E31A1C70',
                    '#BD002670',
                    '#80002670'
                ];

                // create legend
                const legend = document.getElementById('legend');
                legend.innerHTML = "<b>Covid-19 Rates (per 1,000 people)<br></b><br>";


                layers.forEach((layer, i) => {
                    const color = colors[i];
                    const item = document.createElement('div');
                    const key = document.createElement('span');
                    key.className = 'legend-key';
                    key.style.backgroundColor = color;

                    const value = document.createElement('span');
                    value.innerHTML = `${layer}`;
                    item.appendChild(key);
                    item.appendChild(value);
                    legend.appendChild(item);
                });
            });

            map.on('mousemove', ({point}) => {
                const county = map.queryRenderedFeatures(point, {
                    layers: ['covid_rates_layer']
                });
                document.getElementById('text-description').innerHTML = county.length ?
                    `<h3>${county[0].properties.county}</h3><p><strong> Rate: <em>${county[0].properties.rates}</strong> per 1,000 people</em></p>` :
                    `<p>Hover over a county!</p>`;
            });
        }

        // Call the function to fetch GeoJSON data and load the map
        geojsonFetch();