import api from '@/src/utilities/axios'

type StoreOneTweetFn = (
  inputData: { text: string; image: string },
  config: {
    Authorization: string
  }
) => Promise<[error: any, data: any]>

const storeOneTweet: StoreOneTweetFn = async ({ text, image }, { Authorization }) => {
  try {
    const response = await api.post(
      `tweets`,
      { text, image },
      {
        headers: {
          Authorization,
        },
      }
    )
    console.log(33333, response)
    return [null, response]
  } catch (e) {
    return [e, null]
  }
}
export default storeOneTweet
