window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('shark-canvas');
  const ctx = canvas.getContext('2d');
  const waterZone = document.getElementById('water-zone');

  function resizeCanvas() {
    canvas.width = waterZone.offsetWidth;
    canvas.height = waterZone.offsetHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let time = 0;

  function drawWater() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Décalage du dégradé pour simuler le mouvement global de l'eau
    const gradientOffset = Math.sin(time * 0.015) * 20; // 20px d'amplitude

    // Gradient de base animé
    const gradient = ctx.createLinearGradient(
      0, gradientOffset, 
      0, canvas.height + gradientOffset
    );
    gradient.addColorStop(0, 'rgba(0, 50, 100, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 100, 200, 0.9)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ...après ctx.fillRect(...)
    const fade = ctx.createLinearGradient(0, 0, 0, 40);
    fade.addColorStop(0, "rgba(255,255,255,0.7)");
    fade.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, canvas.width, 40);

    // Vagues
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;

    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      let firstY = null;
      for (let x = 0; x <= canvas.width; x += 2) {
        const base = canvas.height * 0.05 + i * 10;
        const wave1 = Math.sin((x * 0.012) + (time * 0.022) + (i * 0.6)) * (16 + i*2);
        const wave2 = Math.cos((x * 0.009) + (time * 0.017) + (i * 0.4)) * (10 + i*1.5);
        const wave3 = Math.sin((x * 0.021) + (time * 0.035) + i) * 4;
        const noise = Math.sin(x * 0.2 + time * 0.5 + i) * 2;
        const y = base + wave1 + wave2 + wave3 + noise;
        if (x === 0) {
          ctx.moveTo(x, y);
          firstY = y;
        } else {
          ctx.lineTo(x, y);
        }
      }
      // Perspective: couleur plus claire pour les vagues du haut, plus foncée pour celles du bas
      const t = i / 4; // 0 (haut) à 1 (bas)
      const r = Math.round(120 + 60 * (1 - t)); // du bleu clair au bleu foncé
      const g = Math.round(180 + 40 * (1 - t));
      const b = Math.round(255 - 55 * t);
      ctx.strokeStyle = `rgba(${r},${g},${b},${0.25 + t * 0.18})`;
      ctx.shadowColor = `rgba(${r},${g},${b},0.15)`;
      ctx.shadowBlur = 6 - i;
      ctx.stroke();
    }
    ctx.shadowBlur = 0; // reset le flou après les vagues

    // Vague de surface pour casser la ligne
    ctx.save();
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 2) {
      const y =
        Math.sin(x * 0.012 + time * 0.03) * 18 +
        Math.cos(x * 0.021 + time * 0.018) * 8 +
        Math.sin(x * 0.2 + time * 0.1) * 2;
      if (x === 0) ctx.moveTo(x, y + 2);
      else ctx.lineTo(x, y + 2);
    }
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();

    // Dégradé linéaire du ciel vers la mer
    const surfaceGradient = ctx.createLinearGradient(0, 0, 0, 40);
    surfaceGradient.addColorStop(0, "rgba(179,224,255,0.85)"); // couleur du ciel, opaque
    surfaceGradient.addColorStop(1, "rgba(0,100,200,0.3)");    // couleur de la mer, plus transparente

    ctx.globalAlpha = 1;
    ctx.fillStyle = surfaceGradient;
    ctx.shadowColor = "rgba(179,224,255,0.5)";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.restore();

    // Mini-vagues très proches de la surface pour le chaos
    ctx.save();
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 2) {
      const y =
        Math.sin(x * 0.04 + time * 0.09) * 4 + // fréquence élevée, faible amplitude
        Math.cos(x * 0.07 + time * 0.13) * 2 +
        8; // très proche du haut
      if (x === 0) ctx.moveTo(x, y + 6);
      else ctx.lineTo(x, y + 6);
    }
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();

    const chaosGradient = ctx.createLinearGradient(0, 0, 0, 18);
    chaosGradient.addColorStop(0, "rgba(200,230,255,0.45)");
    chaosGradient.addColorStop(1, "rgba(0,100,200,0.10)");

    ctx.globalAlpha = 0.8;
    ctx.fillStyle = chaosGradient;
    ctx.shadowColor = "rgba(179,224,255,0.3)";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();

    time++;
    requestAnimationFrame(drawWater);
  }

  drawWater();
});