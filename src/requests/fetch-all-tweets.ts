import api from '@/src/utilities/axios'

type FetchAllTweetsFn = (config: {
  Authorization: string
}) => Promise<[error: any, data: any]>

const fetchAllTweets: FetchAllTweetsFn = async ({ Authorization }) => {
  try {
    const response = await api.get(`tweets`, {
      headers: {
        Authorization,
      },
    })
    console.log(33333, response)
    return [null, response]
  } catch (e) {
    return [e, null]
  }
}
export default fetchAllTweets
