import api from '@/src/utilities/axios'

type DeleteOneTweetFn = (id: string, config: { Authorization: string }) => Promise<[error: any]>

const deleteOneTweet: DeleteOneTweetFn = async (id, { Authorization }) => {
  try {
    const response = await api.delete(`tweets/${id}`, {
      headers: {
        Authorization,
      },
    })
    console.log(33333, response)
    return [null]
  } catch (e) {
    return [e]
  }
}
export default deleteOneTweet
