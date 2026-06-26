const DAYS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const today = new Date();
const dayIndex = today.getDay();

// Greeting
const hour = today.getHours();
const greet = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
document.getElementById('greeting').textContent = greet;
document.getElementById('day-name').textContent = DAYS[dayIndex];

// Streak
let streak = parseInt(localStorage.getItem('streak') || '0');
const lastDate = localStorage.getItem('lastDate');
const todayStr = today.toDateString();
if (lastDate !== todayStr) {
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  if (lastDate === yesterday.toDateString()) streak++;
  else streak = 1;
  localStorage.setItem('streak', streak);
  localStorage.setItem('lastDate', todayStr);
}
document.getElementById('streak').textContent = streak;

// Training plan (4 days: Mon, Tue, Thu, Fri)
const training = {
  1: { // Lunes - Pecho + Tríceps
    label: 'Pecho + Tríceps', icon: '🏋️', color: '#6c63ff',
    exercises: [
      { name: 'Press de banca', detail: 'Barra / Mancuernas', sets: '4×8' },
      { name: 'Press inclinado', detail: 'Mancuernas', sets: '3×10' },
      { name: 'Aperturas en polea', detail: 'Cable cruce', sets: '3×12' },
      { name: 'Fondos en paralelas', detail: 'Peso corporal', sets: '3×12' },
      { name: 'Press francés', detail: 'Barra EZ', sets: '3×10' },
      { name: 'Extensión tríceps polea', detail: 'Cable', sets: '3×15' },
    ]
  },
  2: { // Martes - Espalda + Bíceps
    label: 'Espalda + Bíceps', icon: '💪', color: '#e74c3c',
    exercises: [
      { name: 'Peso muerto', detail: 'Barra', sets: '4×6' },
      { name: 'Dominadas', detail: 'Peso corporal / lastrado', sets: '4×8' },
      { name: 'Remo con barra', detail: 'Barra', sets: '3×10' },
      { name: 'Remo en polea baja', detail: 'Cable', sets: '3×12' },
      { name: 'Curl con barra', detail: 'Barra EZ', sets: '3×10' },
      { name: 'Curl martillo', detail: 'Mancuernas', sets: '3×12' },
    ]
  },
  3: { rest: true },
  4: { // Jueves - Piernas
    label: 'Piernas', icon: '🦵', color: '#f39c12',
    exercises: [
      { name: 'Sentadilla', detail: 'Barra', sets: '4×8' },
      { name: 'Prensa de piernas', detail: 'Máquina', sets: '3×12' },
      { name: 'Extensión de cuádriceps', detail: 'Máquina', sets: '3×15' },
      { name: 'Curl de isquiotibiales', detail: 'Máquina', sets: '3×12' },
      { name: 'Peso muerto rumano', detail: 'Mancuernas', sets: '3×10' },
      { name: 'Elevación de talones', detail: 'Máquina / escalón', sets: '4×20' },
    ]
  },
  5: { // Viernes - Hombros + Core
    label: 'Hombros + Core', icon: '🔱', color: '#1abc9c',
    exercises: [
      { name: 'Press militar', detail: 'Barra', sets: '4×8' },
      { name: 'Elevaciones laterales', detail: 'Mancuernas', sets: '3×15' },
      { name: 'Elevaciones frontales', detail: 'Mancuernas', sets: '3×12' },
      { name: 'Pájaros', detail: 'Mancuernas', sets: '3×12' },
      { name: 'Plancha', detail: '3 series', sets: '60s' },
      { name: 'Abdominales en rueda', detail: 'Ab wheel', sets: '3×12' },
    ]
  },
  6: { rest: true },
  0: { rest: true },
};

const meals = [
  { time: '07:00', name: 'Desayuno', desc: 'Avena con leche + 4 huevos revueltos + plátano + café negro' },
  { time: '10:00', name: 'Media mañana', desc: 'Yogur griego 0% + frutos secos (almendras, nueces) + fruta' },
  { time: '13:00', name: 'Almuerzo', desc: 'Arroz integral + pechuga de pollo o salmón + verduras al vapor + aguacate' },
  { time: '16:00', name: 'Pre-entreno', desc: 'Batido de proteína + plátano + tostadas integrales con mantequilla de maní' },
  { time: '19:00', name: 'Post-entreno', desc: 'Batido de proteína + arroz de arroz o papas + pollo o carne magra' },
  { time: '21:30', name: 'Cena', desc: 'Salmón o atún + verduras salteadas + huevos + batata' },
];

