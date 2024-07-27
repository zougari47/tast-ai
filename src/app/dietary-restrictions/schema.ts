import * as v from 'valibot'

export const schema = v.array(v.pipe(v.string(), v.nonEmpty()))

export type ISchema = v.InferInput<typeof schema>
