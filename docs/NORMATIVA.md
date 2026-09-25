# Referencias y trazabilidad

Consulta de fuentes oficiales: 23/09/2026. No se redistribuyen textos reglamentarios ni se atribuye certificación al producto.

- [CIRSOC 301-2018, texto aprobado, INTI](https://www.inti.gob.ar/assets/uploads/files/cirsoc/08-reglamentos-3ra-generacion/area300/08_Area300-1A-301-Reglamento-CIRSOC-301-18-APROBADO.pdf)
- [Catálogo de reglamentos y resoluciones, INTI](https://www.inti.gob.ar/areas/servicios-industriales/construcciones-e-infraestructura/cirsoc/reglamentos)
- [Resolución SOP 11/2026](https://www.inti.gob.ar/assets/uploads/files/cirsoc/resoluciones-legales/03/RESOL-2026-11-APN-SOP-MEC_CIRSOC.pdf)

La nueva aprobación nacional de documentos no implica que esta aplicación los haya implementado. El módulo de acero está fijado a 301-2018. Acciones: ingreso manual. Compatibilidad entre ediciones y aplicación local: pendientes.

| Implementación | Referencia | Límite |
|---|---|---|
| Tracción | D.2 | Fluencia y rotura; área efectiva ingresada |
| Compresión | E.1, E.2, E.3 y E.4 | Doble simetría, sección no esbelta; K y longitudes ingresados |
| Flexión | F.2 | Sección compacta; Cb=1; dos posiciones de carga |
| Corte | G.1 y G.2 | Alma sin rigidizadores, kv=5, h/tw hasta 260 |
| Interacción | H.1 | Axial y flexión fuerte, demandas de primer orden |

Las capacidades y datos intermedios quedan en `capacities.trace`. Las ecuaciones se implementan en código original con unidades homogéneas; los factores de resistencia de compresión y corte se fijan específicamente para la edición indicada. La aplicación de las fórmulas a datos idealizados requiere revisión.

## Decisiones de implementación

- Sección doble Te laminada idealizada: comprobación de esbeltez local usando altura libre sin descuento de radios. No se calcula ancho efectivo de elementos esbeltos.
- Torsión de columna: comprobación de la rama de doble simetría. Propiedades torsionales aproximadas salvo sustitución documentada.
- Flexión: máximo plástico limitado por el tope elástico reglamentario. Posición de carga al centro de corte o ala superior; carga por encima del ala fuera de alcance. Supuesta restricción torsional en extremos del segmento no arriostrado.
- Interacción N–M: se combinan máximos absolutos de N y M de la misma barra y del mismo caso, conservadoramente, sin mezclar casos de carga distintos. Las demandas no incorporan Capítulo C.
- La esbeltez global se informa como chequeo adicional. No se aplican excepciones para barras dimensionadas por tracción que reciben compresión incidental.
- Las combinaciones iniciales son un subconjunto ilustrativo D/Lr/W de B.2, con factores y procedencia visibles. Deben ampliarse/revisarse para el proyecto real; no existe certificación de cobertura.
- Los límites de servicio son valores de usuario, no un catálogo automático normativo.

## Fórmulas de mecánica y reproducción

Motor kN–m: rigidez axial EA/L y matriz clásica de flexión Euler–Bernoulli, ensambladas por transformación ortogonal. Cargas uniformes equivalentes consistentes. Solución simétrica escalada. Esfuerzos de extremo = k local × desplazamientos locales − cargas equivalentes. Recuperación interna con equilibrio de la carga repartida; se incorporan extremos analíticos del momento. Desplazamientos incluyen particular cuártica para la carga uniforme.

Los chequeos no ejecutados no se sustituyen por valores favorables. `approvedForConstruction` es siempre falso y no cambia al importar un JSON externo.
