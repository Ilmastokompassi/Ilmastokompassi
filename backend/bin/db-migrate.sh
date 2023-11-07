#!/bin/bash
set -euo pipefail

PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd "$PARENT_PATH"
source ../.env

COMMAND="psql"
ARGUMENTS=("$DATABASE_URI" \
  -f ../migrations/01-schema.sql \
  -f ../migrations/02-climateprofiles.sql\
  -f ../migrations/03-questions.sql"$@")

echo "> $COMMAND" "$(printf "%q " "${ARGUMENTS[@]}")"
exec "$COMMAND" "${ARGUMENTS[@]}"