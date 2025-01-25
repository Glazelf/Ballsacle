const dictionary = [ // Fill the dictionary with your own set of words
  "ballsac",
  "sacball",
  "ability",
  "absence",
  "account",
  "actress",
  "address",
  "advance",
  "against",
  "already",
  "amongst",
  "ancient",
  "another",
  "anxiety",
  "anxious",
  "anybody",
  "apology",
  "applaud",
  "appoint",
  "approve",
  "arrange",
  "article",
  "ashamed",
  "attempt",
  "attract",
  "average",
  "awkward",
  "baggage",
  "balance",
  "bargain",
  "battery",
  "because",
  "bedroom",
  "believe",
  "beneath",
  "besides",
  "between",
  "bicycle",
  "bravery",
  "breadth",
  "breathe",
  "bribery",
  "brother",
  "capital",
  "captain",
  "caution",
  "century",
  "certain",
  "chicken",
  "chimney",
  "citizen",
  "collect",
  "college",
  "combine",
  "comfort",
  "command",
  "company",
  "compare",
  "compete",
  "compose",
  "concern",
  "confess",
  "confuse",
  "connect",
  "conquer",
  "contain",
  "content",
  "control",
  "correct",
  "cottage",
  "council",
  "country",
  "courage",
  "curious",
  "current",
  "curtain",
  "cushion",
  "deceive",
  "declare",
  "defense",
  "delight",
  "deliver",
  "descend",
  "descent",
  "deserve",
  "despair",
  "destroy",
  "develop",
  "diamond",
  "discuss",
  "disease",
  "disgust",
  "dismiss",
  "distant",
  "disturb",
  "earnest",
  "eastern",
  "educate",
  "elastic",
  "enclose",
  "english",
  "essence",
  "evening",
  "examine",
  "example",
  "expense",
  "explain",
  "explode",
  "explore",
  "express",
  "extreme",
  "factory",
  "failure",
  "fashion",
  "feather",
  "flatten",
  "foreign",
  "forgive",
  "fortune",
  "forward",
  "freedom",
  "funeral",
  "furnish",
  "further",
  "general",
  "gradual",
  "grammar",
  "harvest",
  "highway",
  "history",
  "holiday",
  "honesty",
  "horizon",
  "however",
  "husband",
  "imagine",
  "imitate",
  "immense",
  "improve",
  "include",
  "inquire",
  "inquiry",
  "instant",
  "instead",
  "jealous",
  "journey",
  "justice",
  "kingdom",
  "kitchen",
  "leather",
  "liberty",
  "library",
  "lighten",
  "loyalty",
  "machine",
  "mankind",
  "measure",
  "medical",
  "mention",
  "message",
  "mineral",
  "mistake",
  "mixture",
  "modesty",
  "morning",
  "mystery",
  "neglect",
  "neither",
  "network",
  "nothing",
  "nowhere",
  "nursery",
  "observe",
  "offense",
  "officer",
  "operate",
  "opinion",
  "outline",
  "outside",
  "outward",
  "package",
  "partner",
  "passage",
  "patient",
  "pattern",
  "perfect",
  "perform",
  "perhaps",
  "picture",
  "plaster",
  "popular",
  "possess",
  "poverty",
  "prepare",
  "present",
  "pretend",
  "prevent",
  "private",
  "problem",
  "produce",
  "product",
  "program",
  "promise",
  "propose",
  "protect",
  "provide",
  "purpose",
  "qualify",
  "quality",
  "quarrel",
  "quarter",
  "rainbow",
  "realize",
  "receipt",
  "receive",
  "reflect",
  "refresh",
  "regular",
  "rejoice",
  "relieve",
  "replace",
  "request",
  "reserve",
  "respect",
  "revenge",
  "rivalry",
  "robbery",
  "royalty",
  "rubbish",
  "satisfy",
  "scatter",
  "scenery",
  "science",
  "scratch",
  "secrecy",
  "selfish",
  "serious",
  "servant",
  "service",
  "several",
  "shallow",
  "sharpen",
  "shelter",
  "shorten",
  "silence",
  "sincere",
  "slavery",
  "society",
  "soldier",
  "somehow",
  "someone",
  "special",
  "station",
  "stiffen",
  "stomach",
  "strange",
  "stretch",
  "student",
  "subject",
  "succeed",
  "success",
  "suggest",
  "support",
  "suppose",
  "surface",
  "suspect",
  "swallow",
  "sweeten",
  "theater",
  "thicken",
  "through",
  "thunder",
  "tighten",
  "tobacco",
  "tonight",
  "tremble",
  "trouble",
  "upright",
  "variety",
  "various",
  "victory",
  "village",
  "violent",
  "visitor",
  "weather",
  "weekday",
  "weekend",
  "welcome",
  "western",
  "whether",
  "whisper",
  "whistle",
  "whoever",
  "widower",
  "without",
  "witness",
  "worship"
]


