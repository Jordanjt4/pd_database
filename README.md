# Picnic Day Database
Syncs Picnic Day event data from Google Sheets CSV into a SQLite database.
Exposes data through an API for the schedule builder.

## How it Works
### CSV Source
Event data comes from the Google Sheets CSV export.
`sync-csv`:
- downloads the CSV
- parses each row
- converts row into event object
- upserts the database

### Database Schema
The database has 4 main tables.
The precise schema can be found in `init-db`

LOCATIONS:
| Column | Description |
|-------------|------|
| id | unique location ID |
| name | location name |
| address | location address |
| latitude | map latitude |
| longitude | map longitude |

EVENTS: 
| Column | Description |
|-------------|------|
| id | unique location ID |
| location_id | references to the location table |
| name | event name |
| description | event description |
| start_time | start time |
| end_time | end time |
| category | event category (ex: CDF, ENT, EXH, etc) |
| location_detail | specifities (room number, in front, to the side, etc) |
| show_time | n/a for now, here only because some events might require in the future |


TAGS:
| Column | Description |
|-------------|------|
| id | tag id |
| name | tag name |

EVENT_TAGS:
Many-to-many relationship between events and tags.

## Setup
1. Install dependencies.
`npm install`

2. Create .env
`CSV_URL=your_google_sheet_csv_url`

3. Initialize the database.
`npx tsx scripts/init-db.ts`

4. Sync events from the CSV
`npx tsx scripts/sync-db.ts`

## Running the API
`npm run dev`