# Plan de Implementación: Agenda Flexible para Terapeutas y Centro de Notificaciones en Yoli

Plan arquitectónico y funcional actualizado para incorporar el módulo de **Agenda Flexible y Personalizable para Terapeutas** y el **Centro de Notificaciones Interactivo**, excluyendo explícitamente cualquier gestión de pagos de clientes en esta etapa inicial.

## Decisiones Críticas y Preferencias Confirmadas

> [!IMPORTANT]
> - **Sin Pasarela de Pagos**: La plataforma **NO gestionará pagos de clientes** en su inicio. El flujo de reserva concluye con la confirmación de la cita, permitiendo que el pago se coordine libremente entre paciente y terapeuta (en consulta o por transferencia acordada).
> - **Agenda Flexible (Global vs. Por Día Separado)**: El terapeuta puede elegir entre:
>   - *Modo uniforme*: Configurar un mismo horario y aplicarlo a todos los días laborables.
>   - *Modo por día*: Configurar horas específicas de forma independiente para cada día de la semana.
> - **Selector de Duración de Citas**: Botones directos con las opciones `30 min`, `45 min` y `60 min`.
> - **Días Laborables y Horas**: Interruptores claros para definir qué días trabaja y qué horas exactas del día atiende.
> - **Centro de Notificaciones**: Panel interactivo desde la campana con avisos de citas y confirmaciones.

---

## 1. Visión General del Producto & Concepto

Este módulo permite a cada terapeuta tener control absoluto sobre su tiempo y disponibilidad profesional dentro de **yoli**:

1. **Gestión de Disponibilidad para Terapeutas**:
   - Disponible en el perfil del terapeuta (`Página 3`) y como acceso directo.
   - Posibilidad de alternar con un interruptor entre *"Mismo horario para todos los días"* o *"Personalizar día por día"*.
   - Selector táctil de duración de sesión: `30 min`, `45 min` o `60 min`.
   - Activar o desactivar días de la semana (Lunes a Domingo).
   - En cada día activo, habilitar o deshabilitar bloques de horas (ej: 09:00, 10:30, 12:00, 16:00, 17:30, 19:00).
   - Bloquear fechas específicas (vacaciones, congresos, días festivos).

2. **Sincronización Transparente con la Reserva de Pacientes (`Página 7`)**:
   - Cuando un paciente agenda una cita, el calendario mensual lee la configuración del terapeuta seleccionado:
     - Los días marcados como no laborables o bloqueados por vacaciones aparecen deshabilitados.
     - Las horas desplegadas se calculan respetando la duración configurada (`30`, `45` o `60` min) y las franjas activas de ese día.
   - La reserva se confirma directamente sin solicitar datos de tarjeta ni pagos, mostrando un resumen claro para acudir a la sesión o conectarse online.

3. **Centro de Notificaciones Interactivo (Campana en `Página 1`)**:
   - Badge con conteo de avisos pendientes.
   - Panel deslizable con notificaciones de citas agendadas, recordatorios y avisos de la comunidad.
   - Opción de marcar como leídas y navegación directa a "Mis Citas".

---

## 2. Experiencia de Usuario & Diseño Visual

### Interfaz del Módulo de Agenda (`TherapistScheduleManager`)
- **Control de Modo de Configuración**:
  - Segmented control moderno: `[ Todos los días por igual | Configurar día por día ]`.
- **Selector de Duración**:
  - Tres botones de fácil pulsación (`30 min`, `45 min`, `60 min`) con estado activo en rosa marca `#ED64A6`.
- **Días de la Semana**:
  - Filas elegantes para cada día (Lunes a Domingo) con toggle de encendido/apagado.
  - Al estar activo, muestra los botones de horas disponibles con posibilidad de añadir o desmarcar horas concretas.
- **Días Bloqueados (Vacaciones)**:
  - Lista de fechas puntuales excluidas con botón para añadir y remover.
- **Feedback Inmediato**:
  - Botón de guardado rápido con confirmación visual sutil y guardado persistente en `localStorage`.