const WORD_LENGTH = 7 // Set word length, mirror this in css
const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500
const keyboard = document.querySelector("[data-keyboard]")
const alertContainer = document.querySelector("[data-alert-container]")
const guessGrid = document.querySelector("[data-guess-grid]")
const targetWord = "ballsac" // Set target word here

startInteraction()

function startInteraction() {
  document.addEventListener("click", handleMouseClick)
  document.addEventListener("keydown", handleKeyPress)
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick)
  document.removeEventListener("keydown", handleKeyPress)
}

function handleMouseClick(e) {
  if (e.target.matches("[data-key]")) {
    pressKey(e.target.dataset.key)
    return
  }

  if (e.target.matches("[data-enter]")) {
    submitGuess()
    return
  }

  if (e.target.matches("[data-delete]")) {
    deleteKey()
    return
  }
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    submitGuess()
    return
  }

  if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey()
    return
  }

  if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key)
    return
  }
}

function pressKey(key) {
  const activeTiles = getActiveTiles()
  if (activeTiles.length >= WORD_LENGTH) return
  const nextTile = guessGrid.querySelector(":not([data-letter])")
  nextTile.dataset.letter = key.toLowerCase()
  nextTile.textContent = key
  nextTile.dataset.state = "active"
}

function deleteKey() {
  const activeTiles = getActiveTiles()
  const lastTile = activeTiles[activeTiles.length - 1]
  if (lastTile == null) return
  lastTile.textContent = ""
  delete lastTile.dataset.state
  delete lastTile.dataset.letter
}

function submitGuess() {
  const activeTiles = [...getActiveTiles()]
  if (activeTiles.length !== WORD_LENGTH) {
    showAlert("Not enough letters")
    shakeTiles(activeTiles)
    return
  }

  const guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, "")

  if (!dictionary.includes(guess)) {
    showAlert("Not in word list")
    shakeTiles(activeTiles)
    return
  }

  stopInteraction()
  activeTiles.forEach((...params) => flipTile(...params, guess))
}

function flipTile(tile, index, array, guess) {
  const letter = tile.dataset.letter
  const key = keyboard.querySelector(`[data-key="${letter}"i]`)
  setTimeout(() => {
    tile.classList.add("flip")
  }, (index * FLIP_ANIMATION_DURATION) / 2)

  tile.addEventListener(
    "transitionend",
    () => {
      tile.classList.remove("flip")
      if (targetWord[index] === letter) {
        tile.dataset.state = "correct"
        key.classList.add("correct")
      } else if (targetWord.includes(letter)) {
        tile.dataset.state = "wrong-location"
        key.classList.add("wrong-location")
      } else {
        tile.dataset.state = "wrong"
        key.classList.add("wrong")
      }

      if (index === array.length - 1) {
        tile.addEventListener(
          "transitionend",
          () => {
            startInteraction()
            checkWinLose(guess, array)
          },
          { once: true }
        )
      }
    },
    { once: true }
  )
}

function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"]')
}

function showAlert(message, duration = 1000) {
  const alert = document.createElement("div")
  alert.textContent = message
  alert.classList.add("alert")
  alertContainer.prepend(alert)
  if (duration == null) return

  setTimeout(() => {
    alert.classList.add("hide")
    alert.addEventListener("transitionend", () => {
      alert.remove()
    })
  }, duration)
}

function shakeTiles(tiles) {
  tiles.forEach(tile => {
    tile.classList.add("shake")
    tile.addEventListener(
      "animationend",
      () => {
        tile.classList.remove("shake")
      },
      { once: true }
    )
  })
}

function checkWinLose(guess, tiles) {
  if (guess === targetWord) {
    showAlert("You Win", 5000)
    danceTiles(tiles)
    stopInteraction()
    return
  }

  const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
  if (remainingTiles.length === 0) {
    showAlert(targetWord.toUpperCase(), null)
    stopInteraction()
  }
}

function danceTiles(tiles) {
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("dance")
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("dance")
        },
        { once: true }
      )
    }, (index * DANCE_ANIMATION_DURATION) / 5)
  })
}
