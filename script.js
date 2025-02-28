function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("dados.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar o JSON");
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("news-container");

            if (!container) {
                console.error("Erro: Elemento #news-container não encontrado no HTML.");
                return;
            }

            if (!data.length) {
                container.innerHTML = "<p>Nenhuma notícia disponível no momento.</p>";
                return;
            }

            container.innerHTML = data.map((noticia, index) => {
                const urlNoticia = `${window.location.origin}/noticia.html?id=${index}`;

                // Verifica se a imagem começa com "http" ou usa o caminho local
                const caminhoImagem = noticia.imagem.startsWith("http") ? noticia.imagem : `${window.location.origin}/${noticia.imagem}`;

                return `
                    <div class="news-card">
                        <img src="${caminhoImagem}" alt="${noticia.titulo}" onerror="this.onerror=null; this.src='assets/placeholder.jpg';">
                        <h2><a href="noticia.html?id=${index}">${noticia.titulo}</a></h2>
                        <p>${noticia.descricao}</p>
                        <p class="autor">${noticia.autor ? noticia.autor : "Fonte desconhecida"}</p>
                        <div class="share-buttons">
                            <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(noticia.titulo + ' - ' + urlNoticia)}" target="_blank" class="whatsapp">WhatsApp</a>
                            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlNoticia)}" target="_blank" class="facebook">Facebook</a>
                            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(urlNoticia)}&text=${encodeURIComponent(noticia.titulo)}" target="_blank" class="twitter">Twitter</a>
                        </div>
                    </div>
                `;
            }).join("");
        })
        .catch(error => {
            console.error("Erro ao carregar notícias:", error);
            document.getElementById("news-container").innerHTML = "<p>Erro ao carregar notícias.</p>";
        });
});







