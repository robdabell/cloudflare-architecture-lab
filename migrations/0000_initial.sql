CREATE TABLE projects (id text PRIMARY KEY NOT NULL, name text NOT NULL, summary text NOT NULL, status text NOT NULL, updated_at text NOT NULL);
CREATE TABLE architecture_nodes (id text PRIMARY KEY NOT NULL, project_id text NOT NULL REFERENCES projects(id) ON DELETE CASCADE, label text NOT NULL, kind text NOT NULL, description text NOT NULL, position_x real NOT NULL, position_y real NOT NULL);
