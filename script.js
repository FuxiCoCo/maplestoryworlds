const toFixed = (val, d = 2) => parseFloat(val.toFixed(d));

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
    case 'amulet': wc = source[1] * (450 / 11); break;
    case 'gem': wc = source[1] * (400 / 11); break;
  }

  b.bag.value = toFixed(wc / 250);
  b.amulet.value = toFixed(wc / (450 / 11));
  b.gem.value = toFixed(wc / (400 / 11));
  b.snow.value = toFixed(wc / wpc);
  b.meso.value = toFixed(wc * r / wpc);
  b.ntd.value = toFixed(wc * ntdpw);
  b.wc.value = toFixed(wc);
}

// 註冊輸入監聽器，任何輸入即時換算
[b_ntd, b_wc, b_snow, b_meso, b_bag, b_amulet, b_gem].forEach(input => {
  input.addEventListener('input', recalcB);
});

rateSnow.addEventListener('input', recalcB);

function convertUnit(unit, qty) {
  const r = parseFloat(rateSnow.value);
  const wpc = 300 / 11;
  const ntdpw = 120 / 800;
  let wc = 0;

  switch (unit) {
    case '楓幣': wc = qty * wpc / r; break;
    case '雪花': wc = qty * wpc; break;
    case 'WC': wc = qty; break;
    case 'NTD': wc = qty / ntdpw; break;
    case '背包': wc = qty * 250; break;
    case '護身符咒': wc = qty * (450 / 11); break;
    case '順移石': wc = qty * (400 / 11); break;
  }

  return wc * r / wpc; // 回傳楓幣價值
}

function calculate() {
  recalcB();
  const item = c_item.value;
  const qty = parseFloat(c_qty.value);
  const payUnit = c_pay_unit.value;
  const payAmt = parseFloat(c_pay_amt.value);

  const costPer = convertUnit(item, 1);
  const costTotal = costPer * qty;
  const payTotal = convertUnit(payUnit, payAmt);
  const diff = toFixed(payTotal - costTotal);
  const rate = toFixed(((payTotal - costTotal) / costTotal) * 100);
  const judge = diff > 0 ? "盤子！" : diff < 0 ? "賺錢！" : "打平！";

  result.innerHTML = `
    <p>你買 ${qty} 個 ${item} 的成本：約 <strong>${costTotal.toLocaleString()}</strong> 楓幣</p>
    <p>付款折算後為：<strong>${payTotal.toLocaleString()}</strong> 楓幣</p>
    <p>差額：<strong>${diff.toLocaleString()}</strong> 楓幣（${rate}%）</p>
    <p><strong>結論：${judge}</strong></p>
  `;
}
