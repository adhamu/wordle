import * as React from 'react'

const attempts = 6
const wordLength = 5
// const dictionary = ['break', 'broke', 'coral', 'loyal', 'panic', 'ferry']
const targetWord = 'loyal'.toUpperCase()
const defaultGuesses = new Array(attempts).fill({
  letters: [],
  status: [],
  disabled: false,
})

const App = (): JSX.Element => {
  const [guesses, setGuesses] = React.useState(defaultGuesses)
  const [feedback, setFeedback] = React.useState('')
  const [attemptsRemaining, setAttemptsRemaining] = React.useState(attempts)

  const compareWithTarget = (word: string[]) => {
    const results = []
    const targetSplit = targetWord.split('')

    for (let i = 0; i < wordLength; i += 1) {
      results[i] = targetSplit[i] === word[i]
    }

    return results
  }

  const guessWord = (word: string, attempt: number) => {
    setGuesses({
      ...guesses,
      [attempt]: {
        letters: word.split(''),
        status: compareWithTarget(word.split('')),
        disabled: true,
      },
    })

    if (word === targetWord) {
      setFeedback(`${word} is the CORRECT word. Well done`)
    } else {
      setFeedback(`${word} is the incorrect word`)
      setAttemptsRemaining(attemptsRemaining - 1)
    }
  }

  return (
    <>
      Wordle!
      <p>{feedback}</p>
      <div>
        {Array.from({ length: attempts }, (_i, attempt) => (
          <React.Fragment key={attempt}>
            <p>Attempt #{attempt + 1}</p>
            {Array.from({ length: wordLength }, (_j, letter) => (
              <input
                key={letter}
                type="text"
                maxLength={1}
                tabIndex={Number([attempt + 1, letter].join(''))}
                disabled={guesses[attempt].disabled}
                style={
                  guesses[attempt].status.length
                    ? {
                        border: guesses[attempt].status[letter]
                          ? '2px solid green'
                          : '2px solid red',
                      }
                    : {}
                }
                onKeyUp={e => {
                  const t = e.target as Partial<HTMLInputElement>
                  t.value = t.value?.toUpperCase()

                  if (e.key === 'Backspace') {
                    ;(t.previousSibling as HTMLElement).focus()
                    ;(t.previousSibling as HTMLInputElement).value = ''
                  }

                  if (
                    (e.key >= 'a' && e.key <= 'z') ||
                    (e.key >= 'A' && e.key <= 'Z')
                  ) {
                    setGuesses({
                      ...guesses,
                      [attempt]: {
                        ...guesses[attempt],
                        letters: Object.assign([], guesses[attempt].letters, {
                          [letter]: t.value,
                        }),
                      },
                    })

                    if (letter !== wordLength - 1) {
                      ;(t.nextElementSibling as HTMLElement).focus()
                    }
                  }
                }}
              />
            ))}

            <button
              type="button"
              tabIndex={Number([attempt + 1, wordLength].join(''))}
              onClick={() =>
                guesses[attempt].letters.filter(Boolean).length ===
                  wordLength &&
                guessWord(guesses[attempt].letters.join(''), attempt)
              }
            >
              Guess
            </button>
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default App
