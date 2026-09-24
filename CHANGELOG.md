# Cambios 0.1.0 — 23/09/2026

- Nueva arquitectura modular sin dependencias de ejecución.
- Lista única de barras para cantidades, vista espacial e IFC.
- Corrección de columnas de una agua y duplicación de correas.
- Análisis elástico de pórticos 2D con cargas distribuidas y peso propio.
- Tributación de extremos y pórticos interiores, dos sentidos horizontales de viento manual.
- Comprobaciones parciales CIRSOC 301-2018 con datos intermedios y estados pendientes explícitos.
- Factores de resistencia específicos de la edición: compresión 0.85; flexión/corte 0.90.
- Combinaciones editables y datos de origen de cargas.
- Exportación de memoria HTML imprimible, CSV, JSON e IFC4 geométrico.
- Historial local por identificador estable y recuperación de revisión específica.
- Validación de entradas, escape de texto e invalidación de resultados al editar.
- Pruebas analíticas y de regresión. Alcance profesional aún incompleto.

El ZIP original se preserva en reference. La versión nueva no incorpora Supabase ni el editor de conexiones visuales anterior. Los proyectos antiguos requieren migración manual: no se convierten silenciosamente a perfiles o hipótesis distintas.
