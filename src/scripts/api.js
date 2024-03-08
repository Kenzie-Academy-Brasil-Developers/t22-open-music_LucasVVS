export async function fetchMusicData() {
  // console.log("Chamando fetchMusicData()...");
  try {
    const response = await fetch(
      "https://openmusic-fake-api.onrender.com/api/musics"
    );
    const musics = await response.json();
    if (musics !== null) {
      // console.log("Dados da API recebidos com sucesso.");
      return musics;
    } else {
      // console.log("Nenhum dado recebido da API.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao carregar os álbuns:", error);
    throw error;
  }
}
