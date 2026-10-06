// calculadora nutricional
const formulario = document.querySelector("#formulario");
const inputEdad = document.querySelector("#edad");
const selectSexo = document.querySelector("#sexo");
const selectCondicion = document.querySelector("#condicionFemenina");
const bloqueFemenino = document.querySelector("#estadoFemenino");
const bloqueTrimestre = document.querySelector("#trimestreEmbarazo");
const avisoEdad = document.querySelector("#aviso-envejecimiento");
const resultado = document.querySelector("#resultado");
const cajaError = document.querySelector("#error");
const modal = document.querySelector("#modalResultados");

const factoresActividad = {
  sedentario: 1.2,
  ligero: 1.375,
  moderado: 1.55,
  activo: 1.725,
  muy_activo: 1.9
};

const ajusteObjetivo = {
  bajar: { factor: 0.8, texto: "Bajar grasa" },
  masa: { factor: 1.1, texto: "Aumentar masa muscular" },
  tonificar: { factor: 0.9, texto: "Tonificar / Definir" },
  mantener: { factor: 1, texto: "Mantener" }
};

// gramos de proteína por kg de peso según objetivo
const proteinaPorKg = {
  bajar: 1.8,
  masa: 2.0,
  tonificar: 1.8,
  mantener: 1.4
};

// calorías extra en embarazo (por trimestre) y lactancia
const extraEmbarazo = { 1: 0, 2: 340, 3: 452 };
const extraLactancia = 500;

const recomendaciones = {
  diabetes: "Prefiere carbohidratos integrales, evita azúcares añadidos y reparte las comidas durante el día.",
  hipertension: "Reduce la sal (menos de 5 g al día), evita embutidos y aumenta frutas y verduras.",
  colesterol: "Limita grasas saturadas y fritos; aumenta fibra, avena, pescado y frutos secos.",
  obesidad: "Prioriza alimentos naturales, controla porciones y mantén actividad física constante.",
  celiaquia: "Evita trigo, cebada y centeno. Elige productos certificados sin gluten.",
  tiroides: "Mantén horarios regulares de comida y consulta a tu médico sobre yodo y medicación.",
  renal: "Controla proteína, sodio, potasio y fósforo según indicación de tu nefrólogo.",
  cardiaca: "Reduce sal y grasas saturadas; prefiere pescado, aceite de oliva y vegetales.",
  digestiva: "Come porciones pequeñas, mastica bien y evita irritantes como picantes y café en exceso."
};

// mostrar / ocultar opciones según sexo
selectSexo.addEventListener("change", () => {
  const esFemenino = selectSexo.value === "f";
  bloqueFemenino.style.display = esFemenino ? "block" : "none";

  if (!esFemenino) {
    selectCondicion.value = "ninguna";
    bloqueTrimestre.style.display = "none";
  }
});

selectCondicion.addEventListener("change", () => {
  bloqueTrimestre.style.display = selectCondicion.value === "embarazo" ? "block" : "none";
});

// aviso para adultos mayores
inputEdad.addEventListener("input", () => {
  const edad = Number(inputEdad.value);

  if (edad >= 60) {
    avisoEdad.innerHTML = `<p class="aviso">A partir de los 60 años se recomienda priorizar la proteína y el calcio. Consulta a tu médico antes de cambiar tu alimentación.</p>`;
  } else {
    avisoEdad.innerHTML = "";
  }
});

function clasificarIMC(imc) {
  if (imc < 18.5) return "Bajo peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidad";
}

function mostrarError(mensaje) {
  cajaError.innerHTML = `<div class="resultado error"><p>${mensaje}</p></div>`;
}

function abrirModal() {
  modal.style.display = "flex";
}

function cerrarModal() {
  modal.style.display = "none";
}

// botones de la ventana de resultados
document.querySelector("#btnRecetas").addEventListener("click", () => {
  window.location.href = "recetas.html";
});

document.querySelector("#btnRecalcular").addEventListener("click", () => {
  cerrarModal();
  formulario.reset();
  bloqueFemenino.style.display = "none";
  bloqueTrimestre.style.display = "none";
  avisoEdad.innerHTML = "";
  inputEdad.focus();
});

