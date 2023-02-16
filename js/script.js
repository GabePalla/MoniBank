
import verificaIdade from "./verificaIdade.js";
import verificaCpf from "./verificarCPF.js";

const campoDoFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]');

let mensagem = ""

campoDoFormulario.forEach(campo =>{
    campo.addEventListener('blur', () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault())
});

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {

    if(campo.name == "cpf") {
        if(!verificaCpf(campo)) {
            campo.setCustomValidity('CPF errado.')
        }
    } else if (campo.name == "aniversario") {
        if(!verificaIdade(campo)) {
            campo.setCustomValidity('O usuário é menor de idade.')
        }
    }

    tiposDeErro.forEach(tipoErro => {
        if(campo.validity[tipoErro]) {
            mensagem = mensagens[campo.name][tipoErro]
        }
    })

    const elementoMensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const verificaValidadeElemento = campo.checkValidity();

    if(!verificaValidadeElemento) {
        elementoMensagemErro.textContent = mensagem;
    } else {
        elementoMensagemErro.textContent = ""
    }

}

