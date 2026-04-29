create extension if not exists pgcrypto with schema extensions;

create table if not exists public.guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  username text,
  avatar_url text,
  provider text,
  role text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.guestbook_entries
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists name text,
  add column if not exists username text,
  add column if not exists avatar_url text,
  add column if not exists provider text,
  add column if not exists role text,
  add column if not exists message text,
  add column if not exists created_at timestamptz not null default now();

alter table public.guestbook_entries
  alter column name set not null,
  alter column message set not null,
  alter column created_at set default now();

create index if not exists guestbook_entries_created_at_idx
  on public.guestbook_entries (created_at desc);

alter table public.guestbook_entries enable row level security;

drop policy if exists "guestbook read for everyone" on public.guestbook_entries;
drop policy if exists "guestbook insert for everyone" on public.guestbook_entries;
drop policy if exists "guestbook insert for signed in users" on public.guestbook_entries;
drop policy if exists "guestbook insert anonymous notes" on public.guestbook_entries;

create policy "guestbook read for everyone"
on public.guestbook_entries
for select
to anon, authenticated
using (true);

create policy "guestbook insert for signed in users"
on public.guestbook_entries
for insert
to authenticated
with check (
  auth.uid() = user_id
  and char_length(trim(name)) >= 2
  and char_length(trim(message)) >= 8
);

create policy "guestbook insert anonymous notes"
on public.guestbook_entries
for insert
to anon
with check (
  user_id is null
  and provider = 'anonymous'
  and char_length(trim(name)) >= 2
  and char_length(trim(message)) >= 8
);
