# Scripts de Validación para Pre-commit

Este directorio contiene scripts que se ejecutan automáticamente en el pre-commit hook de Husky.

## Scripts

### `validate-i18n.js`
Valida que los componentes NO tengan strings hardcoded en contenido visible al usuario.

**Que revisa:**
- ✅ Texto dentro de componentes (`<Button>Save</Button>`)
- ✅ Placeholders (`placeholder="...">`)

**Que ignora:**
- aria-labels (son atributos técnicos)
- Archivos `.test.tsx` y `.stories.tsx`
- Líneas que ya usan `t('...')`

**Ejecución manual:**
```bash
npm run validate:i18n
```

---

### `validate-component-structure.js`
Valida que los NUEVOS componentes sigan la estructura Atomic Design correctamente.

**Que revisa (solo para nuevos componentes):**
- ✅ `[Component].tsx` debe tener `[Component].test.tsx`
- ✅ `[Component].tsx` debe tener `[Component].stories.tsx`
- ⚠️ Recomendado tener `index.tsx`

**Nota:** Solo valida archivos que están siendo "staged" en Git, así que el pre-commit no falla con componentes viejos.

**Ejecución manual:**
```bash
npm run validate:components
```

---

## Pre-commit Hook Completo

El hook `.husky/pre-commit` ejecuta en este orden:

1. **lint-staged** - ESLint + Prettier
2. **validate:i18n** - Verificar strings sin traducir
3. **validate:components** - Verificar estructura de componentes nuevos
4. **TypeScript check** - `tsc --noEmit`
5. **Unit tests** - `npm test --run`
6. **Build validation** - `npm run build`

Cualquier paso que falle detiene el commit.

---

## ESLint + a11y

Además, se agregaron reglas de accesibilidad en `eslint.config.mjs`:

```javascript
'jsx-a11y/alt-text': 'error',              // <img> debe tener alt
'jsx-a11y/anchor-has-content': 'error',    // <a> debe tener contenido
'jsx-a11y/aria-role': 'error',             // ARIA roles válidos
'jsx-a11y/label-has-associated-control': 'warn',  // <label> asociado a input
'jsx-a11y/no-static-element-interactions': 'warn', // <div> sin click handler
```

Estas se ejecutan en `lint-staged` como parte de ESLint.
