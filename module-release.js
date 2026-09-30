const enabled = document.querySelector('#enabled');
const visible = document.querySelector('#visible');
const required = document.querySelector('#required');
const held = document.querySelector('#held');
function explain() {
  const entitled = Number(held.value) >= Number(required.value);
  const catalog = enabled.checked && visible.checked && entitled;
  const allowed = enabled.checked && entitled;
  document.querySelector('#control-result').textContent = `Catalog: ${catalog ? 'shown' : 'hidden'}. Backend submission: ${allowed ? 'permitted by these controls' : 'blocked'}. ` + (!enabled.checked ? 'The module is disabled.' : !entitled ? 'The organization does not meet the required tier.' : !visible.checked ? 'Hiding the module does not revoke execution permission; an authorized direct submission can still run.' : 'Other admission checks, including input validation and quota, still apply.');
}
[enabled, visible, required, held].forEach(control => control.addEventListener('change', explain));
explain();
const map = document.querySelector('#release-map');
let zoom = 1;
function resize(value) { zoom = Math.max(.5, Math.min(3, value)); map.style.width = `${zoom * 100}%`; }
document.querySelector('#zoom-in').addEventListener('click', () => resize(zoom + .25));
document.querySelector('#zoom-out').addEventListener('click', () => resize(zoom - .25));
document.querySelector('#fit').addEventListener('click', () => resize(1));
