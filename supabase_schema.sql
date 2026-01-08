-- 1. Create the 'posts' table
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  excerpt text,
  content text,
  category text check (category in ('DEV', 'ESSAY', 'REVIEW')),
  tags text[] default '{}',
  thumbnail_url text,
  read_time integer default 5
);

-- 2. Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- 3. Create Policy: Allow public read access
create policy "Public posts are viewable by everyone."
  on public.posts for select
  using ( true );

-- 4. Create Policy: Allow authenticated users to insert/update/delete
-- (This requires you to implement Supabase Auth later)
create policy "Users can insert their own posts."
  on public.posts for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update their own posts."
  on public.posts for update
  using ( auth.role() = 'authenticated' );

-- 5. Create Storage Bucket for images
insert into storage.buckets (id, name, public)
values ('blog-assets', 'blog-assets', true);

-- 6. Storage Policy: Public Read
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'blog-assets' );

-- 7. Storage Policy: Authenticated Upload
create policy "Authenticated users can upload"
  on storage.objects for insert
  with check ( bucket_id = 'blog-assets' and auth.role() = 'authenticated' );
