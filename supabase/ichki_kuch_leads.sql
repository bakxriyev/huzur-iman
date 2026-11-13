-- "Ichki kuch" kursi leadlari
create table if not exists public.ichki_kuch_leads (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  full_name    text not null,
  phone_number text not null,
  tarif        text not null check (tarif in ('VIP', 'Premium')),
  source       text
);

alter table public.ichki_kuch_leads enable row level security;

-- Saytdan (anon) faqat yozishga ruxsat; o'qish yopiq
drop policy if exists "anon can insert ichki_kuch_leads" on public.ichki_kuch_leads;
create policy "anon can insert ichki_kuch_leads"
  on public.ichki_kuch_leads
  for insert
  to anon
  with check (true);

grant insert on public.ichki_kuch_leads to anon;
