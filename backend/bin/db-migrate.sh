#!/bin/bash
set -euo pipefail

COMMAND="psql"
ARGUMENTS=("$DATABASE_URI" \
  -f migrations/01-schema.sql \
  -f migrations/02-climateprofiles.sql\
  -f migrations/03-questions.sql"$@")

echo "> $COMMAND" "$(printf "%q " "${ARGUMENTS[@]}")"
exec "$COMMAND" "${ARGUMENTS[@]}"