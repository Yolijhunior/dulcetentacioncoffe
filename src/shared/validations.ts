export interface OrderForm {
  clientName: string;
  phone: string;
  description: string;
}

export const validateOrderForm = (form: OrderForm): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  // 1. VALIDACIÓN DE MESA / CLIENTE
  const clientInput = form.clientName.trim();
  if (!clientInput) {
    errors.clientName = 'El nombre del cliente o número de mesa es obligatorio.';
  } else {
    const mesaMatch = clientInput.match(/^mesa\s+(\d+)$/i);
    if (mesaMatch) {
      const numMesa = parseInt(mesaMatch[1], 10);
      if (numMesa < 1 || numMesa > 30) {
        errors.clientName = 'El número de mesa debe estar entre 1 y 30.';
      }
    } else if (clientInput.toLowerCase().startsWith('mesa') && !/^mesa\s+\d+$/i.test(clientInput)) {
      errors.clientName = 'Formato incorrecto. Use "Mesa" seguido de un número del 1 al 30 (Ej: Mesa 5).';
    } else if (clientInput.length < 3) {
      errors.clientName = 'El nombre del cliente debe tener al menos 3 caracteres.';
    }
  }

  // 2. VALIDACIÓN DE TELÉFONO (Solo 9 números, debe empezar con 9 en Perú)
  const phoneInput = form.phone.trim();
  if (!phoneInput) {
    errors.phone = 'El teléfono de contacto es obligatorio.';
  } else if (!/^\d+$/.test(phoneInput)) {
    errors.phone = 'El teléfono solo debe contener números enteros (sin símbolos ni espacios).';
  } else if (phoneInput.length !== 9) {
    errors.phone = 'El teléfono debe tener exactamente 9 dígitos.';
  } else if (!phoneInput.startsWith('9')) {
    errors.phone = 'El teléfono celular debe empezar con el dígito 9.';
  }

  // 3. VALIDACIÓN DEL DETALLE DEL PEDIDO (Mínimo 6 letras reales, evita spam de "cccc" o "g")
  const descInput = form.description.trim();
  if (!descInput) {
    errors.description = 'El detalle del pedido no puede estar vacío.';
  } else if (descInput.length < 6) {
    errors.description = 'Por favor, detalla mejor el pedido (mínimo 6 caracteres).';
  } else {
    const repeticionLetras = /(.)\1{4,}/; 
    if (repeticionLetras.test(descInput.toLowerCase().replace(/\s/g, ''))) {
      errors.description = 'El pedido no parece válido. Por favor, escribe palabras reales.';
    }
  }

  return errors;
};