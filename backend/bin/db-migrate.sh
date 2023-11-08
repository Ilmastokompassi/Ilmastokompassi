#!/bin/bash
set -euo pipefail

PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd "$PARENT_PATH"

if [ -f ../.env ]
then
    source ../.env
fi

COMMAND="psql"
ARGUMENTS=("$DATABASE_URI" \
  -f ../migrations/01-schema.sql \
  -f ../migrations/02-climateprofiles.sql\
  -f ../migrations/03-questions.sql\
  -f ../migrations/04-quiz_questions.sql"$@")

echo "> $COMMAND" "$(printf "%q " "${ARGUMENTS[@]}")"
exec "$COMMAND" "${ARGUMENTS[@]}"