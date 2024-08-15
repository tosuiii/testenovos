document.addEventListener("DOMContentLoaded", function () {
  const loanForm = document.getElementById("loan-simulation-form");
  const cpfInput = document.getElementById("cpf");
  const loanAmountInput = document.getElementById("loanAmount");
  const resultDiv = document.getElementById("result");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("header nav ul");
  const links = document.querySelectorAll("header nav ul li a");

  // Função para exibir o resultado da simulação de empréstimo
  loanForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = document.getElementById("loanAmount").value;
    const term = document.getElementById("term").value;

    if (term > 360) {
      alert("O prazo máximo permitido é de 360 meses.");
      return;
    }

    const interestRate = 0.05; // Taxa de juros de exemplo
    const monthlyInterestRate = interestRate / 12;
    const monthlyPayment =
      (amount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -term));

    resultDiv.innerHTML = `<h3>Resultado da Simulação</h3>
                                   <p>Valor do Empréstimo: R$ ${amount}</p>
                                   <p>Prazo: ${term} meses</p>
                                   <p>Pagamento Mensal: R$ ${monthlyPayment.toFixed(
                                     2
                                   )}</p>`;
  });

  // Função para formatar o CPF
  function formatCPF(value) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  // Função para validar e formatar o CPF
  function validateAndFormatCPF() {
    let cpfValue = cpfInput.value.replace(/\D/g, ""); // Remove qualquer coisa que não seja dígito

    if (cpfValue.length === 11) {
      cpfInput.value = formatCPF(cpfValue);
    } else {
      alert("CPF deve conter 11 dígitos.");
    }
  }

  // Evento de perda de foco para o campo CPF
  cpfInput.addEventListener("blur", validateAndFormatCPF);

  function validateLoanAmount() {
    const amount = loanAmountInput.value;

    if (amount < 100000) {
      alert("O valor mínimo do empréstimo é de R$ 100.000,00.");
    }
  }

  loanAmountInput.addEventListener("blur", validateLoanAmount);

  // Função para salvar dados no Local Storage
  function saveFormData(event) {
    event.preventDefault();

    const formData = {
      cpf: cpfInput.value,
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      loanAmount: document.getElementById("loanAmount").value,
      offerSmsWhatsappEmail: document.querySelector(
        'input[name="offer-sms-whatsapp-email"]'
      ).checked,
      offerDaycoval: document.querySelector('input[name="offer-daycoval"]')
        .checked,
      offerPartners: document.querySelector('input[name="offer-partners"]')
        .checked,
    };

    localStorage.setItem("loanFormData", JSON.stringify(formData));
    alert("Dados salvos com sucesso!");
  }

  // Evento de envio do formulário
  loanForm.addEventListener("submit", saveFormData);

  // Slideshow
  const images = document.querySelectorAll(".slide-image");
  let currentIndex = 0;

  function showNextImage() {
    const currentImage = images[currentIndex];
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImage = images[nextIndex];

    currentImage.classList.remove("active");
    nextImage.classList.remove("prev-enter");
    nextImage.classList.remove("prev");
    nextImage.classList.add("next-enter");

    setTimeout(function () {
      currentImage.classList.remove("prev");
      currentImage.classList.remove("active");
      nextImage.classList.remove("next-enter");
      nextImage.classList.add("active");
    }, 50); // Tempo muito curto para iniciar a transição

    currentIndex = nextIndex;
  }

  // Inicializa a primeira imagem como visível
  images[currentIndex].classList.add("active");
  setInterval(showNextImage, 3000); // Troca de imagem a cada 3 segundos

  // Adiciona o evento de clique ao botão de menu para alternar a visibilidade do menu
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  // Função para rolagem suave
  function smoothScroll(e) {
    e.preventDefault();

    const targetId = e.target.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  // Adiciona o evento de clique para rolagem suave aos links de navegação
  links.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });
});
