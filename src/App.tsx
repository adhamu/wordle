import * as React from 'react'

const attemptsPermitted = 6

const dictionaryOfWords = ['break', 'broke', 'coral', 'loyal', 'panic', 'ferry']

const targetWord =
  dictionaryOfWords[
    Math.floor(Math.random() * dictionaryOfWords.length)
  ].toUpperCase()

const wordLength = targetWord.length

const defaultGuesses = new Array(attemptsPermitted).fill({
  letters: [],
  status: [],
  disabled: false,
})

const getStyle = (
  result: {
    letter: string
    exact: boolean
  } | null
) => {
  if (result?.exact === true) {
    return 'exact'
  }

  if (result?.exact === false) {
    return 'partial'
  }

  return 'miss'
}

const App = (): JSX.Element => {
  const [guesses, setGuesses] = React.useState(defaultGuesses)
  const [feedback, setFeedback] = React.useState('')
  const [currentAttempt, setCurrentAttempt] = React.useState(0)

  const isDisabled = (attempt: number) =>
    guesses[attempt].disabled || currentAttempt !== attempt

  const compareWithTarget = (letters: string[]) => {
    const results = []
    const targetSplit = targetWord.split('')

    for (let i = 0; i < wordLength; i += 1) {
      if (targetSplit[i] === letters[i]) {
        results[i] = { letter: letters[i], exact: true }
      } else if (
        targetSplit.includes(letters[i]) &&
        results.filter(f => f?.letter === letters[i]).length <
          targetSplit.filter(r => r === letters[i]).length
      ) {
        results[i] = {
          letter: letters[i],
          exact: false,
        }
      } else {
        results[i] = null
      }
    }

    return results
  }

  const guessWord = (word: string, attempt: number) => {
    if (guesses[attempt].letters.filter(Boolean).length !== wordLength) {
      return
    }

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
      setCurrentAttempt(currentAttempt + 1)
    }
  }

  React.useEffect(() => {
    if (currentAttempt === attemptsPermitted) {
      setFeedback('You have no attempts left. Please try again')
    }
  }, [currentAttempt])

  return (
    <div className="container">
      <h1>Wordle!</h1>
      <hr />
      <p>{feedback}</p>
      <div>
        {Array.from({ length: attemptsPermitted }, (_i, attempt) => (
          <section key={attempt}>
            {Array.from({ length: wordLength }, (_j, letter) => (
              <input
                key={letter}
                type="text"
                maxLength={1}
                tabIndex={Number([attempt + 1, letter].join(''))}
                disabled={isDisabled(attempt)}
                className={
                  guesses[attempt].status.length
                    ? getStyle(guesses[attempt].status[letter])
                    : ''
                }
                onKeyUp={e => {
                  const t = e.target as Partial<HTMLInputElement>
                  t.value = t.value?.toUpperCase() || ''

                  if (!/[A-Za-z]/.test(e.key)) {
                    t.value = ''
                  }

                  if (e.key === 'Backspace') {
                    ;(t.previousSibling as HTMLElement).focus()
                    ;(t.previousSibling as HTMLInputElement).value = ''
                  } else if (e.key === 'Enter') {
                    guessWord(guesses[attempt].letters.join(''), attempt)
                  } else if (/[A-Za-z]/.test(e.key)) {
                    setGuesses({
                      ...guesses,
                      [attempt]: {
                        ...guesses[attempt],
                        letters: Object.assign([], guesses[attempt].letters, {
                          [letter]: t.value,
                        }),
                      },
                    })

                    if (letter !== wordLength - 1 && t.value !== '') {
                      ;(t.nextElementSibling as HTMLElement).focus()
                    }
                  }
                }}
              />
            ))}

            <button
              type="button"
              disabled={isDisabled(attempt)}
              tabIndex={Number([attempt + 1, wordLength].join(''))}
              onClick={() =>
                guessWord(guesses[attempt].letters.join(''), attempt)
              }
            >
              ↵
            </button>
          </section>
        ))}
      </div>
    </div>
  )
}

export default App
