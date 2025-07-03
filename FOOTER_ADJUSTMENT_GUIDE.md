# 📏 Guía de Ajuste del Footer

## 🎯 Sistema de Control Granular

El footer usa un sistema de **CSS Grid personalizado** que te permite hacer ajustes finos fácilmente.

### 🔧 Ubicación del código:
`components/sections/Footer.tsx` - líneas 112-118

### ⚙️ Controles Disponibles:

#### 1. **Ancho de Columnas** (gridTemplateColumns)
```css
gridTemplateColumns: '2.5fr 1.8fr 2fr 2.2fr'
```
- **2.5fr** = Columna 1 (Logo Palmera)
- **1.8fr** = Columna 2 (Navegación) 
- **2.0fr** = Columna 3 (Portland)
- **2.2fr** = Columna 4 (Social + Website)

**Ejemplo:** Para hacer la columna 2 más ancha:
```css
gridTemplateColumns: '2.5fr 2.2fr 2fr 2.2fr'
```

#### 2. **Posición Horizontal** (translateX)
```css
/* Columna 2 - Navegación */
transform: 'translateX(10px)'   // 10px a la derecha

/* Columna 3 - Portland */ 
transform: 'translateX(-5px)'   // 5px a la izquierda

/* Columna 4 - Social */
transform: 'translateX(-10px)'  // 10px a la izquierda
```

**Ejemplo:** Para mover la navegación más a la izquierda:
```css
transform: 'translateX(0px)'    // Sin movimiento
transform: 'translateX(-15px)'  // 15px a la izquierda
```

#### 3. **Espaciado Entre Columnas** (gap)
```css
gap: '2rem'  // Espacio actual
gap: '3rem'  // Más espacio
gap: '1.5rem'  // Menos espacio
```

### 🎨 Valores Recomendados:

#### Para **más equilibrio**:
```css
gridTemplateColumns: '2.2fr 2fr 2fr 2.4fr'
```

#### Para **columna 2 más centrada**:
```css
transform: 'translateX(0px)'  // En lugar de 10px
```

#### Para **más espacio entre elementos**:
```css
gap: '2.5rem'
```

### 🚀 Cambios Rápidos:

1. Abre `components/sections/Footer.tsx`
2. Busca la línea 112-118 (gridTemplateColumns)
3. Modifica los valores según necesites
4. Guarda y refresca para ver cambios

¡Es así de simple! 🎉 