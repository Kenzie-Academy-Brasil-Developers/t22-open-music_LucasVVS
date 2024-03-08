import { applyInputRangeStyle } from "./inputRange.js";
import { fetchMusicData } from "./api.js";
import { toggleTheme, getInitialTheme, setTheme } from "./theme.js";

document.addEventListener("DOMContentLoaded", () => {
  applyInputRangeStyle();
  loadAlbums();
  handleGenreButtonClick();

  const customRange = document.getElementById("customRange");
  const priceValue = document.querySelector(".price-value");

  customRange.addEventListener("input", () => {
    const selectedPrice = parseInt(customRange.value);
    priceValue.innerHTML = `<span class="price-value font-style-2">Até <span class="purple-letter">R$ ${selectedPrice}</span></span>`;
    filterAlbumsByPrice(selectedPrice);
  });
});

async function loadAlbums() {
  try {
    const musicData = await fetchMusicData();

    if (!musicData || musicData.length === 0) {
      console.warn("Nenhum dado retornado da API de músicas");
      return;
    }

    // Reorganize a lista de álbuns do maior para o menor preço
    musicData.sort((a, b) => b.price - a.price);

    createAlbumCards(musicData);
  } catch (error) {
    console.error("Erro ao carregar os álbuns:", error.message);
  }
}

function createAlbumCards(albums) {
  const albumGrid = document.querySelector(".album-grid");
  removeHTMLAlbumCards();

  albums.forEach((album) => {
    const card = document.createElement("div");
    card.classList.add("album");

    const img = document.createElement("img");
    img.src = album.img;
    img.alt = album.title;

    const title = document.createElement("h2");
    title.textContent = album.title;

    const descript = document.createElement("div");
    descript.classList.add("descript");

    const band = document.createElement("p");
    band.textContent = album.band;

    const genre = document.createElement("p");
    genre.textContent = album.genre;

    descript.appendChild(band);
    descript.appendChild(genre);

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(descript);

    const price = document.createElement("h6");
    price.textContent = `R$ ${album.price
      .toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(".", ",")}`; // Substitui ponto por vírgula

    const buyButton = document.createElement("button");
    buyButton.textContent = "Comprar";

    const descript2 = document.createElement("div");
    descript2.classList.add("descript-2");

    descript2.appendChild(price);
    descript2.appendChild(buyButton);
    card.appendChild(descript2);

    albumGrid.appendChild(card);
  });
}

function removeHTMLAlbumCards() {
  const htmlAlbums = document.querySelectorAll(".album");

  htmlAlbums.forEach((album) => {
    album.remove();
  });
}

function filterAlbumsByPrice(selectedPrice) {
  const albums = document.querySelectorAll(".album");

  albums.forEach((album) => {
    const priceText = album.querySelector("h6").textContent;
    const albumPrice = parseFloat(
      priceText.replace("R$ ", "").replace(",", ".")
    );

    if (albumPrice > selectedPrice) {
      album.style.display = "none";
    } else {
      album.style.display = "block";
    }
  });
}

function handleGenreButtonClick() {
  const genreButtons = document.querySelectorAll(".genre-button");

  genreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove a classe 'active' de todos os botões de gênero
      genreButtons.forEach((btn) => btn.classList.remove("active"));
      // Adiciona a classe 'active' apenas ao botão clicado
      this.classList.add("active");

      // Mantém o botão de gênero selecionado
      const selectedGenre = this.dataset.genre;
      if (selectedGenre) {
        localStorage.setItem("selectedGenre", selectedGenre);
      }
    });
  });

  // Verifica se há um gênero selecionado armazenado e define o botão correspondente como ativo
  const storedGenre = localStorage.getItem("selectedGenre");
  if (storedGenre) {
    const selectedButton = document.querySelector(
      `.genre-button[data-genre="${storedGenre}"]`
    );
    if (selectedButton) {
      selectedButton.classList.add("active");
    }
  }
}
