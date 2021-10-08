
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