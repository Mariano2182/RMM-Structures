# RMM Structures Engineering 0.1.0

Aplicación local ejecutable para configurar naves, analizar pórticos planos y obtener comprobaciones parciales de acero referidas a CIRSOC 301-2018. Interfaz en español, sin API, suscripción ni dependencias de ejecución externas.

**Estado: desarrollo técnico con verificaciones parciales. No es un software certificado ni emite aptitud para construir.** El análisis global es elástico de primer orden. El Capítulo C, acciones reglamentarias automáticas, conexiones, secundarios y fundaciones permanecen pendientes. Una comprobación individual satisfecha no aprueba una obra.

## Inicio en Windows

1. Extraer el ZIP completo en una carpeta.
2. Ejecutar `Iniciar_Windows.bat`. Requiere Node.js 20+ o Python 3 instalado.
3. Abrir http://127.0.0.1:8080 si el navegador no abre automáticamente.
4. Pulsar **Calcular estructura**. El ejemplo contiene cargas ilustrativas; no es un proyecto apto para obra.

Alternativa desde una terminal, dentro de esta carpeta:

```sh
npm start
```

No hace falta `npm install`. Otra alternativa: `python -m http.server 8080 --bind 127.0.0.1`. VS Code Live Server también sirve. No abrir `index.html` por doble clic (`file://`): los módulos y el Worker necesitan un servidor HTTP. El programa funciona sin Internet después de copiarlo. El servidor sólo escucha en la computadora local.

## Estructura del proyecto

| Ruta | Responsabilidad |
|---|---|
| `index.html`, `styles.css` | Interfaz adaptable a escritorio y móvil |
| `src/ui/app.js` | Formularios, historial, resultados, exportaciones y Worker |
| `src/ui/viewer.js` | Vista espacial de ejes, selección y diagramas |
| `src/model/project.js` | Esquema, validación y lista única de piezas |
| `src/model/catalog.js` | Dimensiones de perfiles del proyecto original |
| `src/model/sections.js` | Propiedades de secciones y sustituciones documentadas |
| `src/core/math.js` | Álgebra, escalado y solución Cholesky |
| `src/analysis/frame2d.js` | Elemento de pórtico 2D y recuperación de esfuerzos |
| `src/analysis/assemble.js` | Tributación, peso propio, discretización y cargas |
| `src/analysis/run.js`, `worker.js` | Casos, envolventes y análisis fuera del hilo de interfaz |
| `src/codes/cirsoc301.js` | Capacidades y chequeos parciales de acero |
| `src/io/` | JSON, versiones locales, CSV, memoria HTML e IFC4 |
| `tests/` | Pruebas automáticas del motor y del flujo de datos |
| `examples/` | Proyecto, memoria, cómputo e IFC de ejemplo |
| `docs/` | Alcance, referencias, método y resultados de validación |
| `tools/` | Servidor local y generación reproducible de ejemplos |
| `reference/proyecto_original.zip` | Copia intacta del material recibido |

## Uso

1. Completar geometría, perfiles, material y apoyos.
2. Revisar las hipótesis comunes Kx/Ky/Kz, Ly/Lz, Lb y Ae/Ag. K no se deduce automáticamente.
3. Ingresar acciones justificadas y revisar combinaciones. La plantilla no constituye una envolvente reglamentaria completa.
4. Calcular. Explorar cada caso, reacciones y diagramas; revisar los chequeos excedidos y pendientes.
5. Guardar versión y descargar JSON. Cada botón del historial recupera esa versión exacta.
6. Descargar CSV o IFC para geometría; descargar la memoria HTML después del análisis. Abrirla en el navegador y elegir Imprimir → Guardar como PDF.
7. Descargar resultados JSON para acceder a cada elemento finito, desplazamiento y esfuerzo.

Modificar datos invalida los resultados anteriores. La memoria corresponde a la instantánea de entradas utilizada para calcular. El guardado local conserva hasta 50 versiones, depende del navegador y no reemplaza un respaldo JSON. El JSON del proyecto anterior no es compatible automáticamente; la copia original queda preservada como referencia.

## Unidades y convenciones

- Geometría: m. Masa: kg. Motor: kN, m, rad.
- Material en formulario: E, Fy y Fu en MPa; conversión interna a kN/m².
- D adicional y Lr: kN/m² de proyección horizontal, hacia abajo. D excluye peso propio de las barras, agregado automáticamente.
- W pared: presión equivalente horizontal en kN/m², aplicada sobre la columna izquierda; se calculan dos sentidos horizontales. W cubierta: componente vertical por área horizontal, positiva hacia arriba. La inversión de sentido horizontal conserva la componente vertical. No se generan coeficientes aerodinámicos ni zonificación.
- N positivo = tracción; V y M según los ejes locales de cada barra. Reacciones en ejes globales X horizontal, Y vertical.
- La vista espacial usa X transversal, Y vertical y Z longitudinal. IFC transforma a X,-Z,Y para mantener una base dextrógira con Z vertical.
- Flecha de servicio: desplazamiento vertical relativo a la cuerda de cada cabio, dividido por su longitud. No equivale automáticamente a la flecha global de toda la luz. Deriva = desplazamiento horizontal relativo de la columna / altura.

## Propiedades de perfiles

El catálogo original contiene dimensiones, pero propiedades incompletas. Esta versión calcula A, Ix, Iy, Sx, Zx, J y Cw para una idealización rectangular sin radios. La masa usa A × 7850 kg/m³; es coherente con la idealización, pero puede diferir de la masa comercial. J y Cw utilizan aproximaciones de pared delgada. El perfil se trata como laminado doble Te de doble simetría para los chequeos parciales. No usar esos valores como catálogo certificado.

Se admite reemplazar propiedades por datos documentados del **mismo perfil**, en el campo «Sustitución de propiedades» o en `sectionOverrides` del JSON. Estructura de cada entrada: clave del perfil; campos numéricos A, Ix, Iy, Sx, Zx, J, Cw en las unidades antes indicadas; `source` con documento y tabla; `verified` booleano. El programa no verifica por sí mismo el documento ni convierte esa declaración en certificación. La geometría IFC sigue idealizada sin radios aunque se sustituyan propiedades de cálculo.

## Alcance real

Ver [docs/ALCANCE.md](docs/ALCANCE.md) y [docs/NORMATIVA.md](docs/NORMATIVA.md). El resultado global siempre es `VERIFICACION_GLOBAL_INCOMPLETA`, y `approvedForConstruction` permanece falso. No hay botón para ocultar pendientes o liberar una obra.

## Pruebas

```sh
npm test
npm run example
```

Node.js 20+ es suficiente. La aplicación no necesita paquetes npm. Las herramientas opcionales de QA IFC/navegador se documentan aparte; no son dependencias del producto.

## Evolución respecto del ZIP original

Se reconstruyó el núcleo en módulos: modelo único, exportaciones implementadas, carga completa del formulario, versiones específicas y análisis real. Se conservó el catálogo geométrico y una copia original. Se eligió ejecutar localmente: no se reutilizaron el login demostrativo ni las políticas Supabase inseguras. La vista espacial representa ejes; las conexiones visuales anteriores no se trasladaron porque aún no tienen verificación ni cómputo coherentes. No se presenta esta versión como reemplazo completo de todas las funciones visuales originales.

Próximos hitos: validación profesional independiente; propiedades certificadas; Capítulo C y segundo orden; generación de acciones según edición/jurisdicción; CIRSOC 303; análisis espacial y arriostramientos; conexiones y fundaciones.
