import { useQuery } from '@apollo/client'
import { DATAUSER_QUERY } from '@/src/requests/graphql'
import { useSession } from 'next-auth/react'
const PageExplore = () => {
  const { data: session } = useSession()

  const { loading, error, data } = useQuery(DATAUSER_QUERY, {
    variables: {
      where: {
        id: 31,
      },
    },
  })
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  console.log(data)

  return (
    <div>
      <button onClick={() => console.log(session?.id)}>CLIK</button>
    </div>
  )
}

export default PageExplore