const supplements = [
  {
    icon: '🥛', name: 'Proteína Whey', brand: 'Optimum Nutrition Gold Standard',
    desc: 'La proteína de suero más vendida del mundo. Rápida absorción, alta calidad.',
    time: 'Post-entreno + mañana', dose: '1 scoop (25g proteína)'
  },
  {
    icon: '⚡', name: 'Creatina Monohidrato', brand: 'Creapure® (MyProtein / Bulk)',
    desc: 'El suplemento más respaldado por la ciencia. Aumenta fuerza, potencia y masa muscular.',
    time: 'Cualquier momento del día', dose: '5g diarios'
  },
  {
    icon: '☀️', name: 'Vitamina D3 + K2', brand: 'NOW Foods / Thorne',
    desc: 'Fundamental para testosterona, sistema inmune, huesos y energía general.',
    time: 'Con el desayuno', dose: '5000 IU D3 + 100mcg K2'
  },
  {
    icon: '🐟', name: 'Omega-3 (Fish Oil)', brand: 'Nordic Naturals Ultimate Omega',
    desc: 'Reduce inflamación, mejora recuperación muscular y salud cardiovascular.',
    time: 'Con comidas', dose: '2-3g EPA/DHA diarios'
  },
  {
    icon: '🧠', name: 'Magnesio Glicinato', brand: 'Thorne / Doctor\'s Best',
    desc: 'Mejora calidad del sueño, recuperación muscular y niveles de energía.',
    time: '30 min antes de dormir', dose: '300-400mg'
  },
  {
    icon: '🔋', name: 'Pre-entreno (Cafeína)', brand: 'Legion Pulse / C4 Original',
    desc: 'Aumenta energía, enfoque y rendimiento en el entreno. Úsalo solo días de gym.',
    time: '30 min antes del entreno', dose: '200mg cafeína'
  },
  {
    icon: '🌿', name: 'Ashwagandha KSM-66', brand: 'KSM-66 / Nootropics Depot',
    desc: 'Reduce cortisol, mejora niveles de testosterona, energía y manejo del estrés.',
    time: 'Con el desayuno o cena', dose: '600mg diarios'
  },
  {
    icon: '💊', name: 'Zinc + B6 (ZMA)', brand: 'NOW Sports ZMA',
    desc: 'Apoya la producción de testosterona y la calidad del sueño profundo.',
    time: 'Antes de dormir (con estómago vacío)', dose: '1 cápsula'
  },
];

const habits = [
  { icon: '💧', name: 'Tomar 3L de agua', desc: 'Hidratación clave para rendimiento y recuperación' },
  { icon: '😴', name: 'Dormir 8 horas', desc: 'El músculo crece durante el sueño — es tan importante como entrenar' },
  { icon: '🚶', name: '8.000 pasos mínimo', desc: 'Mantiene activo el metabolismo y la recuperación activa' },
  { icon: '🧘', name: '10 min de stretching', desc: 'Reduce lesiones y mejora movilidad articular' },
  { icon: '📵', name: 'Sin pantallas 1h antes de dormir', desc: 'Mejora la calidad del sueño y la producción de melatonina' },
  { icon: '🍽️', name: 'Respetar las 6 comidas', desc: 'Mantiene los aminoácidos disponibles para el músculo' },
  { icon: '🧘‍♂️', name: '5 min de respiración profunda', desc: 'Baja el cortisol y mejora el enfoque' },
  { icon: '📓', name: 'Registrar el entreno', desc: 'La progresión de carga es clave para ganar músculo' },
];

// Load habits state
let habitsDone = JSON.parse(localStorage.getItem('habits_' + todayStr) || '[]');

function saveHabits() {
  localStorage.setItem('habits_' + todayStr, JSON.stringify(habitsDone));
}

