document.addEventListener('DOMContentLoaded', () => {

    // CONFIGURAÇÃO DO TEMA ESCURO
    const btnTheme = document.createElement('button');
    btnTheme.innerText = "🌓";
    btnTheme.className = "theme-toggle";
    document.body.appendChild(btnTheme);

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    btnTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    //  FUNÇÃO IMPRIMIR 
    const botaoImprimir = document.getElementById('btnDownload');

    if (botaoImprimir) {
        botaoImprimir.addEventListener('click', () => {

            if (typeof html2pdf === 'undefined') {
                alert('Erro: a biblioteca html2pdf não foi carregada. Abra o arquivo via servidor (Live Server / npx serve).');
                return;
            }

            const estavaNoDark = document.body.classList.contains('dark-theme');
            if (estavaNoDark) document.body.classList.remove('dark-theme');

            botaoImprimir.disabled = true;
            botaoImprimir.innerText = '⏳ Gerando...';

            // Aguarda 150ms para o browser aplicar os estilos antes de capturar
            setTimeout(function() {
                var element = document.getElementById('curriculo');

                var opt = {
                    margin:      [10, 10, 10, 10],
                    filename:    'Curriculo_Luis_Guilherme.pdf',
                    image:       { type: 'jpeg', quality: 0.98 },
                    html2canvas: {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        logging: false,
                        letterRendering: true
                    },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };

                html2pdf().set(opt).from(element).save()
                    .then(function() {
                        if (estavaNoDark) document.body.classList.add('dark-theme');
                        botaoImprimir.disabled = false;
                        botaoImprimir.innerText = ' Baixar PDF';
                    })
                    .catch(function(err) {
                        console.error('Erro ao gerar PDF:', err);
                        alert('Erro ao gerar PDF: ' + err.message);
                        if (estavaNoDark) document.body.classList.add('dark-theme');
                        botaoImprimir.disabled = false;
                        botaoImprimir.innerText = ' Baixar PDF';
                    });
            }, 150);
        });
    }

    //  EFEITO TYPEWRITER 
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.innerText;
        subtitle.innerText = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                subtitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        typeWriter();
    }
});