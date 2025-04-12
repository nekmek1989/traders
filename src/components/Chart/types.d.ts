type Props = {
    data: Array
    range: '24h'| '1w'| '1m' | '3m'
}

type data = [
    Date,
    number
]

type type = 'n' | '%'