-- Enable real-time for required tables
alter publication supabase_realtime add table players;
alter publication supabase_realtime add table answers;
alter publication supabase_realtime add table games;

create table if not exists games (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,
  status text not null check (status in ('waiting', 'playing', 'revealing', 'finished')),
  current_question integer not null default 0,
  host_id uuid not null,
  questions jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists players (
  id uuid primary key,
  initials text not null,
  game_id uuid references games(id) on delete cascade,
  score integer not null default 0,
  has_answered boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists answers (
  id uuid default gen_random_uuid() primary key,
  player_id uuid references players(id) on delete cascade,
  game_id uuid references games(id) on delete cascade,
  question_id integer not null,
  latitude numeric not null,
  longitude numeric not null,
  distance numeric not null,
  score integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table games enable row level security;
alter table players enable row level security;
alter table answers enable row level security;

-- Create policies
create policy "Enable read access for all users" on games
  for select using (true);

create policy "Enable insert access for all users" on games
  for insert with check (true);

create policy "Enable update access for host" on games
  for update using (true);

create policy "Enable read access for all users" on players
  for select using (true);

create policy "Enable insert access for all users" on players
  for insert with check (true);

create policy "Enable update access for all users" on players
  for update using (true);

create policy "Enable read access for all users" on answers
  for select using (true);

create policy "Enable insert access for all users" on answers
  for insert with check (true);
