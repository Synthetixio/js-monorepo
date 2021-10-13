
export type Field = {
    name: string
    type: {
        name: string
    }
}

export type Type = {
    name: string
    fields: Field[]
    inputFields: Field[]
}

export type Schema = {
    types: Type[]
}

export type RawField = Field & {
    type: {
        name: string | null,
        kind: string,
        ofType?: {
            name: string
        }
    }
}

export type RawType = {
    name: string
    fields: RawField[]
    inputFields: RawField[]
}

export type RawSchema = {
    types: RawType[]
}