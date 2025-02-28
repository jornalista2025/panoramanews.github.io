function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("open");
}
document.addEventListener("DOMContentLoaded", function () {
    fetch("dados.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("news-container");

            // Verifica se há notícias no JSON
            if (!data.length) {
                container.innerHTML = "<p>Nenhuma notícia disponível no momento.</p>";
                return;
            }

            // Mapeia cada notícia e insere no HTML
            container.innerHTML = data.map(noticia => `
                <div class="news-card">
                    <img src="assets/${noticia.imagem}" alt="${noticia.titulo}">
                    <h2>${noticia.titulo}</h2>
                    <p>${noticia.descricao}</p>
                </div>
            `).join("");
        })
        .catch(error => {
            console.error("Erro ao carregar notícias:", error);
            document.getElementById("news-container").innerHTML = "<p>Erro ao carregar notícias.</p>";
        });
});


