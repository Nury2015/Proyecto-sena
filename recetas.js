// recetas saludables
const recetas = [
  {
    nombre: "Ensalada de pollo a la plancha",
    icono: "fa-bowl-food",
    tiempo: 20,
    kcal: 420, proteina: 38, carbos: 20, grasas: 18,
    etiquetas: ["bajar", "tonificar", "sin_gluten", "bajo_sal"],
    ingredientes: ["150 g de pechuga de pollo", "Lechuga, espinaca y tomate", "1/2 aguacate", "1 cda de aceite de oliva", "Limón al gusto"],
    pasos: ["Cocina el pollo a la plancha con hierbas.", "Lava y corta las verduras.", "Mezcla todo y aliña con aceite de oliva y limón."]
  },
  {
    nombre: "Tortilla de claras con espinaca",
    icono: "fa-egg",
    tiempo: 10,
    kcal: 220, proteina: 24, carbos: 6, grasas: 10,
    etiquetas: ["bajar", "tonificar", "sin_gluten"],
    ingredientes: ["4 claras y 1 huevo entero", "1 taza de espinaca", "1/4 de cebolla", "Queso fresco (opcional)"],
    pasos: ["Sofríe la cebolla y la espinaca con poco aceite.", "Agrega los huevos batidos.", "Cocina a fuego bajo y dobla la tortilla."]
  },
  {
    nombre: "Crema de calabaza",
    icono: "fa-mug-hot",
    tiempo: 30,
    kcal: 180, proteina: 5, carbos: 28, grasas: 6,
    etiquetas: ["bajar", "mantener", "sin_gluten", "bajo_sal"],
    ingredientes: ["400 g de calabaza", "1 zanahoria", "1/2 cebolla", "Caldo de verduras sin sal", "Jengibre al gusto"],
    pasos: ["Cocina las verduras en el caldo por 20 minutos.", "Licúa hasta obtener una crema.", "Sirve con semillas de calabaza."]
  },
  {
    nombre: "Salmón al horno con verduras",
    icono: "fa-fish",
    tiempo: 30,
    kcal: 480, proteina: 34, carbos: 22, grasas: 26,
    etiquetas: ["tonificar", "mantener", "sin_gluten", "bajo_sal"],
    ingredientes: ["150 g de salmón", "Brócoli y zanahoria", "1 papa pequeña", "Ajo, limón y eneldo"],
    pasos: ["Precalienta el horno a 200 °C.", "Coloca el salmón y las verduras en una bandeja con ajo y limón.", "Hornea por 20 minutos."]
  },
  {
    nombre: "Yogur griego con frutas y nueces",
    icono: "fa-ice-cream",
    tiempo: 5,
    kcal: 300, proteina: 20, carbos: 28, grasas: 12,
    etiquetas: ["bajar", "tonificar", "mantener", "sin_gluten", "bajo_sal"],
    ingredientes: ["1 taza de yogur griego natural", "Fresas y arándanos", "1 cda de nueces", "Canela"],
    pasos: ["Sirve el yogur en un tazón.", "Agrega las frutas picadas y las nueces.", "Espolvorea canela."]
  },
  {
    nombre: "Bowl de avena con frutos rojos",
    icono: "fa-bowl-rice",
    tiempo: 10,
    kcal: 350, proteina: 14, carbos: 55, grasas: 9,
    etiquetas: ["tonificar", "mantener", "bajo_sal"],
    ingredientes: ["1/2 taza de avena", "1 taza de leche o bebida vegetal", "Frutos rojos", "1 cdta de miel", "Semillas de chía"],
    pasos: ["Cocina la avena con la leche por 5 minutos.", "Sirve y agrega los frutos rojos.", "Termina con chía y miel."]
  },
  {
    nombre: "Lentejas guisadas con verduras",
    icono: "fa-seedling",
    tiempo: 40,
    kcal: 450, proteina: 24, carbos: 65, grasas: 8,
    etiquetas: ["masa", "mantener", "sin_gluten", "bajo_sal"],
    ingredientes: ["1 taza de lentejas", "Zanahoria, cebolla y pimentón", "1 tomate", "Comino y laurel"],
    pasos: ["Haz un sofrito con la cebolla, el pimentón y el tomate.", "Agrega las lentejas, la zanahoria y agua.", "Cocina por 30 minutos a fuego medio."]
  },
  {
    nombre: "Arroz integral con pollo y aguacate",
    icono: "fa-drumstick-bite",
    tiempo: 35,
    kcal: 620, proteina: 40, carbos: 70, grasas: 18,
    etiquetas: ["masa", "sin_gluten"],
    ingredientes: ["1 taza de arroz integral cocido", "150 g de pollo", "1/2 aguacate", "Maíz y pimentón", "Cilantro"],
    pasos: ["Cocina el arroz integral.", "Saltea el pollo en cubos con las verduras.", "Sirve con el aguacate y el cilantro."]
  },
  {
    nombre: "Batido de plátano, avena y maní",
    icono: "fa-blender",
    tiempo: 5,
    kcal: 520, proteina: 28, carbos: 62, grasas: 16,
    etiquetas: ["masa"],
    ingredientes: ["1 plátano", "1/2 taza de avena", "1 cda de mantequilla de maní", "1 taza de leche", "1 scoop de proteína (opcional)"],
    pasos: ["Coloca todos los ingredientes en la licuadora.", "Licúa hasta que quede suave.", "Sirve frío."]
  },
  {
    nombre: "Pasta integral con atún y tomate",
    icono: "fa-utensils",
    tiempo: 25,
    kcal: 550, proteina: 32, carbos: 70, grasas: 14,
    etiquetas: ["masa", "mantener"],
    ingredientes: ["80 g de pasta integral", "1 lata de atún en agua", "Tomates frescos", "Ajo, albahaca y aceite de oliva"],
    pasos: ["Cocina la pasta.", "Prepara una salsa con tomate, ajo y albahaca.", "Mezcla con el atún escurrido y la pasta."]
  }
];

