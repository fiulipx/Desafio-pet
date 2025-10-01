document.addEventListener('DOMContentLoaded', () => {
  const carrossel = document.getElementById('carrossel');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  if (!carrossel) {
    console.error('Carrossel não encontrado (id="carrossel"). Verifique o HTML.');
    return;
  }
  if (!prevBtn || !nextBtn) {
    console.error('Botões prev/next não encontrados. IDs devem ser "prev" e "next".');
    return;
  }

  const items = carrossel.querySelectorAll('li');
  const total = items.length;
  if (total === 0) {
    console.error('Nenhum <li> dentro do carrossel. Adicione slides.');
    return;
  }

  let index = 0;
  const intervalMs = 5000;
  let autoId = null;

  function atualizarCarrossel() {
    carrossel.style.transform = `translateX(-${index * 100}%)`;
    carrossel.setAttribute('data-current', index);
  }

  function proximo() {
    index = (index + 1) % total;
    atualizarCarrossel();
  }

  function anterior() {
    index = (index - 1 + total) % total;
    atualizarCarrossel();
  }


  function startAuto() {
    stopAuto();
    autoId = setInterval(proximo, intervalMs);
  }
  function stopAuto() {
    if (autoId) {
      clearInterval(autoId);
      autoId = null;
    }
  }

  nextBtn.addEventListener('click', () => {
    proximo();
    startAuto();
  });

  prevBtn.addEventListener('click', () => {
    anterior();
    startAuto();
  });

  atualizarCarrossel();
  startAuto();

 
  carrossel.addEventListener('mouseenter', stopAuto);
  carrossel.addEventListener('mouseleave', startAuto);
});
