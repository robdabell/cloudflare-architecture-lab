CREATE INDEX idx_projects_updated_at ON projects(updated_at DESC);
CREATE INDEX idx_architecture_nodes_project_id ON architecture_nodes(project_id);
CREATE INDEX idx_saved_cars_identity_id ON saved_cars(identity_id, saved_at DESC);
