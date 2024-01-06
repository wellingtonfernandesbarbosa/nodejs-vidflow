import axios from "axios";

const URL = import.meta.env.PROD 
? "https://gist.githubusercontent.com/wellingtonfernandesbarbosa/60d79affd6bc8f8e97ea566cf033c8c4/raw/12f69b75aafd544e8d41c7699ca900f3fba671b3/.txt"
: "http://localhost:3000/videos";

console.log(URL)

const VIDEOS_CONTAINER = document.querySelector("#videosContainer");
const BARRA_DE_PESQUISA = document.querySelector("#pesquisarInput");


// Realiza a requisição e trata tanto a resposta quanto os erros
const fetchAPI = async () => {
  try {
    const response = await axios.get(URL);
      
    const videos = response.data;
    
    // Manipula os dados obtidos da requisição
    videos.forEach((video) => {
      VIDEOS_CONTAINER.innerHTML += `
      <li class="videos__item">
          <iframe src="${video.url}" title="${video.title}" frameborder="0" allowfullscreen></iframe>
          <div class="descricao-video">
            <img class="img-canal" src="${video.imagem}" alt="Logo do Canal"></img>
            <h3 class="titulo-video">${video.titulo}</h3>
            <p class="titulo-canal">${video.descricao}</h3>
            <p class="categoria" hidden>${video.categoria}</p>
          </div>
        </li>
      `;
    });
    
  // Captura erros de rede ou outros problemas na requisição
  } catch (error) {
    console.error("Erro: ", error);
  }
};

// Chama a função para realizar a requisição
fetchAPI();


BARRA_DE_PESQUISA.addEventListener("input", () => {
  const videos = document.querySelectorAll(".videos__item");
  const valorFiltro = BARRA_DE_PESQUISA.value.toLowerCase();

  if (BARRA_DE_PESQUISA.value !== "" && videos) {
    for (let video of videos) {
      const titulo = video.querySelector(".titulo-video").textContent.toLowerCase();

      video.style.display = !titulo.includes(valorFiltro) && titulo ? 'none' : 'block'; 
    }
  }
});

const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach(botao => {
  const valorFiltro = botao.getAttribute('name').toLowerCase();
  
  botao.addEventListener('click', () => {
    const videos = document.querySelectorAll('.videos__item');
    
    for (let video of videos) {
      let categoria = video.querySelector('.categoria').textContent.toLowerCase();

      video.style.display = !categoria.includes(valorFiltro) && valorFiltro !== 'tudo' ? 'none' : 'block';
    }
  })
})
