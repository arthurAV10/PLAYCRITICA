// Seleção dos elementos da DOM
const btnInicio = document.getElementById('btn-inicio');
const btnSobre = document.getElementById('btn-sobre');
const btnContato = document.getElementById('btn-contato');

const sidebar = document.getElementById('sidebar');
const btnFechar = document.getElementById('btn-fechar');
const conteudoSidebar = document.getElementById('conteudo-sidebar');

// Objeto contendo os dados exibidos na barra lateral
const informacoes = {
    inicio: `
        <h3>Início</h3>
        <p>Bem-vindo à página principal do <strong>PLAYCRITICA</strong>!</p>
        <p>Explore as avaliações mais recentes e dê sua opinião sobre a comunidade gamer.</p>
    `,
    sobre: `
        <h3>Sobre a PLAYCRITICA</h3>
        <p>Plataforma dedicada a avaliações críticas de jogos para Steam, Xbox e PlayStation.</p>
        <p><strong>Desenvolvido por:</strong> Arthur e Elisa</p>
    `,
    contato: `
        <h3>Contato</h3>
        <p>Fale conosco através dos canais abaixo:</p>
        <ul>
            <li><strong>E-mail:</strong> contato@playcritica.com</li>
            <li><strong>Suporte:</strong> suporte@playcritica.com</li>
            <li><strong>Redes:</strong> @playcritica_oficial</li>
        </ul>
    `
};

// Função para abrir e preencher a sidebar
function abrirSidebar(secao) {
    if (informacoes[secao]) {
        conteudoSidebar.innerHTML = informacoes[secao];
        sidebar.classList.add('ativa');
    }
}

// Eventos de clique nos links de navegação
if (btnInicio) {
    btnInicio.addEventListener('click', (e) => {
        e.preventDefault();
        abrirSidebar('inicio');
    });
}

if (btnSobre) {
    btnSobre.addEventListener('click', (e) => {
        e.preventDefault();
        abrirSidebar('sobre');
    });
}

if (btnContato) {
    btnContato.addEventListener('click', (e) => {
        e.preventDefault();
        abrirSidebar('contato');
    });
}

// Botão para fechar a sidebar
if (btnFechar) {
    btnFechar.addEventListener('click', () => {
        sidebar.classList.remove('ativa');
    });
}

// Fecha a barra lateral se clicar fora dela
document.addEventListener('click', (e) => {
    if (
        sidebar.classList.contains('ativa') &&
        !sidebar.contains(e.target) &&
        !btnInicio.contains(e.target) &&
        !btnSobre.contains(e.target) &&
        !btnContato.contains(e.target)
    ) {
        sidebar.classList.remove('ativa');
    }
});