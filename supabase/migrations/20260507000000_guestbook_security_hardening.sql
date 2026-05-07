alter table public.guestbook_entries
  alter column name set not null,
  alter column message set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'guestbook_entries_name_length'
      and conrelid = 'public.guestbook_entries'::regclass
  ) then
    alter table public.guestbook_entries
      add constraint guestbook_entries_name_length
      check (char_length(trim(name)) between 2 and 80);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'guestbook_entries_username_length'
      and conrelid = 'public.guestbook_entries'::regclass
  ) then
    alter table public.guestbook_entries
      add constraint guestbook_entries_username_length
      check (username is null or char_length(trim(username)) <= 80);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'guestbook_entries_provider_allowed'
      and conrelid = 'public.guestbook_entries'::regclass
  ) then
    alter table public.guestbook_entries
      add constraint guestbook_entries_provider_allowed
      check (provider is null or provider in ('github', 'anonymous'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'guestbook_entries_role_allowed'
      and conrelid = 'public.guestbook_entries'::regclass
  ) then
    alter table public.guestbook_entries
      add constraint guestbook_entries_role_allowed
      check (role is null or role in ('github', 'anonymous'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'guestbook_entries_avatar_url_https'
      and conrelid = 'public.guestbook_entries'::regclass
  ) then
    alter table public.guestbook_entries
      add constraint guestbook_entries_avatar_url_https
      check (avatar_url is null or (char_length(avatar_url) <= 500 and avatar_url like 'https://avatars.githubusercontent.com/%'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'guestbook_entries_message_length'
      and conrelid = 'public.guestbook_entries'::regclass
  ) then
    alter table public.guestbook_entries
      add constraint guestbook_entries_message_length
      check (char_length(trim(message)) between 8 and 500);
  end if;
end $$;

alter table public.guestbook_entries enable row level security;

drop policy if exists "guestbook read for everyone" on public.guestbook_entries;
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
  auth.uid() is not null
  and auth.uid() = user_id
  and provider = 'github'
  and role = 'github'
  and char_length(trim(name)) between 2 and 80
  and (username is null or char_length(trim(username)) <= 80)
  and (avatar_url is null or (char_length(avatar_url) <= 500 and avatar_url like 'https://avatars.githubusercontent.com/%'))
  and char_length(trim(message)) between 8 and 500
);

create policy "guestbook insert anonymous notes"
on public.guestbook_entries
for insert
to anon
with check (
  user_id is null
  and username is null
  and avatar_url is null
  and provider = 'anonymous'
  and role = 'anonymous'
  and char_length(trim(name)) between 2 and 80
  and char_length(trim(message)) between 8 and 500
);
