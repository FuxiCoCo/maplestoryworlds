function calculate() {
  recalcB();

  const item = c_item.value;
  const qty = parseFloat(c_qty.value);
  const payUnit = c_pay_unit.value;
  const payAmt = parseFloat(c_pay_amt.value);

  if (isNaN(qty) || isNaN(payAmt) || qty <= 0 || payAmt <= 0) {
    result.innerHTML = `<p style="color: red;">請輸入有效的數量與付款數值</p>`;
    return;
  }

  const costPer = convertUnit(item, 1);
  const costTotal = costPer * qty;
  const payTotal = convertUnit(payUnit, payAmt);
  const diff = toFixed(payTotal - costTotal);
  const rate = toFixed(((payTotal - costTotal) / costTotal) * 100);
  const absRate = Math.abs(rate);

  let judge = "";
  let color = "";

  if (diff === 0) {
    judge = "完美平衡";
    color = "#FFD700"; // 金色
  } else if (diff < 0) {
    // 賺錢
    if (absRate <= 15) {
      judge = "15%內賺水錢";
      color = "#888888";
    } else if (absRate <= 35) {
      judge = "木盾";
      color = "#FFFFFF";
    } else if (absRate <= 55) {
      judge = "木盾(+1)";
      color = "#FFA500";
    } else if (absRate <= 75) {
      judge = "木盾(+4)";
      color = "#00BFFF";
    } else if (absRate <= 100) {
      judge = "木盾(+6)";
      color = "#9932CC";
    } else {
      judge = "鑽盾";
      color = "#FFD700";
    }
  } else {
    // 虧錢
    if (absRate <= 15) {
      judge = "15%以內水錢平衡";
      color = "#888888";
    } else if (absRate <= 35) {
      judge = "盤子";
      color = "#FFFFFF";
    } else if (absRate <= 55) {
      judge = "盤子(+1)";
      color = "#FFA500";
    } else if (absRate <= 75) {
      judge = "盤子(+4)";
      color = "#00BFFF";
    } else if (absRate <= 100) {
      judge = "盤子(+6)";
      color = "#9932CC";
    } else {
      judge = "究極美盤";
      color = "#FFD700";
    }
  }

  result.innerHTML = `
    <p>你買 ${qty} 個 ${item} 的成本：約 <strong>${costTotal.toLocaleString()}</strong> 楓幣</p>
    <p>付款折算後為：<strong>${payTotal.toLocaleString()}</strong> 楓幣</p>
    <p>差額：<strong>${diff.toLocaleString()}</strong> 楓幣（${rate}%）</p>
    <p><strong style="color:${color}; font-size: 1.3em;">結論：${judge}</strong></p>
  `;
}
