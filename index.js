(function () {
  const semi = ["Hearts", "Spades", "Clubs", "Diamond"];
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let deck;
  let out;
  let current;
  const picker = document.querySelector("#pick");
  const resetBtn = document.querySelector("#reset");
  const pickedCard = document.querySelector("#card");
  const extracted = document.querySelector(".out");

  function mkDeck() {
    const deck = [];

    for (const seme of semi) {
      for (const value of values) {
        deck.push(`${seme} ${value}`);
      }
    }

    return deck;
  }

  function cardToHtml(card, size) {
    return `<div class="card"><img src="./images-${size}/${card}.png" /></div>`;
  }

  function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  function init() {
    deck = mkDeck();
    shuffleDeck(deck);
    out = [];
    current = null;
    picker.classList.remove("hidden");
  }

  function render() {
    const html = out.map((c) => cardToHtml(c, "small")).join("");
    extracted.innerHTML = html;

    if (current) {
      pickedCard.innerHTML = cardToHtml(current, "large");
    } else {
      pickedCard.innerHTML = "";
    }
  }

  picker.addEventListener("click", () => {
    if (current) {
      out.unshift(current);
    }
    if (deck.length === 0) {
      current = null;
      picker.classList.add("hidden");
    } else {
      current = deck.shift();
    }
    render();
  });

  resetBtn.addEventListener("click", () => {
    init();
    render();
  });

  init();
  render();
})();
