// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCFG39kmF4Dsa210iqBhtOZe50QWuTsQkA",
    authDomain: "louvorzao-sorteio.firebaseapp.com",
    databaseURL: "https://louvorzao-sorteio-default-rtdb.firebaseio.com",
    projectId: "louvorzao-sorteio",
    storageBucket: "louvorzao-sorteio.appspot.com",
    messagingSenderId: "937798417754",
    appId: "1:937798417754:web:fda00e1c0c45a15cd38763",
    measurementId: "G-0SG1F96FLY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$(document).ready(function(){
    $('#telefone').mask('(00) 00000-0000');

    // Função para validar o telefone (formato)
    function validateTelefone(telefone) {
        return /\(\d{2}\) \d{5}-\d{4}/.test(telefone);
    }

    // Função para validar nome e sobrenome (apenas letras e espaços)
    function validateName(value) {
        return /^[A-Za-z\s]+$/.test(value);
    }

    // Verificar se o telefone já está cadastrado
    function telefoneJaCadastrado(telefone, callback) {
        database.ref('registros').orderByChild('telefone').equalTo(telefone).once('value', function(snapshot) {
            callback(snapshot.exists());
        });
    }

    // Submit do formulário
    $('#registrationForm').on('submit', function(e) {
        e.preventDefault();
        
        var nome = $('#nome').val();
        var sobrenome = $('#sobrenome').val();
        var dataNascimento = $('#dataNascimento').val();
        var telefone = $('#telefone').val();
        var pertenceIgreja = $('#pertenceIgreja').val();
        var igreja = $('#igreja').val() || '';

        // Validar o telefone (formato)
        if (!validateTelefone(telefone)) {
            $('#telefone').addClass('is-invalid');
            $('.invalid-feedback').text('Por favor, insira um número de telefone válido.');
            $('.telefone-feedback').hide();
            return;
        } else {
            $('#telefone').removeClass('is-invalid');
            $('.invalid-feedback').text('Por favor, insira um número de telefone válido.');
        }

        // Validar nome
        if (!validateName(nome)) {
            $('#nome').addClass('is-invalid');
            $('.invalid-feedback').text('Por favor, insira apenas letras e espaços.');
            return;
        } else {
            $('#nome').removeClass('is-invalid');
            $('.invalid-feedback').text('Por favor, insira apenas letras e espaços.');
        }

        // Validar sobrenome
        if (!validateName(sobrenome)) {
            $('#sobrenome').addClass('is-invalid');
            $('.invalid-feedback').text('Por favor, insira apenas letras e espaços.');
            return;
        } else {
            $('#sobrenome').removeClass('is-invalid');
            $('.invalid-feedback').text('Por favor, insira apenas letras e espaços.');
        }

        // Verificar se o telefone já está cadastrado
        telefoneJaCadastrado(telefone, function(exists) {
            if (exists) {
                $('#telefone').addClass('is-invalid');
                $('.telefone-feedback').show();
                $('.telefone-feedback').text('Este número de telefone já está cadastrado. Por favor, utilize outro número.');
                return;
            } else {
                $('#telefone').removeClass('is-invalid');
                $('.telefone-feedback').hide();
            }

            // Incrementar e obter novo ID
            database.ref('counter').transaction(function(currentValue) {
                return (currentValue || 0) + 1;
            }, function(error, committed, snapshot) {
                if (error) {
                    console.error('Erro no envio dos dados!', error);
                    showAlert('Ocorreu um erro ao enviar seu registro. Por favor, tente novamente mais tarde.', 'danger');
                } else if (committed) {
                    var newId = snapshot.val();
                    var formData = {
                        id: newId,
                        nome: nome,
                        sobrenome: sobrenome,
                        dataNascimento: dataNascimento,
                        telefone: telefone,
                        pertenceIgreja: pertenceIgreja,
                        igreja: igreja
                    };

                    // Save data to Firebase
                    database.ref('registros/' + newId).set(formData, function(error) {
                        if (error) {
                            console.error('Erro no envio dos dados!', error);
                            showAlert('Ocorreu um erro ao enviar seu registro. Por favor, tente novamente mais tarde.', 'danger');
                        } else {
                            console.log('Dados enviados com sucesso!');
                            showSuccessMessage(nome, newId);
                            clearForm();
                        }
                    });
                }
            });
        });
    });

    // Mostrar mensagem de sucesso
    function showSuccessMessage(nome, id) {
        $('#registrationForm').hide();
        $('#resultado').show();
        $('#userName').text(nome);
        $('#mensagem').html(`Seu registro foi enviado com sucesso, ${nome}! <br> Seu número para o sorteio é: <span class="id-destaque" id="idDestaque">${id}</span><br>`);
        animateId(id);
        $('#printInstruction').show();
    }

    // Limpar o formulário após o envio
    function clearForm() {
        $('#nome').val('');
        $('#sobrenome').val('');
        $('#dataNascimento').val('');
        $('#telefone').val('');
        $('#pertenceIgreja').val('não');
        $('#igreja').val('');
        $('#igrejaDiv').hide();
        $('#igreja').removeAttr('required');
        $('#telefone').removeClass('is-invalid');
        $('.telefone-feedback').hide();
    }

    // Mostrar alerta de erro
    function showAlert(message, type = 'danger') {
        $('#registrationForm').hide();
        $('#resultado').show();
        $('#resultado').removeClass('alert-success').addClass(`alert-${type}`);
        $('#mensagem').text(message);
    }

    // Função para animar a exibição do ID
    function animateId(id) {
        var increment = 1;
        var interval = setInterval(function() {
            $('#idDestaque').text(increment);
            $('#idDestaque').addClass('id-destaque-animation');
            increment++;
            if (increment > id) {
                clearInterval(interval);
                $('#idDestaque').removeClass('id-destaque-animation');
            }
        }, 100);
    }

    // Evento para mostrar/esconder campo de igreja dependendo da opção selecionada
    $('#pertenceIgreja').on('change', function() {
        if (this.value === 'sim') {
            $('#igrejaDiv').show();
            $('#igreja').attr('required', true);
        } else {
            $('#igrejaDiv').hide();
            $('#igreja').removeAttr('required');
        }
    });

    // Função para validar o telefone (formato)
    function validateTelefone(telefone) {
        return /\(\d{2}\) \d{5}-\d{4}/.test(telefone);
    }

    // Função para verificar se o telefone já está cadastrado
    function telefoneJaCadastrado(telefone, callback) {
        database.ref('registros').orderByChild('telefone').equalTo(telefone).once('value', function(snapshot) {
            callback(snapshot.exists());
        });
    }

    // Função para baixar a imagem do formulário
    function downloadFormImage() {
        html2canvas(document.querySelector('#resultado')).then(canvas => {
            var imgData = canvas.toDataURL('image/png');
            var pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('registro-sorteio.pdf');
        });
    }

    $('#telefone').mask('(00) 00000-0000');
});
