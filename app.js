const $ = (s) => document.querySelector(s);
document.querySelectorAll('[data-scroll]').forEach((button) => button.addEventListener('click', () => $(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' })));

const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('atlantic-theme');
if (savedTheme === 'dark') document.body.classList.add('dark-mode');
function syncThemeButton() {
  const dark = document.body.classList.contains('dark-mode');
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
  themeToggle.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
}
themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); localStorage.setItem('atlantic-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light'); syncThemeButton(); });
syncThemeButton();

const days = $('#days'); const style = $('#style');
function updateBudget() {
  const d = Number(days.value); const s = Number(style.value);
  const styles = {1:{label:'Value', stay:52, food:38},2:{label:'Mid-range', stay:70, food:55},3:{label:'Boutique', stay:105, food:72}}[s];
  const stay = Math.round(styles.stay * d); const car = Math.round(275 + Math.max(0,d-7)*24); const food = Math.round(styles.food*d); const activity = Math.round(190 + Math.max(0,d-7)*40); const buffer = Math.max(0,(d-7)*28); const total = stay+car+food+activity+buffer;
  $('#daysValue').textContent = `${d} days`; $('#styleValue').textContent = styles.label; $('#totalCost').textContent = `€${total.toLocaleString()}`; $('#stayCost').textContent = `€${stay}`; $('#carCost').textContent = `€${car}`; $('#foodCost').textContent = `€${food}`; $('#activityCost').textContent = `€${activity}`; $('#bufferCost').textContent = `€${buffer}`;
}
days.addEventListener('input', updateBudget); style.addEventListener('input', updateBudget); updateBudget();

const checks = [...document.querySelectorAll('#checklist input')];
function updateChecks(){ const done=checks.filter(c=>c.checked).length; $('#checkCount').textContent=done; $('#progressBar').style.width=`${done/checks.length*100}%`; }
checks.forEach(c=>c.addEventListener('change',updateChecks));
$('#tripForm').addEventListener('submit',(e)=>{e.preventDefault();$('#formStatus').textContent='Brief received — your imaginary local is already sketching the route.';e.target.reset();});
