window.onload = function() {

const ctx = document.getElementById('tripleAxisChart').getContext('2d');
let sidebarIcon = document.getElementById('sidebar-icon');


let powerPlantButtonElement = document.getElementById('powerPlantButton');

  // ▼ X軸ラベル（1〜90日）
  const labels = Array.from({ length: 90 }, (_, i) => `${i + 1}日`);

  // ▼ 10色と名前
  const colors = ['red','blue','green','orange','purple','brown','teal','magenta','gold','black'];
  const names  = ['開度 (%)','出力 (MW)','流量 (m³/s)','水位 (m)','温度 (℃)',
                  '降雨量 (mm)','蒸発量 (mm)','風速 (m/s)','気圧 (hPa)','日射量 (MJ/m²)'];

  // ▼ 10本のデータセット
  const datasets = Array.from({ length: 3 }, (_, i) => ({
    label: names[i],
    data: Array.from({ length: 90 }, () => (Math.random() * (i+1) * 100) + (i * 20)),
    borderColor: colors[i],
    yAxisID: `y${i+1}`
  }));

  // ▼ Y軸をすべて左寄せで作成
  const yAxes = {};
  datasets.forEach((ds, i) => {
    yAxes[`y${i+1}`] = {
      type: 'linear',
      position: 'left',       // ★全部左側に寄せる
      offset: true,           // 軸同士が重ならないようにする
      grid: { drawOnChartArea: i === 0 }, // 1本目だけグリッド線を描く
      ticks: { color: colors[i] },
      title: { display: false, text: ds.label, color: colors[i] }
    };
  });

  const chart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      stacked: false,
      scales: {
        x: {
          title: { display: true, text: '日数' },
          ticks: { autoSkip: true, maxTicksLimit: 15 }
        },
        ...yAxes
      }
    }
  });
  sidebarIcon.addEventListener('click', () => {
    sidebar.classList.toggle("mnr300");

    // アニメーションの後にresize
    setTimeout(() => {
      chart.resize();
    }, 350);
  });

    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('powerPlantButton');
    const closeBtn = document.getElementById('closeModalBtn');

    openBtn.addEventListener('click', () => {
      overlay.style.display = 'flex'; // flexで中央寄せ
    });

    closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

    // オーバーレイの黒い部分をクリックしたら閉じる
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.style.display = 'none';
    });

    function apply() {
      alert("適用しました！");
      overlay.style.display = 'none';
    }


};