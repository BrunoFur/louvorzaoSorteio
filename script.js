document.getElementById('pertenceIgreja').addEventListener('change', function() {
    var igrejaDiv = document.getElementById('igrejaDiv');
    if (this.value === 'sim') {
        igrejaDiv.style.display = 'block';
    } else {
        igrejaDiv.style.display = 'none';
    }
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var nome = document.getElementById('nome').value;
    var dataNascimento = document.getElementById('dataNascimento').value;
    var telefone = document.getElementById('telefone').value;
    var pertenceIgreja = document.getElementById('pertenceIgreja').value;
    var igreja = pertenceIgreja === 'sim' ? document.getElementById('igreja').value : 'Não pertence a nenhuma igreja';
    
    var id = 'ID' + Math.floor(Math.random() * 1000000); // Gerar um ID aleatório
    
    var data = {
        nome: nome,
        dataNascimento: dataNascimento,
        telefone: telefone,
        pertenceIgreja: pertenceIgreja,
        igreja: igreja,
        id: id
    };
    
    // URL do script do Google Apps
    var scriptURL = 'https://script.google.com/macros/s/AKfycbygV8HR08cZiVolxt0En6DE7CG9clK_BS7mKgrHRkXfdJ9aRrBa-88bfCkAF2rqmXSW/exec'; // substitua pelo URL gerado

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
      .then(data => {
          if (data.status === 'success') {
              var mensagem = `Nome: ${nome}<br>Data de Nascimento: ${dataNascimento}<br>Número de Telefone: ${telefone}<br>Pertence a igreja: ${pertenceIgreja}<br>${pertenceIgreja === 'sim' ? 'Igreja: ' + igreja : ''}<br><br>ID de Registro: ${id}`;
              document.getElementById('mensagem').innerHTML = mensagem;
              document.getElementById('resultado').style.display = 'block';
              document.getElementById('registrationForm').reset();
          } else {
              alert('Ocorreu um erro ao salvar os dados. Por favor, tente novamente.');
          }
      }).catch(error => {
          console.error('Erro:', error);
          alert('Ocorreu um erro ao salvar os dados. Por favor, tente novamente.');
      });
});