// cerrar tocando fuera o con Escape
modal.addEventListener("click", (e) => {
  if (e.target === modal) cerrarModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarModal();
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  cajaError.innerHTML = "";

  const edad = Number(inputEdad.value);
  const peso = Number(document.querySelector("#peso").value);
  const estatura = Number(document.querySelector("#estatura").value);
  const sexo = selectSexo.value;
  const actividad = document.querySelector("#actividad").value;
  const enfermedad = document.querySelector("#enfermedad").value;
  const objetivo = document.querySelector("#objetivo").value;
  const condicion = sexo === "f" ? selectCondicion.value : "ninguna";
  const trimestre = document.querySelector("#trimestre").value;

  // validaciones
  if (!edad || edad < 15 || edad > 110) {
    mostrarError("Ingresa una edad válida (entre 15 y 110 años).");
    return;
  }
  if (!peso || peso < 30 || peso > 300) {
    mostrarError("Ingresa un peso válido en kg (entre 30 y 300).");
    return;
  }
  if (!estatura || estatura < 100 || estatura > 250) {
    mostrarError("Ingresa una estatura válida en cm (entre 100 y 250).");
    return;
  }
  if (!sexo) {
    mostrarError("Selecciona el sexo asignado al nacer.");
    return;
  }
  if (!actividad) {
    mostrarError("Selecciona tu nivel de actividad física.");
    return;
  }

  // IMC
  const estaturaM = estatura / 100;
  const imc = peso / (estaturaM * estaturaM);

  // metabolismo basal (Mifflin-St Jeor)
  const base = 10 * peso + 6.25 * estatura - 5 * edad;
  let tmb;
  if (sexo === "m") {
    tmb = base + 5;
  } else if (sexo === "f") {
    tmb = base - 161;
  } else {
    tmb = base - 78; // promedio entre ambas fórmulas
  }

  // gasto diario y ajuste por objetivo
  const gastoDiario = tmb * factoresActividad[actividad];
  let calorias = gastoDiario * ajusteObjetivo[objetivo].factor;
  let notaCondicion = "";

  // en embarazo y lactancia no se recomienda déficit calórico
  if (condicion === "embarazo") {
    calorias = gastoDiario + extraEmbarazo[trimestre];
    notaCondicion = `Embarazo (${trimestre}° trimestre): no se aplica déficit calórico. Sigue las indicaciones de tu médico.`;
  } else if (condicion === "lactancia") {
    calorias = gastoDiario + extraLactancia;
    notaCondicion = "Lactancia: se suman 500 kcal y no se aplica déficit calórico.";
  }

  // macronutrientes
  let proteinaG = peso * proteinaPorKg[objetivo];
  if (enfermedad === "renal") {
    proteinaG = peso * 0.8;
  }
  const grasaG = (calorias * 0.25) / 9;
  const carbosG = Math.max(0, (calorias - proteinaG * 4 - grasaG * 9) / 4);
  const aguaL = (peso * 35) / 1000;

  let html = `
    <div class="resultado-modal">
      <h2>Tus resultados</h2>
      <p><strong>IMC:</strong> ${imc.toFixed(1)} (${clasificarIMC(imc)})</p>
      <p><strong>Metabolismo basal:</strong> ${Math.round(tmb)} kcal</p>
      <p><strong>Gasto diario estimado:</strong> ${Math.round(gastoDiario)} kcal</p>
      <p><strong>Calorías recomendadas (${ajusteObjetivo[objetivo].texto}):</strong> ${Math.round(calorias)} kcal/día</p>
      <h3>Distribución diaria</h3>
      <ul>
        <li>Proteína: ${Math.round(proteinaG)} g</li>
        <li>Carbohidratos: ${Math.round(carbosG)} g</li>
        <li>Grasas: ${Math.round(grasaG)} g</li>
        <li>Agua: ${aguaL.toFixed(1)} L</li>
      </ul>`;

  if (notaCondicion) {
    html += `<p><strong>Nota:</strong> ${notaCondicion}</p>`;
  }

  if (enfermedad !== "ninguna") {
    html += `<p><strong>Recomendación:</strong> ${recomendaciones[enfermedad]}</p>`;
  }

  html += `
      <p class="advertencia">Estos valores son una estimación. Consulta a un profesional de la salud.</p>
    </div>`;

  resultado.innerHTML = html;
  abrirModal();

  // guardar para sugerir recetas
  try {
    localStorage.setItem("vivesanoCalculo", JSON.stringify({
      objetivo,
      enfermedad,
      calorias: Math.round(calorias)
    }));
  } catch (error) {
    // si el navegador no permite guardar, las recetas se muestran sin sugerencia
  }
});
