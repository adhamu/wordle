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
        <p>Attempt #1</p>
        {Array.from({ length: wordLength }, (_, letter) => (
          <input
            key={letter}
            type="text"
            style={
              guesses[0].status.length
                ? {
                    border: guesses[0].status[letter]
                      ? '2px solid green'
                      : '2px solid red',
                  }
                : {}
            }
            onChange={e => {
              setGuesses(
                Object.assign([], guesses[0].letters, {
                  [letter]: e.target.value,
                })
              )
              setGuesses({
                ...guesses,
                0: {
                  ...guesses[0],
                  letters: Object.assign([], guesses[0].letters, {
                    [letter]: e.target.value,
                  }),
                },
              })
            }}
          />
        ))}

        <button
          type="button"
          onClick={() => guessesWord(guesses[0].letters.join(''), 0)}
        >
          Guess
        </button>
      </div>
    </>
  )
}

export default App
