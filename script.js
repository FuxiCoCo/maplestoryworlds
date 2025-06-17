// 🔧 綁定 HTML 元素
const c_item = document.getElementById("c_item");
const c_qty = document.getElementById("c_qty");
const c_pay_unit = document.getElementById("c_pay_unit");
const c_pay_amt = document.getElementById("c_pay_amt");
const result = document.getElementById("result");

const b_ntd = document.getElementById("b_ntd");
const b_wc = document.getElementById("b_wc");
const b_snow = document.getElementById("b_snow");
const b_meso = document.getElementById("b_meso");
const b_bag = document.getElementById("b_bag");
const b_amulet = document.getElementById("b_amulet");
const b_gem = document.getElementById("b_gem");
const rateSnow = document.getElementById("rateSnow");

// 數字處理
const toFixed = (val, d = 2) => parseFloat(val.toFixed(d));

// B區換算邏輯
function recalcB() {
  const r = parseFloat(rateSnow.value); // 雪花兌換楓幣
  const wpc = 300 / 11; // 每雪花多少WC
  const ntdpw = 120 / 800; // 每WC多少台幣

  const b = {
    ntd: b_ntd,
    wc: b_wc,
    snow: b_snow,
    meso: b_meso,
    bag: b_bag,
    amulet: b_amulet,
    gem: b_gem
  };

  let source = null;
  for (let k in b) {
    const v = parseFloat(b[k].value);
    if (!isNaN(v) && b[k] === document.activeElement) {
      source = [k, v];
      break;
    }
  }

  if (!source) return;

  let wc = 0;
  switch (source[0]) {
    case 'ntd': wc = source[1] / ntdpw; break;
    case 'wc': wc = source[1]; break;
    case 'snow': wc = source[1] * wpc; break;
    case 'meso': wc = source[1] * wpc / r; break;
    case 'bag': wc = source[1] * 250; break;
    case 'amu
