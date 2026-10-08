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

// Função genérica para baixar arquivos de texto (.txt)
function baixarArquivoTexto(conteudo, nomeArquivo) {
    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

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
        sidebar &&
        sidebar.classList.contains('ativa') &&
        !sidebar.contains(e.target) &&
        (!btnInicio || !btnInicio.contains(e.target)) &&
        (!btnSobre || !btnSobre.contains(e.target)) &&
        (!btnContato || !btnContato.contains(e.target))
    ) {
        sidebar.classList.remove('ativa');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // LÓGICA DE CADASTRO (Gera e baixa dados_cadastro.txt)
    // ----------------------------------------------------
    const formCadastro = document.getElementById('formcadastro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento padrão do formulário

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const endereco = document.getElementById('endereço').value.trim();
            const cpf = document.getElementById('cpf').value.trim();
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;

            // Validação de confirmação de senha
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }

            // Buscar usuários existentes no localStorage
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // Verificar se e-mail ou CPF já estão cadastrados
            const usuarioExiste = usuarios.some(u => u.email === email || u.cpf === cpf);
            if (usuarioExiste) {
                alert('E-mail ou CPF já cadastrado!');
                return;
            }

            // Criar objeto do novo usuário
            const novoUsuario = { nome, email, endereco, cpf, senha };

            // Adicionar e salvar no localStorage
            usuarios.push(novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // Conteúdo formatado para baixar no arquivo .txt
            const conteudoTXT = 
`--- DADOS DE CADASTRO - PLAYCRITICA ---
Nome: ${nome}
E-mail: ${email}
Endereço: ${endereco}
CPF: ${cpf}
Senha: ${senha}
Data do Cadastro: ${new Date().toLocaleString('pt-BR')}
----------------------------------------`;

            // Baixar o arquivo .txt
            baixarArquivoTexto(conteudoTXT, `cadastro_${nome.replace(/\s+/g, '_')}.txt`);

            alert('Cadastro realizado com sucesso! O arquivo TXT com seus dados foi gerado.');
            window.location.href = 'login.html'; // Redireciona para a página de login
        });
    }

    // ----------------------------------------------------
    // LÓGICA DE LOGIN
    // ----------------------------------------------------
    const formLogin = document.getElementById('formLogin');

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const nome = document.getElementById('nome').value.trim();
            const senha = document.getElementById('senha').value;

            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioValido = usuarios.find(u => u.nome === nome && u.senha === senha);

            if (usuarioValido) {
                alert(`Bem-vindo, ${usuarioValido.nome}!`);
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido));
                window.location.href = 'PLAYCRITICA.html';
            } else {
                alert('Nome de usuário ou senha incorretos!');
            }
        });
    }

    // ----------------------------------------------------
    // LÓGICA DE AVALIAÇÃO DE JOGOS (Gera e baixa avaliacoes.txt)
    // ----------------------------------------------------
    const formAvaliacao = document.getElementById('paginapricipal');

    if (formAvaliacao) {
        formAvaliacao.addEventListener('submit', (e) => {
            e.preventDefault();

            const fifaAvaliacao = document.getElementById('fifa').value.trim();
            const reddeadAvaliacao = document.getElementById('reddead').value.trim();
            const eldenringAvaliacao = document.getElementById('eldenring').value.trim();

            const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || { nome: 'Anônimo' };

            const conteudoTXT = 
`--- AVALIAÇÕES DE JOGOS - PLAYCRITICA ---
Usuário: ${usuarioLogado.nome}
Data: ${new Date().toLocaleString('pt-BR')}

[FIFA]
Avaliação: ${fifaAvaliacao}

[Red Dead Redemption]
Avaliação: ${reddeadAvaliacao}

[Elden Ring]
Avaliação: ${eldenringAvaliacao}
----------------------------------------`;

            // Baixar o arquivo .txt com as avaliações
            baixarArquivoTexto(conteudoTXT, `avaliacoes_${usuarioLogado.nome.replace(/\s+/g, '_')}.txt`);

            alert('Avaliações enviadas e salvas em arquivo TXT com sucesso!');
            formAvaliacao.reset();
        });
    }
});