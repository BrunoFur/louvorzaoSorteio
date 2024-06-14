const url = 'https://script.google.com/macros/s/AKfycbygV8HR08cZiVolxt0En6DE7CG9clK_BS7mKgrHRkXfdJ9aRrBa-88bfCkAF2rqmXSW/exec';
const dados = document.forms['louvorzao'];

dados.addEventListener('submit', function (e) {
    e.preventDefault();

    fetch(url, {
        method: 'POST',
        body: new FormData(dados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar os dados. Status do erro: ' + response.status);
        }
        return response.text(); // Retorna o texto da resposta
    })
    .then(data => {
        console.log('Dados enviados com sucesso!', data);
        dados.reset();
        // Aqui você pode mostrar uma mensagem de sucesso para o usuário, se desejar
    })
    .catch(error => {
        console.error('Erro no envio dos dados!', error);
        // Aqui você pode mostrar uma mensagem de erro para o usuário, se desejar
    });
});