### Interfaz del Centro de Notificaciones (`NotificationDrawer`)
- Modal / Drawer nativo deslizable desde la parte superior o lateral.
- Conteo de avisos no leídos en la campana de la cabecera.
- Tarjetas con tipo de aviso:
  - 📅 **Cita Próxima**: Fecha, hora, terapeuta y modalidad.
  - ✅ **Reserva Confirmada**: Comprobante de confirmación inmediata.
  - 🌿 **Noticia / Taller**: Novedades de la comunidad holística.
- Botones de acción: *"Marcar leídas"* y enlace a la cita.

---

## 3. Arquitectura y Modelo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                       ESTADO DE LA APP                      │
│  - Bookings (Reservas de pacientes sin pasarela de pago)    │
│  - TherapistSchedule (Configuración por terapeuta)          │
│  - Notifications (Historial de avisos y recordatorios)      │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌─────────────────────────────┐       ┌─────────────────────────────┐
│  AGENDA TERAPEUTA           │       │  CENTRO DE NOTIFICACIONES   │
│  - Mode: 'uniform' | 'daily'│       │  - Unread count badge       │
│  - SlotDuration: 30|45|60   │       │  - Lista interactiva        │
│  - DailyHours: { [day]: [] }│       │  - Navegación a citas       │
│  - BlockedDates: string[]   │       └─────────────────────────────┘
└───────────┬─────────────────┘
            │
            ▼
┌─────────────────────────────┐
│  RESERVA CLIENTE (Pág 7)    │
│  - Solo muestra días hábiles│
│  - Despliega horas según la │
│    duración elegida         │
│  - Confirmación directa     │
│    (sin pasarela de pago)   │
└─────────────────────────────┘
```

### Modelo `TherapistSchedule`:
```typescript
export interface DaySchedule {
  enabled: boolean;
  slots: string[]; // ej: ['09:00', '10:00', '11:00', '16:00', '17:00']
}

export interface TherapistSchedule {
  therapistId: string;
  scheduleMode: 'uniform' | 'daily'; // Todos iguales o por separado
  slotDurationMinutes: 30 | 45 | 60;  // 30, 45 o 60 min
  uniformSlots: string[];            // Horas aplicadas si scheduleMode === 'uniform'
  dailySchedules: {
    [dayOfWeek: number]: DaySchedule; // 0 = Domingo, 1 = Lunes, etc.
  };
  blockedDates: string[];             // Fechas YYYY-MM-DD bloqueadas
}
```

---

## 4. Fases de Ejecución

1. **Fase 1: Módulo de Agenda Flexible (`TherapistScheduleManager.tsx`)**:
   - Crear el componente con soporte para modo uniforme y modo individual por día.
   - Integrar los botones de duración `30 min`, `45 min`, `60 min`.
   - Permitir al terapeuta activar/desactivar días y horas, y gestionar fechas bloqueadas.
   - Incorporarlo en `ProfileScreen.tsx` (`Página 3`) visible para rol `terapeuta` y `administrador`.

2. **Fase 2: Conexión con `BookingScreen.tsx` (`Página 7`)**:
   - Conectar el calendario mensual y la lista de horas con la configuración del terapeuta seleccionado.
   - Ajustar el selector de horas a la duración configurada (`30`, `45` o `60` min).
   - Asegurar que el flujo de confirmación sea 100% directo y sin cobros ni pasarela de pago.

3. **Fase 3: Centro de Notificaciones Interactivo (`NotificationDrawer.tsx`)**:
   - Reemplazar el `alert()` de la campana en `HomeScreen.tsx` (`Página 1`) por el drawer interactivo.
   - Disparar una notificación automática cada vez que un paciente confirme una reserva.

4. **Fase 4: Verificación Integral**:
   - Ejecutar `compile_applet` y `lint_applet` juntos para validar 0 errores de TypeScript y empaquetado.
   - Probar la interacción tanto en rol de cliente como de terapeuta.
