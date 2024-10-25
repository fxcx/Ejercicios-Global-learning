.vsCode
- contiene la config de ts-standard, corregirá los errores de manera automática aplica eslint estandar y formatea de acuerdo con las reglas de estilo definidas por ts-standard.

- se debe instalar "ts-standard" como una dependencia de desarrollo

```bash
npm install -D ts-standard
```
```bash
bun add -D eslint ts-standard
```
- Tener un archivo .vscode/settings.json por proyecto es una buena opcion cada proyecto puede requerir diferentes requerimientos o gustos de personalizacion

.vscode/settings.json
```json
{
  "editor.formatOnSave": false,
  "editor.defaultFormatter": "vscode.typescript-language-features",
  "javascript.validate.enable": false, // Desactiva la validación por defecto de JS
  "standard.enable": true, // Activa standardjs
  "standard.autoFixOnSave": true, // Aplica auto-fix al guardar
  "[typescriptreact]": {
    "editor.defaultFormatter": "standard.vscode-standard"
  },
  "[javascript]": {
    "editor.defaultFormatter": "standard.vscode-standard",
    "editor.formatOnSave": true
  },
  "json.schemas": [],
  "vsicons.presets.jsOfficial": false
}
```