"""QA opcional: pip install ifcopenshell pytest. No dependencia de ejecución web."""
import sys
import ifcopenshell
import ifcopenshell.validate
import ifcopenshell.geom
f = ifcopenshell.open(sys.argv[1])
log = ifcopenshell.validate.json_logger()
ifcopenshell.validate.validate(f, log, express_rules=True)
failed = []
for part in f.by_type('IfcElement'):
    try:
        ifcopenshell.geom.create_shape(ifcopenshell.geom.settings(), part)
    except Exception as error:
        failed.append((part.Name, str(error)))
print('Productos:', len(f.by_type('IfcElement')))
print('Incidencias de esquema:', len(log.statements))
print('Fallos de geometría:', len(failed))
for entry in log.statements:
    print(entry['message'])
for entry in failed:
    print(entry)
sys.exit(1 if log.statements or failed else 0)