// Render training
function renderTraining() {
  const day = training[dayIndex];
  const el = document.getElementById('training-content');

  if (day.rest) {
    el.innerHTML = `
      <div class="card rest-card">
        <div class="big-emoji">🛌</div>
        <h2>Día de descanso</h2>
        <p>El descanso es parte del plan. Tus músculos crecen mientras recuperas.<br><br>Puedes hacer caminata suave, stretching o yoga activo.</p>
      </div>`;
    return;
  }

  el.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="card-icon" style="background:${day.color}20">${day.icon}</div>
        <div>
          <h2>${day.label}</h2>
          <p>${day.exercises.length} ejercicios · ~60-70 min</p>
        </div>
      </div>
      <div class="card-title">EJERCICIOS DE HOY</div>
      <div class="exercise-list">
        ${day.exercises.map((ex, i) => `
          <div class="exercise">
            <div class="ex-num">${i + 1}</div>
            <div class="ex-info">
              <div class="ex-name">${ex.name}</div>
              <div class="ex-detail">${ex.detail}</div>
            </div>
            <div class="ex-sets">${ex.sets}</div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-title">CONSEJO DEL DÍA</div>
      <p style="font-size:14px;color:#aaa;line-height:1.7">Descansa <strong style="color:#fff">60-90 segundos</strong> entre series de aislamiento y <strong style="color:#fff">2-3 minutos</strong> entre series de ejercicios compuestos (sentadilla, press, peso muerto).</p>
    </div>`;
}

// Render nutrition
function renderNutrition() {
  const el = document.getElementById('nutrition-content');
  el.innerHTML = `
    <div class="card">
      <div class="card-title">MACROS OBJETIVO DIARIO</div>
      <div class="macro-row">
        <div class="macro"><div class="macro-val" style="color:#6c63ff">~3000</div><div class="macro-label">Calorías</div></div>
        <div class="macro"><div class="macro-val" style="color:#e74c3c">180g</div><div class="macro-label">Proteína</div></div>
        <div class="macro"><div class="macro-val" style="color:#f39c12">350g</div><div class="macro-label">Carbos</div></div>
        <div class="macro"><div class="macro-val" style="color:#1abc9c">80g</div><div class="macro-label">Grasas</div></div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">PLAN DE COMIDAS</div>
      ${meals.map(m => `
        <div class="meal">
          <div class="meal-time">${m.time}</div>
          <div class="meal-info">
            <h3>${m.name}</h3>
            <p>${m.desc}</p>
          </div>
        </div>
      `).join('')}
    </div>`;
}

// Render supplements
function renderSupplements() {
  const el = document.getElementById('supplements-content');
  el.innerHTML = `
    <div class="card">
      <div class="card-title">LOS MEJORES SUPLEMENTOS DEL MUNDO</div>
      ${supplements.map(s => `
        <div class="supplement">
          <div class="supp-icon">${s.icon}</div>
          <div class="supp-info">
            <h3>${s.name}</h3>
            <p>${s.desc}</p>
            <div class="supp-tags">
              <span class="tag tag-time">⏰ ${s.time}</span>
              <span class="tag tag-dose">💊 ${s.dose}</span>
              <span class="tag tag-brand">⭐ ${s.brand}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>`;
}

// Render habits
function renderHabits() {
  const el = document.getElementById('habits-content');
  const done = habitsDone.length;
  const total = habits.length;
  const pct = Math.round((done / total) * 100);

  el.innerHTML = `
    <div class="card">
      <div class="card-title">PROGRESO DE HOY — ${done}/${total} hábitos</div>
      <div class="progress-label">${pct}% completado</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      ${habits.map((h, i) => `
        <div class="habit ${habitsDone.includes(i) ? 'done' : ''}" onclick="toggleHabit(${i})">
          <div class="habit-check">${habitsDone.includes(i) ? '✓' : ''}</div>
          <div class="habit-icon">${h.icon}</div>
          <div class="habit-text">
            <h3>${h.name}</h3>
            <p>${h.desc}</p>
          </div>
        </div>
      `).join('')}
    </div>`;
}

function toggleHabit(i) {
  if (habitsDone.includes(i)) habitsDone = habitsDone.filter(x => x !== i);
  else habitsDone.push(i);
  saveHabits();
  renderHabits();
}

function showTab(name, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');
}

renderTraining();
renderNutrition();
renderSupplements();
renderHabits();
