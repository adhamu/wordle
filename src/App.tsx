import * as React from 'react'

const attempts = 6
const wordLength = 5
// const dictionary = ['break', 'broke', 'coral', 'loyal', 'panic', 'ferry']
const targetWord = 'loyal'

const App = (): JSX.Element => {
  const [guess1, setGuess1] = React.useState<string[]>([])
  const [guess1Status, setGuess1Status] = React.useState<boolean[]>([])
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

  const guessesWord = (word: string) => {
    console.log({ word })
    console.log(compareWithTarget(word.split('')))
    setGuess1Status(compareWithTarget(word.split('')))

    if (word === targetWord) {
      setFeedback(`${word} is the CORRECT word. Well done`)
    } else {
      setFeedback(`${word} is the incorrect word`)
      setAttemptsRemaining(attemptsRemaining - 1)
    }
  }

  React.useEffect(() => {
    console.log(guess1)
  }, [guess1])

  return (
    <>
      Wordle!
      <p>{feedback}</p>
      <div>
        <p>Attempt #1</p>
        {Array.from({ length: wordLength }, (_, letter) => (
          <input
            type="text"
            style={
              guess1Status.length
                ? {
                    border: guess1Status[letter]
                      ? '2px solid green'
                      : '2px solid red',
                  }
                : {}
            }
            onChange={e => {
              setGuess1(Object.assign([], guess1, { [letter]: e.target.value }))
            }}
          />
        ))}

        <button type="button" onClick={() => guessesWord(guess1.join(''))}>
          Guess
        </button>
      </div>
    </>
  )
}

export default App
