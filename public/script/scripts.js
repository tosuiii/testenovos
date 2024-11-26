document.addEventListener("DOMContentLoaded", function () {
  const loanForm = document.getElementById("loan-simulation-form");
  const cpfInput = document.getElementById("cpf");
  const loanAmountInput = document.getElementById("loanAmount");
  const resultDiv = document.getElementById("result");

  loanForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtém o valor do empréstimo em formato numérico
    const rawValue = loanAmountInput.value
      .replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".");
    const amount = parseFloat(rawValue) || 0;
    const term = parseInt(document.getElementById("term").value) || 0;

    if (amount < 1000) {
      alert("O valor do empréstimo deve ser maior ou igual a R$ 1.000,00.");
      loanAmountInput.focus();
      return;
    }

    if (term > 360) {
      alert("O prazo máximo permitido é de 360 meses.");
      return;
    }

    // Taxa de juros de 1,35% ao mês
    const monthlyInterestRate = 1.35 / 100;

    // Cálculo do pagamento mensal (fórmula de juros compostos)
    const monthlyPayment =
      (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term)) /
      (Math.pow(1 + monthlyInterestRate, term) - 1);

    // Exibição do resultado
    resultDiv.innerHTML = `<h3>Resultado da Simulação</h3>
      <p>Valor do Empréstimo: R$ ${amount.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}</p>
      <p>Prazo: ${term} meses</p>
      <p>Pagamento Mensal: R$ ${monthlyPayment
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>`;
  });

  function formatToBRLCurrency(value) {
    const onlyNumbers = value.replace(/\D/g, ""); // Remove tudo que não é número
    if (onlyNumbers === "") return "R$ 0,00";
    const number = parseFloat(onlyNumbers) / 100;
    // Adiciona separadores de milhar e vírgula para decimais
    return `R$ ${number
      .toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  
  loanAmountInput.addEventListener("input", (event) => {
    const cursorPosition = loanAmountInput.selectionStart; // Posição inicial do cursor
    const rawValue = event.target.value; // Valor atual do campo
    const formattedValue = formatToBRLCurrency(rawValue); // Valor formatado
    loanAmountInput.value = formattedValue; // Atualiza o campo com o valor formatado
  
    const adjustment = formattedValue.length - rawValue.length; // Ajuste do cursor
    const newCursorPosition = cursorPosition + adjustment;
    setTimeout(() =>
      loanAmountInput.setSelectionRange(newCursorPosition, newCursorPosition)
    ); // Reposiciona o cursor no lugar correto
  });

  function formatCPF(value) {
    const onlyNumbers = value.replace(/\D/g, "");
    let formattedCPF = "";

    if (onlyNumbers.length > 3) {
      formattedCPF += onlyNumbers.substring(0, 3) + ".";
    } else {
      formattedCPF += onlyNumbers;
    }

    if (onlyNumbers.length > 6) {
      formattedCPF += onlyNumbers.substring(3, 6) + ".";
    } else if (onlyNumbers.length > 3) {
      formattedCPF += onlyNumbers.substring(3);
    }

    if (onlyNumbers.length > 9) {
      formattedCPF += onlyNumbers.substring(6, 9) + "-";
      formattedCPF += onlyNumbers.substring(9, 11);
    } else if (onlyNumbers.length > 6) {
      formattedCPF += onlyNumbers.substring(6);
    }

    return formattedCPF;
  }

  cpfInput.addEventListener("input", (event) => {
    const cursorPosition = cpfInput.selectionStart;
    const rawValue = event.target.value;
    const formattedValue = formatCPF(rawValue);

    const adjustment = formattedValue.length - rawValue.length;
    cpfInput.value = formattedValue;

    const newCursorPosition = cursorPosition + adjustment;
    setTimeout(() =>
      cpfInput.setSelectionRange(newCursorPosition, newCursorPosition)
    );
  });
});
