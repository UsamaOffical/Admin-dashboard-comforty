import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId ,token} from '../env'

export const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
