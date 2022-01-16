import * as React from 'react'

const attempts = 6
const wordLength = 5
// const dictionary = ['break', 'broke', 'coral', 'loyal', 'panic', 'ferry']
const targetWord = 'loyal'
const defaultGuesses = new Array(attempts).fill({
  letters: [],
  status: [],
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

  const guessesWord = (word: string, attempt: number) => {
    console.log({ word })
    console.log(compareWithTarget(word.split('')))

    setGuesses({
      ...guesses,
      [attempt]: {
        letters: word.split(''),
        status: compareWithTarget(word.split('')),
      },
    })

    if (word === targetWord) {
      setFeedback(`${word} is the CORRECT word. Well done`)
    } else {
      setFeedback(`${word} is the incorrect word`)
      setAttemptsRemaining(attemptsRemaining - 1)
    }
  }

  React.useEffect(() => {
    console.log(guesses)
  }, [guesses])

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
                tabIndex={Number([attempt + 1, letter].join(''))}
                style={
                  guesses[attempt].status.length
                    ? {
                        border: guesses[attempt].status[letter]
                          ? '2px solid green'
                          : '2px solid red',
                      }
                    : {}
                }
                onChange={e => {
                  setGuesses({
                    ...guesses,
                    [attempt]: {
                      ...guesses[attempt],
                      letters: Object.assign([], guesses[attempt].letters, {
                        [letter]: e.target.value,
                      }),
                    },
                  })
                }}
              />
            ))}

            <button
              type="button"
              tabIndex={Number([attempt + 1, wordLength].join(''))}
              onClick={() =>
                guessesWord(guesses[attempt].letters.join(''), attempt)
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
