# Alcance de la versión 0.1.0

## Modelo mecánico

Pórticos planos independientes de una planta, prismáticos, con nudos superiores rígidos. Bases articuladas o empotradas. Secciones doble Te de doble simetría. Cada barra se discretiza entre 2 y 12 elementos Euler–Bernoulli (3 grados de libertad por nodo). Se considera deformación axial y flexión en el plano; no deformación por corte, torsión global, alabeo global ni plasticidad.

El pórtico no es un modelo resistente tridimensional del edificio. La distribución longitudinal usa anchos tributarios: medio vano en pórticos extremos y vano completo en interiores. Correas y largueros transfieren su peso a pórticos adyacentes, mitad a cada uno, mediante cargas equivalentes distribuidas. No se calculan las resistencias de esos secundarios. La transmisión de cargas mediante diafragmas, discontinuidades y aberturas no está implementada.

Uniones rígidas y restricciones laterales constituyen hipótesis de entrada, no conclusiones de diseño. La interfaz limita tamaño y geometría; el solucionador detecta mecanismos mediante pérdida de positividad de la matriz reducida, sin estabilización artificial. No soporta asientos de apoyo ni liberaciones internas.

## Estados

- SATISFACE_CHEQUEO: demanda calculada menor o igual a capacidad del chequeo implementado, dentro de las hipótesis declaradas.
- NO_SATISFACE: índice mayor que uno.
- NO_VERIFICADO: la fórmula implementada no corresponde al caso, por ejemplo sección esbelta fuera de alcance.
- VERIFICACION_GLOBAL_INCOMPLETA: resultado general permanente de esta versión, aun si todos los chequeos parciales satisfacen sus límites.

Las capacidades se comparan con demandas de PRIMER ORDEN. No representan verificación de estabilidad global ni diseño integral del miembro según el Capítulo C. Los resultados individuales deben interpretarse como evaluación parcial.

## Pendientes que impiden una aprobación global

Segundo orden e imperfecciones; estabilidad longitudinal; acciones completas y justificación local; sismo; nieve; lluvia/embalsamiento; acciones térmicas; etapas de montaje; viento por zonas y cerramientos; cargas de equipos o puentes grúa; fatiga; incendio; conexiones; paneles nodales y cargas concentradas; anclajes; suelo y fundaciones; resistencia de secundarios; tolerancias y fabricación; revisión independiente.

El paquete no incluye cálculos de obra, firma, aprobación municipal ni certificación INTI. La selección de edición/jurisdicción debe resolverla el responsable del proyecto antes de utilizar resultados para decisiones constructivas.
