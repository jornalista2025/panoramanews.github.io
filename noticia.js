document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const noticiaId = urlParams.get("id");

    if (!noticiaId) {
        document.getElementById("noticia-detalhe").innerHTML = "<p>Notícia não encontrada.</p>";
        return;
    }

    fetch("dados.json")
        .then(response => response.json())
        .then(data => {
            const noticia = data[noticiaId];

            if (!noticia) {
                document.getElementById("noticia-detalhe").innerHTML = "<p>Notícia não encontrada.</p>";
                return;
            }

            // Atualiza o conteúdo da página com a notícia
            document.getElementById("noticia-detalhe").innerHTML = `
                <h2>${noticia.titulo}</h2>
                <img src="assets/${noticia.imagem}" alt="${noticia.titulo}">
                <p>${noticia.descricao}</p>
            `;

            // Atualiza as meta tags para compartilhamento
            document.querySelector("meta[property='og:title']").setAttribute("content", noticia.titulo);
            document.querySelector("meta[property='og:description']").setAttribute("content", noticia.descricao);
            document.querySelector("meta[property='og:image']").setAttribute("content", window.location.origin + "/assets/" + noticia.imagem);
            document.querySelector("meta[property='og:url']").setAttribute("content", window.location.href);
        })
        .catch(error => {
            console.error("Erro ao carregar notícia:", error);
            document.getElementById("noticia-detalhe").innerHTML = "<p>Erro ao carregar notícia.</p>";
        });
});
 
