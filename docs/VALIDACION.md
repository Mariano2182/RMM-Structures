# Validación de desarrollo

## Pruebas automatizadas incluidas

Ejecutar `npm test` desde la raíz. Las pruebas usan el corredor incorporado de Node, sin paquetes adicionales.

| Caso independiente | Magnitud de referencia |
|---|---|
| Viga apoyada con q uniforme | R=qL/2; Mmax=qL²/8; flecha=5qL⁴/(384EI) |
| Voladizo con fuerza en punta | flecha=PL³/(3EI); giro=PL²/(2EI) |
| Voladizo con q uniforme | flecha=qL⁴/(8EI); momento de apoyo=qL²/2 |
| Viga biempotrada con q uniforme | momentos=qL²/12; flecha=qL⁴/(384EI) |
| Barra axial | alargamiento=PL/(EA) |
| Barra inclinada / columna | invariancia ante cambio de orientación |

Se comprueban equilibrio, signos, superposición y rechazo de mecanismos. Para proyecto se comprueba que no existan piezas coincidentes, que mono-pendiente ajuste altura de columna, que cantidades CSV/IFC coincidan con la lista y que la suma de reacciones reproduzca peso propio y cargas superficiales.

Para el módulo normativo se comprueban ramas de pandeo, factores de resistencia, continuidad y monotonía de flexión, rechazo de secciones fuera de alcance y detección de demandas excesivas. Estas son pruebas de implementación; no constituyen validación profesional integral de cada artículo.

## Tolerancias

Casos analíticos: error absoluto/relativo normalizado generalmente 1e-8, salvo referencias redondeadas explícitas. Balance global del proyecto: 1e-6. El solucionador también comprueba residuos libres respecto de la escala de cargas y rechaza sistemas mal condicionados.

Las deformaciones de servicio se muestrean en 21 posiciones por elemento, con al menos 2 elementos por barra. Las gráficas representan ese muestreo. Los momentos añaden el extremo analítico de la parábola para no omitirlo en las verificaciones. La interacción combina conservadoramente máximos del mismo caso.

## IFC

El archivo de ejemplo se somete a validación de esquema IFC4 y reglas EXPRESS con IfcOpenShell, además de intentar construir la geometría de cada producto. Esto comprueba esquema y geometría del ejemplo; no garantiza que todos los programas BIM interpreten materiales, orientación o intercambio del mismo modo. No se exportan análisis, uniones ni certificación estructural.

Se puede repetir con una instalación opcional de Python y `ifcopenshell`, `pytest`, mediante `python tools/validate_ifc.py examples/modelo-ejemplo.ifc`.

## Falta para uso profesional

Comparaciones con software estructural independiente sobre casos completos; ejemplos reglamentarios revisados por un calculista; ensayos de sensibilidad de discretización y estabilidad; validación de propiedades comerciales; revisión de hipótesis y cobertura normativa; control de cambios firmado. No se ha realizado una revisión independiente por un ingeniero matriculado durante este desarrollo.
