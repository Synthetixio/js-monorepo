#!/bin/bash

yarn graphql introspect
jq 'del(.__schema.directives)' < graphql.schema.json > graphql.schema.clean.json
rm graphql.schema.json

yarn graphql-introspection-json-to-sdl graphql.schema.clean.json > schema.graphql
rm graphql.schema.clean.json

yarn prettier schema.graphql --write
