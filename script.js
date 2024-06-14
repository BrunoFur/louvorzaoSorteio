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
    
    var mensagem = `Nome: ${nome}<br>Data de Nascimento: ${dataNascimento}<br>Número de Telefone: ${telefone}<br>Pertence a igreja: ${pertenceIgreja}<br>${pertenceIgreja === 'sim' ? 'Igreja: ' + igreja : ''}<br><br>ID de Registro: ${id}`;
    
    document.getElementById('mensagem').innerHTML = mensagem;
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('registrationForm').reset();
});