const nombresFiltro = {
  bajar: "Bajar grasa",
  masa: "Aumentar masa muscular",
  tonificar: "Tonificar / Definir",
  mantener: "Mantener",
  sin_gluten: "Sin gluten",
  bajo_sal: "Bajo en sal"
};

// enfermedades que requieren un filtro especial
const filtroPorEnfermedad = {
  celiaquia: "sin_gluten",
  hipertension: "bajo_sal",
  cardiaca: "bajo_sal",
  renal: "bajo_sal"
};

const lista = document.querySelector("#listaRecetas");
const buscador = document.querySelector("#buscar");
const botonesFiltro = document.querySelectorAll("#filtros button");
const sinResultados = document.querySelector("#sinResultados");
const sugerencia = document.querySelector("#sugerencia");

let filtroActual = "todas";
let filtroSalud = null;

function crearTarjeta(receta) {
  const etiquetas = receta.etiquetas
    .map(et => `<span class="etiqueta">${nombresFiltro[et]}</span>`)
    .join("");

  return `
    <article class="tarjeta-receta">
      <div class="tarjeta-icono"><i class="fa-solid ${receta.icono}"></i></div>
      <h2>${receta.nombre}</h2>
      <p class="tiempo"><i class="fa-regular fa-clock"></i> ${receta.tiempo} min · ${receta.kcal} kcal</p>
      <div class="macros">
        <span><strong>${receta.proteina} g</strong> proteína</span>
        <span><strong>${receta.carbos} g</strong> carbos</span>
        <span><strong>${receta.grasas} g</strong> grasas</span>
      </div>
      <div class="etiquetas">${etiquetas}</div>
      <details>
        <summary>Ver preparación</summary>
        <h3>Ingredientes</h3>
        <ul>${receta.ingredientes.map(i => `<li>${i}</li>`).join("")}</ul>
        <h3>Preparación</h3>
        <ol>${receta.pasos.map(p => `<li>${p}</li>`).join("")}</ol>
      </details>
    </article>`;
}

function mostrarRecetas() {
  const texto = buscador.value.trim().toLowerCase();

  const filtradas = recetas.filter(receta => {
    const pasaFiltro = filtroActual === "todas" || receta.etiquetas.includes(filtroActual);
    const pasaSalud = !filtroSalud || receta.etiquetas.includes(filtroSalud);
    const pasaTexto = !texto ||
      receta.nombre.toLowerCase().includes(texto) ||
      receta.ingredientes.some(i => i.toLowerCase().includes(texto));

    return pasaFiltro && pasaSalud && pasaTexto;
  });

  lista.innerHTML = filtradas.map(crearTarjeta).join("");
  sinResultados.classList.toggle("oculto", filtradas.length > 0);
}

function activarFiltro(filtro) {
  filtroActual = filtro;

  botonesFiltro.forEach(boton => {
    boton.classList.toggle("activo", boton.dataset.filtro === filtro);
  });

  mostrarRecetas();
}

botonesFiltro.forEach(boton => {
  boton.addEventListener("click", () => activarFiltro(boton.dataset.filtro));
});

buscador.addEventListener("input", mostrarRecetas);

// usar el último cálculo de la calculadora, si existe
function cargarSugerencia() {
  let datos = null;

  try {
    datos = JSON.parse(localStorage.getItem("vivesanoCalculo"));
  } catch (e) {
    datos = null;
  }

  if (!datos || !nombresFiltro[datos.objetivo]) {
    mostrarRecetas();
    return;
  }

  filtroSalud = filtroPorEnfermedad[datos.enfermedad] || null;

  let mensaje = `Según tu último cálculo (<strong>${nombresFiltro[datos.objetivo]}</strong>, ${datos.calorias} kcal/día) te sugerimos estas recetas`;
  if (filtroSalud) {
    mensaje += ` <strong>${nombresFiltro[filtroSalud].toLowerCase()}</strong>`;
  }
  mensaje += ".";

  sugerencia.innerHTML = `
    <p><i class="fa-solid fa-leaf"></i> ${mensaje}</p>
    <button type="button" id="verTodas">Ver todas</button>`;
  sugerencia.classList.remove("oculto");

  document.querySelector("#verTodas").addEventListener("click", () => {
    filtroSalud = null;
    sugerencia.classList.add("oculto");
    activarFiltro("todas");
  });

  activarFiltro(datos.objetivo);
}

cargarSugerencia();
