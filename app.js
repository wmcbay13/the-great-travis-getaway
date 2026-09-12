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

const days = $('#days'); const style = $('#style'); const travelers = $('#travelers');
let currency = 'EUR';
const eurToUsd = 1.08;
const money = (amount) => new Intl.NumberFormat(currency === 'EUR' ? 'en-IE' : 'en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(currency === 'EUR' ? amount : amount * eurToUsd);
function updateBudget() {
  const d = Number(days.value); const s = Number(style.value); const people = Number(travelers.value);
  const styles = {1:{label:'Value', room:115, food:42, activities:22},2:{label:'Mid-range', room:175, food:64, activities:34},3:{label:'Boutique', room:295, food:92, activities:54}}[s];
  const stay = Math.round((styles.room * d) / people);
  const car = Math.round((350 + (d - 7) * 36) / people);
  const food = Math.round(styles.food * d);
  const activity = Math.round(styles.activities * d);
  const buffer = Math.round((stay + car + food + activity) * .07);
  const total = stay + car + food + activity + buffer;
  $('#daysValue').textContent = `${d} days`; $('#travelersValue').textContent = `${people} ${people === 1 ? 'person' : 'people'}`; $('#styleValue').textContent = styles.label;
  $('#totalCost').textContent = money(total); $('#stayCost').textContent = money(stay); $('#carCost').textContent = money(car); $('#foodCost').textContent = money(food); $('#activityCost').textContent = money(activity); $('#bufferCost').textContent = money(buffer);
  $('#currencyNote').textContent = currency === 'EUR' ? 'Planning estimate in EUR · excluding international airfare' : `Planning estimate · 1 EUR ≈ ${money(1)} · excluding international airfare`;
  $('#costFoot').textContent = `Planning ranges only · shared room and compact-car costs divided across ${people} ${people === 1 ? 'person' : 'people'}`;
}
days.addEventListener('input', updateBudget); style.addEventListener('input', updateBudget); travelers.addEventListener('input', updateBudget);
document.querySelectorAll('[data-currency]').forEach((button) => button.addEventListener('click', () => { currency = button.dataset.currency; document.querySelectorAll('[data-currency]').forEach((item) => item.classList.toggle('active', item === button)); updateBudget(); }));
updateBudget();

const checks = [...document.querySelectorAll('#checklist input')];
function updateChecks(){ const done=checks.filter(c=>c.checked).length; $('#checkCount').textContent=done; $('#progressBar').style.width=`${done/checks.length*100}%`; }
checks.forEach(c=>c.addEventListener('change',updateChecks));
$('#tripForm').addEventListener('submit',(e)=>{e.preventDefault();$('#formStatus').textContent='Brief received — your imaginary local is already sketching the route.';e.target.reset();});
