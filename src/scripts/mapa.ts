/*
 * Mapa de sucursales (Google Maps) de la sección Ubicaciones.
 * Necesita PUBLIC_GOOGLE_MAPS_API_KEY en .env; sin ella muestra un aviso en lugar del mapa.
 */
  const el = document.getElementById('mapa');
  const key = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;

  type Sucursal = { n: string; d: string; c: [number, number]; slug: string };

  function fallback(el: HTMLElement, msg: string) {
    el.textContent = msg;
    el.classList.add('mapa-vacio');
  }

  if (el) {
    if (!key) {
      fallback(el, 'Mapa no disponible: falta PUBLIC_GOOGLE_MAPS_API_KEY.');
    } else {
      const data: Sucursal[] = JSON.parse(el.dataset.sucursales || '[]');
      (window as any).__initMapa = () => {
        const g = (window as any).google.maps;
        const bounds = new g.LatLngBounds();
        const map = new g.Map(el, {
          center: { lat: data[0].c[0], lng: data[0].c[1] },
          zoom: 9,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'cooperative',
          styles: [
            { stylers: [{ saturation: -100 }, { lightness: 12 }] },
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            { featureType: 'transit', stylers: [{ visibility: 'off' }] },
          ],
        });
        const info = new g.InfoWindow();
        data.forEach((s) => {
          const position = { lat: s.c[0], lng: s.c[1] };
          bounds.extend(position);
          const marker = new g.Marker({
            map,
            position,
            title: s.n,
            icon: { url: el.dataset.icon, scaledSize: new g.Size(36, 33), anchor: new g.Point(18, 33) },
          });
          marker.addListener('click', () => {
            info.setContent(
              `<div style="font-family:Outfit,sans-serif;color:#bc1417"><strong>${s.n}</strong><br>${s.d}<br>` +
                `<a style="color:#bc1417;font-weight:600" href="/sucursales#${s.slug}">Más información</a></div>`,
            );
            info.open({ map, anchor: marker });
          });
        });
        map.fitBounds(bounds, 48);
      };
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&callback=__initMapa&loading=async`;
      script.async = true;
      script.onerror = () => fallback(el, 'No se pudo cargar el mapa.');
      document.head.appendChild(script);
    }
  }
