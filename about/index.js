window.addEventListener('load', function() {
  const ctx = document.getElementById('scatterChart').getContext('2d');

  // X=出力, Y=開度 の理想ライン（開度は10刻み、少し拡大）
  const idealLine = [
    { x: 4, y: 12 },
    { x: 8, y: 24 },
    { x: 13, y: 36 },
    { x: 17, y: 48 },
    { x: 21, y: 60 },
    { x: 25, y: 72 },
    { x: 27, y: 84 },
    { x: 29, y: 96 },
    { x: 31, y: 108 },
    { x: 33, y: 120 }
  ];

  // ±10%ライン（出力のみ変動）
  const plus10Line = idealLine.map(p => ({ x: p.x * 1.1, y: p.y }));
  const minus10Line = idealLine.map(p => ({ x: p.x * 0.9, y: p.y }));

  // 散布点を理想ライン近くに配置
  const scatterPoints = [];
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 33; // 出力は 0〜33 の範囲
    const lower = idealLine.findLast(p => p.x <= x);
    const upper = idealLine.find(p => p.x >= x);
    let idealY;
    if (lower && upper && lower !== upper) {
      const ratio = (x - lower.x) / (upper.x - lower.x);
      idealY = lower.y + (upper.y - lower.y) * ratio;
    } else {
      idealY = lower?.y ?? upper?.y ?? 0;
    }
    const noise = (Math.random() - 0.5) * 8; // ±8程度の開度ずれ
    const y = (i % 2 === 0) ? idealY + noise : idealY - noise;

    scatterPoints.push({ x, y });
  }

  const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: '実測値（30点）',
          data: scatterPoints,
          type: 'scatter',
          backgroundColor: 'rgba(255, 0, 200, 0.8)',
          pointRadius: 5 // 少し大きめ
        },
        {
          label: '理想ライン（上ゾーン用）',
          data: idealLine,
          type: 'line',
          borderColor: 'transparent',
          fill: false,
          tension: 0
        },
        {
          label: '+10%ライン',
          data: plus10Line,
          type: 'line',
          borderColor: 'red',
          borderDash: [5, 5],
          borderWidth: 1.5,
          fill: '-1',
          backgroundColor: 'rgba(255, 0, 0, 0.05)',
          tension: 0
        },
        {
          label: '理想ライン（下ゾーン用）',
          data: idealLine,
          type: 'line',
          borderColor: 'transparent',
          fill: false,
          tension: 0
        },
        {
          label: '-10%ライン',
          data: minus10Line,
          type: 'line',
          borderColor: 'blue',
          borderDash: [5, 5],
          borderWidth: 1.5,
          fill: '-1',
          backgroundColor: 'rgba(0, 0, 255, 0.05)',
          tension: 0
        },
        {
          label: '理想ライン',
          data: idealLine,
          type: 'line',
          borderColor: 'green',
          borderWidth: 2,
          fill: false,
          tension: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { min: 0, max: 35, title: { display: true, text: '出力' } },
        y: { min: 0, max: 120, ticks: { stepSize: 10 }, title: { display: true, text: '開度' } }
      }
    }
  });



});